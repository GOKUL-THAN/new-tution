import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

const courseCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  slug: z.string().min(1, 'Slug is required').max(300),
  description: z.string().min(1, 'Description is required'),
  boardId: z.string().optional(),
  classId: z.string().optional(),
  subjectId: z.string().optional(),
  price: z.number().int().min(0).default(0),
  isFree: z.boolean().default(false),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS']).default('ALL_LEVELS'),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const boardParam = searchParams.get('board');
    const classParam = searchParams.get('class');
    const subjectParam = searchParams.get('subject');
    const searchParam = searchParams.get('search');
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = 50;
    const skip = (pageParam - 1) * pageSize;

    const where: Prisma.CourseWhereInput = { status: 'PUBLISHED' };

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
    if (searchParam) {
      where.OR = [
        { title: { contains: searchParam, mode: 'insensitive' } },
        { description: { contains: searchParam, mode: 'insensitive' } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        board: true,
        class: true,
        subject: true,
      },
      take: pageSize,
      skip,
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Courses GET error:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const creator = await requireAuth(['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'TEACHER']);

    const body = await request.json();
    const parsed = courseCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const course = await prisma.course.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        boardId: data.boardId || null,
        classId: data.classId || null,
        subjectId: data.subjectId || null,
        price: data.price,
        isFree: data.isFree,
        level: data.level,
        status: data.status,
        creatorId: creator.id,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        status: true,
        isFree: true,
        price: true,
        level: true,
        createdAt: true,
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      if (error.message === 'FORBIDDEN') {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }
    }
    console.error('Courses POST error:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
