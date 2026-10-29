import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const autosaveSchema = z.object({
  questionNum: z.number().int().min(1),
  answer: z.string().optional().nullable(),
  selectedIds: z.array(z.string()).optional().default([]),
  flagged: z.boolean().optional().default(false),
});

// GET /api/attempts/[id] — get attempt with responses (owner only)
// After test submission returns full result with correct answers and explanations
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();

    const attempt = await prisma.testAttempt.findUnique({
      where: { id: params.id },
      include: {
        responses: { orderBy: { questionNum: 'asc' } },
        test: {
          include: {
            sections: {
              orderBy: { number: 'asc' },
              include: {
                questions: {
                  orderBy: { number: 'asc' },
                  include: {
                    question: {
                      select: {
                        id: true, text: true, type: true,
                        marks: true, negativeMarks: true,
                        explanation: true, diagramUrl: true,
                        options: {
                          select: { id: true, text: true, sortOrder: true, isCorrect: true },
                          orderBy: { sortOrder: 'asc' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!attempt) return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });

    // Only owner can view
    if (attempt.userId !== user.id) {
      const isAdmin = ['TEACHER', 'ACADEMIC_ADMIN', 'SUPER_ADMIN'].includes(user.role);
      if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Hide correct answers if attempt is still IN_PROGRESS
    if (attempt.status === 'IN_PROGRESS') {
      const safe = {
        ...attempt,
        test: {
          ...attempt.test,
          sections: attempt.test.sections.map((s) => ({
            ...s,
            questions: s.questions.map((tq) => ({
              ...tq,
              question: {
                ...tq.question,
                options: tq.question.options.map(({ isCorrect: _ic, ...opt }) => opt),
                explanation: undefined,
              },
            })),
          })),
        },
      };
      return NextResponse.json(safe);
    }

    return NextResponse.json(attempt);
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Failed to fetch attempt' }, { status: 500 });
  }
}

// PATCH /api/attempts/[id] — autosave a single question response
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();

    const attempt = await prisma.testAttempt.findUnique({
      where: { id: params.id },
      select: { id: true, userId: true, status: true },
    });
    if (!attempt) return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });
    if (attempt.userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (attempt.status !== 'IN_PROGRESS')
      return NextResponse.json({ error: 'Attempt already submitted' }, { status: 400 });

    const body = await request.json();
    const parsed = autosaveSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });

    const { questionNum, answer, selectedIds, flagged } = parsed.data;

    await prisma.attemptResponse.upsert({
      where: { attemptId_questionNum: { attemptId: params.id, questionNum } },
      create: {
        attemptId: params.id,
        questionNum,
        answer: answer ?? null,
        selectedIds: selectedIds ?? [],
        flagged: flagged ?? false,
      },
      update: {
        answer: answer ?? null,
        selectedIds: selectedIds ?? [],
        flagged: flagged ?? false,
      },
    });

    return NextResponse.json({ saved: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Failed to save response' }, { status: 500 });
  }
}
