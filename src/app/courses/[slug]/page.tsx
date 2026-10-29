import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Users, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';

const courseDetailSelect = Prisma.validator<Prisma.CourseSelect>()({
  id: true,
  title: true,
  slug: true,
  description: true,
  shortDescription: true,
  level: true,
  language: true,
  thumbnailUrl: true,
  price: true,
  discountPrice: true,
  duration: true,
  status: true,
  isFeatured: true,
  isFree: true,
  publishedAt: true,
  board: { select: { name: true, shortName: true } },
  class: { select: { id: true, name: true, number: true } },
  subject: { select: { name: true, slug: true } },
  instructor: {
    select: {
      id: true,
      qualification: true,
      specializations: true,
      experience: true,
      user: { select: { firstName: true, lastName: true, avatarUrl: true, bio: true } },
    },
  },
  modules: {
    select: {
      id: true,
      title: true,
      number: true,
      lessons: {
        select: {
          id: true,
          title: true,
          number: true,
          duration: true,
          isFree: true,
          isPublished: true,
        },
      },
    },
    orderBy: { number: 'asc' },
  },
  _count: { select: { enrolments: true, reviews: true } },
});

type CourseDetail = Prisma.CourseGetPayload<{ select: typeof courseDetailSelect }>;

type CourseLookup =
  | { course: CourseDetail; unavailable: false }
  | { course: null; unavailable: boolean };

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string): Promise<CourseLookup> {
  try {
    const course = await prisma.course.findFirst({
      where: { slug, status: 'PUBLISHED' },
      select: courseDetailSelect,
    });
    return { course, unavailable: false };
  } catch (error) {
    if (!(error instanceof Prisma.PrismaClientInitializationError)) throw error;
    console.error('Course detail is unavailable because the database could not be reached:', error);
    return { course: null, unavailable: true };
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCourse(slug);

  if (!result.course) {
    return { title: result.unavailable ? 'Course Temporarily Unavailable' : 'Course Not Found' };
  }
  const course = result.course;

  const description = course.shortDescription || course.description.slice(0, 155);

  return {
    title: course.title,
    description,
    openGraph: {
      title: course.title,
      description,
      type: 'website',
    },
  };
}

const LEVEL_LABEL: Record<string, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  ALL_LEVELS: 'All Levels',
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getCourse(slug);

  if (!result.course) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen">
          <div className="container-wide">
            <EmptyState
              icon={BookOpen}
              title={result.unavailable ? 'Course Temporarily Unavailable' : 'Course Not Found'}
              description={
                result.unavailable
                  ? 'Course details are temporarily unavailable because the course database cannot be reached. Please try again later.'
                  : 'This course may not exist or is not yet published. Browse our full course catalogue.'
              }
              actionLabel="Browse All Courses"
              actionHref="/courses"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }
  const course = result.course;

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const instructorName = course.instructor
    ? `${course.instructor.user.firstName} ${course.instructor.user.lastName}`
    : null;

  const priceDisplay = course.isFree
    ? 'Free'
    : course.price === 0
    ? 'Free'
    : `₹${(course.price / 100).toLocaleString('en-IN')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription || course.description,
    provider: {
      '@type': 'Organization',
      name: 'Global Minds Academy',
      sameAs: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
    ...(instructorName && {
      instructor: { '@type': 'Person', name: instructorName },
    }),
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href="/courses" className="inline-flex items-center gap-1 text-slate-500 text-sm mb-6 hover:text-slate-900 font-medium transition-colors">
                ← Course Catalogue
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.board && (
                  <span className="badge bg-teal-50 text-teal-800 border border-teal-200/80 text-xs px-3 py-1 rounded-full font-semibold shadow-xs">
                    {course.board.shortName}
                  </span>
                )}
                {course.class && (
                  <span className="badge bg-white text-slate-700 border border-slate-200 text-xs px-3 py-1 rounded-full font-semibold shadow-xs">
                    {course.class.name}
                  </span>
                )}
                {course.subject && (
                  <span className="badge bg-white text-slate-700 border border-slate-200 text-xs px-3 py-1 rounded-full font-semibold shadow-xs">
                    {course.subject.name}
                  </span>
                )}
                <span className="badge bg-teal-50 text-teal-800 border border-teal-200/80 text-xs px-3 py-1 rounded-full font-semibold shadow-xs">
                  {LEVEL_LABEL[course.level] ?? course.level}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-4 tracking-tight">
                {course.title}
              </h1>
              <p className="text-slate-600 text-base mb-6 max-w-2xl leading-relaxed">
                {course.shortDescription || course.description.slice(0, 200)}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium mb-8">
                {totalLessons > 0 && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#1A6B5A]" /> {totalLessons} lessons
                  </span>
                )}
                {course.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#1A6B5A]" /> {course.duration}
                  </span>
                )}
                {course._count.enrolments > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#1A6B5A]" /> {course._count.enrolments.toLocaleString()} enrolled
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-[#1A6B5A] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#145346] shadow-md shadow-teal-900/10 transition-colors"
                >
                  Enrol Now {priceDisplay !== 'Free' ? `— ${priceDisplay}` : '(Free)'}{' '}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors">
                  Already enrolled? Login
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Full description */}
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900 mb-4">About This Course</h2>
                  <p className="text-gray-600 leading-relaxed">{course.description}</p>
                </div>

                {/* Instructor */}
                {course.instructor && (
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Instructor</h2>
                    <div className="card p-5 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center shrink-0 font-bold text-brand-600 text-lg">
                        {course.instructor.user.firstName[0]}
                        {course.instructor.user.lastName[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{instructorName}</div>
                        {course.instructor.qualification && (
                          <div className="text-sm text-gray-500 mb-2">{course.instructor.qualification}</div>
                        )}
                        {course.instructor.user.bio && (
                          <p className="text-sm text-gray-600">{course.instructor.user.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Course modules */}
                {course.modules.length > 0 && (
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Course Content</h2>
                    <div className="space-y-3">
                      {course.modules.map((mod) => (
                        <div key={mod.id} className="card overflow-hidden">
                          <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              Module {mod.number}: {mod.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">{mod.lessons.length} lessons</p>
                          </div>
                          <div className="divide-y divide-gray-50">
                            {mod.lessons.slice(0, 5).map((lesson) => (
                              <div key={lesson.id} className="px-5 py-3 flex items-center gap-3 text-sm">
                                {lesson.isFree ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <Lock className="w-4 h-4 text-gray-300 shrink-0" />
                                )}
                                <span className="flex-1 text-gray-700">{lesson.title}</span>
                                {lesson.duration && (
                                  <span className="text-gray-400 text-xs">{lesson.duration} min</span>
                                )}
                                {lesson.isFree && (
                                  <span className="text-xs text-emerald-600 font-medium">Preview</span>
                                )}
                              </div>
                            ))}
                            {mod.lessons.length > 5 && (
                              <div className="px-5 py-3 text-xs text-gray-400">
                                +{mod.lessons.length - 5} more lessons
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sticky sidebar */}
              <div className="lg:col-span-1">
                <div className="card p-6 sticky top-24">
                  <div className="text-3xl font-display font-bold text-gray-900 mb-1">{priceDisplay}</div>
                  {course.discountPrice && course.discountPrice < course.price && (
                    <div className="text-sm text-gray-400 line-through mb-4">
                      ₹{(course.price / 100).toLocaleString('en-IN')}
                    </div>
                  )}
                  <Link href="/register" className="btn-primary w-full text-center mb-3">
                    Enrol Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/login" className="btn-secondary w-full text-center mb-6">
                    Login to Access
                  </Link>

                  <ul className="space-y-2 text-sm text-gray-600">
                    {course.class && (
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>{course.class.name}</span>
                      </li>
                    )}
                    {course.board && (
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>{course.board.name}</span>
                      </li>
                    )}
                    {course.subject && (
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>{course.subject.name}</span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                      <span>{LEVEL_LABEL[course.level] ?? course.level}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                      <span>{course.language}</span>
                    </li>
                    {totalLessons > 0 && (
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>{totalLessons} lessons</span>
                      </li>
                    )}
                    {course.modules.length > 0 && (
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-brand-400 shrink-0" />
                        <span>{course.modules.length} modules</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
