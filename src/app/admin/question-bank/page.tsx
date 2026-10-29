import { HelpCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Question Bank — Admin', robots: { index: false } };

export default async function AdminQuestionBankPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let questions: {
    id: string; text: string; type: string; difficulty: string;
    marks: number; isPublished: boolean; isReviewed: boolean;
    subject: { name: string } | null;
    chapter: { name: string } | null;
    author: { firstName: string; lastName: string };
  }[] = [];
  let total = 0;

  try {
    [questions, total] = await Promise.all([
      prisma.question.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: {
          subject: { select: { name: true } },
          chapter: { select: { name: true } },
          author: { select: { firstName: true, lastName: true } },
        },
      }),
      prisma.question.count(),
    ]);
  } catch { /* DB unavailable */ }

  const diffColor = (d: string): 'success' | 'warning' | 'danger' | 'default' =>
    d === 'EASY' ? 'success' : d === 'MEDIUM' ? 'warning' : 'danger';

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Question Bank</h1>
        <p className="text-gray-500 mt-1">{total} question{total !== 1 ? 's' : ''} total</p>
      </div>

      {questions.length === 0 ? (
        <EmptyState icon={HelpCircle} title="No Questions Yet"
          description="Teachers can add questions from the Teacher portal. Admins can also add via the question bank API." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Question', 'Subject / Chapter', 'Type', 'Difficulty', 'Marks', 'Status', 'Author'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-gray-900 line-clamp-2 text-xs leading-relaxed">{q.text}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      <div>{q.subject?.name ?? '—'}</div>
                      {q.chapter && <div className="text-gray-400">{q.chapter.name}</div>}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{q.type.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3">
                      <Badge variant={diffColor(q.difficulty)}>{q.difficulty}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{q.marks}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <Badge variant={q.isPublished ? 'success' : 'default'}>
                          {q.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                        {!q.isReviewed && <Badge variant="warning">Needs Review</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {q.author.firstName} {q.author.lastName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
            Showing {questions.length} of {total} questions
          </p>
        </div>
      )}
    </div>
  );
}
