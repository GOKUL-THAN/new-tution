import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const courseSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  boardId: z.string().optional().nullable(),
  classId: z.string().optional().nullable(),
  subjectId: z.string().optional().nullable(),
  price: z.number().min(0).default(0),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  isFree: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export async function GET(req: NextRequest) {
  try {
    await requireAuth(['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'CONTENT_EDITOR']);

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '50', 10));

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          board: { select: { shortName: true } },
          class: { select: { name: true } },
          subject: { select: { name: true } },
        },
      }),
      prisma.course.count(),
    ]);

    return NextResponse.json({ courses, total, page, limit });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN')) {
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'CONTENT_EDITOR']);

    const body = await req.json();
    const parsed = courseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { boardId, classId, subjectId, ...rest } = parsed.data;
    const course = await prisma.course.create({
      data: {
        ...rest,
        boardId: boardId || null,
        classId: classId || null,
        subjectId: subjectId || null,
      } as Prisma.CourseUncheckedCreateInput,
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN')) {
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
