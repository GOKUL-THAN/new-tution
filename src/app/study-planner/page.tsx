import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Calendar, Target, Clock, BarChart3, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study Planner — Organise Your Preparation',
  description:
    'Use the Global Minds Academy Study Planner to organise your daily and weekly study schedule, set goals, track progress, and stay on top of your exam preparation.',
};

const features = [
  { icon: Calendar, title: 'Daily & Weekly Schedules', desc: 'Build a personalised timetable that fits around your school and activities.' },
  { icon: Target, title: 'Goal Setting', desc: 'Set chapter completion goals and track how close you are to meeting them.' },
  { icon: Clock, title: 'Session Timers', desc: 'Stay focused with built-in session timers and regular reminder alerts.' },
  { icon: BarChart3, title: 'Progress Analytics', desc: 'Visual charts showing completed topics, time spent, and study streaks.' },
  { icon: CheckCircle2, title: 'Task Checklists', desc: 'Mark topics, chapters, and revision tasks as done to stay organised.' },
  { icon: Zap, title: 'Smart Suggestions', desc: 'Get recommended study topics based on your weak areas and exam dates.' },
];

const steps = [
  { step: '1', title: 'Create an Account', desc: 'Sign up free to access the full Study Planner.' },
  { step: '2', title: 'Set Your Exam', desc: 'Select your board, class, and upcoming exam dates.' },
  { step: '3', title: 'Build Your Plan', desc: 'Choose subjects and the planner generates a suggested schedule.' },
  { step: '4', title: 'Study & Track', desc: 'Follow the plan, mark tasks done, and watch your progress grow.' },
];

export default function StudyPlannerPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-6 shadow-xs">
                <Calendar className="w-4 h-4 text-blue-600" />
                Organise · Plan · Succeed
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">
                Smart Study <span className="text-blue-600">Planner</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Stop studying randomly. Build a structured, realistic plan aligned to your exam dates.
                Track every chapter, session, and revision cycle — all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-colors">
                  Create My Plan <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors">
                  Login to Continue
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Planner Features</h2>
            <p className="section-subtitle text-center mb-12">Everything you need for structured, consistent preparation.</p>
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

        {/* How it works */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <h2 className="section-title text-center mb-3">How It Works</h2>
            <p className="section-subtitle text-center mb-12">Get started in four simple steps.</p>
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-display font-bold text-lg shrink-0 shadow-lg">
                    {s.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-600">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Plan Smarter?</h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto">
              Students who plan their study schedule perform better. Start yours today — it&apos;s free.
            </p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 shadow-xl">
              Create My Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
