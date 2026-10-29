import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await requireAuth(['ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR']);

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') ?? '50', 10));
    const status = searchParams.get('status') ?? undefined;

    const where = {
      ...(status ? { status } : {}),
    };

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        include: { handler: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.enquiry.count({ where }),
    ]);

    return NextResponse.json({
      enquiries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
