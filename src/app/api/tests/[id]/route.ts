import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/tests/[id] — test detail with questions (no answers exposed)
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const isPrivileged = ['TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN'].includes(
      user.role
    );

    const test = await prisma.test.findUnique({
      where: { id: params.id },
      include: {
        sections: {
          orderBy: { number: 'asc' },
          include: {
            questions: {
              orderBy: { number: 'asc' },
              include: {
                question: {
                  select: {
                    id: true,
                    text: true,
                    type: true,
                    difficulty: true,
                    marks: true,
                    negativeMarks: true,
                    diagramUrl: true,
                    hint: true,
                    // Only expose correct answer to privileged users BEFORE test, or after release
                    ...(isPrivileged
                      ? { explanation: true }
                      : {}),
                    options: {
                      select: {
                        id: true,
                        text: true,
                        sortOrder: true,
                        // Never expose isCorrect to students during test
                      },
                      orderBy: { sortOrder: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
        _count: { select: { attempts: true } },
      },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    if (!test.isPublished && !isPrivileged) {
      return NextResponse.json({ error: 'Test not available' }, { status: 403 });
    }

    // Check availability window
    const now = new Date();
    if (!isPrivileged) {
      if (test.availableFrom && now < test.availableFrom) {
        return NextResponse.json({ error: 'Test is not yet available' }, { status: 403 });
      }
      if (test.availableUntil && now > test.availableUntil) {
        return NextResponse.json({ error: 'Test window has closed' }, { status: 403 });
      }
    }

    return NextResponse.json(test);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch test' }, { status: 500 });
  }
}
