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
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.3),transparent_60%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <ClipboardCheck className="w-4 h-4 text-amber-300" />
                Free · Instant Results
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                Diagnostic Test
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 max-w-2xl">
                Not sure where to begin? Our Diagnostic Test analyses your current knowledge level and creates a personalised learning roadmap so you study what actually matters.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl">
                  Take the Test <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10">
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
