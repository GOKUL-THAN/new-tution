import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = {
  title: 'Results | Student Portal — Global Minds Academy',
};

export default async function StudentResultsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type AttemptRow = {
    id: string;
    status: string;
    scored: number | null;
    totalMarks: number | null;
    percentage: number | null;
    submittedAt: Date | null;
    test: { id: string; title: string };
  };

  let attempts: AttemptRow[] = [];

  try {
    attempts = await prisma.testAttempt.findMany({
      where: {
        userId: user.id,
        status: { in: ['SUBMITTED', 'GRADED'] },
      },
      select: {
        id: true,
        status: true,
        scored: true,
        totalMarks: true,
        percentage: true,
        submittedAt: true,
        test: { select: { id: true, title: true } },
      },
      orderBy: { submittedAt: 'desc' },
    });
  } catch {
    // DB unavailable
  }

  const percentBadge = (pct: number | null) => {
    if (pct === null) return 'default' as const;
    if (pct >= 75) return 'success' as const;
    if (pct >= 50) return 'warning' as const;
    return 'danger' as const;
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Test Results</h1>
        <p className="text-gray-500 mt-1">Review your submitted and graded tests.</p>
      </div>

      {attempts.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title="No Results Yet"
          description="Complete a test to see your results here."
          actionLabel="Browse Tests"
          actionHref="/student/tests"
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Test', 'Score', 'Total', 'Percentage', 'Date', ''].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {attempts.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-xs truncate">
                      {a.test.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {a.scored ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {a.totalMarks ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={percentBadge(a.percentage)}>
                        {a.percentage !== null ? `${a.percentage.toFixed(1)}%` : '—'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {a.submittedAt
                        ? new Date(a.submittedAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/student/results/${a.id}`}
                        className="text-xs text-brand-600 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
