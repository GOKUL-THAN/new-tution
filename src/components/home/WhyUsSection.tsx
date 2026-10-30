import { CheckCircle2 } from 'lucide-react';
import StudyIllustration from '@/components/illustrations/StudyIllustration';

const reasons = [
  {
    emoji: '🎓',
    title: 'Structured Curriculum — Board Aligned',
    desc: 'Every lesson follows the official syllabus — CBSE, ICSE, and TN State Board.',
    detail: 'Chapter-wise coverage with revision schedules, mock tests, and exam-ready material.',
  },
  {
    emoji: '📺',
    title: 'Live + Recorded Classes',
    desc: 'Attend live classes or watch recordings anytime — never miss a session.',
    detail: 'Vedantu-style real-time classes with chat, polls, and whiteboard annotation.',
  },
  {
    emoji: '📋',
    title: 'Daily Practice Problems',
    desc: 'Allen/Aakash-style DPPs for every chapter — structured, difficulty-sorted, with solutions.',
    detail: 'Topic-wise DPPs with immediate answer checking and detailed explanations.',
  },
  {
    emoji: '❌',
    title: 'Error Notebook',
    desc: 'Wrong answers automatically saved as flashcards for targeted revision.',
    detail: 'Inspired by Unacademy\'s error analysis — build a personalised mistake diary.',
  },
  {
    emoji: '📊',
    title: 'Deep Performance Analytics',
    desc: 'Accuracy, speed, topic mastery, and rank prediction — all in one dashboard.',
    detail: 'More detailed than BYJU\'S or Toppr — subject-wise, chapter-wise, question-type-wise.',
  },
  {
    emoji: '🏫',
    title: 'College & Rank Predictor',
    desc: 'Predict likely colleges and JEE/NEET rank based on mock performance.',
    detail: 'Transparent rule-based prediction — no false promises, clearly labelled as estimates.',
  },
  {
    emoji: '👪',
    title: 'Parent Dashboard',
    desc: 'Parents see attendance, test scores, assignments, and teacher notes in real time.',
    detail: 'Parental access is verified and role-controlled — child privacy is protected.',
  },
  {
    emoji: '🌐',
    title: 'Tamil & English Support',
    desc: 'Content available in Tamil and English — ideal for TN State Board students.',
    detail: 'More language support than most national platforms — designed for Tamil Nadu.',
  },
  {
    emoji: '🔒',
    title: 'Privacy-First Design',
    desc: 'Your data stays on your server. No advertising trackers, no data selling.',
    detail: 'Unlike most EdTech platforms — no third-party ad networks or user profiling.',
  },
];

const comparisons = [
  { feature: 'Live + Recorded Classes',    us: true,  byju: true,  pw: true,  aakash: false },
  { feature: 'DPP Practice Sheets',        us: true,  byju: false, pw: true,  aakash: true  },
  { feature: 'Error Notebook',             us: true,  byju: false, pw: false, aakash: false },
  { feature: 'Parent Dashboard',           us: true,  byju: true,  pw: false, aakash: false },
  { feature: 'TN Board + Tamil Support',   us: true,  byju: false, pw: false, aakash: false },
  { feature: 'Rank Predictor',             us: true,  byju: false, pw: true,  aakash: false },
  { feature: 'Privacy-first (no ads)',     us: true,  byju: false, pw: false, aakash: false },
  { feature: 'Self-hosted / no cloud',     us: true,  byju: false, pw: false, aakash: false },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 overflow-hidden relative border-y border-slate-200/80" id="why-us">
      {/* Background subtle light glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-wide relative z-10">

        {/* ── Header + illustration ───────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4 leading-tight">
              Why{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Global Minds Academy?
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-normal">
              We studied BYJU&apos;S, Physics Wallah, Vedantu, Khan Academy, Aakash, Allen,
              Embibe, Doubtnut, Unacademy, and 50+ more platforms — then built the best
              of all of them into one place, designed specifically for Tamil Nadu students.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Classes 6–12', 'JEE + NEET', 'TN State Board', 'CBSE + ICSE'].map((tag) => (
                <span key={tag} className="bg-blue-50 text-blue-800 text-xs font-semibold px-4 py-1.5 rounded-full border border-blue-200/70 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block h-72 rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm p-4">
            <StudyIllustration className="w-full h-full" />
          </div>
        </div>

        {/* ── 9 reasons grid ──────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group bg-white border border-slate-200/90 shadow-sm rounded-2xl p-6 hover:shadow-md hover:border-blue-400 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{r.emoji}</div>
              <h3 className="font-display font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">{r.desc}</p>
              <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 font-normal">
                {r.detail}
              </p>
            </div>
          ))}
        </div>

        {/* ── Comparison table ─────────────────────────────────────── */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70">
            <h3 className="font-display font-bold text-slate-900 text-lg">Feature Comparison</h3>
            <p className="text-xs text-slate-500 mt-1">
              ✓ available &nbsp;·&nbsp; — not available &nbsp;·&nbsp; Based on publicly observed platform features as of October 2026.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70">
                  <th className="text-left px-6 py-3.5 text-slate-700 font-bold text-xs uppercase tracking-wider">Feature</th>
                  <th className="px-4 py-3.5 text-blue-800 font-black text-xs uppercase tracking-wider bg-blue-50/60">GMA</th>
                  <th className="px-4 py-3.5 text-slate-600 font-semibold text-xs uppercase tracking-wider">BYJU&apos;S</th>
                  <th className="px-4 py-3.5 text-slate-600 font-semibold text-xs uppercase tracking-wider">PW</th>
                  <th className="px-4 py-3.5 text-slate-600 font-semibold text-xs uppercase tracking-wider">Aakash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisons.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5 text-slate-800 text-sm font-medium">{row.feature}</td>
                    {[row.us, row.byju, row.pw, row.aakash].map((val, i) => (
                      <td key={i} className={`px-4 py-3.5 text-center ${i === 0 ? 'bg-blue-50/30' : ''}`}>
                        {val
                          ? <CheckCircle2 className={`w-5 h-5 mx-auto ${i === 0 ? 'text-blue-600' : 'text-slate-400'}`} />
                          : <span className="text-slate-300 text-lg">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-6 py-3 text-xs text-slate-500 border-t border-slate-200 bg-slate-50">
            GMA = Global Minds Academy. PW = Physics Wallah. Comparison based on publicly available feature information.
          </p>
        </div>
      </div>
    </section>
  );
}
