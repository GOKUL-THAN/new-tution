import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const patchSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'DEACTIVATED', 'PENDING_VERIFICATION']).optional(),
  role: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'SUPER_ADMIN']).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await requireAuth(['ACADEMIC_ADMIN', 'SUPER_ADMIN']);

    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });

    // Prevent demoting another SUPER_ADMIN unless the caller is also SUPER_ADMIN
    if (parsed.data.role && parsed.data.role !== 'SUPER_ADMIN' && admin.role !== 'SUPER_ADMIN') {
      const target = await prisma.user.findUnique({ where: { id: params.id }, select: { role: true } });
      if (target?.role === 'SUPER_ADMIN')
        return NextResponse.json({ error: 'Cannot modify a Super Admin account' }, { status: 403 });
    }

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: parsed.data,
      select: { id: true, email: true, role: true, status: true },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: admin.id,
        action: 'UPDATE_USER',
        entity: 'User',
        entityId: params.id,
        metadata: parsed.data,
      },
    }).catch(() => {/* non-critical */});

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
