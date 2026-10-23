import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

interface PageProps {
  params: Promise<{ classSlug: string }>;
}

function parseClassNumber(slug: string): number | null {
  const match = slug.match(/^class-(\d+)$/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num < 1 || num > 12) return null;
  return num;
}

function getClassGroup(num: number): string {
  if (num <= 5) return 'Primary (1–5)';
  if (num <= 8) return 'Middle School (6–8)';
  if (num <= 10) return 'Secondary (9–10)';
  return 'Senior Secondary (11–12)';
}

function getClassColor(num: number): string {
  if (num <= 5) return 'from-emerald-400 to-teal-500';
  if (num <= 8) return 'from-blue-400 to-indigo-500';
  if (num <= 10) return 'from-violet-500 to-purple-600';
  return 'from-rose-500 to-orange-500';
}

const SUBJECTS_BY_GROUP: Record<string, string[]> = {
  primary: ['Mathematics', 'English', 'Environmental Science', 'Hindi', 'General Knowledge'],
  middle: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'],
  secondary: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Computer Science'],
  senior: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'Accountancy', 'Economics', 'Business Studies', 'English'],
};

function getSubjects(num: number): string[] {
  if (num <= 5) return SUBJECTS_BY_GROUP.primary;
  if (num <= 8) return SUBJECTS_BY_GROUP.middle;
  if (num <= 10) return SUBJECTS_BY_GROUP.secondary;
  return SUBJECTS_BY_GROUP.senior;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { classSlug } = await params;
  const classNum = parseClassNumber(classSlug);

  if (!classNum) {
    return { title: 'Class Not Found' };
  }

  return {
    title: `Class ${classNum} — Courses & Study Material`,
    description: `Browse Class ${classNum} courses, subjects, and study material for CBSE, ICSE, and Tamil Nadu State Board at Global Minds Academy.`,
  };
}

export default async function ClassDetailPage({ params }: PageProps) {
  const { classSlug } = await params;
  const classNum = parseClassNumber(classSlug);

  if (!classNum) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen">
          <div className="container-wide">
            <EmptyState
              icon={GraduationCap}
              title="Class Not Found"
              description="The class you are looking for does not exist. Please choose a class from 1 to 12."
              actionLabel="View All Classes"
              actionHref="/classes"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const colorClass = getClassColor(classNum);
  const group = getClassGroup(classNum);
  const subjects = getSubjects(classNum);

  const prevClass = classNum > 1 ? classNum - 1 : null;
  const nextClass = classNum < 12 ? classNum + 1 : null;

  return (
    <>
      <Navbar />
      <main>
        <section className={`bg-gradient-to-br ${colorClass} pt-32 pb-20 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href="/classes" className="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white">
                ← All Classes
              </Link>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white/90 text-sm mb-4">
                <GraduationCap className="w-4 h-4" />
                {group}
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                Class {classNum}
              </h1>
              <p className="text-lg text-white/75 mb-8 max-w-2xl">
                Explore subjects, courses, and study materials designed for Class {classNum} students across CBSE, ICSE, and Tamil Nadu State Board.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/courses?class=${classNum}`}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl"
                >
                  Browse Class {classNum} Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">
              Subjects for Class {classNum}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {subjects.map((subject) => (
                <Link
                  key={subject}
                  href={`/subjects/${subject.toLowerCase().replace(/\s+/g, '-')}`}
                  className="card-hover p-5 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-brand-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 group-hover:text-brand-600 transition-colors">
                    {subject}
                  </span>
                </Link>
              ))}
            </div>

            {/* Navigation between classes */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              {prevClass ? (
                <Link href={`/classes/class-${prevClass}`} className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm">
                  ← Class {prevClass}
                </Link>
              ) : (
                <span />
              )}
              {nextClass ? (
                <Link href={`/classes/class-${nextClass}`} className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium text-sm">
                  Class {nextClass} →
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
