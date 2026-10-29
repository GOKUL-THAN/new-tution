import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Trophy, Star, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Results & Achievements — Student Success Stories | Global Minds Academy',
  description:
    'Student achievements and success stories from Global Minds Academy. JEE, NEET, CBSE, and Tamil Nadu State Board results.',
};

/*
  NOTE: The achievements shown below are representative placeholders.
  Academy must replace these with verified, consent-obtained real student results
  before publishing. Never publish fabricated ranks or scores as fact.
  All displayed data must be backed by actual mark sheets or official scorecards.
*/

const examResults = [
  {
    exam: 'JEE Main 2025',
    authority: 'NTA',
    color: 'from-violet-700 to-violet-500',
    bg: 'bg-violet-50 border-violet-200',
    icon: '⚛️',
    highlights: [
      { stat: 'Sample Target', desc: 'Rank below 50,000 — our preparation benchmark' },
      { stat: '3 Subjects', desc: 'Physics, Chemistry, Mathematics — complete coverage' },
      { stat: '10+ Mocks', desc: 'Minimum full-length mocks per student before exam' },
    ],
    disclaimer: true,
  },
  {
    exam: 'NEET UG 2025',
    authority: 'NTA',
    color: 'from-emerald-700 to-emerald-500',
    bg: 'bg-emerald-50 border-emerald-200',
    icon: '🩺',
    highlights: [
      { stat: '720 Marks', desc: 'Full-mark target — 90/90 Biology + 45+45 Phy+Chem' },
      { stat: 'NCERT Focus', desc: '95% of NEET questions — our primary preparation source' },
      { stat: 'Mock Pattern', desc: 'NTA-interface mocks from October onwards' },
    ],
    disclaimer: true,
  },
  {
    exam: 'CBSE Class 12 — 2025',
    authority: 'CBSE',
    color: 'from-orange-600 to-red-600',
    bg: 'bg-orange-50 border-orange-200',
    icon: '📚',
    highlights: [
      { stat: '90%+ Target', desc: 'Our board exam preparation benchmark' },
      { stat: 'All streams', desc: 'Science, Commerce, and Arts covered' },
      { stat: 'Sample Papers', desc: 'Official CBSE sample papers practised from October' },
    ],
    disclaimer: true,
  },
  {
    exam: 'TN State Board Class 12 — 2025',
    authority: 'Tamil Nadu DGE',
    color: 'from-[#D4A017] to-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    icon: '🌴',
    highlights: [
      { stat: '500/600 Target', desc: 'Tamil Nadu Class 12 preparation benchmark' },
      { stat: 'Tamil Medium', desc: 'Both Tamil and English medium supported' },
      { stat: 'Group 1 Focus', desc: 'Science stream — Maths, Physics, Chemistry, Biology' },
    ],
    disclaimer: true,
  },
];

const achievementBadges = [
  { icon: '🎓', title: 'IIT Selection', desc: 'Students who cleared JEE Advanced and received IIT seat allotment' },
  { icon: '🏥', title: 'MBBS Admission', desc: 'Students who cleared NEET UG and received MBBS seat' },
  { icon: '📊', title: '90%+ in Boards', desc: 'Students scoring 90 percentile and above in board examinations' },
  { icon: '🏆', title: 'Olympiad Medal', desc: 'Students who received medals in IMO, NSO, or HBCSE Olympiads' },
];

const preparationPhilosophy = [
  {
    title: 'Concept Before Speed',
    desc: 'We build conceptual understanding before drilling speed. Students who understand deeply score higher than those who only practise fast.',
  },
  {
    title: 'Error Notebook System',
    desc: 'Every wrong answer becomes a learning card. Students who review their error notebooks before the exam significantly improve their final scores.',
  },
  {
    title: 'Mock Test Analytics',
    desc: 'After every full-length mock, students receive detailed analytics: accuracy by chapter, time per question type, and estimated rank.',
  },
  {
    title: 'Parent Communication',
    desc: 'Monthly progress reports ensure parents are informed and students stay accountable throughout the preparation journey.',
  },
];

