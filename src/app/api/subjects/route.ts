import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      where: { isActive: true },
      include: {
        _count: { select: { courses: true, chapters: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('Subjects API error:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}
