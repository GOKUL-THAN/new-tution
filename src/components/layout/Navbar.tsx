'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu, X, ChevronDown, BookOpen, FlaskConical,
  Award, GraduationCap, Search, LogIn,
  Trophy, Users, Globe, Calendar, Clock, Target, Zap, FileText as FileIcon,
} from 'lucide-react';

const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Programmes',
    children: [
      { label: 'School Tuition (6–12)', href: '/school-tuition',  icon: BookOpen,      desc: 'CBSE, ICSE & State Board' },
      { label: 'JEE Preparation',       href: '/jee',             icon: FlaskConical,  desc: 'Main & Advanced' },
      { label: 'NEET Preparation',      href: '/neet',            icon: Award,         desc: 'UG Medical Entrance' },
      { label: 'Entrance Exams',        href: '/entrance-exams',  icon: GraduationCap, desc: 'BITSAT, VITEEE & more' },
      { label: 'Olympiads',             href: '/olympiads',       icon: Trophy,        desc: 'IMO, NSO, HBCSE' },
      { label: 'Scholarships',          href: '/scholarships',    icon: Award,         desc: 'Scholarship guidance' },
      { label: 'Batches',               href: '/batches',         icon: Users,         desc: 'Foundation, JEE, NEET, Crash' },
    ],
  },
  {
    label: 'Curriculum',
    children: [
      { label: 'All Boards',    href: '/boards',      desc: 'CBSE, ICSE, TN State Board' },
      { label: 'Classes 6–12',  href: '/classes',     desc: 'Grade-wise learning' },
      { label: 'Subjects',      href: '/subjects',    desc: 'Browse by subject' },
      { label: 'Courses',       href: '/courses',     desc: 'Full course catalogue' },
      { label: 'Curriculum',    href: '/curriculum',  desc: 'Board → Subject → Chapter' },
      { label: 'Online Learning',href: '/online-learning',  desc: 'Live + recorded classes' },
      { label: 'Offline Classes',href: '/offline-classes',  desc: 'In-person batches' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Free Resources',       href: '/free-resources',       icon: BookOpen,  desc: 'Notes, worksheets, formulas' },
      { label: 'NCERT Solutions',       href: '/ncert-solutions',      icon: BookOpen,  desc: 'Class 6–12 chapter solutions' },
      { label: 'Previous Year Papers',  href: '/previous-year-papers', icon: FileIcon,  desc: 'JEE, NEET, CBSE, TN Board' },
      { label: 'Official Resources',    href: '/official-resources',   icon: Globe,     desc: 'NCERT, DIKSHA, NTA, CBSE' },
      { label: 'Exam Calendar',         href: '/exam-calendar',        icon: Calendar,  desc: 'All exam dates 2025–26' },
      { label: 'Study Planner',         href: '/study-planner',        icon: Clock,     desc: 'Plan your preparation' },
      { label: 'Diagnostic Test',       href: '/diagnostic-test',      icon: Target,    desc: 'Know your level' },
      { label: 'Practice Hub',          href: '/practice',             icon: Zap,       desc: 'Chapter drills & speed tests' },
    ],
  },
  {
    label: 'Explore',
    children: [
      { label: 'College Guide',   href: '/college-guide',  desc: 'IITs, NITs, AIIMS & TN colleges' },
      { label: 'Career Paths',    href: '/career-paths',   desc: 'Engineering, Medicine, Commerce' },
      { label: 'JEE Main',        href: '/jee-main',       desc: 'JEE Main complete guide' },
      { label: 'JEE Advanced',    href: '/jee-advanced',   desc: 'JEE Advanced — IIT pathway' },
      { label: 'Admissions',      href: '/admissions',     desc: 'Enrolment process' },
    ],
  },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="/logo.svg"
              alt="Global Minds Academy"
              width={44}
              height={44}
              priority
              className="transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className={`font-display font-black text-base uppercase tracking-wide transition-colors ${
                  scrolled ? 'text-[#0D2B3E]' : 'text-white'
                }`}
              >
                GLOBAL MINDS
              </span>
              <span
                className={`text-[9px] uppercase tracking-widest font-semibold transition-colors ${
                  scrolled ? 'text-[#1A6B5A]' : 'text-[#F5C518]'
                }`}
              >
                BUILD SKILLS | OWN THE FUTURE
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ──────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      scrolled
                        ? 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in z-50">
                      <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 p-3 min-w-[260px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-brand-50 transition-colors group/item"
                          >
                            {'icon' in child && child.icon && (
                              <child.icon className="w-4 h-4 text-brand-500 mt-0.5 shrink-0 group-hover/item:text-brand-600" />
                            )}
                            <div>
                              <p className="text-sm font-semibold text-gray-900 group-hover/item:text-brand-700">
                                {child.label}
                              </p>
                              {child.desc && (
                                <p className="text-xs text-gray-500 mt-0.5">{child.desc}</p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    scrolled
                      ? 'text-gray-700 hover:text-brand-600 hover:bg-brand-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* ── Right actions ────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <Link
              href="/courses"
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors ${
                scrolled ? 'text-gray-600 hover:text-brand-600' : 'text-white/80 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Search</span>
            </Link>

            <Link href="/login" className="btn-ghost hidden sm:inline-flex">
              <LogIn className="w-4 h-4" />
              Login
            </Link>

            <Link
              href="/register"
              className="btn-primary btn-sm !bg-accent-500 !text-[#0D2B3E] hover:!bg-accent-600 font-bold shadow-lg shadow-accent-500/30"
            >
              Get Started
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ──────────────────────────────────────────── */}
        {isOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 mb-4 p-4 animate-fade-in border border-gray-100">
            {/* Mobile logo row */}
            <div className="flex items-center gap-2 px-2 pb-4 border-b border-gray-100 mb-2">
              <Image src="/logo.svg" alt="Global Minds Academy" width={36} height={36} />
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-sm text-[#0D2B3E] uppercase tracking-wide">GLOBAL MINDS</span>
                <span className="text-[9px] text-[#1A6B5A] uppercase tracking-widest font-semibold">BUILD SKILLS | OWN THE FUTURE</span>
              </div>
            </div>

            <div className="space-y-1">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-brand-50"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 space-y-1 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-brand-50"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-secondary"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary !bg-accent-500 !text-[#0D2B3E] font-bold"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