export default function ResultsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs">
                <Trophy className="w-4 h-4 text-[#1A6B5A]" />
                JEE · NEET · CBSE · TN Board Benchmarks
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Results &amp; <span className="text-[#1A6B5A]">Achievements</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Our preparation approach is built around helping every student reach their
                personal best. This page showcases our preparation benchmarks, teaching
                philosophy, and the results our methodology targets.
              </p>
            </div>
          </div>
        </section>

        {/* Important disclaimer */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="container-wide py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-semibold mb-1">About This Page</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Academic results vary by individual effort, starting level, consistency, and exam difficulty.
                  We do not fabricate or guarantee ranks, scores, or admissions.
                  Any student achievements displayed require explicit written consent from the student and,
                  for minors, their parent or guardian before publication.
                  The figures on this page represent preparation benchmarks and targets — not guaranteed outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exam result cards */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Exam Preparation Benchmarks</h2>
            <p className="text-gray-500 text-center mb-12">
              Our preparation is benchmarked to these targets for each major examination.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {examResults.map((exam) => (
                <div key={exam.exam} className={`rounded-3xl border p-6 sm:p-8 ${exam.bg}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{exam.icon}</span>
                    <div>
                      <h3 className="font-display font-bold text-gray-900 text-xl">{exam.exam}</h3>
                      <p className="text-sm text-gray-500">{exam.authority}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {exam.highlights.map((h) => (
                      <div key={h.stat} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-white">
                        <CheckCircle2 className="w-4 h-4 text-[#1A6B5A] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-gray-900 text-sm">{h.stat}</span>
                          <span className="text-gray-500 text-sm"> — {h.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {exam.disclaimer && (
                    <p className="text-xs text-gray-500 italic">
                      These are preparation benchmarks. Actual results depend on individual effort and exam conditions.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievement categories */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Types of Achievements We Celebrate</h2>
            <p className="text-gray-500 text-center mb-12">
              Every student&apos;s journey is different. We celebrate all milestones — from personal bests to national ranks.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievementBadges.map((badge) => (
                <div key={badge.title} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1A6B5A]/30 hover:shadow-md transition-all">
                  <div className="text-4xl mb-4">{badge.icon}</div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{badge.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Student success stories placeholder */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="section-title mb-4">
                  Student Success Stories
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Real student testimonials and results are added here with explicit
                  written consent from the student and their guardian.
                  Every result displayed includes the student&apos;s name (or initials if they prefer),
                  exam name, score/rank, and year — no fabricated achievements are published.
                </p>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    &ldquo;Actual student testimonials and verified results will appear here.
                    The academy collects written consent before publishing any student achievement.&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    — Placeholder: Replace with real verified results before launch
                  </p>
                </div>
                <Link href="/contact" className="btn-primary !bg-[#1A6B5A] hover:!bg-[#145248] inline-flex items-center gap-2">
                  Share Your Success Story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Philosophy */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-gray-900 text-lg mb-2">
                  Our Preparation Philosophy
                </h3>
                {preparationPhilosophy.map((item) => (
                  <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-[#F5C518] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Official results links */}
        <section className="section-padding bg-gradient-to-b from-teal-50/50 via-slate-50 to-white border-t border-teal-100">
          <div className="container-wide">
            <h2 className="text-2xl font-display font-black text-slate-900 mb-3 text-center">
              Check Official Exam Results
            </h2>
            <p className="text-slate-600 text-center mb-8 max-w-lg mx-auto font-medium">
              Always check your actual results directly from official NTA and board portals.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'JEE Main Results', url: 'https://jeemain.nta.nic.in/' },
                { label: 'NEET UG Results', url: 'https://neet.nta.nic.in/' },
                { label: 'CBSE Results', url: 'https://cbseresults.nic.in/' },
                { label: 'TN Board Results', url: 'https://www.dge.tn.gov.in/' },
              ].map((r) => (
                <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 text-center hover:border-teal-400 hover:shadow-md transition-all group shadow-sm">
                  <p className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">{r.label}</p>
                  <p className="text-teal-700 text-xs mt-1 font-semibold">Official portal →</p>
                </a>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/register" className="btn !bg-[#F5C518] !text-[#0D2B3E] font-bold px-8 py-3 shadow-md shadow-amber-500/20">
                Start Your Preparation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
