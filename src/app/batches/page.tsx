import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, Users, Clock, BookOpen, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Batches & Programmes — Global Minds Academy',
  description:
    'Choose the right batch for your goal — Foundation (Class 6–10), JEE/NEET Achiever (Class 11–12), Crash Course, or Repeater batches. Online and offline options available.',
};

const batches = [
  {
    name: 'Foundation Batch',
    tag: 'Classes 6–10',
    tagColor: 'bg-blue-100 text-blue-700',
    color: 'from-[#1A6B5A] to-teal-500',
    border: 'border-[#1A6B5A]',
    accentBg: 'bg-[#1A6B5A]/5',
    icon: BookOpen,
    desc: 'Build unshakeable subject foundations for Classes 6–10. Aligned to CBSE, ICSE, TN State Board, and Matriculation. Prepares students for Class 10 board exams and lays the groundwork for JEE/NEET.',
    duration: 'Full academic year (June – March)',
    schedule: '5 days/week · 2 hrs/day',
    classSize: '20–30 students',
    features: [
      'Syllabus-aligned lessons for all boards',
      'Chapter-wise DPP practice sheets',
      'Monthly mock tests with analysis',
      'Doubt resolution sessions (2×/week)',
      'Parent progress reports monthly',
      'Tamil and English medium support',
      'Assignment and homework tracking',
      'Attendance monitoring',
    ],
    ideal: 'Students in Classes 6–10 aiming for strong board results and competitive exam readiness.',
    highlight: false,
  },
  {
    name: 'JEE Achiever Batch',
    tag: 'Classes 11–12',
    tagColor: 'bg-violet-100 text-violet-700',
    color: 'from-violet-700 to-violet-500',
    border: 'border-violet-500',
    accentBg: 'bg-violet-50',
    icon: Star,
    desc: 'Comprehensive JEE Main + Advanced preparation integrated with Class 11–12 board syllabus. Covers Physics, Chemistry, and Mathematics with DPPs, full-length mocks, and rank tracking.',
    duration: '2 years (Class 11 + 12) or 1 year (Class 12 only)',
    schedule: '6 days/week · 4 hrs/day',
    classSize: '25–35 students',
    features: [
      'PCM — complete NCERT + beyond coverage',
      'Daily Practice Problems (Allen/Aakash pattern)',
      'Bi-weekly full-length JEE mock tests',
      'JEE Advanced pattern: multi-correct, numerical types',
      'Error notebook and revision system',
      'Syllabus checklist with chapter prioritisation',
      'Rank predictor after every mock',
      'Board exam preparation integrated',
      'Live + recorded classes (all sessions saved)',
      '1-on-1 doubt clearing sessions',
    ],
    ideal: 'Students targeting JEE Main rank below 50,000 or JEE Advanced qualification.',
    highlight: true,
  },
  {
    name: 'NEET Achiever Batch',
    tag: 'Classes 11–12',
    tagColor: 'bg-emerald-100 text-emerald-700',
    color: 'from-emerald-700 to-emerald-500',
    border: 'border-emerald-500',
    accentBg: 'bg-emerald-50',
    icon: Star,
    desc: 'NEET UG preparation with full NCERT Biology, Physics, and Chemistry coverage. Chapter-wise DPPs, full NEET pattern mocks (180 Qs / 720 marks), and dedicated Biology diagram practice.',
    duration: '2 years (Class 11 + 12) or 1 year (Class 12 only)',
    schedule: '6 days/week · 4 hrs/day',
    classSize: '25–35 students',
    features: [
      'Complete NCERT Biology (Botany + Zoology)',
      'Physics + Chemistry NCERT + beyond',
      'Full NEET pattern mocks (biweekly)',
      'NCERT line-by-line revision programme',
      'Diagram bank for Biology',
      'Previous year NEET question practice',
      'NTA Abhyas-style practice interface',
      'Rank prediction after each mock',
      'Doubt clearing sessions 3×/week',
      'Class 12 board integration',
    ],
    ideal: 'Students targeting MBBS, BDS, or allied health sciences through NEET UG.',
    highlight: false,
  },
  {
    name: 'Crash Course',
    tag: 'Classes 12 / Repeaters',
    tagColor: 'bg-orange-100 text-orange-700',
    color: 'from-orange-600 to-amber-500',
    border: 'border-orange-400',
    accentBg: 'bg-orange-50',
    icon: Clock,
    desc: 'Intensive 3–4 month crash course for students who want to sharpen their preparation in the final stretch before JEE or NEET. Focus on high-yield topics, speed, and accuracy.',
    duration: '3–4 months (Jan–April)',
    schedule: '6 days/week · 5–6 hrs/day',
    classSize: '30–40 students',
    features: [
      'High-yield topic fast-track coverage',
      'Daily 3-hour mock + 2-hour analysis',
      'Error notebook accelerated review',
      '10+ full-length mocks included',
      'Last-month NCERT rapid revision',
      'Exam-day strategy sessions',
      'Previous 10-year PYQ intensive drill',
      'Speed and accuracy improvement programme',
    ],
    ideal: 'Class 12 students and repeaters who want intensive preparation in the final 3–4 months.',
    highlight: false,
  },
  {
    name: 'Repeater / Dropper Batch',
    tag: 'After Class 12',
    tagColor: 'bg-rose-100 text-rose-700',
    color: 'from-rose-700 to-rose-500',
    border: 'border-rose-400',
    accentBg: 'bg-rose-50',
    icon: BookOpen,
    desc: 'Dedicated one-year programme for students repeating JEE or NEET after Class 12. Complete syllabus revision, high-intensity practice, and personalised weak-topic coaching.',
    duration: '1 year (May/June – April)',
    schedule: '6 days/week · 6 hrs/day',
    classSize: '20–25 students',
    features: [
      'Full JEE/NEET syllabus in 6 months',
      'Remaining 6 months: revision + mocks',
      'Daily full-length mocks from October',
      'Personalised weak-topic deep-dives',
      'Biweekly progress counselling',
      'Motivational and strategy workshops',
      'Previous 15-year PYQ complete coverage',
      'College predictor access throughout',
    ],
    ideal: 'Students who appeared in JEE/NEET and want to improve their score in the next attempt.',
    highlight: false,
  },
  {
    name: 'Board Excellence Batch',
    tag: 'Classes 9–12',
    tagColor: 'bg-[#D4A017]/20 text-[#D4A017]',
    color: 'from-[#D4A017] to-amber-500',
    border: 'border-amber-400',
    accentBg: 'bg-amber-50',
    icon: BookOpen,
    desc: 'Focused board exam preparation for CBSE Class 10 & 12, ICSE, ISC, and TN State Board. Subject-by-subject coverage with sample paper practice and answer-writing technique.',
    duration: '6–8 months (Sept – March)',
    schedule: '5 days/week · 2–3 hrs/day',
    classSize: '20–30 students',
    features: [
      'Syllabus completion with revision plan',
      'Previous year CBSE/TN Board papers',
      'Official sample paper practice',
      'Answer writing technique workshops',
      'Chapter-wise marks-weightage analysis',
      'Parent-teacher meetings quarterly',
      'Mock board exams with marking',
      'Tamil and English medium both covered',
    ],
    ideal: 'Students targeting 90%+ in CBSE, ICSE, or TN State Board examinations.',
    highlight: false,
  },
];

