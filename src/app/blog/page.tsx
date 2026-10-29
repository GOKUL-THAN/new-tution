import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Clock, Tag, BookOpen, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — Study Tips, Exam Updates & Career Guidance | Global Minds Academy',
  description:
    'Expert study tips, JEE/NEET exam updates, board exam strategies, career guidance, and education news from Global Minds Academy.',
};

/* ── Blog posts ─────────────────────────────────────────────────────────────
   These are original academy-authored articles. No content is copied from
   other platforms. Inspired by Allen, Sri Chaitanya, Motion, Resonance blogs.
   ─────────────────────────────────────────────────────────────────────────── */
const posts = [
  {
    slug: 'how-to-use-error-notebook',
    category: 'Study Strategy',
    categoryColor: 'bg-violet-100 text-violet-700',
    title: 'How to Build and Use an Error Notebook for JEE & NEET',
    excerpt:
      'An error notebook is one of the most underrated preparation tools. Learn how to set it up, what to record, and how to use it for targeted revision that actually improves your score.',
    readTime: '6 min read',
    date: 'October 18, 2026',
    tags: ['JEE', 'NEET', 'Study Tips', 'Revision'],
    featured: true,
    color: 'from-violet-600 to-violet-800',
    icon: '📓',
  },
  {
    slug: 'jee-main-2026-preparation-plan',
    category: 'JEE',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'JEE Main 2026 — Month-by-Month Preparation Plan for Class 12 Students',
    excerpt:
      'A realistic, chapter-wise monthly plan from August to January. Covers Physics, Chemistry, and Mathematics with DPP targets, mock test frequency, and revision milestones.',
    readTime: '8 min read',
    date: 'October 15, 2026',
    tags: ['JEE Main', 'Preparation Plan', 'Class 12'],
    featured: true,
    color: 'from-blue-600 to-indigo-700',
    icon: '⚛️',
  },
  {
    slug: 'neet-biology-ncert-strategy',
    category: 'NEET',
    categoryColor: 'bg-emerald-100 text-emerald-700',
    title: 'NEET Biology: Why NCERT is Everything and How to Master It',
    excerpt:
      '95% of NEET Biology questions come directly from NCERT. Learn the line-by-line reading strategy, diagram practice method, and how to use NCERT exemplar for the remaining 5%.',
    readTime: '7 min read',
    date: 'October 10, 2026',
    tags: ['NEET', 'Biology', 'NCERT', 'Strategy'],
    featured: false,
    color: 'from-emerald-600 to-teal-700',
    icon: '🩺',
  },
  {
    slug: 'cbse-class-10-board-exam-tips',
    category: 'Board Exams',
    categoryColor: 'bg-orange-100 text-orange-700',
    title: 'CBSE Class 10 Board Exam 2026 — Complete Preparation Strategy',
    excerpt:
      'How to score 90%+ in CBSE Class 10. Covers subject-wise strategy, time table for the last 3 months, important chapters, and how to attempt the paper for maximum marks.',
    readTime: '9 min read',
    date: 'October 5, 2026',
    tags: ['CBSE', 'Class 10', 'Board Exam', 'Strategy'],
    featured: false,
    color: 'from-orange-600 to-red-600',
    icon: '📚',
  },
  {
    slug: 'tn-board-samacheer-kalvi-tips',
    category: 'TN Board',
    categoryColor: 'bg-[#D4A017]/20 text-[#D4A017]',
    title: 'Tamil Nadu State Board Class 12 — Scoring 500/600 in 5 Steps',
    excerpt:
      'Samacheer Kalvi Class 12 requires a different strategy than CBSE. Learn chapter weighting, question patterns, and how to write answers that fetch full marks in TN board exams.',
    readTime: '7 min read',
    date: 'September 28, 2026',
    tags: ['TN State Board', 'Samacheer Kalvi', 'Class 12'],
    featured: false,
    color: 'from-[#D4A017] to-amber-700',
    icon: '🌴',
  },
  {
    slug: 'time-management-competitive-exams',
    category: 'Study Strategy',
    categoryColor: 'bg-violet-100 text-violet-700',
    title: 'Time Management in JEE & NEET — 5 Techniques from Toppers',
    excerpt:
      'How AIR toppers manage their 3-hour exam time. Covers section-switching strategy, time allocation per question type, and what to do when stuck on a difficult problem.',
    readTime: '5 min read',
    date: 'September 22, 2026',
    tags: ['JEE', 'NEET', 'Time Management', 'Exam Strategy'],
    featured: false,
    color: 'from-rose-600 to-pink-700',
    icon: '⏱',
  },
  {
    slug: 'difference-jee-main-advanced',
    category: 'JEE',
    categoryColor: 'bg-blue-100 text-blue-700',
    title: 'JEE Main vs JEE Advanced — Key Differences Students Get Wrong',
    excerpt:
      'Many students prepare for JEE Main and JEE Advanced the same way — and that is a critical mistake. This article explains the fundamental differences in question types, syllabus depth, and preparation approach.',
    readTime: '6 min read',
    date: 'September 15, 2026',
    tags: ['JEE Main', 'JEE Advanced', 'Comparison'],
    featured: false,
    color: 'from-indigo-600 to-violet-700',
    icon: '🎓',
  },
  {
    slug: 'olympiad-preparation-guide',
    category: 'Olympiads',
    categoryColor: 'bg-amber-100 text-amber-700',
    title: 'How to Prepare for IMO and NSO Olympiads — A Complete Guide',
    excerpt:
      'School Olympiads test problem-solving at a depth far beyond textbooks. Learn the preparation timeline, recommended resources, and how Olympiad training strengthens your JEE preparation.',
    readTime: '8 min read',
    date: 'September 8, 2026',
    tags: ['Olympiad', 'IMO', 'NSO', 'HBCSE'],
    featured: false,
    color: 'from-amber-600 to-orange-700',
    icon: '🏆',
  },
  {
    slug: 'parent-guide-jee-neet-support',
    category: 'For Parents',
    categoryColor: 'bg-teal-100 text-teal-700',
    title: 'Parent\'s Guide: How to Support Your JEE/NEET Aspirant',
    excerpt:
      'The pressure of JEE/NEET preparation affects the whole family. This guide gives parents practical, evidence-based ways to support their child without adding to the pressure.',
    readTime: '6 min read',
    date: 'September 1, 2026',
    tags: ['Parents', 'JEE', 'NEET', 'Mental Health'],
    featured: false,
    color: 'from-teal-600 to-cyan-700',
    icon: '👨‍👩‍👧',
  },
];

