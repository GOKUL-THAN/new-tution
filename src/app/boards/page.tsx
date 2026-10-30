import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ExternalLink, GraduationCap, ShieldCheck, BookOpen } from 'lucide-react';
import { getAllEducationBoards } from '@/data/education';

export const metadata: Metadata = {
  title: 'Education Boards — CBSE, ICSE, TN State Board & TN Matriculation (Classes 6–12)',
  description:
    'Independent curriculum, syllabus, subjects, chapter learning materials, and assessments for CBSE, ICSE, Tamil Nadu State Board, and Tamil Nadu Matriculation Board for Classes 6 to 12.',
};

export default function BoardsPage() {
  const boards = getAllEducationBoards();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FBFDFD]">
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold mb-4 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-accent-500" />
              Four Independent Academic Boards · Classes 6 to 12
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-5 tracking-tight">
              Select Your <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 bg-clip-text text-transparent">Education Board</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
              Every education board follows its own dedicated curriculum, subjects, textbooks, and assessment schemes. Choose your board to access class-specific learning materials.
            </p>

            {/* Quick Board Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {boards.map((b) => (
                <a
                  key={b.slug}
                  href={`#${b.slug}`}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200/90 shadow-xs hover:border-brand-500 hover:text-brand-700 hover:shadow-sm transition-all"
                >
                  {b.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Board Cards Section */}
        <section className="section-padding">
          <div className="container-wide max-w-5xl space-y-12">
            {boards.map((board) => (
              <div
                key={board.slug}
                id={board.slug}
                className="card p-6 sm:p-10 border-2 border-slate-200/90 hover:border-brand-300 transition-all shadow-sm rounded-3xl bg-white"
              >
                {/* Header Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${board.color.gradient} flex items-center justify-center shrink-0 shadow-md text-white font-display font-black text-lg`}
                    >
                      {board.name.substring(0, 4)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                          {board.name}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                          {board.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        {board.fullName} · <span className="text-slate-700 font-semibold">{board.authority}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={board.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-brand-300 transition-colors"
                    >
                      Official Website <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Description & Overview */}
                <div className="py-6">
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
                    {board.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 my-5 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Examination Pattern
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                        {board.examPattern}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Evaluation &amp; Marking
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                        {board.markingScheme}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Distinctive Board Features
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {board.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Class Selection — Mandatory Navigation Requirement */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-brand-600" />
                      <h3 className="font-display font-bold text-slate-900 text-base">
                        Select Class under {board.name} (Classes 6–12)
                      </h3>
                    </div>
                    <Link
                      href={`/boards/${board.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                    >
                      View All {board.name} Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Class Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                    {board.classes.map((cls) => (
                      <Link
                        key={cls}
                        href={`/boards/${board.slug}/class-${cls}`}
                        className="group flex flex-col items-center justify-center p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-brand-500 hover:shadow-md transition-all text-center"
                      >
                        <span className="text-xs font-bold text-slate-400 group-hover:text-brand-500 uppercase tracking-wider mb-1">
                          Class
                        </span>
                        <span className="text-xl font-display font-black text-slate-800 group-hover:text-brand-700">
                          {cls}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1 font-medium group-hover:text-slate-700">
                          {cls <= 8 ? 'Middle' : cls <= 10 ? 'Secondary' : 'Senior'}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Navigation Explainer */}
        <section className="bg-slate-100/70 py-16 border-t border-slate-200/80">
          <div className="container-wide max-w-4xl text-center">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-3">
              Rigorous Curriculum Hierarchy
            </h2>
            <p className="text-sm text-slate-600 mb-8 max-w-xl mx-auto">
              Our academic architecture strictly enforces zero cross-mixing between boards. Each subject, syllabus unit, and assessment is verified directly against official board standards.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">1. Select Board</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">2. Select Class (6–12)</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">3. Select Subject</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">4. Subject Description</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">5. Chapters &amp; Materials</span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-200 shadow-2xs font-bold">6. Assessments</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
