import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, BookOpen, GraduationCap } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardClasses,
  getBoardSubjects,
  getSubjectLabel,
} from '@/lib/curriculum';

const BOARDS = [
  {
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    slug: 'cbse',
    color: 'from-blue-500 to-blue-700',
    description:
      "India's largest national education board with NCERT-aligned curriculum. Comprehensive tuition for all classes with board exam preparation for Classes 10 and 12.",
    features: [
      'NCERT-aligned study material',
      'Board exam practice papers',
      'Chapter-wise question banks',
      'Periodic test preparation',
      'Annual exam revision',
    ],
  },
  {
    name: 'ICSE',
    fullName: 'Indian Certificate of Secondary Education',
    slug: 'icse',
    color: 'from-emerald-500 to-emerald-700',
    description:
      'CISCE board curriculum focusing on application-based learning with emphasis on language skills and analytical thinking.',
    features: [
      'CISCE syllabus coverage',
      'Application-based learning',
      'English language proficiency',
      'Science practical preparation',
      'Board exam readiness',
    ],
  },
  {
    name: 'ISC',
    fullName: 'Indian School Certificate',
    slug: 'isc',
    color: 'from-teal-500 to-teal-700',
    description:
      'Senior secondary programme under CISCE with specialised streams. Prepare for ISC board exams alongside competitive entrance examinations.',
    features: [
      'Stream specialisation',
      'ISC board exam prep',
      'Parallel entrance exam prep',
      'Project work guidance',
      'University admission support',
    ],
  },
  {
    name: 'Tamil Nadu State Board',
    fullName: 'Samacheer Kalvi / TN State Board',
    slug: 'tn-state-board',
    color: 'from-violet-500 to-violet-700',
    description:
      'Samacheer Kalvi (Equitable Education) curriculum of Tamil Nadu. Content available in both Tamil and English medium.',
    features: [
      'Samacheer Kalvi syllabus',
      'Tamil & English medium',
      'Public exam preparation',
      'Government exam alignment',
      'Quarterly & half-yearly prep',
    ],
  },
  {
    name: 'TN Matriculation',
    fullName: 'Tamil Nadu Matriculation Board',
    slug: 'tn-matriculation',
    color: 'from-rose-500 to-rose-700',
    description:
      'Tamil Nadu Matriculation Board curriculum for matriculation schools. Comprehensive coverage with exam-focused learning approach.',
    features: [
      'Matriculation syllabus',
      'Exam-focused practice',
      'Chapter completion tracking',
      'Revision scheduling',
      'Board exam preparation',
    ],
  },
];

function getClassRange(boardSlug: string): string {
  const classes = getBoardClasses(boardSlug);
  return `Classes ${classes[0]}–${classes[classes.length - 1]}`;
}

interface PageProps {
  params: Promise<{ boardSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { boardSlug } = await params;
  const board = BOARDS.find((b) => b.slug === boardSlug);

  if (!board) {
    return { title: 'Board Not Found' };
  }

  return {
    title: `${board.name} Courses — ${getClassRange(board.slug)}`,
    description: `${board.description} Explore all ${board.name} courses and study materials at Global Minds Academy.`,
  };
}

export default async function BoardDetailPage({ params }: PageProps) {
  const { boardSlug } = await params;
  const board = BOARDS.find((b) => b.slug === boardSlug);

  if (!board) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen">
          <div className="container-wide">
            <EmptyState
              icon={GraduationCap}
              title="Board Not Found"
              description="The board you are looking for does not exist or is not yet available."
              actionLabel="View All Boards"
              actionHref="/boards"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const availableClasses = getBoardClasses(board.slug);
  const classRange = getClassRange(board.slug);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href="/boards" className="inline-flex items-center gap-1 text-slate-500 text-sm mb-6 hover:text-slate-900 font-medium transition-colors">
                ← All Boards
              </Link>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
                <GraduationCap className="w-4 h-4 text-[#1A6B5A]" />
                {classRange}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-2 tracking-tight">
                {board.name} <span className="text-[#1A6B5A]">Curriculum</span>
              </h1>
              <p className="text-base text-slate-500 font-semibold mb-3">{board.fullName}</p>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">{board.description}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/courses?board=${board.slug}`}
                  className="inline-flex items-center gap-2 bg-[#1A6B5A] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#145346] shadow-md shadow-teal-900/10 transition-colors"
                >
                  Browse {board.name} Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Features */}
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  What We Cover for {board.name}
                </h2>
                <ul className="space-y-3">
                  {board.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subjects */}
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Subjects Offered
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {getBoardSubjects(board.slug).map((subject) => (
                    <Link
                      key={subject}
                      href={`/subjects/${subject}`}
                      className="card p-4 flex items-center gap-3 hover:border-brand-200 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-brand-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{getSubjectLabel(subject)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Classes grid */}
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 text-center">
                Classes Available
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {availableClasses.map((num) => (
                  <Link
                    key={num}
                    href={`/classes/class-${num}?board=${board.slug}`}
                    className="card-hover p-4 text-center group"
                  >
                    <div className="text-2xl font-display font-bold text-brand-600 group-hover:text-brand-700">
                      {num}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Class {num}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
