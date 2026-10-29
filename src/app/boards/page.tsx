import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Boards',
  description: 'Explore curriculum-aligned learning for CBSE, ICSE, ISC, Tamil Nadu State Board, and TN Matriculation boards.',
};

const boards = [
  {
    name: 'CBSE', fullName: 'Central Board of Secondary Education', slug: 'cbse',
    classes: 'Classes 6–12', color: 'from-blue-500 to-blue-700',
    description: 'India\'s largest national education board with NCERT-aligned curriculum. We provide comprehensive tuition for all classes with board exam preparation for Classes 10 and 12.',
    features: ['NCERT-aligned study material', 'Board exam practice papers', 'Chapter-wise question banks', 'Periodic test preparation', 'Annual exam revision'],
  },
  {
    name: 'ICSE', fullName: 'Indian Certificate of Secondary Education', slug: 'icse',
    classes: 'Classes 6–10', color: 'from-emerald-500 to-emerald-700',
    description: 'CISCE board curriculum focusing on application-based learning. Our programme covers the comprehensive ICSE syllabus with emphasis on language skills and analytical thinking.',
    features: ['CISCE syllabus coverage', 'Application-based learning', 'English language proficiency', 'Science practical preparation', 'Board exam readiness'],
  },
  {
    name: 'ISC', fullName: 'Indian School Certificate', slug: 'isc',
    classes: 'Classes 11–12', color: 'from-teal-500 to-teal-700',
    description: 'Senior secondary programme under CISCE with specialised streams. We prepare students for ISC board exams alongside competitive entrance examinations.',
    features: ['Stream specialisation', 'ISC board exam prep', 'Parallel entrance exam prep', 'Project work guidance', 'University admission support'],
  },
  {
    name: 'Tamil Nadu State Board', fullName: 'Samacheer Kalvi / TN State Board', slug: 'tn-state-board',
    classes: 'Classes 6–12', color: 'from-violet-500 to-violet-700',
    description: 'Samacheer Kalvi (Equitable Education) curriculum of Tamil Nadu. Content available in both Tamil and English medium with public exam preparation for Classes 10 and 12.',
    features: ['Samacheer Kalvi syllabus', 'Tamil & English medium', 'Public exam preparation', 'Government exam alignment', 'Quarterly & half-yearly prep'],
  },
  {
    name: 'TN Matriculation', fullName: 'Tamil Nadu Matriculation Board', slug: 'tn-matriculation',
    classes: 'Classes 6–12', color: 'from-rose-500 to-rose-700',
    description: 'Tamil Nadu Matriculation Board curriculum for matriculation schools. Comprehensive coverage with exam-focused learning approach.',
    features: ['Matriculation syllabus', 'Exam-focused practice', 'Chapter completion tracking', 'Revision scheduling', 'Board exam preparation'],
  },
];

export default function BoardsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
              National &amp; State Boards
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Education <span className="text-[#1A6B5A]">Boards</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Curriculum-aligned learning for every major Indian education board.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="space-y-8">
              {boards.map((board) => (
                <div key={board.slug} className="card p-6 sm:p-8">
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${board.color} flex items-center justify-center shrink-0 shadow-lg`}>
                      <span className="text-white font-display font-bold text-sm">{board.name.substring(0, 4)}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-display font-bold text-gray-900 mb-1">{board.name}</h2>
                      <p className="text-sm text-gray-500 mb-1">{board.fullName}</p>
                      <span className="badge-primary text-xs">{board.classes}</span>
                      <p className="text-gray-600 mt-4 leading-relaxed text-sm">{board.description}</p>
                      <ul className="mt-4 space-y-2">
                        {board.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/boards/${board.slug}`} className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-600 hover:text-brand-700">
                        Explore {board.name} Courses <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
