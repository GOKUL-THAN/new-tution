import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  Download,
  FileText,
  ChevronLeft,
} from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardBySlug,
  parseClassSlug,
  getChapter,
  getAllEducationBoards,
  getSubjectsForClass,
} from '@/data/education';

interface PageProps {
  params: Promise<{
    boardSlug: string;
    classSlug: string;
    subjectSlug: string;
    chapterSlug: string;
  }>;
}

export async function generateStaticParams() {
  const boards = getAllEducationBoards();
  const params: {
    boardSlug: string;
    classSlug: string;
    subjectSlug: string;
    chapterSlug: string;
  }[] = [];

  for (const board of boards) {
    for (const cls of board.classes) {
      const subjects = getSubjectsForClass(board.slug, cls);
      for (const sub of subjects) {
        for (const ch of sub.chapters) {
          params.push({
            boardSlug: board.slug,
            classSlug: `class-${cls}`,
            subjectSlug: sub.slug,
            chapterSlug: ch.slug,
          });
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { boardSlug, classSlug, subjectSlug, chapterSlug } = await params;
  const board = getBoardBySlug(boardSlug);
  const classNum = parseClassSlug(classSlug);

  if (!board || !classNum) {
    return { title: 'Chapter Not Found' };
  }

  const result = getChapter(board.slug, classNum, subjectSlug, chapterSlug);
  if (!result) {
    return { title: 'Chapter Not Found' };
  }

  const { subject, chapter } = result;

  return {
    title: `Chapter ${chapter.number}: ${chapter.title} — ${board.name} Class ${classNum} ${subject.name}`,
    description: `${chapter.description} Study notes, formulas, assignments, and test quiz for ${chapter.title}.`,
  };
}

export default async function ChapterDetailPage({ params }: PageProps) {
  const { boardSlug, classSlug, subjectSlug, chapterSlug } = await params;
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
              title="Chapter Not Found"
              description="The requested chapter could not be located."
              actionLabel="View Education Boards"
              actionHref="/boards"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const result = getChapter(board.slug, classNum, subjectSlug, chapterSlug);

  if (!result) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen bg-[#FBFDFD]">
          <div className="container-wide max-w-4xl py-12">
            <EmptyState
              icon={BookOpen}
              title="Chapter Under Preparation"
              description="The syllabus for this chapter is being synchronized with the official board curriculum."
              actionLabel={`Back to ${subjectSlug}`}
              actionHref={`/boards/${board.slug}/${classSlug}/${subjectSlug}`}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { subject, chapter } = result;
  const currentIndex = subject.chapters.findIndex((ch) => ch.slug === chapter.slug);
  const prevChapter = currentIndex > 0 ? subject.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < subject.chapters.length - 1 ? subject.chapters[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FBFDFD]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-14 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/boards" className="hover:text-slate-900 transition-colors">Education Boards</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}`} className="hover:text-slate-900 transition-colors">{board.name}</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}/${classSlug}`} className="hover:text-slate-900 transition-colors">Class {classNum}</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}/${classSlug}/${subject.slug}`} className="hover:text-slate-900 transition-colors">{subject.name}</Link>
              <span>/</span>
              <span className="text-brand-700 font-bold">Chapter {chapter.number}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
                  Chapter {chapter.number} of {subject.chapters.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                  {board.name} Class {classNum}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {chapter.hours} Hours
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> {chapter.weightageMarks} Marks
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-3 tracking-tight">
                {chapter.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-6">
                {chapter.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/boards/${board.slug}/${classSlug}/${subject.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to All {subject.name} Chapters
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Deep Dive Content */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl space-y-8">
            {/* Learning Objectives */}
            <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Chapter Learning Objectives
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {chapter.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Notes & Summary */}
            <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-600" />
                Key Concept Notes Summary
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                {chapter.notesSummary}
              </p>

              {chapter.keyFormulasOrTerms && chapter.keyFormulasOrTerms.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Important Formulas &amp; Definitions
                  </h3>
                  <div className="space-y-2">
                    {chapter.keyFormulasOrTerms.map((term, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800"
                      >
                        {term}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Important Topics */}
            <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                Topics Covered in this Chapter
              </h2>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {chapter.importantTopics.map((top, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700">
                    • {top}
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              {prevChapter ? (
                <Link
                  href={`/boards/${board.slug}/${classSlug}/${subject.slug}/${prevChapter.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  ← Chapter {prevChapter.number}: {prevChapter.title}
                </Link>
              ) : (
                <span />
              )}

              {nextChapter ? (
                <Link
                  href={`/boards/${board.slug}/${classSlug}/${subject.slug}/${nextChapter.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  Chapter {nextChapter.number}: {nextChapter.title} →
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

