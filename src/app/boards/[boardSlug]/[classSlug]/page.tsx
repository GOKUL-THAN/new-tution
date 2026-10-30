import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardBySlug,
  getClassCurriculum,
  parseClassSlug,
  getAllEducationBoards,
} from '@/data/education';

interface PageProps {
  params: Promise<{ boardSlug: string; classSlug: string }>;
}

export async function generateStaticParams() {
  const boards = getAllEducationBoards();
  const params: { boardSlug: string; classSlug: string }[] = [];
  for (const board of boards) {
    for (const cls of board.classes) {
      params.push({ boardSlug: board.slug, classSlug: `class-${cls}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { boardSlug, classSlug } = await params;
  const board = getBoardBySlug(boardSlug);
  const classNum = parseClassSlug(classSlug);

  if (!board || !classNum) {
    return { title: 'Class Not Found' };
  }

  return {
    title: `${board.name} Class ${classNum} Subjects, Curriculum & Study Materials`,
    description: `Complete ${board.name} Class ${classNum} board-specific curriculum, subjects, chapter notes, assignments, and assessments.`,
  };
}

export default async function BoardClassDetailPage({ params }: PageProps) {
  const { boardSlug, classSlug } = await params;
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
              description="The requested class under this education board is not available."
              actionLabel="View All Education Boards"
              actionHref="/boards"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const classCurriculum = getClassCurriculum(board.slug, classNum);
  const subjects = classCurriculum?.subjects || [];
  const allClasses = board.classes;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FBFDFD]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-16 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/boards" className="hover:text-slate-900 transition-colors">Education Boards</Link>
              <span>/</span>
              <Link href={`/boards/${board.slug}`} className="hover:text-slate-900 transition-colors">{board.name}</Link>
              <span>/</span>
              <span className="text-brand-700 font-bold">Class {classNum}</span>
            </nav>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
                  {board.name} Official Curriculum
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                  {classCurriculum?.academicStage || (classNum <= 8 ? 'Middle School' : classNum <= 10 ? 'Secondary School' : 'Senior Secondary')}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-3 tracking-tight">
                {board.name} <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">Class {classNum}</span> Curriculum &amp; Subjects
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-6">
                {classCurriculum?.overview || `Explore official ${board.name} syllabus, subjects, chapter study materials, notes, and assessments designed specifically for Class ${classNum}.`}
              </p>

              {/* Focus Areas */}
              {classCurriculum?.keyFocusAreas && classCurriculum.keyFocusAreas.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-5 shadow-xs mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                    Key Academic Focus Areas
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {classCurriculum.keyFocusAreas.map((focus) => (
                      <li key={focus} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* STEP 3: SUBJECT SELECTION (Mandatory Navigation Hierarchy) */}
        <section className="section-padding">
          <div className="container-wide max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold mb-2">
                  Step 3 in Curriculum Navigation
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                  Select Subject for {board.name} Class {classNum}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Click any subject below to explore its description, syllabus, chapter materials, and assessments.
                </p>
              </div>

              <div className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/70 shrink-0">
                {subjects.length} Dedicated Subjects Mapped
              </div>
            </div>

            {/* Subjects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((sub) => {
                const chapterCount = sub.chapters.length;

                return (
                  <Link
                    key={sub.slug}
                    href={`/boards/${board.slug}/${classSlug}/${sub.slug}`}
                    className="group card p-6 rounded-3xl border-2 border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all flex flex-col justify-between bg-white"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center font-bold text-lg group-hover:bg-brand-600 group-hover:text-white transition-colors">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        {sub.code && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                            Code: {sub.code}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                        {sub.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {sub.description.overview}
                      </p>

                      {/* Chapters & Evaluation Info */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-500">Chapters Mapped:</span>
                          <span className="font-bold text-slate-800">{chapterCount} Chapter{chapterCount !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-500">Evaluation:</span>
                          <span className="font-bold text-slate-800">
                            {sub.evaluationScheme.theoryMarks} Th + {sub.evaluationScheme.practicalOrInternalMarks} Int = {sub.evaluationScheme.totalMarks}M
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600 group-hover:text-brand-700">
                      <span>Explore Subject &amp; Chapters</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Switcher across Classes 6–12 under this Board */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-slate-900 text-base">
                  Switch to Another Class under {board.name}
                </h3>
                <span className="text-xs text-slate-500 font-medium">Classes 6 to 12</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {allClasses.map((cls) => {
                  const isActive = cls === classNum;
                  return (
                    <Link
                      key={cls}
                      href={`/boards/${board.slug}/class-${cls}`}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        isActive
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-brand-400 hover:text-brand-700'
                      }`}
                    >
                      Class {cls}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

