import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const patchSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED', 'DEACTIVATED']).optional(),
  role: z.enum(['STUDENT', 'PARENT', 'TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'SUPER_ADMIN']).optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(['ACADEMIC_ADMIN', 'SUPER_ADMIN']);

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') ?? '50', 10));
    const role = searchParams.get('role') ?? undefined;
    const status = searchParams.get('status') ?? undefined;
    const search = searchParams.get('q') ?? undefined;

    const where = {
      ...(role ? { role: role as 'STUDENT' | 'PARENT' | 'TEACHER' | 'MENTOR' | 'CONTENT_EDITOR' | 'ACADEMIC_ADMIN' | 'FINANCE_ADMIN' | 'SUPER_ADMIN' } : {}),
      ...(status ? { status: status as 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | 'PENDING_VERIFICATION' } : {}),
      ...(search ? {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' as const } },
          { lastName: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
        ],
      } : {}),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, email: true, firstName: true, lastName: true,
          role: true, status: true, emailVerified: true,
          createdAt: true, lastLoginAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
