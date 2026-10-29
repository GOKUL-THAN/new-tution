import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const boardParam = searchParams.get('board');
    const classParam = searchParams.get('class');
    const subjectParam = searchParams.get('subject');
    const typeParam = searchParams.get('type');

    const where: Prisma.ResourceWhereInput = { isPublished: true, isFree: true };

    if (boardParam) {
      where.board = { shortName: boardParam };
    }
    if (classParam) {
      const classNum = parseInt(classParam, 10);
      if (!isNaN(classNum)) {
        where.class = { number: classNum };
      }
    }
    if (subjectParam) {
      where.subject = { slug: subjectParam };
    }
    if (typeParam) {
      where.type = typeParam.toUpperCase();
    }

    const resources = await prisma.resource.findMany({
      where,
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        board: { select: { name: true, shortName: true } },
        class: { select: { name: true, number: true } },
        subject: { select: { name: true, slug: true } },
      },
    });

    return NextResponse.json(resources);
  } catch (error) {
    console.error('Resources API error:', error);
    return NextResponse.json([]);
  }
}
