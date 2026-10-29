import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const patchSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'COUNSELLING', 'FOLLOW_UP', 'ENROLLED', 'NOT_PROCEEDING', 'CLOSED']).optional(),
  notes: z.string().max(5000).optional(),
  handlerId: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAuth(['ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR']);

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });

    const enquiry = await prisma.enquiry.update({
      where: { id: params.id },
      data: {
        ...parsed.data,
        handlerId: parsed.data.handlerId ?? admin.id,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: 'UPDATE_ENQUIRY',
        entity: 'Enquiry',
        entityId: params.id,
        metadata: parsed.data,
      },
    }).catch(() => {/* non-critical */});

    return NextResponse.json(enquiry);
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
