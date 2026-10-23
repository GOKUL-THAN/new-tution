import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const courseUpdateSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  description: z.string().min(1).optional(),
  boardId: z.string().optional().nullable(),
  classId: z.string().optional().nullable(),
  subjectId: z.string().optional().nullable(),
  price: z.number().int().min(0).optional(),
  isFree: z.boolean().optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL_LEVELS']).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const course = await prisma.course.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDescription: true,
        level: true,
        language: true,
        thumbnailUrl: true,
        introVideoUrl: true,
        price: true,
        discountPrice: true,
        duration: true,
        status: true,
        isFeatured: true,
        isFree: true,
        startDate: true,
        endDate: true,
        publishedAt: true,
        createdAt: true,
        board: true,
        class: true,
        subject: true,
        instructor: {
          select: {
            id: true,
            qualification: true,
            specializations: true,
            experience: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
                bio: true,
              },
            },
          },
        },
        modules: {
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                number: true,
                duration: true,
                isFree: true,
                isPublished: true,
              },
            },
          },
          orderBy: { number: 'asc' },
        },
        _count: {
          select: { enrolments: true, reviews: true },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    if (course.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Course GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAuth(['SUPER_ADMIN', 'ACADEMIC_ADMIN']);
    const { slug } = await params;

    const body = await request.json();
    const parsed = courseUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const existing = await prisma.course.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    const updated = await prisma.course.update({
      where: { slug },
      data: parsed.data,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      if (error.message === 'FORBIDDEN') {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }
    }
    console.error('Course PUT error:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAuth(['SUPER_ADMIN', 'ACADEMIC_ADMIN']);
    const { slug } = await params;

    const existing = await prisma.course.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    await prisma.course.delete({ where: { slug } });

    return NextResponse.json({ message: 'Course deleted' });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      if (error.message === 'FORBIDDEN') {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }
    }
    console.error('Course DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
