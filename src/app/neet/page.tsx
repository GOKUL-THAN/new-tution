import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Stethoscope, BookOpen, CheckCircle2, BarChart3, FileText, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NEET UG Preparation',
  description: 'Prepare for NEET UG with comprehensive Biology, Physics & Chemistry courses, mock tests, and study material from Global Minds Academy.',
};

export default function NEETPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.2),transparent_50%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <Stethoscope className="w-4 h-4 text-amber-300" />
                Medical Entrance
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                NEET UG Preparation
              </h1>
              <p className="text-lg text-emerald-100/80 mb-8 max-w-2xl">
                Comprehensive preparation for India&apos;s national medical entrance examination.
                Master Biology, Physics, and Chemistry with expert guidance and NEET-pattern mock tests.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn bg-white text-emerald-700 hover:bg-gray-50 shadow-xl px-6 py-3 text-sm font-semibold rounded-xl">
                  Start NEET Prep <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/courses" className="btn border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 text-sm rounded-xl">
                  View NEET Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="card p-8 mb-12 max-w-3xl mx-auto">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-1">NEET UG</h2>
                  <p className="text-sm text-gray-500 mb-4">Conducted by: National Testing Agency (NTA)</p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    NEET (National Eligibility cum Entrance Test) is the single entrance examination for
                    admission to MBBS, BDS, AYUSH, nursing, and other medical and allied health programmes
                    across India. The exam tests Class 11–12 level concepts in Physics, Chemistry, and Biology.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {[
                      'Physics, Chemistry & Biology', 'Pen-and-paper or CBT format',
                      '200 questions (180 to attempt)', '720 total marks',
                      'Negative marking (−1 for wrong)', 'Conducted once per year',
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="section-title text-2xl mb-8 text-center">Our NEET Preparation</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: BookOpen, title: 'Complete Courses', desc: 'Biology, Physics & Chemistry with NCERT focus' },
                { icon: ClipboardCheck, title: 'NEET Mock Tests', desc: 'Full-length 3-hour 20-min simulations' },
                { icon: FileText, title: 'Study Material', desc: 'Chapter notes, diagrams & NCERT summaries' },
                { icon: BarChart3, title: 'Performance Analytics', desc: 'Track accuracy, speed & topic mastery' },
              ].map((f, i) => (
                <div key={i} className="card-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-xs text-gray-400">
                NEET examination pattern, syllabus, and eligibility are subject to change. Always verify the latest information from the official NEET website (neet.nta.nic.in).
                Global Minds Academy is an independent preparation platform and is not affiliated with NTA or any medical council.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
