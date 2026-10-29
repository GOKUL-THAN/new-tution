import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createTestSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  durationMinutes: z.number().int().min(1).max(360).default(60),
  totalMarks: z.number().min(0).default(100),
  passingMarks: z.number().optional(),
  testType: z
    .enum(['CHAPTER_TEST', 'UNIT_TEST', 'SUBJECT_TEST', 'MOCK_TEST', 'DIAGNOSTIC', 'PRACTICE', 'BOARD_EXAM_PRACTICE'])
    .default('CHAPTER_TEST'),
  courseId: z.string().optional(),
  negativeMarking: z.boolean().default(false),
  shuffleQuestions: z.boolean().default(false),
  maxAttempts: z.number().int().min(1).max(100).default(3),
  showResults: z.enum(['AFTER_SUBMIT', 'AFTER_DEADLINE', 'MANUAL']).default('AFTER_SUBMIT'),
  availableFrom: z.string().optional(),
  availableUntil: z.string().optional(),
});

// GET /api/tests — list published tests (students) or all tests (admin/teacher)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const isPrivileged =
      user && ['TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN'].includes(user.role);

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '20', 10));
    const type = searchParams.get('type') ?? undefined;
    const courseId = searchParams.get('courseId') ?? undefined;

    const where = {
      ...(isPrivileged ? {} : { isPublished: true }),
      ...(type ? { testType: type } : {}),
      ...(courseId ? { courseId } : {}),
    };

    const [tests, total] = await Promise.all([
      prisma.test.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          testType: true,
          durationMinutes: true,
          totalMarks: true,
          maxAttempts: true,
          isPublished: true,
          availableFrom: true,
          availableUntil: true,
          _count: { select: { questions: true, attempts: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.test.count({ where }),
    ]);

    return NextResponse.json({
      tests,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 });
  }
}

// POST /api/tests — create a test (teacher/admin)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);

    const body = await request.json();
    const parsed = createTestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const slug = parsed.data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 100);

    // Ensure unique slug
    const existing = await prisma.test.findFirst({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const test = await prisma.test.create({
      data: {
        ...parsed.data,
        slug: finalSlug,
        availableFrom: parsed.data.availableFrom ? new Date(parsed.data.availableFrom) : undefined,
        availableUntil: parsed.data.availableUntil ? new Date(parsed.data.availableUntil) : undefined,
      },
    });

    return NextResponse.json(test, { status: 201 });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN')) {
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
  }
}
