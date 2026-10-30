import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Clock, BookOpen, Target, Zap, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Practice Hub — Chapter Drills, Subject Tests, Speed Tests',
  description:
    'Quick daily practice for JEE, NEET, and board exam students. Chapter-wise drills, subject tests, reasoning practice, and speed tests — inspired by Testbook, IndiaBIX, and NTA Abhyas.',
};

const practiceTypes = [
  {
    icon: BookOpen,
    title: 'Chapter Drill',
    desc: '10–15 questions per chapter. Focuses on one concept at a time. Great for daily practice after studying a chapter.',
    tag: 'Daily',
    tagColor: 'bg-blue-100 text-blue-700',
    color: 'bg-blue-600',
    link: '/student/tests',
    time: '10–15 min',
    features: ['Single chapter focus', 'Instant feedback', 'Error notebook auto-saves misses', 'All difficulty levels'],
  },
  {
    icon: Target,
    title: 'Subject Test',
    desc: '30–50 questions covering a full subject. Mix of chapters. Ideal for weekly revision and identifying topic gaps.',
    tag: 'Weekly',
    tagColor: 'bg-violet-100 text-violet-700',
    color: 'bg-violet-600',
    link: '/student/tests',
    time: '45–60 min',
    features: ['All chapters in subject', 'Difficulty: Easy → Hard', 'Performance breakdown by chapter', 'Marks and negative marking'],
  },
  {
    icon: Zap,
    title: 'Speed Test',
    desc: '60 questions in 60 minutes. Rapid-fire format to build speed and accuracy. Crucial for JEE and NEET time management.',
    tag: 'Speed',
    tagColor: 'bg-orange-100 text-orange-700',
    color: 'bg-orange-500',
    link: '/student/tests',
    time: '60 min',
    features: ['60 Qs in 60 min', 'Mixed subjects', 'Timer pressure training', 'Time-per-question analysis'],
  },
  {
    icon: Clock,
    title: 'Full Mock Test',
    desc: 'Full-length JEE Main / NEET / Board pattern mock. Complete exam experience with NTA-style interface.',
    tag: 'Full Exam',
    tagColor: 'bg-rose-100 text-rose-700',
    color: 'bg-rose-600',
    link: '/student/tests',
    time: '3 hrs',
    features: ['Exam-pattern questions', 'Countdown timer', 'Auto-submit on time end', 'Rank predictor on result'],
  },
  {
    icon: BookOpen,
    title: 'Reasoning Practice',
    desc: 'Logical reasoning, analytical ability, and mental aptitude — for CUET, NDA, NTSE, and scholarship exams.',
    tag: 'Aptitude',
    tagColor: 'bg-blue-100 text-blue-600',
    color: 'bg-blue-600',
    link: '/student/tests',
    time: '20–30 min',
    features: ['Logical reasoning', 'Data interpretation', 'Verbal ability', 'Quantitative aptitude'],
  },
  {
    icon: CheckCircle2,
    title: 'PYQ Practice',
    desc: 'Previous year questions from JEE Main, NEET, CBSE boards, and TN State Board — practised in timed mode.',
    tag: 'PYQ',
    tagColor: 'bg-emerald-100 text-emerald-700',
    color: 'bg-emerald-600',
    link: '/previous-year-papers',
    time: 'Varies',
    features: ['Year-filtered practice', 'Board-wise selection', 'Answer with explanation', 'Difficulty labelled'],
  },
];

const subjects = [
  { name: 'Physics',          chapters: 14, slug: 'physics',          color: 'bg-violet-600', for: 'JEE + NEET' },
  { name: 'Chemistry',        chapters: 14, slug: 'chemistry',        color: 'bg-orange-500', for: 'JEE + NEET' },
  { name: 'Mathematics',      chapters: 13, slug: 'mathematics',      color: 'bg-blue-600',   for: 'JEE + Board' },
  { name: 'Biology',          chapters: 14, slug: 'biology',          color: 'bg-emerald-600',for: 'NEET' },
  { name: 'Science (6–10)',   chapters: 13, slug: 'science',          color: 'bg-blue-600',   for: 'Board' },
  { name: 'Social Science',   chapters: 12, slug: 'social-science',   color: 'bg-amber-600',  for: 'Board' },
  { name: 'English',          chapters: 10, slug: 'english',          color: 'bg-rose-600',   for: 'Board + CUET' },
  { name: 'Logical Reasoning',chapters: 8,  slug: 'mathematics',      color: 'bg-indigo-600', for: 'CUET + NDA' },
];

