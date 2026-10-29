import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ClipboardCheck, Clock, Award, AlertCircle, ArrowLeft,
  CheckCircle2, Play, ChevronRight,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import Badge from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function TestInstructionsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const test = await prisma.test.findUnique({
    where: { id: params.id },
    include: {
      sections: {
        include: {
          _count: { select: { questions: true } },
        },
      },
      attempts: {
        where: { userId: user.id },
        orderBy: { startedAt: 'desc' },
      },
    },
  });

  if (!test || !test.isPublished) {
    notFound();
  }

  const totalQuestions = test.sections.reduce(
    (acc, s) => acc + s._count.questions,
    0
  );

  const completedAttempts = test.attempts.filter((a) => a.status === 'COMPLETED');
  const inProgressAttempt = test.attempts.find((a) => a.status === 'IN_PROGRESS');

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        href="/student/tests"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Tests
      </Link>

      <div className="card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{test.testType.replace(/_/g, ' ')}</Badge>
              {test.negativeMarking && (
                <Badge variant="warning">Negative Marking Enabled</Badge>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
              {test.title}
            </h1>
            {test.description && (
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {test.description}
              </p>
            )}
          </div>
          <div className="shrink-0">
            <Link
              href={`/student/tests/${test.id}/take`}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              {inProgressAttempt ? 'Resume Test' : 'Start Test Now'}
            </Link>
          </div>
        </div>

        {/* Quick specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <span className="text-xs text-gray-400 block mb-1">Duration</span>
            <span className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              {test.durationMinutes} mins
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <span className="text-xs text-gray-400 block mb-1">Total Marks</span>
            <span className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-600" />
              {test.totalMarks}
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <span className="text-xs text-gray-400 block mb-1">Total Questions</span>
            <span className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4 text-brand-600" />
              {totalQuestions}
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <span className="text-xs text-gray-400 block mb-1">Passing Marks</span>
            <span className="text-lg font-bold text-gray-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600" />
              {test.passingMarks || Math.round(test.totalMarks * 0.4)}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brand-600" /> Examination Instructions
          </h2>
          <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside bg-brand-50/50 p-5 rounded-2xl border border-brand-100">
            <li>Ensure you have a stable internet connection before beginning.</li>
            <li>The test timer starts immediately when you click &apos;Start Test Now&apos;.</li>
            <li>Your answers are saved automatically as you navigate between questions.</li>
            <li>You can flag questions for review and return to them anytime before time expires.</li>
            <li>Once submitted, your final score and step-by-step solutions will be generated.</li>
          </ul>
        </div>
      </div>

      {/* Previous attempts */}
      {completedAttempts.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Past Attempts</h3>
          <div className="divide-y divide-gray-100">
            {completedAttempts.map((att, idx) => (
              <div
                key={att.id}
                className="py-3.5 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors"
              >
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    Attempt #{completedAttempts.length - idx}
                  </p>
                  <p className="text-xs text-gray-400">
                    Completed on{' '}
                    {new Date(att.submittedAt || att.startedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-bold text-gray-900">
                      {att.scored !== null ? `${att.scored} / ${test.totalMarks}` : 'Graded'}
                    </span>
                    {att.percentage !== null && (
                      <span className="block text-xs text-emerald-600 font-semibold">
                        {att.percentage.toFixed(1)}%
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/student/results/${att.id}`}
                    className="text-xs text-brand-600 font-medium hover:underline flex items-center"
                  >
                    View Analysis <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
