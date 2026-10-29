import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, ExternalLink, GraduationCap, AlertCircle } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

interface ExamDetail {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  category: string;
  conductingAuth: string | null;
  officialWebsite: string | null;
  description: string | null;
  eligibility: string | null;
  examPattern: string | null;
  syllabus: string | null;
  applicationOpen: string | null;
  applicationClose: string | null;
  examDate: string | null;
  resultDate: string | null;
  academicYear: string | null;
  status: string;
  feeInfo: string | null;
}

interface PageProps {
  params: Promise<{ examSlug: string }>;
}

async function getExam(slug: string): Promise<ExamDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/exams/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'TBA';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CATEGORY_LABEL: Record<string, string> = {
  ENGINEERING: 'Engineering Entrance',
  MEDICAL: 'Medical Entrance',
  UNIVERSITY: 'University Entrance',
  PROFESSIONAL: 'Professional Entrance',
  OLYMPIAD: 'Olympiad',
  SCHOLARSHIP: 'Scholarship',
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { examSlug } = await params;
  const exam = await getExam(examSlug);

  if (!exam) {
    return { title: 'Exam Not Found' };
  }

  return {
    title: `${exam.name} — ${CATEGORY_LABEL[exam.category] ?? exam.category} Preparation`,
    description:
      exam.description?.slice(0, 155) ||
      `Prepare for ${exam.name} with expert-designed courses and practice tests at Global Minds Academy.`,
  };
}

export default async function ExamDetailPage({ params }: PageProps) {
  const { examSlug } = await params;
  const exam = await getExam(examSlug);

  if (!exam) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen">
          <div className="container-wide">
            <EmptyState
              icon={GraduationCap}
              title="Exam Not Found"
              description="The examination you are looking for is not yet in our catalogue."
              actionLabel="View All Entrance Exams"
              actionHref="/entrance-exams"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10 max-w-4xl">
            <Link href="/entrance-exams" className="inline-flex items-center gap-1 text-slate-500 text-sm mb-6 hover:text-slate-900 font-medium transition-colors">
              ← All Entrance Exams
            </Link>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
              <GraduationCap className="w-4 h-4 text-[#1A6B5A]" />
              {CATEGORY_LABEL[exam.category] ?? exam.category}
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-3 tracking-tight">
              {exam.name}
            </h1>
            {exam.conductingAuth && (
              <p className="text-slate-600 text-sm mb-4 font-medium">Conducted by: <span className="text-slate-800 font-semibold">{exam.conductingAuth}</span></p>
            )}
            {exam.description && (
              <p className="text-slate-600 text-base mb-8 max-w-2xl leading-relaxed">{exam.description}</p>
            )}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-[#1A6B5A] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#145346] shadow-md shadow-teal-900/10 transition-colors"
              >
                Start Preparation <ArrowRight className="w-4 h-4" />
              </Link>
              {exam.officialWebsite && (
                <a
                  href={exam.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors"
                >
                  Official Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Key Dates */}
              <div className="card p-6">
                <h2 className="text-lg font-display font-bold text-gray-900 mb-5">Key Dates</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Application Opens', value: formatDate(exam.applicationOpen) },
                    { label: 'Application Closes', value: formatDate(exam.applicationClose) },
                    { label: 'Exam Date', value: formatDate(exam.examDate) },
                    { label: 'Result Date', value: formatDate(exam.resultDate) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{label}</span>
                      <span className="text-sm font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                  {exam.academicYear && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500">Academic Year</span>
                      <span className="text-sm font-medium text-gray-800">{exam.academicYear}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="card p-6">
                <h2 className="text-lg font-display font-bold text-gray-900 mb-5">Quick Info</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Category</span>
                    <span className="text-sm font-medium text-gray-800">
                      {CATEGORY_LABEL[exam.category] ?? exam.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">Status</span>
                    <span className="text-sm font-medium text-gray-800">{exam.status.replace(/_/g, ' ')}</span>
                  </div>
                  {exam.feeInfo && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500">Application Fee</span>
                      <span className="text-sm font-medium text-gray-800">{exam.feeInfo}</span>
                    </div>
                  )}
                  {exam.conductingAuth && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500">Conducting Body</span>
                      <span className="text-sm font-medium text-gray-800 text-right max-w-[60%]">{exam.conductingAuth}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Eligibility */}
            {exam.eligibility && (
              <div className="card p-6 mb-8">
                <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Eligibility</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{exam.eligibility}</p>
              </div>
            )}

            {/* Exam Pattern */}
            {exam.examPattern && (
              <div className="card p-6 mb-8">
                <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Exam Pattern</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{exam.examPattern}</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 text-sm mb-1">Important Disclaimer</h3>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Examination dates, eligibility criteria, application fees, and patterns are subject to change by the conducting authority.
                  Always verify the latest information from the official website.
                  Global Minds Academy is an independent preparation platform and is not affiliated with{' '}
                  {exam.conductingAuth || 'the conducting authority'}, any government body, or official examination authority.
                </p>
                {exam.officialWebsite && (
                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-amber-700 font-semibold mt-2 hover:text-amber-800"
                  >
                    Visit Official Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
