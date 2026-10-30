import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen, GraduationCap, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { getBoardBySlug, getAllEducationBoards } from '@/data/education';

interface PageProps {
  params: Promise<{ boardSlug: string }>;
}

export async function generateStaticParams() {
  const boards = getAllEducationBoards();
  return [
    ...boards.map((b) => ({ boardSlug: b.slug })),
    { boardSlug: 'isc' }, // alias for backward compatibility
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { boardSlug } = await params;
  const board = getBoardBySlug(boardSlug);

  if (!board) {
    return { title: 'Board Not Found' };
  }

  return {
    title: `${board.name} (${board.fullName}) — Classes 6 to 12 Curriculum & Study Materials`,
    description: `${board.description} Explore verified board curriculum, syllabus, subjects, notes, and assessments.`,
  };
}

export default async function BoardDetailPage({ params }: PageProps) {
  const { boardSlug } = await params;
  const board = getBoardBySlug(boardSlug);

  if (!board) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen bg-[#FBFDFD]">
          <div className="container-wide">
            <EmptyState
              icon={GraduationCap}
              title="Education Board Not Found"
              description="The board you are looking for does not exist or has been relocated."
              actionLabel="View All Education Boards"
              actionHref="/boards"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const classes = board.classes;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FBFDFD]">
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-16 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/boards" className="hover:text-slate-900 transition-colors">Education Boards</Link>
              <span>/</span>
              <span className="text-brand-700 font-bold">{board.name}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold mb-4 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-accent-500" />
                {board.badge} · Classes {classes[0]}–{classes[classes.length - 1]}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-2 tracking-tight">
                {board.name} <span className="bg-gradient-to-r from-brand-700 to-accent-600 bg-clip-text text-transparent">Education System</span>
              </h1>
              <p className="text-base text-slate-600 font-semibold mb-4">
                {board.fullName} · <span className="text-slate-800">{board.authority}</span>
              </p>
              <p className="text-base sm:text-lg text-slate-700 mb-8 leading-relaxed font-medium">
                {board.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#classes"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-colors"
                >
                  Select a Class (6–12) <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={board.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors"
                >
                  Visit Official Board Portal <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 2: CLASS SELECTION (Mandatory Navigation Hierarchy) */}
        <section id="classes" className="section-padding border-b border-slate-200/60 bg-white">
          <div className="container-wide">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold mb-2">
                Step 2 in Curriculum Navigation
              </div>
              <h2 className="text-3xl font-display font-black text-slate-900 mb-3">
                Select Your Class under {board.name}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Choose your specific class (Classes 6 to 12) to view the dedicated subjects, syllabus, chapter materials, and assessments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
              {classes.map((cls) => {
                const stage =
                  cls <= 8 ? 'Middle School' : cls <= 10 ? 'Secondary Board' : 'Senior Secondary';
                const tagColor =
                  cls <= 8
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : cls <= 10
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-purple-50 text-purple-700 border-purple-200';

                return (
                  <Link
                    key={cls}
                    href={`/boards/${board.slug}/class-${cls}`}
                    className="group card p-5 rounded-2xl border-2 border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all flex flex-col justify-between text-center bg-white"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 border border-brand-200 font-display font-black text-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        {cls}
                      </div>
                      <h3 className="font-display font-black text-lg text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">
                        Class {cls}
                      </h3>
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-3 ${tagColor}`}>
                        {stage}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-bold text-brand-600 group-hover:text-brand-700">
                      <span>View Subjects</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Board Details & Specifications */}
        <section className="section-padding bg-slate-50/60">
          <div className="container-wide max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Features Card */}
              <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                <h3 className="text-xl font-display font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  What We Cover for {board.name}
                </h3>
                <ul className="space-y-3">
                  {board.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exam & Evaluation Card */}
              <div className="card p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-600" />
                    Examination Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {board.examPattern}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Evaluation Scheme
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {board.markingScheme}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={board.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    Official Regulatory Guidelines at {new URL(board.officialWebsite).hostname} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
