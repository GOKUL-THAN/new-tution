import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Users, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

interface CourseModule {
  id: string;
  title: string;
  number: number;
  lessons: {
    id: string;
    title: string;
    number: number;
    duration: number | null;
    isFree: boolean;
    isPublished: boolean;
  }[];
}

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  level: string;
  language: string;
  thumbnailUrl: string | null;
  price: number;
  discountPrice: number | null;
  duration: string | null;
  status: string;
  isFeatured: boolean;
  isFree: boolean;
  publishedAt: string | null;
  board: { name: string; shortName: string } | null;
  class: { name: string; number: number } | null;
  subject: { name: string; slug: string } | null;
  instructor: {
    id: string;
    qualification: string | null;
    specializations: string[];
    experience: string | null;
    user: { firstName: string; lastName: string; avatarUrl: string | null; bio: string | null };
  } | null;
  modules: CourseModule[];
  _count: { enrolments: number; reviews: number };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string): Promise<CourseDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/courses/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return { title: 'Course Not Found' };
  }

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
  const course = await getCourse(slug);

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen">
          <div className="container-wide">
            <EmptyState
              icon={BookOpen}
              title="Course Not Found"
              description="This course may not exist or is not yet published. Browse our full course catalogue."
              actionLabel="Browse All Courses"
              actionHref="/courses"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

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

        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 pt-32 pb-20">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Link href="/courses" className="inline-flex items-center gap-1 text-white/60 text-sm mb-6 hover:text-white">
                ← Course Catalogue
              </Link>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.board && (
                  <span className="badge bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    {course.board.shortName}
                  </span>
                )}
                {course.class && (
                  <span className="badge bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    {course.class.name}
                  </span>
                )}
                {course.subject && (
                  <span className="badge bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                    {course.subject.name}
                  </span>
                )}
                <span className="badge bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  {LEVEL_LABEL[course.level] ?? course.level}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-blue-100/75 text-base mb-6 max-w-2xl">
                {course.shortDescription || course.description.slice(0, 200)}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/70 mb-8">
                {totalLessons > 0 && (
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> {totalLessons} lessons
                  </span>
                )}
                {course.duration && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </span>
                )}
                {course._count.enrolments > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> {course._count.enrolments.toLocaleString()} enrolled
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl"
                >
                  Enrol Now {priceDisplay !== 'Free' ? `— ${priceDisplay}` : '(Free)'}{' '}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10">
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
