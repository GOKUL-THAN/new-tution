import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await requireAuth(['STUDENT']);

    const attempts = await prisma.testAttempt.findMany({
      where: {
        userId: user.id,
        status: { in: ['SUBMITTED', 'GRADED'] },
      },
      select: {
        id: true,
        scored: true,
        totalMarks: true,
        percentage: true,
        submittedAt: true,
        test: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { submittedAt: 'asc' },
    });

    // Build timeline
    const timeline = attempts
      .filter((a) => a.submittedAt !== null)
      .map((a) => ({
        date: new Date(a.submittedAt!).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
        }),
        percentage: a.percentage ?? 0,
        scored: a.scored ?? 0,
        totalMarks: a.totalMarks ?? 0,
      }));

    // Build subject aggregation — derive from test title as proxy when no direct subject
    type SubjectAgg = { total: number; count: number };
    const subjectMap: Record<string, SubjectAgg> = {};

    for (const a of attempts) {
      // Use test title's first word as subject label (best effort without join)
      const subjectName = a.test.title.split(' ')[0] || 'General';
      if (!subjectMap[subjectName]) subjectMap[subjectName] = { total: 0, count: 0 };
      subjectMap[subjectName].total += a.percentage ?? 0;
      subjectMap[subjectName].count += 1;
    }

    const bySubject = Object.entries(subjectMap).map(([subject, { total, count }]) => ({
      subject,
      avgScore: count > 0 ? Math.round((total / count) * 10) / 10 : 0,
      attempts: count,
    }));

    return NextResponse.json({ timeline, bySubject });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (err instanceof Error && err.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.json({ timeline: [], bySubject: [] });
  }
}
