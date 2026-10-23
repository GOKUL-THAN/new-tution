'use client';

import Link from 'next/link';
import {
  ArrowRight, Play, BookOpen, GraduationCap, Users, Star,
  Sparkles, Target, TrendingUp, CheckCircle2,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.1),transparent_50%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container-wide relative z-10 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Premier Education Platform for India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] mb-6 animate-fade-up">
              Unlock Your
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  Academic Potential
                </span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
              Comprehensive learning for Classes 1–12, JEE, NEET, and competitive exams.
              Expert faculty, personalised study plans, and a curriculum aligned with
              CBSE, ICSE, and Tamil Nadu State Board.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mb-10 animate-fade-up" style={{ animationDelay: '300ms' }}>
              {[
                { icon: BookOpen, label: 'Classes 1–12' },
                { icon: Target, label: 'JEE & NEET' },
                { icon: TrendingUp, label: 'Personalised Learning' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <item.icon className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Link
                href="/register"
                className="btn bg-white text-brand-700 hover:bg-gray-50 shadow-xl shadow-black/20 px-8 py-4 text-base font-semibold rounded-2xl w-full sm:w-auto group"
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

          {/* Right - Feature Cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '500ms' }}>
            {[
              {
                icon: BookOpen,
                title: 'Multi-Board Curriculum',
                desc: 'CBSE, ICSE, ISC, TN State Board & Matriculation',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: GraduationCap,
                title: 'Entrance Exam Prep',
                desc: 'JEE Main, JEE Advanced, NEET UG & more',
                color: 'from-violet-500 to-purple-500',
              },
              {
                icon: Users,
                title: 'Expert Faculty',
                desc: 'Experienced teachers with proven track records',
                color: 'from-rose-500 to-pink-500',
              },
              {
                icon: Star,
                title: 'Smart Analytics',
                desc: 'Track progress, identify strengths & areas for growth',
                color: 'from-amber-500 to-orange-500',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${600 + i * 100}ms` }}
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

        {/* Bottom badges */}
        <div className="mt-16 pt-8 border-t border-white/10 animate-fade-up" style={{ animationDelay: '700ms' }}>
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/50">
            {[
              'CBSE Aligned',
              'ICSE Aligned',
              'TN State Board',
              'Samacheer Kalvi',
              'JEE Main & Advanced',
              'NEET UG',
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400/60" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
