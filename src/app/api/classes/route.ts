import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      where: { isActive: true },
      orderBy: { number: 'asc' },
    });
    return NextResponse.json(classes);
  } catch (error) {
    console.error('Classes API error:', error);
    return NextResponse.json([]);
  }
}