const categories = [
  { name: 'All', count: posts.length },
  { name: 'JEE', count: posts.filter(p => p.category === 'JEE').length },
  { name: 'NEET', count: posts.filter(p => p.category === 'NEET').length },
  { name: 'Board Exams', count: posts.filter(p => p.category === 'Board Exams').length },
  { name: 'TN Board', count: posts.filter(p => p.category === 'TN Board').length },
  { name: 'Study Strategy', count: posts.filter(p => p.category === 'Study Strategy').length },
  { name: 'Olympiads', count: posts.filter(p => p.category === 'Olympiads').length },
  { name: 'For Parents', count: posts.filter(p => p.category === 'For Parents').length },
];

const featuredPosts = posts.filter(p => p.featured);
const regularPosts = posts.filter(p => !p.featured);

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-16 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs">
              <BookOpen className="w-4 h-4 text-[#1A6B5A]" />
              Study Tips · Exam Updates · Career Guidance
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Academic <span className="text-[#1A6B5A]">Insights &amp; Blog</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Expert articles from our educators on JEE, NEET, board exam strategies,
              career guidance, and effective learning techniques.
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
          <div className="container-wide py-3">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors bg-gray-50 border border-gray-200 text-gray-600 hover:bg-[#1A6B5A]/10 hover:border-[#1A6B5A]/40 hover:text-[#1A6B5A]"
                >
                  {cat.name}
                  <span className="bg-gray-200 text-gray-500 rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured posts */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-6">
              Featured Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Gradient header */}
                  <div className={`h-44 bg-gradient-to-br ${post.color} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-6xl opacity-80">{post.icon}</span>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/70 text-xs">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-gray-900 text-lg mb-3 group-hover:text-[#1A6B5A] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#1A6B5A] group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* All posts grid */}
            <h2 className="text-lg font-display font-bold text-gray-900 mb-6">
              All Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#1A6B5A]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{post.icon}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-sm mb-2 leading-snug group-hover:text-[#1A6B5A] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                        <Tag className="w-2.5 h-2.5" /> {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Official exam news links */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title mb-3">Official Exam News Sources</h2>
            <p className="text-gray-500 mb-8 text-sm">
              For the latest exam notifications, always check official sources directly.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'NTA Official Updates', url: 'https://www.nta.ac.in/', desc: 'JEE Main, NEET UG notifications' },
                { label: 'CBSE Notices', url: 'https://www.cbse.gov.in/', desc: 'Board exam dates and circulars' },
                { label: 'JEE Advanced Updates', url: 'https://jeeadv.ac.in/', desc: 'IIT admission notices' },
                { label: 'TN Education News', url: 'https://www.tnschools.gov.in/', desc: 'Tamil Nadu board updates' },
              ].map((r) => (
                <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:border-[#1A6B5A]/40 hover:shadow-sm transition-all group">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#1A6B5A] transition-colors leading-snug flex-1">
                      {r.label}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#1A6B5A] shrink-0 mt-0.5 transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500">{r.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe / register CTA */}
        <section className="section-padding bg-[#0D2B3E]">
          <div className="container-wide text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-3">
              Get New Articles in Your Dashboard
            </h2>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Register for a free account to get personalised article recommendations
              based on your board, class, and exam goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn !bg-[#F5C518] !text-[#0D2B3E] font-bold px-8 py-3">
                Create Free Account
              </Link>
              <Link href="/contact" className="btn border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3">
                Suggest a Topic
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
