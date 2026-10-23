import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, Star, Users } from 'lucide-react';

const sampleCourses = [
  {
    title: 'Class 10 CBSE — Complete Mathematics',
    slug: 'cbse-class-10-mathematics',
    board: 'CBSE',
    class: 'Class 10',
    subject: 'Mathematics',
    level: 'All Levels',
    lessons: 48,
    duration: '60+ hours',
    isFree: false,
    isFeatured: true,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Class 12 TN Board — Physics',
    slug: 'tn-board-class-12-physics',
    board: 'TN State Board',
    class: 'Class 12',
    subject: 'Physics',
    level: 'Advanced',
    lessons: 42,
    duration: '55+ hours',
    isFree: false,
    isFeatured: true,
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'NEET UG — Complete Biology',
    slug: 'neet-ug-biology',
    board: 'NEET',
    class: 'Class 11–12',
    subject: 'Biology',
    level: 'Advanced',
    lessons: 65,
    duration: '80+ hours',
    isFree: false,
    isFeatured: true,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'JEE Main — Chemistry Crash Course',
    slug: 'jee-main-chemistry',
    board: 'JEE',
    class: 'Class 11–12',
    subject: 'Chemistry',
    level: 'Intermediate',
    lessons: 36,
    duration: '45+ hours',
    isFree: false,
    isFeatured: true,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Class 6 CBSE — Science Foundation',
    slug: 'cbse-class-6-science',
    board: 'CBSE',
    class: 'Class 6',
    subject: 'Science',
    level: 'Beginner',
    lessons: 30,
    duration: '35+ hours',
    isFree: true,
    isFeatured: false,
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'ICSE Class 9 — English Language',
    slug: 'icse-class-9-english',
    board: 'ICSE',
    class: 'Class 9',
    subject: 'English',
    level: 'Intermediate',
    lessons: 28,
    duration: '30+ hours',
    isFree: false,
    isFeatured: false,
    color: 'from-cyan-500 to-blue-600',
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
              Explore our most popular courses across boards, classes, and competitive exams.
            </p>
          </div>
          <Link href="/courses" className="btn-secondary shrink-0">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCourses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="card-hover group overflow-hidden"
            >
              {/* Course thumbnail area */}
              <div className={`h-44 bg-gradient-to-br ${course.color} relative p-6 flex flex-col justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium">
                    {course.board}
                  </span>
                  {course.isFree && (
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-400 text-white font-medium">
                      Free
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-white/70 text-sm">{course.subject}</p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10" />
                <div className="absolute bottom-4 right-8 w-12 h-12 rounded-full bg-white/5" />
              </div>

              {/* Course info */}
              <div className="p-6">
                <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="badge bg-gray-100 text-gray-600">{course.class}</span>
                  <span className="badge bg-gray-100 text-gray-600">{course.level}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Course content shown above is sample data for demonstration. Actual courses will be added by academy administrators.
        </p>
      </div>
    </section>
  );
}
