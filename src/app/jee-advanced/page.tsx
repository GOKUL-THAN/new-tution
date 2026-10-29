import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, BookOpen, Zap, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JEE Advanced Preparation — Global Minds Academy',
  description: 'Expert JEE Advanced preparation for IIT admissions. Conceptual depth, problem-solving workshops, and full-length JEE Advanced pattern mock tests.',
};

const papers = [
  { name: 'Paper 1', details: '3 sections — Physics, Chemistry, Mathematics. Mixed question types including MCQ (single & multiple correct), numerical value, and matching.' },
  { name: 'Paper 2', details: '3 sections — Physics, Chemistry, Mathematics. Different question type mix each year. Both papers are mandatory.' },
];

const keyDifferences = [
  'More complex problems requiring multi-step reasoning',
  'Multiple-correct MCQ questions carry partial/zero marks for partial selection',
  'Integer-type and matching questions',
  'Questions test deep conceptual understanding, not formula recall',
  'Higher time pressure per question',
  'No fixed syllabus document — based on Class 11 and 12 NCERT and beyond',
];

export default function JEEAdvancedPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-brand-800 to-brand-700 text-white py-20">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-brand-200 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/jee" className="hover:text-white">JEE</Link>
            <span>/</span>
            <span className="text-white">JEE Advanced</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-violet-400/20 text-violet-200 text-xs font-semibold px-3 py-1 rounded-full border border-violet-400/30 mb-4">
              IIT Admission
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4 leading-tight">
              JEE Advanced Preparation
            </h1>
            <p className="text-xl text-brand-100 mb-8 leading-relaxed">
              The gateway to the IITs — among the most challenging undergraduate engineering entrance examinations in India. Conducted by one of the IITs on a rotational basis. Only JEE Main qualifiers (top ~2.5 lakh) are eligible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn bg-white text-brand-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
                Start Preparation <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/jee-main" className="btn border-2 border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold">
                JEE Main First
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility note */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="container-wide py-4">
          <p className="text-sm text-amber-800">
            <strong>Eligibility:</strong> Only candidates who qualify JEE Main (top ~2.5 lakh) can appear for JEE Advanced.
            Additionally, candidates must be among the top 20 percentile in their Class 12 board exam.
            Always verify current eligibility criteria from{' '}
            <a href="https://jeeadv.ac.in/" target="_blank" rel="noopener noreferrer" className="text-amber-900 underline">jeeadv.ac.in</a>.
          </p>
        </div>
      </section>

      {/* Paper pattern */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-2">Exam Structure</h2>
          <p className="text-gray-500 text-sm mb-8">The pattern changes annually. Verify from the official brochure before preparation.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {papers.map((p) => (
              <div key={p.name} className="card p-6 border-l-4 border-l-violet-500">
                <h3 className="font-display font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.details}</p>
              </div>
            ))}
          </div>

          <div className="card p-6 bg-violet-50 border-violet-200">
            <h3 className="font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-600" />
              What makes JEE Advanced different?
            </h3>
            <ul className="space-y-2">
              {keyDifferences.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="section-title mb-8">Subject-wise Focus Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Physics', areas: ['Mechanics & Rotational Dynamics', 'Electromagnetism', 'Modern Physics', 'Optics', 'Thermodynamics', 'Waves'] },
              { name: 'Chemistry', areas: ['Organic Reaction Mechanisms', 'Inorganic Chemistry', 'Physical Chemistry Numericals', 'Coordination Compounds', 'Electrochemistry'] },
              { name: 'Mathematics', areas: ['Complex Numbers', 'Matrices & Determinants', 'Differential & Integral Calculus', 'Probability', 'Vectors & 3D Geometry', 'Permutations & Combinations'] },
            ].map((sub) => (
              <div key={sub.name} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900">{sub.name}</h3>
                </div>
                <ul className="space-y-1.5">
                  {sub.areas.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
                      <Target className="w-3 h-3 text-violet-400 shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official links */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-2xl mx-auto text-center">
          <h2 className="section-title mb-4">Official Sources</h2>
          <p className="text-gray-500 text-sm mb-8">
            Global Minds Academy is an independent preparation platform. We are not affiliated with any IIT or the JEE Advanced organising committee.
          </p>
          <div className="space-y-3">
            {[
              { label: 'JEE Advanced Official Website', url: 'https://jeeadv.ac.in/' },
              { label: 'JoSAA Counselling Portal', url: 'https://josaa.admissions.nic.in/' },
              { label: 'NTA — JEE Main (prerequisite)', url: 'https://jeemain.nta.nic.in/' },
            ].map((r) => (
              <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-4 card hover:border-violet-300 transition-colors group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-violet-700">{r.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-violet-500" />
              </a>
            ))}
          </div>
          <div className="mt-8 flex gap-4 justify-center">
            <Link href="/register" className="btn-primary">Start Preparation</Link>
            <Link href="/contact" className="btn-secondary">Book Counselling</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
