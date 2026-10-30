import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, ArrowRight, CheckCircle2, ShieldCheck, Layers, GraduationCap } from 'lucide-react';
import { getAllEducationBoards } from '@/data/education';

export const metadata: Metadata = {
  title: 'Curriculum & Education System — CBSE, ICSE, TN State Board & TN Matriculation (Classes 6–12)',
  description: 'Explore our comprehensive, strictly separated curriculum across CBSE, ICSE, Tamil Nadu State Board, and Tamil Nadu Matriculation Board for Classes 6–12.',
};

const hierarchy = [
  { level: '1. Education Board', desc: 'CBSE · ICSE · Tamil Nadu State Board · TN Matriculation' },
  { level: '2. Class (6–12)', desc: 'Middle School (6–8) · Secondary (9–10) · Senior Secondary (11–12)' },
  { level: '3. Subject', desc: 'Board-specific subjects with dedicated syllabus and textbook mapping' },
  { level: '4. Description', desc: 'Objectives, important topics, real-world applications & progression' },
  { level: '5. Chapters & Notes', desc: 'Topic-wise breakdown, formula sheets & downloadable PDF guides' },
  { level: '6. Assessments', desc: 'Practice assignments, interactive quizzes & previous-year board papers' },
];

export default function CurriculumPage() {
  const boards = getAllEducationBoards();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFD]">
      <Navbar />
      <main className="flex-1">
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,76,92,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold mb-4 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-accent-500" />
              Four Independent Education Boards · Classes 6 to 12
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Our Academic <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 bg-clip-text text-transparent">Curriculum Architecture</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8">
              Every education board operates on an independent, verified curriculum. We strictly prevent syllabus mixing between CBSE, ICSE, Tamil Nadu State Board, and Tamil Nadu Matriculation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/boards" className="btn-primary">
                Browse Education Boards <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Hierarchy Section */}
        <section className="section-padding bg-white border-b border-slate-100">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Standardized Workflow</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
                Mandatory Curriculum Navigation Hierarchy
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Follow this sequential path to access class-specific and board-specific study materials.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hierarchy.map((h, idx) => (
                <div key={h.level} className="card p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-500 transition-all shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-brand-600 text-white text-xs font-bold flex items-center justify-center mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-sm mb-1">{h.level}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Four Independent Boards */}
        <section className="section-padding bg-slate-50/60">
          <div className="container-wide max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                Independent Education Boards (Classes 6–12)
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Select your board to choose your class and explore dedicated subject curricula.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {boards.map((b) => (
                <div key={b.slug} className="card p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/90 hover:border-brand-400 transition-all shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                        {b.badge}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Classes 6–12
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-black text-slate-900 mb-1">
                      {b.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">{b.fullName}</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {b.description}
                    </p>

                    {/* Classes Pills */}
                    <div className="mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Select Class under {b.name}:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {b.classes.map((cls) => (
                          <Link
                            key={cls}
                            href={`/boards/${b.slug}/class-${cls}`}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-brand-600 hover:text-white transition-colors"
                          >
                            Class {cls}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/boards/${b.slug}`}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                    >
                      Explore {b.name} Overview <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={b.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                    >
                      Official Site
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Principles */}
        <section className="section-padding bg-white border-t border-slate-200/80">
          <div className="container-wide max-w-3xl">
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 text-center">
              Our Academic Commitments
            </h2>
            <div className="space-y-3">
              {[
                'Strict Non-Mixing: Syllabuses, chapters, and question patterns are strictly separated between CBSE, ICSE, TN State Board, and TN Matriculation.',
                'Official Source Grounding: All chapter titles, learning objectives, and textbook codes match verified board publications (NCERT, CISCE, TN SCERT).',
                'Comprehensive Subject Details: Every subject includes what students learn, important topics, learning objectives, real-world applications, and skills developed.',
                'Active Practice & Self-Assessment: Chapter-wise notes, downloadable PDFs, level-differentiated assignments with step solutions, and timed self-assessment quizzes.',
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50/70 rounded-2xl p-4 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
