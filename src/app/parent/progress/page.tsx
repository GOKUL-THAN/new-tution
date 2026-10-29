import Link from 'next/link';
import { TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Progress — Parent Portal', robots: { index: false } };

export default async function ParentProgressPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type ChildProgress = {
    childName: string;
    enrolments: { courseTitle: string; progress: number; status: string }[];
    testAvg: number | null;
    testCount: number;
  };

  let childrenProgress: ChildProgress[] = [];

  try {
    const parent = await prisma.parentProfile.findUnique({
      where: { userId: user.id },
      include: {
        children: {
          where: { verified: true },
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
      },
    });

    if (parent) {
      for (const link of parent.children) {
        const studentUserId = link.student.userId;

        const [enrolments, attempts] = await Promise.all([
          prisma.enrolment.findMany({
            where: { userId: studentUserId },
            select: {
              progress: true, status: true,
              course: { select: { title: true } },
            },
            take: 10,
          }),
          prisma.testAttempt.findMany({
            where: { userId: studentUserId, status: { in: ['SUBMITTED', 'GRADED'] } },
            select: { percentage: true },
            take: 20,
          }),
        ]);

        const testAvg = attempts.length > 0
          ? Math.round(attempts.reduce((s, a) => s + (a.percentage ?? 0), 0) / attempts.length * 10) / 10
          : null;

        childrenProgress.push({
          childName: `${link.student.user.firstName} ${link.student.user.lastName}`,
          enrolments: enrolments.map((e) => ({
            courseTitle: e.course.title,
            progress: e.progress,
            status: e.status,
          })),
          testAvg,
          testCount: attempts.length,
        });
      }
    }
  } catch { /* DB unavailable */ }

  if (childrenProgress.length === 0) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Progress</h1>
        </div>
        <EmptyState
          icon={TrendingUp}
          title="No Linked Children"
          description="Link your children's accounts to view their academic progress."
          actionLabel="View Children"
          actionHref="/parent/children"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Academic Progress</h1>
        <p className="text-gray-500 mt-1">Course completion and test performance</p>
      </div>

      <div className="space-y-8">
        {childrenProgress.map((child) => (
          <div key={child.childName} className="card p-6">
            <h2 className="font-display font-semibold text-gray-900 text-lg mb-5">{child.childName}</h2>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-brand-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-brand-600">{child.enrolments.length}</p>
                <p className="text-xs text-gray-500 mt-1">Enrolled Courses</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">{child.testCount}</p>
                <p className="text-xs text-gray-500 mt-1">Tests Taken</p>
              </div>
              <div className="bg-violet-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-violet-600">
                  {child.testAvg !== null ? `${child.testAvg}%` : '—'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Avg Test Score</p>
              </div>
            </div>

            {/* Course progress */}
            {child.enrolments.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Course Progress</h3>
                <div className="space-y-3">
                  {child.enrolments.map((e, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700 font-medium truncate mr-4">{e.courseTitle}</span>
                        <span className="text-gray-500 whitespace-nowrap">{Math.round(e.progress)}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-500 rounded-full transition-all"
                          style={{ width: `${e.progress}%` }}
                          role="progressbar"
                          aria-valuenow={Math.round(e.progress)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 rounded-xl p-4">
                <BookOpen className="w-4 h-4" />
                <span>No courses enrolled yet</span>
                <Link href="/courses" className="ml-auto text-brand-600 hover:underline inline-flex items-center gap-1">
                  Browse Courses <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
