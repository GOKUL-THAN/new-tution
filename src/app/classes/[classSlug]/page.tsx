import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardCurriculum,
  getSubjectLabel,
  getSubjectsForBoardClass,
  getSubjectsForClass,
} from '@/lib/curriculum';
import { getAllEducationBoards } from '@/data/education';

interface PageProps {
  params: Promise<{ classSlug: string }>;
  searchParams: Promise<{ board?: string; subject?: string }>;
}

function parseClassNumber(slug: string): number | null {
  const match = slug.match(/^class-(\d+)$/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num < 1 || num > 12) return null;
  return num;
}

function getClassGroup(num: number): string {
  if (num <= 5) return 'Primary (1–5)';
  if (num <= 8) return 'Middle School (6–8)';
  if (num <= 10) return 'Secondary (9–10)';
  return 'Senior Secondary (11–12)';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { classSlug } = await params;
  const classNum = parseClassNumber(classSlug);

  if (!classNum) {
    return { title: 'Class Not Found' };
  }

  return {
    title: `Class ${classNum} — CBSE, ICSE, TN State Board & Matriculation Curriculum`,
    description: `Browse Class ${classNum} courses, subjects, and study material across CBSE, ICSE, Tamil Nadu State Board, and Tamil Nadu Matriculation at Global Minds Academy.`,
  };
}

export default async function ClassDetailPage({ params, searchParams }: PageProps) {
  const { classSlug } = await params;
  const { board, subject } = await searchParams;
  const classNum = parseClassNumber(classSlug);

  if (!classNum) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen bg-[#FBFDFD]">
          <div className="container-wide">
            <EmptyState
              icon={GraduationCap}
              title="Class Not Found"
              description="The class you are looking for does not exist. Please choose a class from 1 to 12."
              actionLabel="View All Classes"
              actionHref="/classes"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const group = getClassGroup(classNum);
  const selectedBoard = getBoardCurriculum(board) ? board : undefined;
  const allSubjects = selectedBoard
    ? getSubjectsForBoardClass(selectedBoard, classNum)
    : getSubjectsForClass(classNum);
  const selectedSubjectSlug = subject ?? undefined;
  const subjects = selectedSubjectSlug
    ? allSubjects.filter((item) => item === selectedSubjectSlug)
    : allSubjects;

  const prevClass = classNum > 1 ? classNum - 1 : null;
  const nextClass = classNum < 12 ? classNum + 1 : null;
  const classQuery = new URLSearchParams();
  if (selectedBoard) classQuery.set('board', selectedBoard);
  if (selectedSubjectSlug) classQuery.set('subject', selectedSubjectSlug);
  const classListHref = classQuery.toString() ? `/classes?${classQuery.toString()}` : '/classes';

  const educationBoards = getAllEducationBoards();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FBFDFD]">
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-16 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href={classListHref} className="inline-flex items-center gap-1 text-slate-500 text-sm mb-6 hover:text-slate-900 font-medium transition-colors">
                ← All Classes
              </Link>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold mb-4 shadow-xs">
                <GraduationCap className="w-4 h-4 text-accent-500" />
                {group}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
                Class {classNum} <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">Education System</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed font-medium">
                {selectedBoard && selectedSubjectSlug
                  ? `Explore ${getSubjectLabel(selectedSubjectSlug)} learning for Class ${classNum} in ${getBoardCurriculum(selectedBoard)?.name}.`
                  : `Select your education board below to explore dedicated, board-specific Class ${classNum} curricula, syllabus, chapters, and assessments.`}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={{ pathname: `/courses`, query: { class: String(classNum), ...(selectedBoard ? { board: selectedBoard } : {}), ...(selectedSubjectSlug ? { subject: selectedSubjectSlug } : {}) } }}
                  className="inline-flex items-center gap-2 bg-brand-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-700 shadow-md transition-colors"
                >
                  Browse Class {classNum} Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Board Selection Cards for this Class */}
        {classNum >= 6 && classNum <= 12 && (
          <section className="py-12 bg-white border-b border-slate-200/80">
            <div className="container-wide">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Dedicated Curriculum</span>
                <h2 className="text-2xl font-display font-black text-slate-900 mt-1">
                  Choose Board for Class {classNum}
                </h2>
                <p className="text-sm text-slate-600">
                  Each board follows its own syllabus, textbooks, and examination pattern with zero cross-mixing.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {educationBoards.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/boards/${b.slug}/class-${classNum}`}
                    className="card p-5 rounded-2xl border-2 border-slate-200 hover:border-brand-500 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                          {b.badge}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-700 transition-colors">
                        {b.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">{b.fullName}</p>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {b.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-brand-600 group-hover:text-brand-700">
                      <span>Explore Class {classNum}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container-wide">
            {(selectedBoard || selectedSubjectSlug) && (
              <div className="mb-8 flex flex-wrap gap-3">
                {selectedBoard && (
                  <span className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 text-sm font-semibold">
                    {getBoardCurriculum(selectedBoard)?.name}
                  </span>
                )}
                {selectedSubjectSlug && (
                  <span className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 text-sm font-semibold">
                    {getSubjectLabel(selectedSubjectSlug)}
                  </span>
                )}
              </div>
            )}
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
              {selectedSubjectSlug ? `${getSubjectLabel(selectedSubjectSlug)} for Class ${classNum}` : `All Subjects for Class ${classNum}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {subjects.map((subj) => {
                const targetHref = selectedBoard
                  ? `/boards/${selectedBoard}/class-${classNum}/${subj}`
                  : `/subjects/${subj}?class=${classNum}`;

                return (
                  <Link
                    key={subj}
                    href={targetHref}
                    className="card-hover p-5 flex items-center gap-3 group rounded-2xl border border-slate-200 bg-white"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                      <BookOpen className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
                      {getSubjectLabel(subj)}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Navigation between classes */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              {prevClass ? (
                <Link
                  href={classQuery.toString() ? `/classes/class-${prevClass}?${classQuery.toString()}` : `/classes/class-${prevClass}`}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-sm"
                >
                  ← Class {prevClass}
                </Link>
              ) : (
                <span />
              )}
              {nextClass ? (
                <Link
                  href={classQuery.toString() ? `/classes/class-${nextClass}?${classQuery.toString()}` : `/classes/class-${nextClass}`}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-sm"
                >
                  Class {nextClass} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
