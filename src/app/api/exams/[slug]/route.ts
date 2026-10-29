import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const exam = await prisma.examCatalogue.findUnique({
      where: { slug },
    });

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error('Exam GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch exam' }, { status: 500 });
  }
}
