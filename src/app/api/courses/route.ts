import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const boardId = searchParams.get('boardId');
    const classId = searchParams.get('classId');
    const subjectId = searchParams.get('subjectId');
    const status = searchParams.get('status') || 'PUBLISHED';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 50);

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (boardId) where.boardId = boardId;
    if (classId) where.classId = classId;
    if (subjectId) where.subjectId = subjectId;

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          board: { select: { shortName: true, name: true } },
          class: { select: { name: true, number: true } },
          subject: { select: { name: true, slug: true } },
          instructor: {
            include: { user: { select: { firstName: true, lastName: true } } },
          },
          _count: { select: { enrolments: true, reviews: true } },
        },
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Courses API error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
