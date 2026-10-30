import Link from 'next/link';
import { ArrowRight, Target, BookOpen, Beaker, Stethoscope, Atom, FileText } from 'lucide-react';
import ExamIllustration from '@/components/illustrations/ExamIllustration';

const exams = [
  {
    name: 'JEE Main',
    slug: 'jee-main',
    href: '/jee-main',
    category: 'Engineering',
    authority: 'National Testing Agency (NTA)',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    icon: Atom,
    color: 'from-[#1A6B5A] to-indigo-500',
    features: ['Full-length mocks (NTA pattern)', 'Chapter-wise DPPs', 'Syllabus checklist', 'Rank predictor'],
    desc: 'Gateway to NITs, IIITs, and CFTIs. Also eligibility for JEE Advanced.',
  },
  {
    name: 'JEE Advanced',
    slug: 'jee-advanced',
    href: '/jee-advanced',
    category: 'Engineering',
    authority: 'IIT (rotational)',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    icon: Target,
    color: 'from-violet-600 to-purple-500',
    features: ['Multi-correct MCQ practice', 'Integer & matching types', 'Error notebook', 'IIT college predictor'],
    desc: 'Entrance to the Indian Institutes of Technology — among the toughest exams globally.',
  },
  {
    name: 'NEET UG',
    slug: 'neet-ug',
    href: '/neet',
    category: 'Medical',
    authority: 'National Testing Agency (NTA)',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    icon: Stethoscope,
    color: 'from-emerald-600 to-green-500',
    features: ['NEET pattern mocks', 'NCERT-based practice', 'AIIMS predictor', 'Biology diagram bank'],
    desc: 'Single entrance for MBBS, BDS, AYUSH, Nursing, and Veterinary programmes.',
  },
  {
    name: 'BITSAT',
    slug: 'bitsat',
    href: '/entrance-exams/bitsat',
    category: 'Engineering',
    authority: 'BITS Pilani',
    subjects: ['Physics', 'Chemistry', 'Maths', 'English', 'Reasoning'],
    icon: Beaker,
    color: 'from-orange-500 to-red-500',
    features: ['BITSAT speed tests', 'English & reasoning drills', 'Sectional mocks', 'Campus predictor'],
    desc: 'Admission to BITS Pilani, Goa, and Hyderabad campuses.',
  },
  {
    name: 'CUET UG',
    slug: 'cuet-ug',
    href: '/entrance-exams/cuet-ug',
    category: 'University',
    authority: 'National Testing Agency',
    subjects: ['Domain subjects', 'General Test', 'Languages'],
    icon: BookOpen,
    color: 'from-cyan-600 to-blue-500',
    features: ['Domain-wise mocks', 'University explorer', 'Cut-off tracker', 'Central Uni guide'],
    desc: 'Common gateway to 250+ central and participating universities.',
  },
  {
    name: 'Olympiads',
    slug: 'olympiads',
    href: '/olympiads',
    category: 'Scholarship',
    authority: 'HBCSE & various orgs',
    subjects: ['Mathematics', 'Science', 'Computer Science'],
    icon: FileText,
    color: 'from-[#D4A017] to-amber-500',
    features: ['IMO / NSO preparation', 'Stage 1 & 2 practice', 'HBCSE syllabus guide', 'Scholarship info'],
    desc: 'National and international academic competitions — IMO, NSO, IPhO, IChO.',
  },
];

const prepTools = [
  { icon: '📋', title: 'Syllabus Checklist', desc: 'Chapter-by-chapter tracker for every exam' },
  { icon: '📝', title: 'Daily Practice Problems', desc: 'DPPs like Allen & Aakash — topic-wise' },
  { icon: '⏱', title: 'Timed Mock Tests', desc: 'Full-length + sectional with NTA interface' },
  { icon: '📊', title: 'Rank Predictor', desc: 'Estimated rank from mock score & accuracy' },
  { icon: '❌', title: 'Error Notebook', desc: 'Auto-saved wrong answers for targeted revision' },
  { icon: '🏫', title: 'College Predictor', desc: 'Likely colleges based on your score range' },
];

export default function ExamPrepSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-blue-50/25 to-slate-50 text-slate-900 overflow-hidden border-t border-slate-200/80" id="exam-prep">
      <div className="container-wide">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-sm font-semibold mb-5 shadow-sm">
              <Target className="w-4 h-4 text-blue-600" />
              Competitive Exam Preparation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4 leading-tight">
              Ace Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Entrance Exams
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-normal">
              JEE, NEET, BITSAT, CUET — structured prep with DPPs, mock tests, error notebooks,
              and rank predictors. Built by studying Aakash, Allen, FIITJEE, Sri Chaitanya, and
              Resonance preparation methodologies.
            </p>
            <Link href="/entrance-exams" className="btn bg-white border-2 border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm px-6 py-3 rounded-xl transition-all">
              View All Exams <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Illustration */}
          <div className="hidden lg:block h-72">
            <ExamIllustration className="w-full h-full" />
          </div>
        </div>

        {/* ── Prep tools strip ────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {prepTools.map((t) => (
            <div key={t.title} className="bg-white border border-slate-200/90 shadow-sm rounded-2xl p-4 text-center hover:border-blue-300 hover:shadow-md transition-all">
              <div className="text-2xl mb-2">{t.icon}</div>
              <p className="font-bold text-slate-900 text-xs mb-1">{t.title}</p>
              <p className="text-[11px] text-slate-600 leading-snug">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Exam cards ──────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Link
              key={exam.slug}
              href={exam.href}
              className="group bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 hover:shadow-lg hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <exam.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold border border-slate-200/60">
                  {exam.category}
                </span>
              </div>

              {/* Info */}
              <h3 className="font-display font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                {exam.name}
              </h3>
              <p className="text-xs text-slate-500 mb-2 font-medium">{exam.authority}</p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed flex-1">{exam.desc}</p>

              {/* Subjects */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {exam.subjects.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200/60 text-blue-800 font-medium">{s}</span>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-1.5 mb-4">
                {exam.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700 mt-auto">
                Start Preparing
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Official links note */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
          <p className="text-xs text-slate-600">
            📌 Official exam info sources:{' '}
            <a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">JEE Main</a> ·{' '}
            <a href="https://jeeadv.ac.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">JEE Advanced</a> ·{' '}
            <a href="https://neet.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">NEET UG</a> ·{' '}
            <a href="https://www.nta.ac.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">NTA</a>
            {' '}— always verify dates from official sources.
          </p>
        </div>
      </div>
    </section>
  );
}
