import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardCurriculum,
  getSubjectLabel,
  getSubjectsForBoardClass,
  getSubjectsForClass,
} from '@/lib/curriculum';

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

function getClassColor(num: number): string {
  if (num <= 5) return 'from-emerald-400 to-teal-500';
  if (num <= 8) return 'from-blue-400 to-indigo-500';
  if (num <= 10) return 'from-violet-500 to-purple-600';
  return 'from-rose-500 to-orange-500';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { classSlug } = await params;
  const classNum = parseClassNumber(classSlug);

  if (!classNum) {
    return { title: 'Class Not Found' };
  }

  return {
    title: `Class ${classNum} — Courses & Study Material`,
    description: `Browse Class ${classNum} courses, subjects, and study material for CBSE, ICSE, and Tamil Nadu State Board at Global Minds Academy.`,
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
        <main className="pt-32 min-h-screen">
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

  const colorClass = getClassColor(classNum);
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

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href={classListHref} className="inline-flex items-center gap-1 text-slate-500 text-sm mb-6 hover:text-slate-900 font-medium transition-colors">
                ← All Classes
              </Link>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                {group}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
                Class {classNum} <span className="text-blue-600">Learning</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                {selectedBoard && selectedSubjectSlug
                  ? `Explore ${getSubjectLabel(selectedSubjectSlug)} learning for Class ${classNum} in ${getBoardCurriculum(selectedBoard)?.name}.`
                  : `Explore subjects, courses, and study materials designed for Class ${classNum} students across CBSE, ICSE, and Tamil Nadu State Board.`}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={{ pathname: `/courses`, query: { class: String(classNum), ...(selectedBoard ? { board: selectedBoard } : {}), ...(selectedSubjectSlug ? { subject: selectedSubjectSlug } : {}) } }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-colors"
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

        <section className="section-padding">
          <div className="container-wide">
            {(selectedBoard || selectedSubjectSlug) && (
              <div className="mb-8 flex flex-wrap gap-3">
                {selectedBoard && (
                  <span className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 text-sm">
                    {getBoardCurriculum(selectedBoard)?.name}
                  </span>
                )}
                {selectedSubjectSlug && (
                  <span className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100 text-sm">
                    {getSubjectLabel(selectedSubjectSlug)}
                  </span>
                )}
              </div>
            )}
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
              {selectedSubjectSlug ? `${getSubjectLabel(selectedSubjectSlug)} for Class ${classNum}` : `Subjects for Class ${classNum}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {subjects.map((subject) => {
                const subjectSlug = subject;

                return (
                  <Link
                    key={subject}
                    href={`/subjects/${subjectSlug}${selectedBoard ? `?board=${selectedBoard}&class=${classNum}` : `?class=${classNum}`}`}
                    className="card-hover p-5 flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-brand-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-brand-600 transition-colors">
                      {getSubjectLabel(subject)}
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
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm"
                >
                  ← Class {prevClass}
                </Link>
              ) : (
                <span />
              )}
              {nextClass ? (
                <Link
                  href={classQuery.toString() ? `/classes/class-${nextClass}?${classQuery.toString()}` : `/classes/class-${nextClass}`}
                  className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm"
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
