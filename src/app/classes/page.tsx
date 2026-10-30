import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import {
  getBoardClasses,
  getBoardCurriculum,
  getClassesForSubject,
  getSubjectLabel,
} from '@/lib/curriculum';

export const metadata: Metadata = {
  title: 'Classes 6–12',
  description:
    'Browse all classes from 6 to 12. Find course content, subjects, and study material for CBSE, ICSE, and Tamil Nadu State Board students.',
};

const classGroups = [
  {
    label: 'Middle School',
    range: 'Classes 6–8',
    color: 'from-blue-400 to-indigo-500',
    classes: [6, 7, 8],
    description: 'Expand conceptual understanding across core subjects with structured learning.',
  },
  {
    label: 'Secondary',
    range: 'Classes 9–10',
    color: 'from-violet-500 to-purple-600',
    classes: [9, 10],
    description: 'Focused board exam preparation with thorough chapter-wise coverage.',
  },
  {
    label: 'Senior Secondary',
    range: 'Classes 11–12',
    color: 'from-rose-500 to-orange-500',
    classes: [11, 12],
    description: 'Stream-specific learning alongside competitive entrance exam preparation.',
  },
];

interface PageProps {
  searchParams: Promise<{ board?: string; subject?: string }>;
}

export default async function ClassesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const boardKey = getBoardCurriculum(params.board) ? params.board : undefined;
  const selectedSubject = params.subject;

  const allowedClasses = boardKey ? getBoardClasses(boardKey) : [6, 7, 8, 9, 10, 11, 12];
  const classFilterFn = (num: number) => allowedClasses.includes(num);

  const filteredGroups = classGroups
    .map((group) => ({
      ...group,
      classes: group.classes.filter(classFilterFn),
    }))
    .filter((group) => group.classes.length > 0);

  const boardLabel = boardKey ? getBoardCurriculum(boardKey)?.name : 'All Boards';

  const selectedSubjectClasses = selectedSubject
    ? getClassesForSubject(selectedSubject, boardKey)
    : undefined;

  const visibleGroups = selectedSubjectClasses
    ? filteredGroups.map((group) => ({
        ...group,
        classes: group.classes.filter((num) => selectedSubjectClasses.includes(num)),
      })).filter((group) => group.classes.length > 0)
    : filteredGroups;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-4 shadow-xs">
              Structured Grade Pathways
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              {selectedSubject ? `${getSubjectLabel(selectedSubject)} Classes` : <span>Classes <span className="text-blue-600">6–12</span></span>}
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              {boardKey
                ? `Focused learning for ${boardLabel} ${selectedSubject ? `— ${getSubjectLabel(selectedSubject)}` : ''}.`
                : 'Grade-wise learning across all boards — pick your class to explore subjects and courses.'}
            </p>
            {(boardKey || selectedSubject) && (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {boardKey && (
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-sm border border-slate-200 font-medium shadow-xs">
                    {boardLabel}
                  </span>
                )}
                {selectedSubject && (
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-700 text-sm border border-slate-200 font-medium shadow-xs">
                    {getSubjectLabel(selectedSubject)}
                  </span>
                )}
                {(boardKey || selectedSubject) && (
                  <Link href="/classes" className="px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-[#145346] shadow-xs transition-colors">
                    Clear filters
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide space-y-12">
            {visibleGroups.length === 0 ? (
              <div className="card p-8 text-center text-gray-600">
                No classes are available for this board and subject combination.
              </div>
            ) : (
              visibleGroups.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-lg`}
                    >
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold text-gray-900">{group.label}</h2>
                      <p className="text-sm text-gray-500">{group.range}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-5 text-sm max-w-2xl">{group.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {group.classes.map((num) => {
                      const query = new URLSearchParams();
                      if (boardKey) query.set('board', boardKey);
                      if (selectedSubject) query.set('subject', selectedSubject);

                      return (
                        <Link
                          key={num}
                          href={{ pathname: `/classes/class-${num}`, query: Object.fromEntries(query.entries()) }}
                          className="card-hover p-6 text-center group"
                        >
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mx-auto mb-3 shadow-md`}
                          >
                            <span className="text-white font-bold font-display text-lg">{num}</span>
                          </div>
                          <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-sm">
                            Class {num}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
