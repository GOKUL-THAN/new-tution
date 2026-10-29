import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST /api/tests/[id]/attempt — start or resume an attempt
export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth(['STUDENT', 'TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);
    const testId = params.id;

    const test = await prisma.test.findUnique({
      where: { id: testId },
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
                    diagramUrl: true, hint: true,
                    options: {
                      select: { id: true, text: true, sortOrder: true },
                      orderBy: { sortOrder: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!test) return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    if (!test.isPublished) return NextResponse.json({ error: 'Test not available' }, { status: 403 });

    // Check availability window
    const now = new Date();
    if (test.availableFrom && now < test.availableFrom)
      return NextResponse.json({ error: 'Test not yet available' }, { status: 403 });
    if (test.availableUntil && now > test.availableUntil)
      return NextResponse.json({ error: 'Test window has closed' }, { status: 403 });

    // Check for existing in-progress attempt
    const inProgress = await prisma.testAttempt.findFirst({
      where: { testId, userId: user.id, status: 'IN_PROGRESS' },
      include: { responses: true },
    });
    if (inProgress) {
      return NextResponse.json({ attempt: inProgress, test, resumed: true });
    }

    // Check max attempts
    const attemptCount = await prisma.testAttempt.count({
      where: { testId, userId: user.id, status: { in: ['SUBMITTED', 'GRADED'] } },
    });
    if (attemptCount >= test.maxAttempts) {
      return NextResponse.json({ error: `Maximum ${test.maxAttempts} attempt(s) reached` }, { status: 403 });
    }

    // Create new attempt
    const attempt = await prisma.testAttempt.create({
      data: {
        testId,
        userId: user.id,
        totalMarks: test.totalMarks,
        status: 'IN_PROGRESS',
      },
      include: { responses: true },
    });

    return NextResponse.json({ attempt, test, resumed: false }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (err instanceof Error && err.message === 'FORBIDDEN')
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    return NextResponse.json({ error: 'Failed to start attempt' }, { status: 500 });
  }
}

// GET /api/tests/[id]/attempt — get current in-progress attempt for user
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth();
    const attempt = await prisma.testAttempt.findFirst({
      where: { testId: params.id, userId: user.id, status: 'IN_PROGRESS' },
      include: { responses: true },
    });
    if (!attempt) return NextResponse.json({ attempt: null });
    return NextResponse.json({ attempt });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: 'Failed to fetch attempt' }, { status: 500 });
  }
}
