import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST /api/attempts/[id]/submit — server-side scoring
export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();

    const attempt = await prisma.testAttempt.findUnique({
      where: { id: params.id },
      include: {
        responses: true,
        test: {
          include: {
            sections: {
              include: {
                questions: {
                  orderBy: { number: 'asc' },
                  include: {
                    question: {
                      select: {
                        id: true, type: true, marks: true, negativeMarks: true,
                        options: { select: { id: true, isCorrect: true } },
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
    if (attempt.userId !== user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (attempt.status !== 'IN_PROGRESS')
      return NextResponse.json({ error: 'Attempt already submitted' }, { status: 400 });

    // Flatten all questions with their number in the test
    const allTestQuestions = attempt.test.sections.flatMap((s) => s.questions);

    // Build a map: questionNum → response
    const responseMap = new Map(attempt.responses.map((r) => [r.questionNum, r]));

    let totalScored = 0;
    const responseUpdates: Promise<unknown>[] = [];

    for (const tq of allTestQuestions) {
      const response = responseMap.get(tq.number);
      const q = tq.question;
      const questionMarks = tq.marks ?? q.marks;
      const questionNegMarks = tq.negMarks ?? q.negativeMarks;

      let isCorrect = false;
      let marksAwarded = 0;

      if (response) {
        const correctOptionIds = q.options.filter((o) => o.isCorrect).map((o) => o.id);
        const correctOptionSet = new Set<string>(correctOptionIds);

        if (q.type === 'SINGLE_MCQ' || q.type === 'TRUE_FALSE') {
          const selected = response.selectedIds[0];
          isCorrect = selected !== undefined && correctOptionSet.has(selected);
          if (isCorrect) {
            marksAwarded = questionMarks;
          } else if (selected !== undefined) {
            marksAwarded = -questionNegMarks;
          }
        } else if (q.type === 'MULTI_MCQ') {
          const selectedArr = response.selectedIds;
          const isExactMatch =
            selectedArr.length === correctOptionSet.size &&
            selectedArr.every((id) => correctOptionSet.has(id));
          isCorrect = isExactMatch;
          if (isCorrect) {
            marksAwarded = questionMarks;
          } else if (selectedArr.length > 0) {
            marksAwarded = -questionNegMarks;
          }
        } else if (q.type === 'NUMERICAL' || q.type === 'INTEGER') {
          const correctValues = (q.options as { id: string; isCorrect: boolean; text: string }[])
            .filter((o) => o.isCorrect)
            .map((o) => o.text);
          isCorrect =
            response.answer !== null &&
            response.answer !== undefined &&
            correctValues.includes(response.answer.trim());
          if (isCorrect) {
            marksAwarded = questionMarks;
          } else if (response.answer) {
            marksAwarded = -questionNegMarks;
          }
        } else {
          // SHORT_ANSWER, LONG_ANSWER, MATCH, ASSERTION_REASON — not auto-scored
          marksAwarded = 0;
        }

        totalScored += marksAwarded;

        responseUpdates.push(
          prisma.attemptResponse.update({
            where: { attemptId_questionNum: { attemptId: params.id, questionNum: tq.number } },
            data: { isCorrect, marksAwarded },
          })
        );
      }
    }

    // Clamp score to 0 minimum (can't go below 0 overall)
    const finalScore = Math.max(0, totalScored);
    const totalMarks = attempt.test.totalMarks;
    const percentage = totalMarks > 0 ? Math.round((finalScore / totalMarks) * 1000) / 10 : 0;

    const submittedAt = new Date();
    const timeSpentSec = Math.floor(
      (submittedAt.getTime() - attempt.startedAt.getTime()) / 1000
    );

    // Flush all autosave updates first, then mark submitted
    await Promise.all(responseUpdates);
    await prisma.testAttempt.update({
      where: { id: params.id },
      data: {
        status: 'SUBMITTED',
        submittedAt,
        timeSpentSec,
        scored: finalScore,
        percentage,
        totalMarks,
      },
    });

    return NextResponse.json({
      attemptId: params.id,
      scored: finalScore,
      totalMarks,
      percentage,
      timeSpentSec,
    });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    console.error('Submit error:', err);
    return NextResponse.json({ error: 'Failed to submit attempt' }, { status: 500 });
  }
}
