'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Play, BookOpen, GraduationCap, Users, Star,
  Sparkles, Target, TrendingUp, CheckCircle2,
} from 'lucide-react';

const badges = [
  { icon: BookOpen,    label: 'Classes 6–12' },
  { icon: Target,      label: 'JEE & NEET' },
  { icon: TrendingUp,  label: 'Personalised Learning' },
];

const boardBadges = [
  'CBSE Aligned', 'ICSE Aligned', 'TN State Board',
  'Samacheer Kalvi', 'JEE Main & Advanced', 'NEET UG',
];

const featureCards = [
  {
    icon: BookOpen,
    title: 'Multi-Board Curriculum',
    desc: 'CBSE, ICSE, ISC, TN State Board & Matriculation',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    icon: GraduationCap,
    title: 'Entrance Exam Prep',
    desc: 'JEE Main, JEE Advanced, NEET UG & more',
    color: 'from-indigo-600 to-blue-500',
  },
  {
    icon: Users,
    title: 'Personalised Learning',
    desc: 'Adaptive study plans tailored to your pace',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Star,
    title: '4.9 / 5.0 Rating',
    desc: 'Rated by students across 25+ countries',
    color: 'from-amber-500 to-orange-400',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-slate-200/80">
      {/* Background subtle light decorative glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.06),transparent_60%)] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating soft blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-300/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="container-wide relative z-10 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left content ─────────────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-sm font-semibold mb-6 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Premier Education Platform · Chennai, Tamil Nadu</span>
            </div>

            {/* Logo + Academy name */}
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6 animate-fade-up">
              <Image
                src="/logo.svg"
                alt="Global Minds Academy"
                width={64}
                height={64}
                priority
              />
              <div className="text-left">
                <p className="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase tracking-wide leading-none">
                  GLOBAL MINDS
                </p>
                <p className="text-[11px] text-blue-600 uppercase tracking-widest font-bold mt-0.5">
                  BUILD SKILLS | OWN THE FUTURE
                </p>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 leading-[1.1] mb-5 animate-fade-up">
              Unlock Your
              <span className="block mt-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Academic Potential
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '200ms' }}>
              Comprehensive learning for Classes 6–12, JEE, NEET, and competitive exams.
              Personalised study plans, structured curriculum, and resources aligned with
              CBSE, ICSE, and Tamil Nadu State Board.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-800 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-sm text-sm font-semibold">
                  <b.icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Link
                href="/register"
                className="btn bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25 px-8 py-4 text-base font-bold rounded-2xl w-full sm:w-auto group transition-all"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="btn bg-white text-slate-800 border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm px-8 py-4 text-base font-bold rounded-2xl w-full sm:w-auto transition-all"
              >
                <Play className="w-5 h-5 text-blue-600" />
                Explore Courses
              </Link>
            </div>
          </div>

          {/* ── Right — feature cards ─────────────────────────────── */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="group bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom board badges */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 animate-fade-up" style={{ animationDelay: '700ms' }}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-700 font-medium">
            {boardBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
