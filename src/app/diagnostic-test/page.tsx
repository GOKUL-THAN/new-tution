import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, ClipboardCheck, BarChart3, Lightbulb, Target, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Diagnostic Test — Discover Your Learning Level',
  description:
    'Take the Global Minds Academy Diagnostic Test to identify your strengths, weaknesses, and the best learning path for your board or entrance exam preparation.',
};

const benefits = [
  { icon: Target, title: 'Know Your Starting Point', desc: 'Understand exactly where you stand before you begin your preparation.' },
  { icon: BarChart3, title: 'Identify Weak Areas', desc: 'Get a subject-wise and chapter-wise breakdown of your strengths and gaps.' },
  { icon: Lightbulb, title: 'Personalised Recommendations', desc: 'Receive course and topic suggestions tailored to your diagnostic results.' },
  { icon: CheckCircle2, title: 'Track Improvement', desc: 'Retake the test periodically to measure how far you have come.' },
];

const steps = [
  { step: '1', title: 'Register & Log In', desc: 'Create a free account and choose your board, class, and subjects.' },
  { step: '2', title: 'Take the Test', desc: 'Answer a short set of questions covering key concepts in your chosen subjects.' },
  { step: '3', title: 'Get Your Report', desc: 'View your detailed performance report instantly — chapter and topic level.' },
  { step: '4', title: 'Follow Your Path', desc: 'Use the recommendations to focus your study plan where it matters most.' },
];

export default function DiagnosticTestPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-6 shadow-xs">
                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                Free Assessment · Instant Results
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">
                Skill &amp; Knowledge <span className="text-blue-600">Diagnostic Test</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Not sure where to begin? Our Diagnostic Test analyses your current knowledge level and creates a personalised learning roadmap so you study what actually matters.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-colors">
                  Take the Test <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Why Take the Diagnostic Test?</h2>
            <p className="section-subtitle text-center mb-12">
              Students who start with a diagnostic test prepare more effectively and waste less time.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="card-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <h2 className="section-title text-center mb-3">How It Works</h2>
            <p className="section-subtitle text-center mb-12">Simple. Fast. Insightful.</p>
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
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Start With Clarity
            </h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto">
              The Diagnostic Test is free, takes less than 20 minutes, and gives you a clear picture of where to focus.
            </p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 shadow-xl">
              Take the Free Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
