import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const patchSchema = z.object({
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
  isFeatured: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAuth(['ACADEMIC_ADMIN', 'CONTENT_EDITOR', 'SUPER_ADMIN']);

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });

    const data: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.status === 'PUBLISHED') data.publishedAt = new Date();

    const course = await prisma.course.update({
      where: { id: params.id },
      data,
      select: { id: true, title: true, status: true, publishedAt: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: 'UPDATE_COURSE_STATUS',
        entity: 'Course',
        entityId: params.id,
        metadata: parsed.data,
      },
    }).catch(() => {/* non-critical */});

    return NextResponse.json(course);
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}