export default function BatchesPage() {
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
                <Users className="w-4 h-4 text-[#1A6B5A]" />
                Find the Right Programme
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Batches &amp; <span className="text-[#1A6B5A]">Programmes</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Six structured programmes — Foundation, JEE Achiever, NEET Achiever,
                Crash Course, Repeater, and Board Excellence. Online and offline options.
                Batch sizes capped for personalised attention.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/contact" className="btn !bg-[#1A6B5A] !text-white hover:!bg-[#145346] font-bold px-8 py-3 shadow-md shadow-teal-900/10">
                  Book Free Counselling
                </Link>
                <Link href="/admissions" className="btn border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-8 py-3 shadow-xs">
                  View Admissions Process
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Batch cards */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Choose Your Batch</h2>
            <p className="text-gray-500 text-center mb-12">Each batch is purpose-built for a specific goal and class range.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => (
                <div key={batch.name}
                  className={`bg-white rounded-2xl border-2 ${batch.border} overflow-hidden hover:shadow-lg transition-shadow relative`}>
                  {batch.highlight && (
                    <div className="absolute top-4 right-4 bg-[#F5C518] text-[#0D2B3E] text-xs font-black px-3 py-1 rounded-full z-10">
                      MOST POPULAR
                    </div>
                  )}

                  {/* Gradient header */}
                  <div className={`bg-gradient-to-r ${batch.color} p-5`}>
                    <div className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${batch.tagColor} bg-white/90`}>
                      {batch.tag}
                    </div>
                    <h3 className="font-display font-black text-white text-xl">{batch.name}</h3>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{batch.desc}</p>

                    {/* Meta */}
                    <div className={`${batch.accentBg} rounded-xl p-3 mb-4 space-y-1.5`}>
                      {[
                        { icon: Clock, label: batch.duration },
                        { icon: BookOpen, label: batch.schedule },
                        { icon: Users, label: batch.classSize },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-xs text-gray-700">
                          <Icon className="w-3.5 h-3.5 text-[#1A6B5A] shrink-0" />
                          {label}
                        </div>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-1.5 mb-4">
                      {batch.features.slice(0, 5).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B5A] shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                      {batch.features.length > 5 && (
                        <li className="text-xs text-[#1A6B5A] font-medium pl-5">
                          +{batch.features.length - 5} more features
                        </li>
                      )}
                    </ul>

                    {/* Ideal for */}
                    <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                      <p className="text-xs text-gray-500"><strong className="text-gray-700">Ideal for:</strong> {batch.ideal}</p>
                    </div>

                    <Link href="/contact" className="btn-primary w-full text-center !bg-[#1A6B5A] hover:!bg-[#145248] text-sm">
                      Enquire About This Batch <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title mb-10 text-center">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-[#0D2B3E] text-white">
                    <th className="text-left px-4 py-3 rounded-tl-xl">Batch</th>
                    <th className="text-left px-4 py-3">Target Class</th>
                    <th className="text-left px-4 py-3">Duration</th>
                    <th className="text-left px-4 py-3">Days/Week</th>
                    <th className="text-left px-4 py-3 rounded-tr-xl">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Foundation', '6–10', 'Full year', '5 days', 'Board + competitive readiness'],
                    ['JEE Achiever', '11–12', '1–2 years', '6 days', 'JEE Main & Advanced'],
                    ['NEET Achiever', '11–12', '1–2 years', '6 days', 'NEET UG — MBBS/BDS'],
                    ['Crash Course', '12 / Repeater', '3–4 months', '6 days', 'Final stretch prep'],
                    ['Repeater', 'After 12', '1 year', '6 days', 'Second JEE/NEET attempt'],
                    ['Board Excellence', '9–12', '6–8 months', '5 days', '90%+ board marks'],
                  ].map(([name, cls, dur, days, best], i) => (
                    <tr key={name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-semibold text-gray-900">{name}</td>
                      <td className="px-4 py-3 text-gray-600">{cls}</td>
                      <td className="px-4 py-3 text-gray-600">{dur}</td>
                      <td className="px-4 py-3 text-gray-600">{days}</td>
                      <td className="px-4 py-3 text-gray-600">{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-br from-[#0c2e28] to-[#1A6B5A]">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              Not Sure Which Batch is Right?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Book a free 30-minute counselling session. Our academic counsellors will
              help you choose the right programme based on your current level and goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn !bg-[#F5C518] !text-[#0D2B3E] font-bold px-8 py-3">
                Book Free Counselling
              </Link>
              <Link href="/diagnostic-test" className="btn border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3">
                Take Diagnostic Test First
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
