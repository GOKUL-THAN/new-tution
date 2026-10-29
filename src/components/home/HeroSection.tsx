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
    color: 'from-[#1A6B5A] to-teal-400',
  },
  {
    icon: GraduationCap,
    title: 'Entrance Exam Prep',
    desc: 'JEE Main, JEE Advanced, NEET UG & more',
    color: 'from-[#D4A017] to-[#F5C518]',
  },
  {
    icon: Users,
    title: 'Personalised Learning',
    desc: 'Adaptive study plans tailored to your pace',
    color: 'from-rose-500 to-pink-500',
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
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background — Global Minds teal gradient */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,197,24,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,107,90,0.18),transparent_55%)]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#F5C518]/8 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#1A6B5A]/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container-wide relative z-10 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left content ─────────────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#F5C518]" />
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
                <p className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-wide leading-none">
                  GLOBAL MINDS
                </p>
                <p className="text-[11px] text-[#F5C518] uppercase tracking-widest font-semibold mt-0.5">
                  BUILD SKILLS | OWN THE FUTURE
                </p>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1] mb-5 animate-fade-up">
              Unlock Your
              <span className="block mt-1 bg-gradient-to-r from-[#F5C518] via-[#F9D85A] to-[#F5C518] bg-clip-text text-transparent">
                Academic Potential
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/75 max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
              Comprehensive learning for Classes 6–12, JEE, NEET, and competitive exams.
              Personalised study plans, structured curriculum, and resources aligned with
              CBSE, ICSE, and Tamil Nadu State Board.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-5 justify-center lg:justify-start mb-8 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {badges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <b.icon className="w-4 h-4 text-[#F5C518]" />
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Link
                href="/register"
                className="btn bg-[#F5C518] text-[#0D2B3E] hover:bg-[#F9D85A] shadow-xl shadow-[#F5C518]/25 px-8 py-4 text-base font-bold rounded-2xl w-full sm:w-auto group"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="btn border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base rounded-2xl w-full sm:w-auto"
              >
                <Play className="w-5 h-5" />
                Explore Courses
              </Link>
            </div>
          </div>

          {/* ── Right — feature cards ─────────────────────────────── */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom board badges */}
        <div className="mt-14 pt-8 border-t border-white/10 animate-fade-up" style={{ animationDelay: '700ms' }}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/50">
            {boardBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#F5C518]/60" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
