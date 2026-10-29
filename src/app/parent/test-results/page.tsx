import Link from 'next/link';
import { ClipboardCheck } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Test Results — Parent Portal', robots: { index: false } };

export default async function ParentTestResultsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type ResultRow = {
    childName: string;
    attempts: {
      id: string; testTitle: string;
      scored: number | null; totalMarks: number | null;
      percentage: number | null; submittedAt: Date | null;
    }[];
  };

  let results: ResultRow[] = [];

  try {
    const parent = await prisma.parentProfile.findUnique({
      where: { userId: user.id },
      include: {
        children: {
          where: { verified: true },
          include: {
            student: {
              include: {
                user: { select: { id: true, firstName: true, lastName: true } },
              },
            },
          },
        },
      },
    });

    if (parent) {
      for (const link of parent.children) {
        const attempts = await prisma.testAttempt.findMany({
          where: {
            userId: link.student.userId,
            status: { in: ['SUBMITTED', 'GRADED'] },
          },
          select: {
            id: true, scored: true, totalMarks: true,
            percentage: true, submittedAt: true,
            test: { select: { title: true } },
          },
          orderBy: { submittedAt: 'desc' },
          take: 20,
        });
        results.push({
          childName: `${link.student.user.firstName} ${link.student.user.lastName}`,
          attempts: attempts.map((a) => ({
            id: a.id,
            testTitle: a.test.title,
            scored: a.scored,
            totalMarks: a.totalMarks,
            percentage: a.percentage,
            submittedAt: a.submittedAt,
          })),
        });
      }
    }
  } catch { /* DB unavailable */ }

  if (results.length === 0) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Test Results</h1>
        </div>
        <EmptyState
          icon={ClipboardCheck}
          title="No Results Yet"
          description="Test results for your linked children will appear here."
          actionLabel="My Children"
          actionHref="/parent/children"
        />
      </div>
    );
  }

  const pctVariant = (pct: number | null) => {
    if (pct === null) return 'default' as const;
    if (pct >= 75) return 'success' as const;
    if (pct >= 50) return 'warning' as const;
    return 'danger' as const;
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Test Results</h1>
        <p className="text-gray-500 mt-1">Recent test performance for your children</p>
      </div>

      <div className="space-y-8">
        {results.map((child) => (
          <div key={child.childName} className="card overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-display font-semibold text-gray-900">{child.childName}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{child.attempts.length} test{child.attempts.length !== 1 ? 's' : ''} taken</p>
            </div>

            {child.attempts.length === 0 ? (
              <p className="px-5 py-6 text-sm text-gray-400 text-center">No tests taken yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['Test', 'Score', 'Percentage', 'Date'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {child.attempts.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">{a.testTitle}</td>
                        <td className="px-5 py-3 text-gray-700">
                          {a.scored ?? '—'} / {a.totalMarks ?? '—'}
                        </td>
                        <td className="px-5 py-3">
                          <Badge variant={pctVariant(a.percentage)}>
                            {a.percentage !== null ? `${a.percentage.toFixed(1)}%` : '—'}
                          </Badge>
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-500">
                          {a.submittedAt
                            ? new Date(a.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
