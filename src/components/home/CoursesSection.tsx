import Link from 'next/link';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

// All courses are for Classes 6–12 only. Slugs match seed data in DB.
// Course cards link to /courses (catalogue) instead of direct slugs to avoid 404.
const sampleCourses = [
  {
    title: 'JEE Main Physics — Complete Course',
    slug: 'jee-main-physics-complete',
    board: 'JEE Main',
    classRange: 'Class 11–12',
    subject: 'Physics',
    level: 'Advanced',
    lessons: 52,
    duration: '70+ hours',
    isFree: false,
    color: 'from-[#1A6B5A] to-indigo-500',
  },
  {
    title: 'NEET Biology — Cell Biology & Genetics',
    slug: 'neet-biology-cell-genetics',
    board: 'NEET UG',
    classRange: 'Class 11–12',
    subject: 'Biology',
    level: 'Advanced',
    lessons: 65,
    duration: '80+ hours',
    isFree: false,
    color: 'from-emerald-600 to-green-500',
  },
  {
    title: 'Class 10 Mathematics — Full Syllabus',
    slug: 'class-10-mathematics-full',
    board: 'CBSE',
    classRange: 'Class 10',
    subject: 'Mathematics',
    level: 'Intermediate',
    lessons: 48,
    duration: '60+ hours',
    isFree: false,
    color: 'from-brand-600 to-brand-400',
  },
  {
    title: 'Free Chemistry Basics — Classes 9–10',
    slug: 'free-chemistry-basics-9-10',
    board: 'CBSE',
    classRange: 'Class 9–10',
    subject: 'Chemistry',
    level: 'Beginner',
    lessons: 30,
    duration: '35+ hours',
    isFree: true,
    color: 'from-amber-500 to-yellow-400',
  },
  {
    title: 'TN Class 12 Physics — Samacheer Kalvi',
    slug: 'tn-class-12-physics',
    board: 'TN State Board',
    classRange: 'Class 12',
    subject: 'Physics',
    level: 'Advanced',
    lessons: 44,
    duration: '58+ hours',
    isFree: false,
    color: 'from-violet-600 to-purple-500',
  },
  {
    title: 'ICSE Class 9 — English Language',
    slug: 'icse-class-9-english',
    board: 'ICSE',
    classRange: 'Class 9',
    subject: 'English',
    level: 'Intermediate',
    lessons: 28,
    duration: '30+ hours',
    isFree: false,
    color: 'from-rose-500 to-pink-500',
  },
];

export default function CoursesSection() {
  return (
    <section className="section-padding bg-gray-50/50" id="courses">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="section-title mb-4">
              Popular <span className="gradient-text">Courses</span>
            </h2>
            <p className="section-subtitle">
              Explore our most popular courses across boards, Classes 6–12, and competitive exams.
            </p>
          </div>
          <Link href="/courses" className="btn-secondary shrink-0">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCourses.map((course) => (
            /* Link to /courses (catalogue) to avoid "Course Not Found" when DB has no matching slug */
            <Link
              key={course.slug}
              href="/courses"
              className="card-hover group overflow-hidden"
            >
              {/* Thumbnail */}
              <div className={`h-44 bg-gradient-to-br ${course.color} relative p-6 flex flex-col justify-between overflow-hidden`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-semibold backdrop-blur-sm">
                    {course.board}
                  </span>
                  {course.isFree && (
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-400 text-white font-semibold">
                      Free
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">{course.subject}</p>
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute bottom-2 right-8 w-14 h-14 rounded-full bg-white/5" />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                    {course.classRange}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 font-medium mt-8">
          Course content shown above is for demonstration. Enrol to access full course materials.
        </p>
      </div>
    </section>
  );
}
