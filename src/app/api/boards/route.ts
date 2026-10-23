import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const boards = await prisma.board.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(boards);
  } catch (error) {
    console.error('Boards API error:', error);
    return NextResponse.json([]);
  }
}
