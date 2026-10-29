import Link from 'next/link';
import { ClipboardCheck, Clock, Award } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = {
  title: 'Tests | Student Portal — Global Minds Academy',
};

export default async function StudentTestsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type TestRow = {
    id: string;
    title: string;
    slug: string;
    durationMinutes: number;
    totalMarks: number;
    testType: string;
    _count: { attempts: number };
  };

  let tests: TestRow[] = [];
  let userAttemptCounts: Record<string, number> = {};

  try {
    tests = await prisma.test.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        durationMinutes: true,
        totalMarks: true,
        testType: true,
        _count: { select: { attempts: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const attemptRows = await prisma.testAttempt.groupBy({
      by: ['testId'],
      where: { userId: user.id },
      _count: { _all: true },
    });

    userAttemptCounts = Object.fromEntries(
      attemptRows.map((r) => [r.testId, r._count._all]),
    );
  } catch {
    // DB unavailable
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Tests &amp; Mock Exams</h1>
        <p className="text-gray-500 mt-1">Practice with chapter tests, unit tests, and full mock exams.</p>
      </div>

      {tests.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title="No Tests Available"
          description="There are no published tests at the moment. Check back soon — new tests are added regularly."
        />
      ) : (
        <div className="space-y-4">
          {tests.map((test) => {
            const attempted = userAttemptCounts[test.id] ?? 0;
            return (
              <div key={test.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck className="w-5 h-5 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-gray-900">{test.title}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" /> {test.durationMinutes} min
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Award className="w-3 h-3" /> {test.totalMarks} marks
                        </span>
                        <Badge variant="default">{test.testType.replace(/_/g, ' ')}</Badge>
                      </div>
                    </div>
                  </div>
                  {attempted > 0 && (
                    <p className="text-xs text-brand-600 font-medium pl-13 ml-13">
                      Attempted {attempted} time{attempted !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/student/tests/${test.id}/take`}
                    className="btn-primary btn-sm"
                  >
                    {attempted > 0 ? 'Retake' : 'Start Test'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
