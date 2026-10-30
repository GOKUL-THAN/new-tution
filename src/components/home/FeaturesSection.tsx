import {
  Video, FileText, ClipboardCheck, BarChart3,
  Users, MessageCircle, Clock, Shield,
  BookOpen, Lightbulb, Zap, Globe,
  Target, Brain, Trophy, BookMarked,
  Repeat, Star,
} from 'lucide-react';
import LiveClassIllustration from '@/components/illustrations/LiveClassIllustration';
import AnalyticsIllustration from '@/components/illustrations/AnalyticsIllustration';

/* ── Feature data ─────────────────────────────────────────────────────── */
/* Sources: BYJU'S, Physics Wallah, Vedantu, Khan Academy, Embibe, Aakash */
const features = [
  {
    icon: Video,
    title: 'Live & Recorded Classes',
    desc: 'Interactive live sessions with expert teachers. All classes recorded for unlimited revision — just like Vedantu and PW.',
    tag: 'Live Learning',
    color: 'bg-blue-600',
    tagColor: 'bg-blue-50 text-blue-700',
  },
  {
    icon: ClipboardCheck,
    title: 'Full-Length Mock Tests',
    desc: 'JEE/NEET pattern mocks with NTA-style interface, auto-scoring, rank prediction, and detailed analytics.',
    tag: 'Assessment',
    color: 'bg-amber-500',
    tagColor: 'bg-amber-50 text-amber-700',
  },
  {
    icon: BarChart3,
    title: 'Smart Performance Analytics',
    desc: 'Track subject-wise accuracy, time per question, weak-topic detection, and score trend — inspired by Embibe analytics.',
    tag: 'Analytics',
    color: 'bg-emerald-600',
    tagColor: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: FileText,
    title: 'DPP — Daily Practice Problems',
    desc: 'Structured daily practice sheets just like Allen and Aakash — topic-wise, difficulty-sorted, with solutions.',
    tag: 'Practice',
    color: 'bg-violet-600',
    tagColor: 'bg-violet-50 text-violet-700',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Resolution',
    desc: 'Submit doubts with images, get replies from qualified teachers. Ticket-based system with response-time tracking.',
    tag: 'Support',
    color: 'bg-rose-500',
    tagColor: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Brain,
    title: 'Adaptive Practice',
    desc: 'Questions adjust to your level in real time — building from foundational to advanced, like Khan Academy mastery.',
    tag: 'Adaptive',
    color: 'bg-cyan-600',
    tagColor: 'bg-cyan-50 text-cyan-700',
  },
  {
    icon: BookMarked,
    title: 'Error Notebook',
    desc: 'Automatically saves wrong answers as revision cards. Review, re-attempt, and track improvement — from Unacademy.',
    tag: 'Revision',
    color: 'bg-orange-500',
    tagColor: 'bg-orange-50 text-orange-700',
  },
  {
    icon: Target,
    title: 'Syllabus Checklist',
    desc: 'Chapter-by-chapter completion tracker aligned to JEE/NEET/Board syllabus so nothing is missed.',
    tag: 'Planning',
    color: 'bg-indigo-600',
    tagColor: 'bg-indigo-50 text-indigo-700',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    desc: 'Daily and weekly study schedules with chapter prioritisation, revision slots, and deadline reminders.',
    tag: 'Planning',
    color: 'bg-blue-600',
    tagColor: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Users,
    title: 'Parent Dashboard',
    desc: 'Real-time visibility for parents — attendance, test scores, assignments, and teacher feedback in one place.',
    tag: 'Parents',
    color: 'bg-pink-500',
    tagColor: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Trophy,
    title: 'Rank & Score Predictor',
    desc: 'Estimate your JEE/NEET rank based on mock scores, accuracy, and difficulty using transparent rule-based logic.',
    tag: 'Insights',
    color: 'bg-amber-500',
    tagColor: 'bg-amber-50 text-amber-700',
  },
  {
    icon: Globe,
    title: 'Tamil & English Support',
    desc: 'Content available in both English and Tamil — ideal for TN State Board and regional learners.',
    tag: 'Language',
    color: 'bg-sky-500',
    tagColor: 'bg-sky-50 text-sky-700',
  },
  {
    icon: BookOpen,
    title: 'Multi-Board Content',
    desc: 'CBSE, ICSE, ISC, TN State Board, TN Matriculation — all syllabus-aligned in a single platform.',
    tag: 'Curriculum',
    color: 'bg-blue-600',
    tagColor: 'bg-blue-50 text-blue-700',
  },
  {
    icon: Repeat,
    title: 'Spaced Revision System',
    desc: 'Topics flagged for revision are scheduled at optimal intervals using spaced-repetition principles.',
    tag: 'Memory',
    color: 'bg-purple-600',
    tagColor: 'bg-purple-50 text-purple-700',
  },
  {
    icon: Zap,
    title: 'Instant Scoring',
    desc: 'Server-side scoring for MCQ, numerical, and integer-type questions — answers never sent to browser during tests.',
    tag: 'Assessment',
    color: 'bg-amber-600',
    tagColor: 'bg-amber-50 text-amber-700',
  },
  {
    icon: Lightbulb,
    title: 'Concept Maps & Summaries',
    desc: 'Visual concept maps, chapter summaries, formula sheets, and quick-revision notes for every topic.',
    tag: 'Resources',
    color: 'bg-lime-600',
    tagColor: 'bg-lime-50 text-lime-700',
  },
  {
    icon: Shield,
    title: 'Safe & Private',
    desc: 'Student data stays on your server. Privacy-first design — no advertising trackers, role-based access throughout.',
    tag: 'Security',
    color: 'bg-slate-600',
    tagColor: 'bg-slate-50 text-slate-600',
  },
  {
    icon: Star,
    title: 'Gamified Streaks & Badges',
    desc: 'Study streaks, achievement badges, and leaderboards keep students motivated — inspired by Duolingo and Khan Academy.',
    tag: 'Motivation',
    color: 'bg-red-500',
    tagColor: 'bg-red-50 text-red-600',
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-white overflow-hidden" id="features">
      <div className="container-wide">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-blue-200/60">
            Platform Features
          </span>
          <h2 className="section-title mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Excel
            </span>
          </h2>
          <p className="section-subtitle mx-auto">
            A complete learning ecosystem built by studying the best features of 60+ platforms —
            BYJU&apos;S, Physics Wallah, Khan Academy, Aakash, Allen, Embibe, Vedantu, and more.
          </p>
        </div>

        {/* ── Two hero illustration cards ──────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-14">
          {/* Live class card */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/30 to-sky-50 border border-blue-200 p-8 flex flex-col sm:flex-row items-center gap-6 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex-1 text-left">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-200/60">
                ● LIVE NOW
              </span>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
                Live Classes with Expert Teachers
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-4 font-normal">
                Join live sessions, ask doubts in real time, and access recordings anytime.
                Interactive whiteboards, polls, and chat — just like Vedantu and PW.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Live sessions','Recordings','Doubt chat','Whiteboard'].map((t) => (
                  <span key={t} className="text-xs bg-blue-100/80 text-blue-900 font-semibold px-3 py-1 rounded-full border border-blue-200/60">{t}</span>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-52 h-40 shrink-0">
              <LiveClassIllustration />
            </div>
          </div>

          {/* Analytics card */}
          <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50/40 to-slate-50 border border-blue-200 p-8 flex flex-col sm:flex-row items-center gap-6 overflow-hidden relative shadow-sm">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex-1 text-left">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-200/60">
                📊 ANALYTICS
              </span>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-2">
                Smart Performance Dashboard
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Subject accuracy, score trends, rank prediction, and weak-topic detection.
                Deeper insights than Embibe and Toppr — fully database-backed.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Score trends','Weak topics','Rank predictor','Parent view'].map((t) => (
                  <span key={t} className="text-xs bg-blue-100/80 text-blue-900 font-semibold px-3 py-1 rounded-full border border-blue-200/60">{t}</span>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-52 h-40 shrink-0">
              <AnalyticsIllustration />
            </div>
          </div>
        </div>

        {/* ── 18-feature grid ──────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group border border-slate-200/80 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 bg-white"
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-display font-bold text-gray-900 text-sm group-hover:text-[#1A6B5A] transition-colors">
                      {f.title}
                    </h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 font-medium mt-8">
          Feature set designed after analysing BYJU&apos;S, Physics Wallah, Khan Academy, Aakash, Allen,
          Vedantu, Embibe, Doubtnut, Testbook, Unacademy, and 50+ other platforms.
        </p>
      </div>
    </section>
  );
}
