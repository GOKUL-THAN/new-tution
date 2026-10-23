import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Subjects API error:', error);
    return NextResponse.json([]);
  }
}
