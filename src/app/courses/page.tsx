import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Clock, Search, Filter } from 'lucide-react';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/db';
import {
  BOARD_CURRICULA,
  getBoardClasses,
  getBoardSubjects,
  getBoardsOfferingSubject,
  getClassesForSubject,
  getCourseSubjectSlug,
  getSubjectLabel,
  getSubjectsForBoardClass,
} from '@/lib/curriculum';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our complete course catalogue — school tuition for Classes 6–12, JEE Main & Advanced, NEET UG, and competitive exam preparation courses.',
};

const boardOptions = [
  { key: 'all', label: 'All' },
  ...BOARD_CURRICULA.map((board) => ({ key: board.slug, label: board.name })),
];

const courseGradients = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-cyan-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
];

const courseListSelect = Prisma.validator<Prisma.CourseSelect>()({
  title: true,
  slug: true,
  shortDescription: true,
  description: true,
  board: { select: { name: true, shortName: true } },
  class: { select: { name: true, number: true } },
  subject: { select: { name: true, slug: true } },
  duration: true,
  isFree: true,
  price: true,
  isFeatured: true,
  modules: { select: { lessons: { select: { id: true } } } },
});

type CourseListing = Prisma.CourseGetPayload<{ select: typeof courseListSelect }>;

interface PageProps {
  searchParams: Promise<{ board?: string; subject?: string; class?: string }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedBoard = params.board ? params.board.toLowerCase() : 'all';
  const selectedSubject = params.subject ? params.subject.toLowerCase() : 'all';
  const selectedClass = params.class && /^\d+$/.test(params.class) ? Number(params.class) : null;
  const invalidClassFilter = params.class !== undefined && (selectedClass === null || selectedClass < 1 || selectedClass > 12);
  const selectedBoardCurriculum = selectedBoard === 'all'
    ? undefined
    : BOARD_CURRICULA.find((board) => board.slug === selectedBoard);
  const invalidCurriculumFilter = selectedBoard !== 'all' && (
    !selectedBoardCurriculum ||
    (selectedClass !== null && !getBoardClasses(selectedBoard).includes(selectedClass)) ||
    (selectedSubject !== 'all' && !getBoardSubjects(selectedBoard).some((subject) => subject === selectedSubject)) ||
    (selectedClass !== null && selectedSubject !== 'all' &&
      !getSubjectsForBoardClass(selectedBoard, selectedClass).some((subject) => subject === selectedSubject))
  ) || (
    selectedBoard === 'all' && selectedSubject !== 'all' && (
      getBoardsOfferingSubject(selectedSubject).length === 0 ||
      (selectedClass !== null && !getClassesForSubject(selectedSubject).includes(selectedClass))
    )
  );

  const where: Prisma.CourseWhereInput = { status: 'PUBLISHED' };
  if (selectedBoardCurriculum) where.board = { is: { shortName: selectedBoardCurriculum.shortName } };
  if (selectedSubject !== 'all') {
    where.subject = { is: { slug: getCourseSubjectSlug(selectedSubject) } };
  }
  if (selectedClass !== null) where.class = { is: { number: selectedClass } };

  let publishedCourses: CourseListing[] = [];
  let catalogueUnavailable = false;

  if (!invalidClassFilter && !invalidCurriculumFilter) {
    try {
      publishedCourses = await prisma.course.findMany({
        where,
        select: courseListSelect,
        orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientInitializationError)) throw error;
      console.error('Course catalogue is unavailable because the database could not be reached:', error);
      catalogueUnavailable = true;
    }
  }

  const filterBoardLabel = selectedBoard === 'all'
    ? 'All boards'
    : boardOptions.find((board) => board.key === selectedBoard)?.label ?? selectedBoard;
  const filterSubjectLabel = selectedSubject === 'all' ? 'All subjects' : getSubjectLabel(selectedSubject);
  const filterClassLabel = selectedClass === null ? 'All classes' : `Class ${selectedClass}`;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-4 shadow-xs">
              Curriculum &amp; Exam Catalogue
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Course <span className="text-blue-600">Catalogue</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
              Browse courses across all boards, classes, and competitive examinations.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search courses by subject, board, or class..."
                className="w-full px-12 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-700"><Filter className="w-4 h-4" />Active filters:</span>
              <span className="badge bg-brand-600 text-white">{filterBoardLabel}</span>
              <span className="badge bg-gray-100 text-gray-600">{filterSubjectLabel}</span>
              <span className="badge bg-gray-100 text-gray-600">{filterClassLabel}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-700"><Filter className="w-4 h-4" />Filter:</span>
              {boardOptions.map((f) => {
                const normalized = f.key;
                const isActive = selectedBoard === normalized;
                const href = `/courses${normalized === 'all' ? '' : `?board=${normalized}`}${selectedSubject !== 'all' && normalized !== 'all' ? `&subject=${selectedSubject}` : ''}${selectedClass !== null && normalized !== 'all' ? `&class=${selectedClass}` : ''}`;

                return (
                  <Link
                    key={f.key}
                    href={href}
                    className={`badge transition-colors ${isActive ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600'}`}
                  >
                    {f.label}
                  </Link>
                );
              })}
            </div>

            {catalogueUnavailable ? (
              <div role="alert" className="card p-10 text-center text-amber-800">
                Course listings are temporarily unavailable because the course database cannot be reached. Please try again later.
              </div>
            ) : publishedCourses.length === 0 ? (
              <div className="card p-10 text-center text-gray-600">
                <p>No published courses match these board, class, and subject filters yet.</p>
                <p className="mt-2 text-sm">Curriculum details remain available on the selected subject and class pages.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedCourses.map((course, index) => {
                  const lessonCount = course.modules.reduce((total, module) => total + module.lessons.length, 0);

                  return (
                  <Link key={course.slug} href={`/courses/${course.slug}`} className="card-hover group overflow-hidden">
                    <div className={`h-36 bg-gradient-to-br ${courseGradients[index % courseGradients.length]} relative p-5 flex flex-col justify-between`}>
                      <div className="flex items-center gap-2">
                        {course.board && <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium">{course.board.shortName}</span>}
                        {(course.isFree || course.price === 0) && <span className="text-xs px-3 py-1 rounded-full bg-emerald-400 text-white font-medium">Free</span>}
                      </div>
                      <p className="text-white/70 text-sm">{course.subject?.name}</p>
                      <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/10" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.shortDescription || course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{lessonCount} lessons</span>
                        {course.duration && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>}
                      </div>
                      <div className="mt-3 flex gap-2">
                        {course.class && <span className="badge bg-gray-100 text-gray-600">{course.class.name}</span>}
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            )}

            <p className="text-center text-xs text-gray-400 mt-10">
              Showing published courses only. Courses are added by academy administrators.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
