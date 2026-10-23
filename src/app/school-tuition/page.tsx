import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, CheckCircle2, Star, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'School Tuition — Classes 1–12 All Boards',
  description:
    'Comprehensive school tuition for Classes 1–12 covering CBSE, ICSE, ISC, Tamil Nadu State Board, and TN Matriculation. Expert faculty, structured curriculum, and personalised learning.',
};

const boards = ['CBSE', 'ICSE', 'ISC', 'TN State Board', 'TN Matriculation'];

const features = [
  { icon: BookOpen, title: 'Board-Aligned Content', desc: 'Every lesson follows the official syllabus — no extra, no gaps.' },
  { icon: Star, title: 'Expert Faculty', desc: 'Experienced teachers with strong subject knowledge and classroom practice.' },
  { icon: Clock, title: 'Flexible Scheduling', desc: 'Choose online live classes, recorded sessions, or offline batches.' },
  { icon: Users, title: 'Small Batches', desc: 'Limited batch sizes ensure personalised attention for every student.' },
  { icon: GraduationCap, title: 'Exam Preparation', desc: 'Board exam-focused practice with past papers, mock tests, and revision.' },
  { icon: CheckCircle2, title: 'Progress Tracking', desc: 'Weekly assessments and parent reports keep everyone aligned.' },
];

const classGroups = [
  { label: 'Primary (1–5)', range: [1, 5], color: 'from-emerald-400 to-teal-500', subjects: ['English', 'Mathematics', 'EVS / Science', 'Hindi / Tamil'] },
  { label: 'Middle School (6–8)', range: [6, 8], color: 'from-blue-400 to-indigo-500', subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi / Tamil'] },
  { label: 'Secondary (9–10)', range: [9, 10], color: 'from-violet-500 to-purple-600', subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Second Language'] },
  { label: 'Senior Secondary (11–12)', range: [11, 12], color: 'from-rose-500 to-orange-500', subjects: ['PCM / PCB / Commerce / Arts streams'] },
];

export default function SchoolTuitionPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.3),transparent_60%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <BookOpen className="w-4 h-4 text-emerald-300" />
                Classes 1–12 · All Boards
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                School Tuition for Every Class and Board
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 max-w-2xl">
                Structured, board-aligned tuition from Class 1 to Class 12. Live classes, recorded lessons, doubt support, and exam preparation — all in one place.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {boards.map((b) => (
                  <span key={b} className="px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm">
                    {b}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10">
                  Talk to a Counsellor
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Why Choose Global Minds Academy</h2>
            <p className="section-subtitle text-center mb-12">Everything a student needs to excel — under one roof.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="card-hover p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Class Groups */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Pick Your Class Group</h2>
            <p className="section-subtitle text-center mb-12">Curriculum and teaching approach tailored to each stage of learning.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {classGroups.map((group) => (
                <div key={group.label} className="card p-6 sm:p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{group.label}</h3>
                  <ul className="space-y-2 mb-5">
                    {group.subjects.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                  <Link href="/classes" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                    Browse Classes {group.range[0]}–{group.range[1]} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-600">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Begin?</h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto">
              Join students from across Tamil Nadu who are learning smarter with Global Minds Academy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 shadow-xl">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
