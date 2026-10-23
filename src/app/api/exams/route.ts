import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const exams = await prisma.examCatalogue.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json(exams);
  } catch (error) {
    console.error('Exams API error:', error);
    return NextResponse.json([]);
  }
}
