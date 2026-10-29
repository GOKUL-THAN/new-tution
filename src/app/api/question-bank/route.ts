import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createQuestionSchema = z.object({
  text: z.string().min(1).max(5000),
  type: z.enum(['SINGLE_MCQ', 'MULTI_MCQ', 'NUMERICAL', 'INTEGER', 'TRUE_FALSE', 'MATCH', 'ASSERTION_REASON', 'SHORT_ANSWER', 'LONG_ANSWER']).default('SINGLE_MCQ'),
  boardId: z.string().optional(),
  classId: z.string().optional(),
  subjectId: z.string().optional(),
  chapterId: z.string().optional(),
  topicId: z.string().optional(),
  examCategory: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'VERY_HARD']).default('MEDIUM'),
  marks: z.number().min(0).default(1),
  negativeMarks: z.number().min(0).default(0),
  timeLimitSecs: z.number().int().optional(),
  explanation: z.string().optional(),
  hint: z.string().optional(),
  source: z.string().optional(),
  licence: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  options: z.array(z.object({
    text: z.string().min(1),
    isCorrect: z.boolean().default(false),
    sortOrder: z.number().int().default(0),
  })).optional().default([]),
});

// GET /api/question-bank — list questions with filters
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit = Math.min(50, parseInt(searchParams.get('limit') ?? '20', 10));
    const subjectId = searchParams.get('subjectId') ?? undefined;
    const chapterId = searchParams.get('chapterId') ?? undefined;
    const difficulty = searchParams.get('difficulty') ?? undefined;
    const type = searchParams.get('type') ?? undefined;
    const search = searchParams.get('q') ?? undefined;

    const isPrivileged = ['TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN'].includes(user.role);

    const where = {
      ...(isPrivileged ? {} : { isPublished: true }),
      ...(subjectId ? { subjectId } : {}),
      ...(chapterId ? { chapterId } : {}),
      ...(difficulty ? { difficulty: difficulty as 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD' } : {}),
      ...(type ? { type: type as 'SINGLE_MCQ' | 'MULTI_MCQ' | 'NUMERICAL' | 'INTEGER' | 'TRUE_FALSE' | 'MATCH' | 'ASSERTION_REASON' | 'SHORT_ANSWER' | 'LONG_ANSWER' } : {}),
      ...(search ? { text: { contains: search, mode: 'insensitive' as const } } : {}),
    };

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        select: {
          id: true, text: true, type: true, difficulty: true,
          marks: true, negativeMarks: true, isPublished: true,
          tags: true, createdAt: true,
          subject: { select: { name: true } },
          chapter: { select: { name: true } },
          _count: { select: { options: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.question.count({ where }),
    ]);

    return NextResponse.json({
      questions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

// POST /api/question-bank — create a question (teacher+)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);

    const body = await request.json();
    const parsed = createQuestionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { options, ...questionData } = parsed.data;

    const question = await prisma.question.create({
      data: {
        ...questionData,
        authorId: user.id,
        options: {
          create: options.map((opt, idx) => ({ ...opt, sortOrder: opt.sortOrder || idx })),
        },
      },
      include: { options: { orderBy: { sortOrder: 'asc' } } },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
}
