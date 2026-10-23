import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Target, BookOpen, GraduationCap, CheckCircle2, Atom, Clock, FileText, BarChart3, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JEE Preparation — Main & Advanced',
  description: 'Prepare for JEE Main and JEE Advanced with structured courses, mock tests, chapter-wise practice, and personalised analytics from Global Minds Academy.',
};

export default function JEEPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.2),transparent_50%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <Atom className="w-4 h-4 text-amber-300" />
                Engineering Entrance
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                JEE Main & Advanced Preparation
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 max-w-2xl">
                Structured preparation for India&apos;s most competitive engineering entrance examinations.
                Master Physics, Chemistry, and Mathematics with expert-designed courses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn bg-white text-brand-700 hover:bg-gray-50 shadow-xl px-6 py-3 text-sm font-semibold rounded-xl">
                  Start JEE Prep <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/courses" className="btn border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 text-sm rounded-xl">
                  View JEE Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {[
                {
                  title: 'JEE Main', authority: 'National Testing Agency (NTA)',
                  desc: 'JEE Main is the gateway to NITs, IIITs, and other government-funded engineering institutions. It tests concepts in Physics, Chemistry, and Mathematics at the Class 11–12 level.',
                  features: ['Computer-based exam', 'Multiple sessions per year', 'MCQ + Numerical questions', 'Pathway to 31 NITs, 26 IIITs, and more'],
                  color: 'from-blue-600 to-indigo-600',
                },
                {
                  title: 'JEE Advanced', authority: 'Conducting IIT (rotates annually)',
                  desc: 'JEE Advanced is the entrance to the Indian Institutes of Technology (IITs). Only JEE Main qualifiers can appear. It tests deep conceptual understanding and problem-solving ability.',
                  features: ['Two papers (Paper 1 & Paper 2)', 'Advanced problem-solving', 'Requires JEE Main qualification', 'Entry to 23 IITs'],
                  color: 'from-violet-600 to-purple-600',
                },
              ].map((exam) => (
                <div key={exam.title} className="card p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exam.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">{exam.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">Conducted by: {exam.authority}</p>
                  <p className="text-gray-600 mb-5 leading-relaxed">{exam.desc}</p>
                  <ul className="space-y-2">
                    {exam.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="section-title text-2xl mb-8 text-center">What We Offer for JEE</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: BookOpen, title: 'Complete Courses', desc: 'Physics, Chemistry & Maths for Class 11–12' },
                { icon: ClipboardCheck, title: 'Mock Tests', desc: 'Full-length & sectional JEE-pattern tests' },
                { icon: FileText, title: 'Study Material', desc: 'Notes, formula sheets & worked examples' },
                { icon: BarChart3, title: 'Analytics', desc: 'Score trends, accuracy & weak topics' },
              ].map((f, i) => (
                <div key={i} className="card-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-xs text-gray-400">
                Examination dates, patterns, and eligibility criteria change annually. Always verify the latest information from the official JEE Main (jeemain.nta.nic.in) and JEE Advanced (jeeadv.ac.in) websites.
                Global Minds Academy is an independent preparation platform and is not affiliated with NTA, any IIT, or JoSAA.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
