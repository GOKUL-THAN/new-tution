import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2, XCircle, MinusCircle, Clock,
  ArrowLeft, RotateCcw, Flag, BookOpen,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';

export const metadata = { title: 'Test Result — Global Minds Academy' };

function ScoreRing({ percentage }: { percentage: number }) {
  const color =
    percentage >= 75 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444';
  const label =
    percentage >= 75 ? 'Excellent' : percentage >= 50 ? 'Good' : 'Needs Improvement';
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-32 h-32 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${color} ${percentage * 3.6}deg, #f3f4f6 0deg)`,
        }}
        role="img"
        aria-label={`Score: ${percentage.toFixed(1)}%`}
      >
        <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
          <span className="text-2xl font-display font-bold text-gray-900">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export default async function ResultDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

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
                    include: {
                      options: { orderBy: { sortOrder: 'asc' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  }).catch(() => null);

  if (!attempt) notFound();

  // Security: only owner or admin can view
  const isAdmin = ['TEACHER', 'ACADEMIC_ADMIN', 'SUPER_ADMIN'].includes(user.role);
  if (attempt.userId !== user.id && !isAdmin) redirect('/student/results');

  // Still in progress — redirect back to test
  if (attempt.status === 'IN_PROGRESS') {
    redirect(`/student/tests/${attempt.testId}/take`);
  }

  const responseMap = new Map(attempt.responses.map((r) => [r.questionNum, r]));
  const allTestQuestions = attempt.test.sections.flatMap((s) => s.questions);

  const timeStr = attempt.timeSpentSec
    ? `${Math.floor(attempt.timeSpentSec / 60)}m ${attempt.timeSpentSec % 60}s`
    : '—';

  const correctCount = attempt.responses.filter((r) => r.isCorrect).length;
  const incorrectCount = attempt.responses.filter(
    (r) => r.isCorrect === false && (r.selectedIds.length > 0 || (r.answer ?? '').trim()),
  ).length;
  const skippedCount = allTestQuestions.length - attempt.responses.filter(
    (r) => r.selectedIds.length > 0 || (r.answer ?? '').trim(),
  ).length;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
      {/* Back */}
      <Link href="/student/results" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Results
      </Link>

      {/* Score summary */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ScoreRing percentage={attempt.percentage ?? 0} />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-display font-bold text-gray-900 mb-1">
              {attempt.test.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Submitted {attempt.submittedAt
                ? new Date(attempt.submittedAt).toLocaleString('en-IN', {
                    dateStyle: 'medium', timeStyle: 'short',
                  })
                : '—'}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {[
                { label: 'Score', value: `${attempt.scored ?? 0} / ${attempt.totalMarks ?? 0}`, color: 'text-brand-600' },
                { label: 'Correct', value: correctCount, color: 'text-emerald-600' },
                { label: 'Incorrect', value: incorrectCount, color: 'text-danger-500' },
                { label: 'Skipped', value: skippedCount, color: 'text-gray-500' },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500 justify-center sm:justify-start">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Time: {timeStr}
              </span>
              <span>{allTestQuestions.length} Questions</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
          <Link href={`/student/tests/${attempt.testId}/take`} className="btn-secondary btn-sm inline-flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" /> Retake Test
          </Link>
          <Link href="/student/tests" className="btn-ghost btn-sm inline-flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" /> All Tests
          </Link>
        </div>
      </div>

      {/* Section-wise breakdown */}
      {attempt.test.sections.length > 1 && (
        <div className="card p-5 mb-6">
          <h2 className="font-display font-semibold text-gray-900 mb-4">Section Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Section', 'Questions', 'Correct', 'Score'].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attempt.test.sections.map((sec) => {
                  const nums = sec.questions.map((tq) => tq.number);
                  const secResponses = attempt.responses.filter((r) => nums.includes(r.questionNum));
                  const secCorrect = secResponses.filter((r) => r.isCorrect).length;
                  const secScore = secResponses.reduce((s, r) => s + (r.marksAwarded ?? 0), 0);
                  return (
                    <tr key={sec.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                      <td className="px-3 py-2 font-medium text-gray-900">{sec.title}</td>
                      <td className="px-3 py-2 text-gray-600">{sec.questions.length}</td>
                      <td className="px-3 py-2 text-emerald-600 font-semibold">{secCorrect}</td>
                      <td className="px-3 py-2 text-brand-600 font-semibold">{secScore.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Question-by-question review */}
      <div>
        <h2 className="font-display font-bold text-gray-900 text-lg mb-4">Question Review</h2>
        <div className="space-y-4">
          {allTestQuestions.map((tq) => {
            const response = responseMap.get(tq.number);
            const q = tq.question;
            const isCorrect = response?.isCorrect;
            const isSkipped = !response || (response.selectedIds.length === 0 && !(response.answer ?? '').trim());
            const isFlagged = response?.flagged ?? false;

            const borderColor = isSkipped
              ? 'border-gray-200'
              : isCorrect
              ? 'border-emerald-300'
              : 'border-danger-300';

            const headerColor = isSkipped
              ? 'bg-gray-50'
              : isCorrect
              ? 'bg-emerald-50'
              : 'bg-danger-50';

            const StatusIcon = isSkipped
              ? MinusCircle
              : isCorrect
              ? CheckCircle2
              : XCircle;

            const iconColor = isSkipped
              ? 'text-gray-400'
              : isCorrect
              ? 'text-emerald-500'
              : 'text-danger-500';

            return (
              <div key={tq.number} className={`rounded-2xl border-2 overflow-hidden ${borderColor}`}>
                {/* Question header bar */}
                <div className={`flex items-center justify-between px-4 py-3 ${headerColor}`}>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-5 h-5 ${iconColor}`} />
                    <span className="text-sm font-semibold text-gray-700">Q{tq.number}</span>
                    {isFlagged && (
                      <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                        <Flag className="w-3 h-3" /> Flagged
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isSkipped ? '0' : (response?.marksAwarded ?? 0).toFixed(1)} / {q.marks} marks
                  </div>
                </div>

                <div className="p-4">
                  {/* Question text */}
                  <p className="text-sm text-gray-900 font-medium mb-4 whitespace-pre-wrap">{q.text}</p>

                  {/* MCQ options */}
                  {q.options.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt) => {
                        const wasSelected =
                          response?.selectedIds.includes(opt.id) ||
                          response?.answer === opt.text;
                        const isCorrectOpt = opt.isCorrect;

                        return (
                          <div
                            key={opt.id}
                            className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm ${
                              isCorrectOpt
                                ? 'bg-emerald-50 border border-emerald-200'
                                : wasSelected && !isCorrectOpt
                                ? 'bg-danger-50 border border-danger-200'
                                : 'bg-gray-50 border border-gray-100'
                            }`}
                          >
                            <span className="flex-shrink-0 mt-0.5">
                              {isCorrectOpt ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : wasSelected ? (
                                <XCircle className="w-4 h-4 text-danger-400" />
                              ) : (
                                <span className="w-4 h-4 block" />
                              )}
                            </span>
                            <span className={isCorrectOpt ? 'text-emerald-800 font-medium' : 'text-gray-700'}>
                              {opt.text}
                            </span>
                            {wasSelected && !isCorrectOpt && (
                              <span className="ml-auto text-xs text-danger-500 font-medium shrink-0">Your answer</span>
                            )}
                            {isCorrectOpt && wasSelected && (
                              <span className="ml-auto text-xs text-emerald-600 font-medium shrink-0">✓ Correct</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Numerical answer */}
                  {['NUMERICAL', 'INTEGER'].includes(q.type) && (
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Your answer: </span>
                        <span className="font-mono font-semibold text-gray-900">
                          {response?.answer || <span className="text-gray-400">Not answered</span>}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Correct: </span>
                        <span className="font-mono font-semibold text-emerald-700">
                          {q.options.filter((o) => o.isCorrect).map((o) => (o as {id:string;isCorrect:boolean;text?:string}).text ?? '').join(', ') || '—'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Text answer */}
                  {['SHORT_ANSWER', 'LONG_ANSWER'].includes(q.type) && response?.answer && (
                    <div className="mb-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      <span className="font-medium text-gray-500 block mb-1">Your answer:</span>
                      {response.answer}
                    </div>
                  )}

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="bg-brand-50 border border-brand-100 rounded-xl p-3">
                      <p className="text-xs font-semibold text-brand-600 mb-1">Explanation</p>
                      <p className="text-sm text-gray-700">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