const difficultyLevels = [
  { level: 'Easy',      desc: 'NCERT direct, concept recall', color: 'bg-emerald-100 text-emerald-700' },
  { level: 'Medium',    desc: 'Application and multi-step',  color: 'bg-amber-100 text-amber-700' },
  { level: 'Hard',      desc: 'JEE/NEET level problems',    color: 'bg-orange-100 text-orange-700' },
  { level: 'Very Hard', desc: 'JEE Advanced level',          color: 'bg-red-100 text-red-700' },
];

export default function PracticePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-5 shadow-xs">
                <Zap className="w-4 h-4 text-blue-600" />
                Daily Practice · Chapter Drills · Speed Tests
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Practice <span className="text-blue-600">Hub</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Quick daily practice for JEE, NEET, and board exam preparation.
                Chapter drills, subject tests, speed tests, reasoning practice, and PYQ modes —
                all with instant scoring, error notebooks, and performance analysis.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/register" className="btn bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 py-3.5 shadow-md shadow-blue-500/25 transition-colors">
                  Start Practising Free
                </Link>
                <Link href="/student/tests" className="btn border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-8 py-3.5 font-semibold shadow-xs transition-colors">
                  Go to Test Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Practice types */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Practice Modes</h2>
            <p className="text-gray-500 text-center mb-12">
              Six practice formats — inspired by Testbook, NTA Abhyas, IndiaBIX, Khan Academy, and IXL.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceTypes.map((p) => (
                <div key={p.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-blue-400 transition-all group">
                  {/* Top bar */}
                  <div className={`${p.color} px-5 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                        <p.icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-white">{p.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70 text-xs">
                      <Clock className="w-3 h-3" />
                      {p.time}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                    <ul className="space-y-1.5 mb-5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={p.link}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:underline">
                      Start Practice <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subject quick-start */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title mb-3">Quick-Start by Subject</h2>
            <p className="text-gray-500 mb-10">Jump straight into practice for any subject.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subjects.map((s) => (
                <Link key={s.name} href={`/subjects/${s.slug}`}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-blue-400 hover:shadow-sm transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    {s.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{s.chapters} chapters</span>
                    <span className="bg-white border border-gray-200 px-2 py-0.5 rounded-full">{s.for}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Difficulty levels */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-center mb-3">Difficulty Levels</h2>
              <p className="text-gray-500 text-center mb-10">
                Every practice question is tagged by difficulty — from NCERT direct to JEE Advanced level.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {difficultyLevels.map((d) => (
                  <div key={d.level} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
                    <span className={`px-3 py-1.5 rounded-xl text-sm font-bold ${d.color}`}>{d.level}</span>
                    <p className="text-sm text-gray-600">{d.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-emerald-50 border border-blue-200/80 rounded-2xl p-6 mt-8 text-center shadow-sm">
                <h3 className="font-display font-black text-slate-900 text-lg mb-2">Ready to start?</h3>
                <p className="text-slate-600 text-sm mb-5 font-medium">
                  Create a free account to access all practice modes, save your progress, and track improvement.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/register" className="btn bg-blue-600 text-white hover:bg-blue-700 font-bold px-6 py-2.5 text-sm shadow-md shadow-blue-500/25">
                    Create Free Account
                  </Link>
                  <Link href="/diagnostic-test" className="btn bg-white border border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm px-6 py-2.5 text-sm">
                    Take Diagnostic Test
                  </Link>
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
