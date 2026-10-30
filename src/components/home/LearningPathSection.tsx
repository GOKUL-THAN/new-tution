import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, Lock } from 'lucide-react';

/* Inspired by Khan Academy mastery, Embibe learning paths, IXL skill levels */
const steps = [
  {
    phase: '01',
    title: 'Diagnostic Assessment',
    desc: 'Take a short test to identify your current knowledge level across subjects and chapters.',
    status: 'active',
    tools: ['Chapter-wise diagnostic', 'Strength & gap report', '15-minute test'],
    color: 'bg-blue-600',
    border: 'border-blue-600',
  },
  {
    phase: '02',
    title: 'Personalised Learning Path',
    desc: 'Get a custom roadmap of chapters to study — prioritised by importance, exam weight, and your gaps.',
    status: 'active',
    tools: ['Exam-weighted chapters', 'Your weak topics first', 'Daily study targets'],
    color: 'bg-amber-500',
    border: 'border-amber-500',
  },
  {
    phase: '03',
    title: 'Learn with Videos & Notes',
    desc: 'Study from recorded video lessons, concept summaries, formula sheets, and worked examples.',
    status: 'active',
    tools: ['HD video lessons', 'Formula sheets', 'Concept maps'],
    color: 'bg-violet-600',
    border: 'border-violet-600',
  },
  {
    phase: '04',
    title: 'Daily Practice (DPP)',
    desc: 'Solve chapter-wise DPPs with increasing difficulty. Wrong answers go to your Error Notebook.',
    status: 'active',
    tools: ['Easy → Hard progression', 'Error Notebook', 'Timed practice'],
    color: 'bg-orange-500',
    border: 'border-orange-500',
  },
  {
    phase: '05',
    title: 'Mock Tests & Analysis',
    desc: 'Full-length and sectional mocks in exam pattern. Get detailed analytics and rank estimate.',
    status: 'active',
    tools: ['NTA/board pattern mocks', 'Rank predictor', 'Time analysis'],
    color: 'bg-rose-500',
    border: 'border-rose-500',
  },
  {
    phase: '06',
    title: 'Revision & Mastery',
    desc: 'Spaced revision of weak topics, error notebook review, and final mock before your exam.',
    status: 'upcoming',
    tools: ['Spaced repetition', 'Last-day checklist', 'Exam-day tips'],
    color: 'bg-emerald-600',
    border: 'border-emerald-600',
  },
];

const masteryLevels = [
  { level: 'Not Started',  color: 'bg-gray-200',   desc: 'Chapter not yet attempted' },
  { level: 'Attempted',    color: 'bg-amber-400',   desc: 'Started but not practised enough' },
  { level: 'Practising',   color: 'bg-sky-500',   desc: 'Good progress, needs more practice' },
  { level: 'Mastered',     color: 'bg-blue-600',  desc: 'Consistently correct across sessions' },
];

export default function LearningPathSection() {
  return (
    <section className="section-padding bg-gray-50/60 overflow-hidden" id="learning-path">
      <div className="container-wide">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-blue-200/60">
            Adaptive Learning
          </span>
          <h2 className="section-title mb-4">
            Your Personalised{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Learning Path
            </span>
          </h2>
          <p className="section-subtitle mx-auto">
            From where you are to where you want to be — a structured 6-step journey
            inspired by Khan Academy mastery, Embibe adaptive learning, and IXL skill levels.
          </p>
        </div>

        {/* ── 6-step path ─────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl border-2 ${step.status === 'upcoming' ? 'border-gray-200 opacity-70' : step.border} p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
              {/* Phase number */}
              <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center mb-4 text-white font-bold text-sm`}>
                {step.phase}
              </div>

              {/* Status badge */}
              <div className="absolute top-5 right-5">
                {step.status === 'upcoming'
                  ? <Lock className="w-4 h-4 text-gray-300" />
                  : <CheckCircle2 className="w-4 h-4 text-blue-600" />
                }
              </div>

              <h3 className="font-display font-bold text-gray-900 text-base mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.desc}</p>

              <ul className="space-y-1.5">
                {step.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-2 text-xs text-gray-600">
                    <Circle className="w-2 h-2 fill-current text-[#1A6B5A] shrink-0" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Mastery levels ───────────────────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-display font-bold text-gray-900 text-xl mb-3">
                Chapter Mastery Levels
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Every chapter is tracked across four mastery levels — inspired by
                Khan Academy&apos;s mastery system and IXL&apos;s SmartScore. Your
                dashboard shows exactly where you stand chapter by chapter.
              </p>

              <div className="space-y-3">
                {masteryLevels.map((m) => (
                  <div key={m.level} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${m.color} shrink-0`} />
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{m.level}</span>
                      <span className="text-gray-500 text-xs ml-2">— {m.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mock chapter grid */}
            <div>
              <p className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-4">
                Physics — Class 12 (Sample)
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { ch: 'Ch 1', color: 'bg-blue-600', pct: 94 },
                  { ch: 'Ch 2', color: 'bg-sky-500', pct: 81 },
                  { ch: 'Ch 3', color: 'bg-amber-400',  pct: 65 },
                  { ch: 'Ch 4', color: 'bg-blue-600', pct: 91 },
                  { ch: 'Ch 5', color: 'bg-sky-500', pct: 77 },
                  { ch: 'Ch 6', color: 'bg-amber-400',  pct: 58 },
                  { ch: 'Ch 7', color: 'bg-gray-200',   pct: 0  },
                  { ch: 'Ch 8', color: 'bg-gray-200',   pct: 0  },
                  { ch: 'Ch 9', color: 'bg-gray-200',   pct: 0  },
                  { ch: 'Ch 10',color: 'bg-gray-200',   pct: 0  },
                ].map((c) => (
                  <div key={c.ch} className="text-center">
                    <div className={`${c.color} rounded-xl h-10 flex items-center justify-center text-white font-bold text-xs mb-1`}>
                      {c.pct > 0 ? `${c.pct}%` : '—'}
                    </div>
                    <p className="text-[10px] text-slate-600 font-semibold">{c.ch}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-3">
                Sample data only. Actual mastery is calculated from your test attempts.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link href="/diagnostic-test" className="btn-primary inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              Take Free Diagnostic Test
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-600 font-medium mt-3">Takes 15 minutes · No account needed to start</p>
          </div>
        </div>
      </div>
    </section>
  );
}
