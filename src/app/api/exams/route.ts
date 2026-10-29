import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const exams = await prisma.examCatalogue.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });

    return NextResponse.json({ exams });
  } catch (error) {
    console.error('Exams API error:', error);
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 });
  }
}
