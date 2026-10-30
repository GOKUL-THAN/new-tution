import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, ArrowRight, BookOpen, Target, Clock, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JEE Main Preparation — Global Minds Academy',
  description: 'Comprehensive JEE Main preparation for Paper 1 (B.E./B.Tech), Paper 2A (B.Arch) and Paper 2B (B.Planning). Full-length mock tests, structured curriculum, and personalised study plans.',
};

const subjects = [
  { name: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Electrostatics', 'Optics', 'Modern Physics', 'Waves & Sound'] },
  { name: 'Chemistry', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Electrochemistry', 'Chemical Bonding'] },
  { name: 'Mathematics', topics: ['Algebra', 'Calculus', 'Coordinate Geometry', 'Trigonometry', 'Vectors & 3D', 'Probability'] },
];

const examPattern = [
  { paper: 'Paper 1 — B.E. / B.Tech', subjects: 'Physics, Chemistry, Mathematics', questions: '90 questions (75 to attempt)', marks: '300 marks', duration: '3 hours' },
  { paper: 'Paper 2A — B.Arch', subjects: 'Mathematics, Aptitude, Drawing', questions: '82 questions', marks: '400 marks', duration: '3 hours' },
  { paper: 'Paper 2B — B.Planning', subjects: 'Mathematics, Aptitude, Planning', questions: '105 questions', marks: '400 marks', duration: '3 hours' },
];

const faqs = [
  { q: 'How many times can I appear for JEE Main?', a: 'Candidates can appear for JEE Main up to three consecutive years. Verify current rules from the official NTA notification.' },
  { q: 'Is JEE Main required for JEE Advanced?', a: 'Yes. Only candidates who qualify JEE Main (top 2.5 lakh) are eligible to appear for JEE Advanced.' },
  { q: 'What is the eligibility for JEE Main?', a: 'Candidates must have passed or be appearing in Class 12 with Physics and Mathematics as compulsory subjects. Verify current eligibility criteria from the official NTA notification.' },
  { q: 'Does JEE Main have negative marking?', a: 'MCQ questions carry –1 for wrong answers. Numerical value questions have no negative marking. Verify the current marking scheme from the official notification.' },
];

export default function JEEMainPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/entrance-exams" className="hover:text-slate-900 transition-colors">Entrance Exams</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">JEE Main</span>
            </nav>
            <div className="max-w-3xl">
              <span className="inline-block bg-blue-50 text-blue-900 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-200/80 mb-4 shadow-xs">
                Engineering Entrance
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 leading-tight tracking-tight">
                JEE Main <span className="text-blue-600">Preparation</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Joint Entrance Examination (Main) — conducted by NTA for admission to NITs, IIITs, and other centrally funded technical institutions. Qualifying score also determines eligibility for JEE Advanced.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn bg-blue-600 text-white hover:bg-blue-700 px-7 py-3.5 rounded-xl font-bold shadow-md shadow-blue-500/25 inline-flex items-center gap-2 transition-colors">
                  Start Preparation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-7 py-3.5 rounded-xl font-semibold shadow-xs transition-colors">
                  Free Counselling
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Exam pattern */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-2">Exam Pattern</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Based on the standard NTA exam pattern. Always verify the current year&apos;s pattern from the official JEE Main notification at{' '}
            <a href="https://jeemain.nta.nic.in/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">jeemain.nta.nic.in</a>.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {examPattern.map((p) => (
              <div key={p.paper} className="card p-6">
                <h3 className="font-display font-bold text-gray-900 text-sm mb-4 leading-snug">{p.paper}</h3>
                <dl className="space-y-2 text-sm">
                  {[
                    { label: 'Subjects', value: p.subjects },
                    { label: 'Questions', value: p.questions },
                    { label: 'Total Marks', value: p.marks },
                    { label: 'Duration', value: p.duration },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between gap-2">
                      <dt className="text-gray-500">{item.label}</dt>
                      <dd className="text-gray-900 font-medium text-right">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="section-title mb-2">Syllabus Overview</h2>
          <p className="text-gray-500 mb-8 text-sm">
            Key topic areas. For the complete official syllabus refer to the NTA notification.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((sub) => (
              <div key={sub.name} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900">{sub.name}</h3>
                </div>
                <ul className="space-y-2">
                  {sub.topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation tips */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-6">Our Preparation Approach</h2>
              <div className="space-y-4">
                {[
                  { icon: Target, title: 'Concept Clarity First', desc: 'Strong fundamentals over shortcuts. We build deep conceptual understanding aligned with NCERT and beyond.' },
                  { icon: FileText, title: 'Chapter-wise Practice', desc: 'Structured question banks with increasing difficulty — easy to very hard — with detailed explanations.' },
                  { icon: Clock, title: 'Timed Mock Tests', desc: 'Full-length JEE Main pattern mocks with NTA-style interface, automatic scoring, and performance analytics.' },
                  { icon: BookOpen, title: 'Error Analysis', desc: 'Identify weak topics through our analytics dashboard and get targeted revision recommendations.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <Link href="/register" className="btn-primary">Enrol Now</Link>
                <Link href="/courses" className="btn-secondary">View Courses</Link>
              </div>
            </div>
            <div className="card p-6 bg-brand-50 border-brand-200">
              <h3 className="font-display font-bold text-gray-900 mb-4">Official Resources</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'JEE Main Official Website', url: 'https://jeemain.nta.nic.in/' },
                  { label: 'NTA Official Website', url: 'https://www.nta.ac.in/' },
                  { label: 'JoSAA Counselling', url: 'https://josaa.admissions.nic.in/' },
                  { label: 'NCERT Textbooks', url: 'https://ncert.nic.in/' },
                ].map((r) => (
                  <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-brand-50 border border-brand-100 hover:border-brand-300 transition-colors group">
                    <span className="text-gray-700 group-hover:text-brand-700">{r.label}</span>
                    <ArrowRight className="w-4 h-4 text-brand-400 group-hover:text-brand-600" />
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Always verify dates and eligibility from the official NTA notification. We are an independent preparation platform and not affiliated with NTA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="section-title mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="card p-5 group">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900 text-sm">
                  {faq.q}
                  <span className="ml-4 text-brand-500 shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
