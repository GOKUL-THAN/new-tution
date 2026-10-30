import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, ChevronRight } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardBySlug,
  parseClassSlug,
  getSubjectCurriculum,
  getSubjectsForClass,
  getAllEducationBoards,
} from '@/data/education';
import SubjectInteractiveView from '@/components/education/SubjectInteractiveView';

interface PageProps {
  params: Promise<{ boardSlug: string; classSlug: string; subjectSlug: string }>;
}

export async function generateStaticParams() {
  const boards = getAllEducationBoards();
  const params: { boardSlug: string; classSlug: string; subjectSlug: string }[] = [];

  for (const board of boards) {
    for (const cls of board.classes) {
      const subjects = getSubjectsForClass(board.slug, cls);
      for (const sub of subjects) {
        params.push({
          boardSlug: board.slug,
          classSlug: `class-${cls}`,
          subjectSlug: sub.slug,
        });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { boardSlug, classSlug, subjectSlug } = await params;
  const board = getBoardBySlug(boardSlug);
  const classNum = parseClassSlug(classSlug);

  if (!board || !classNum) {
    return { title: 'Subject Not Found' };
  }

  const subject = getSubjectCurriculum(board.slug, classNum, subjectSlug);

  if (!subject) {
    return { title: `${subjectSlug} — Class ${classNum} (${board.name})` };
  }

  return {
    title: `${board.name} Class ${classNum} ${subject.name} — Curriculum, Chapters, Notes & Assessments`,
    description: `${subject.description.overview} Explore syllabus, chapter learning materials, practice questions, and assessments.`,
  };
}

export default async function BoardClassSubjectPage({ params }: PageProps) {
  const { boardSlug, classSlug, subjectSlug } = await params;
  const board = getBoardBySlug(boardSlug);
  const classNum = parseClassSlug(classSlug);

  if (!board || !classNum) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen bg-[#FBFDFD]">
          <div className="container-wide">
            <EmptyState
              icon={GraduationCap}
              title="Class or Board Not Found"
              description="The requested curriculum could not be located."
              actionLabel="Browse Education Boards"
              actionHref="/boards"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subject = getSubjectCurriculum(board.slug, classNum, subjectSlug);
  const siblingSubjects = getSubjectsForClass(board.slug, classNum);

  if (!subject) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen bg-[#FBFDFD]">
          <div className="container-wide max-w-4xl py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 font-medium">
              <Link href="/boards" className="hover:text-slate-900">Boards</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}`} className="hover:text-slate-900">{board.name}</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}/${classSlug}`} className="hover:text-slate-900">Class {classNum}</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">{subjectSlug}</span>
            </nav>

            <div className="card p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                <BookOpen className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-display font-bold text-slate-900">
                Subject Content Under Synchronization
              </h1>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                The syllabus for {subjectSlug} in {board.name} Class {classNum} is being mapped. Please select from the available subjects below:
              </p>

              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {siblingSubjects.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/boards/${board.slug}/${classSlug}/${s.slug}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-600 hover:text-white transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FBFDFD]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-14 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            {/* Mandatory Navigation Path Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/boards" className="hover:text-slate-900 transition-colors">Education Boards</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}`} className="hover:text-slate-900 transition-colors">{board.name}</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}/${classSlug}`} className="hover:text-slate-900 transition-colors">Class {classNum}</Link>
              <span>/</span>
              <span className="text-brand-700 font-bold">{subject.name}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
                  {board.name} Official Subject
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                  Class {classNum}
                </span>
                {subject.code && (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-semibold">
                    Code: {subject.code}
                  </span>
                )}
                {subject.stream && subject.stream !== 'General' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                    {subject.stream} Stream
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-3 tracking-tight">
                {board.name} Class {classNum} <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">{subject.name}</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-6">
                Official syllabus, detailed subject description, chapter-wise learning materials, download PDFs, practice assignments, and assessments.
              </p>

              {/* Quick Jump Bar across other subjects in this class */}
              {siblingSubjects.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                    Other Subjects:
                  </span>
                  {siblingSubjects
                    .filter((s) => s.slug !== subject.slug)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/boards/${board.slug}/${classSlug}/${s.slug}`}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-700 transition-colors shadow-2xs"
                      >
                        {s.name}
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="section-padding">
          <div className="container-wide max-w-6xl">
            <SubjectInteractiveView
              curriculum={subject}
              boardName={board.name}
              boardSlug={board.slug}
              classNumber={classNum}
              classSlug={classSlug}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

