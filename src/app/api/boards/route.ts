import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      where: { isActive: true },
      include: {
        classes: {
          include: { class: { select: { id: true, name: true, number: true } } },
        },
        _count: { select: { courses: true } },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ boards });
  } catch (error) {
    console.error('Boards API error:', error);
    return NextResponse.json({ error: 'Failed to fetch boards' }, { status: 500 });
  }
}
