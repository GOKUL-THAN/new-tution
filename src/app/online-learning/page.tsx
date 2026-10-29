import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Video, MessageCircle, BarChart3, BookOpen, Clock, Globe, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online Learning — Live Classes & Recorded Lessons',
  description:
    'Learn from anywhere with Global Minds Academy\'s online learning platform. Live classes, recorded video lessons, doubt sessions, and progress tracking for Classes 6–12, JEE, and NEET.',
};

const features = [
  { icon: Video, title: 'Live Classes', desc: 'Join interactive live sessions with your teacher in real time. Ask questions and get answers instantly.' },
  { icon: BookOpen, title: 'Recorded Lessons', desc: 'Missed a class? Watch it anytime. All sessions are recorded and available in your dashboard.' },
  { icon: MessageCircle, title: 'Doubt Resolution', desc: 'Post doubts anytime and get responses from teachers within a few hours.' },
  { icon: BarChart3, title: 'Progress Tracking', desc: 'Track lessons watched, tests taken, and topics completed with clear visual dashboards.' },
  { icon: Clock, title: 'Learn at Your Pace', desc: 'Pause, rewind, and replay lessons as many times as you need.' },
  { icon: Globe, title: 'Access Anywhere', desc: 'Study on any device — laptop, tablet, or smartphone — at home or on the go.' },
];

const highlights = [
  'HD video streaming for all classes',
  'Interactive whiteboards in live sessions',
  'Class notes and PDF downloads',
  'Chapter-wise and topic-wise filtering',
  'Personalised study recommendations',
  'Parental access and progress reports',
];

export default function OnlineLearningPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-indigo-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_60%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <Video className="w-4 h-4 text-emerald-300" />
                Live & Recorded · Any Device
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                Online Learning
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 max-w-2xl">
                High-quality education from expert teachers — live, recorded, or on demand.
                Access everything you need from any device, anywhere in India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/courses" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10">
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Platform Features</h2>
            <p className="section-subtitle text-center mb-12">Built for focused, effective online learning.</p>
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

        {/* Highlights */}
        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            <h2 className="section-title text-center mb-3">What&apos;s Included</h2>
            <p className="section-subtitle text-center mb-12">Everything you need to learn effectively online.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-600">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Learn Online?
            </h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto">
              Sign up free today and access live classes, recorded lessons, and study materials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 shadow-xl">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10">
                Talk to Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
