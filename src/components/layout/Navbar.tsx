'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu, X, ChevronDown, GraduationCap, BookOpen, FlaskConical,
  Award, Users, Phone, LogIn, Search,
} from 'lucide-react';

const navigation = [
  {
    label: 'Programmes',
    children: [
      { label: 'School Tuition (1–12)', href: '/school-tuition', icon: BookOpen, desc: 'CBSE, ICSE & State Board' },
      { label: 'JEE Preparation', href: '/jee', icon: FlaskConical, desc: 'Main & Advanced' },
      { label: 'NEET Preparation', href: '/neet', icon: Award, desc: 'UG Medical Entrance' },
      { label: 'Entrance Exams', href: '/entrance-exams', icon: GraduationCap, desc: 'BITSAT, VITEEE & more' },
    ],
  },
  {
    label: 'Curriculum',
    children: [
      { label: 'All Boards', href: '/boards', icon: undefined, desc: 'CBSE, ICSE, TN State Board' },
      { label: 'Classes 1–12', href: '/classes', icon: undefined, desc: 'Grade-wise learning' },
      { label: 'Subjects', href: '/subjects', icon: undefined, desc: 'Browse by subject' },
      { label: 'Courses', href: '/courses', icon: undefined, desc: 'Full course catalogue' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Free Resources', href: '/free-resources', icon: undefined, desc: 'Notes, worksheets & more' },
      { label: 'Study Planner', href: '/study-planner', icon: undefined, desc: 'Plan your preparation' },
      { label: 'Diagnostic Test', href: '/diagnostic-test', icon: undefined, desc: 'Know your level' },
      { label: 'Olympiads', href: '/olympiads', icon: undefined, desc: 'National & international' },
    ],
  },
  { label: 'Faculty', href: '/teachers' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-600/30 group-hover:shadow-brand-600/50 transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className={`font-display font-bold text-lg leading-tight block ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Global Minds
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-medium ${scrolled ? 'text-brand-600' : 'text-brand-200'}`}>
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
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
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in">
                      <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 p-3 min-w-[280px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-brand-50 transition-colors group"
                          >
                            {child.icon && (
                              <child.icon className="w-5 h-5 text-brand-500 mt-0.5 group-hover:text-brand-600 transition-colors" />
                            )}
                            <div>
                              <div className="text-sm font-semibold text-gray-900 group-hover:text-brand-700">
                                {child.label}
                              </div>
                              {child.desc && (
                                <div className="text-xs text-gray-500 mt-0.5">{child.desc}</div>
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

          {/* Right actions */}
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

            <Link href="/register" className="btn-primary btn-sm">
              Get Started
            </Link>

            {/* Mobile menu button */}
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

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 mb-4 p-4 animate-fade-in border border-gray-100">
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
                className="block w-full text-center btn-primary"
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
