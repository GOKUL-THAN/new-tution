import { BookOpen, ChevronRight } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Curriculum — Admin', robots: { index: false } };

export default async function AdminCurriculumPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let boards: {
    id: string; name: string; shortName: string;
    subjects: {
      subject: {
        id: string; name: string;
        chapters: { id: string; name: string; number: number; _count: { topics: number } }[];
      };
    }[];
  }[] = [];

  try {
    boards = await prisma.board.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        subjects: {
          include: {
            subject: {
              include: {
                chapters: {
                  orderBy: { number: 'asc' },
                  include: { _count: { select: { topics: true } } },
                  take: 20,
                },
              },
            },
          },
          take: 15,
        },
      },
    });
  } catch { /* DB unavailable */ }

  if (boards.length === 0) {
    return (
      <div className="max-w-5xl">
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-8">Curriculum</h1>
        <EmptyState icon={BookOpen} title="No Curriculum Data"
          description="Run npm run db:seed to populate boards, subjects, and chapters." />
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Curriculum</h1>
        <p className="text-gray-500 mt-1">Board → Subject → Chapter hierarchy</p>
      </div>

      <div className="space-y-6">
        {boards.map((board) => (
          <div key={board.id} className="card overflow-hidden">
            {/* Board header */}
            <div className="bg-brand-600 px-5 py-3 flex items-center gap-2">
              <span className="font-display font-bold text-white">{board.name}</span>
              <span className="text-brand-200 text-sm">({board.shortName})</span>
              <span className="ml-auto text-brand-200 text-xs">{board.subjects.length} subjects</span>
            </div>

            {board.subjects.length === 0 ? (
              <p className="px-5 py-4 text-sm text-gray-400">No subjects mapped to this board.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {board.subjects.map(({ subject }) => (
                  <details key={subject.id} className="group">
                    <summary className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      <span className="font-medium text-gray-900">{subject.name}</span>
                      <span className="ml-auto text-xs text-gray-400">{subject.chapters.length} chapter{subject.chapters.length !== 1 ? 's' : ''}</span>
                    </summary>

                    {subject.chapters.length > 0 && (
                      <div className="bg-gray-50/50 px-5 pb-3">
                        <div className="ml-7 space-y-1 pt-2">
                          {subject.chapters.map((ch) => (
                            <div key={ch.id} className="flex items-center gap-3 text-sm py-1.5 border-b border-gray-100 last:border-0">
                              <span className="w-6 h-6 rounded bg-gray-200 text-gray-600 text-xs font-semibold flex items-center justify-center flex-shrink-0">
                                {ch.number}
                              </span>
                              <span className="text-gray-700 flex-1">{ch.name}</span>
                              <span className="text-xs text-gray-400">{ch._count.topics} topic{ch._count.topics !== 1 ? 's' : ''}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </details>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
