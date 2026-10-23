import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Search, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our complete course catalogue — school tuition for Classes 1–12, JEE Main & Advanced, NEET UG, and competitive exam preparation courses.',
};

const courses = [
  { title: 'Class 10 CBSE — Mathematics', slug: 'cbse-class-10-mathematics', board: 'CBSE', cls: 'Class 10', subject: 'Mathematics', lessons: 48, duration: '60+ hrs', color: 'from-blue-500 to-indigo-600', free: false },
  { title: 'Class 12 TN Board — Physics', slug: 'tn-board-class-12-physics', board: 'TN Board', cls: 'Class 12', subject: 'Physics', lessons: 42, duration: '55+ hrs', color: 'from-violet-500 to-purple-600', free: false },
  { title: 'NEET UG — Complete Biology', slug: 'neet-ug-biology', board: 'NEET', cls: '11–12', subject: 'Biology', lessons: 65, duration: '80+ hrs', color: 'from-emerald-500 to-teal-600', free: false },
  { title: 'JEE Main — Chemistry', slug: 'jee-main-chemistry', board: 'JEE', cls: '11–12', subject: 'Chemistry', lessons: 36, duration: '45+ hrs', color: 'from-amber-500 to-orange-600', free: false },
  { title: 'Class 6 CBSE — Science Foundation', slug: 'cbse-class-6-science', board: 'CBSE', cls: 'Class 6', subject: 'Science', lessons: 30, duration: '35+ hrs', color: 'from-rose-500 to-pink-600', free: true },
  { title: 'ICSE Class 9 — English Language', slug: 'icse-class-9-english', board: 'ICSE', cls: 'Class 9', subject: 'English', lessons: 28, duration: '30+ hrs', color: 'from-cyan-500 to-blue-600', free: false },
  { title: 'Class 8 CBSE — Social Science', slug: 'cbse-class-8-social-science', board: 'CBSE', cls: 'Class 8', subject: 'Social Science', lessons: 32, duration: '38+ hrs', color: 'from-teal-500 to-emerald-600', free: false },
  { title: 'JEE Advanced — Physics Mastery', slug: 'jee-advanced-physics', board: 'JEE', cls: '11–12', subject: 'Physics', lessons: 52, duration: '70+ hrs', color: 'from-indigo-500 to-violet-600', free: false },
  { title: 'Class 12 CBSE — Accountancy', slug: 'cbse-class-12-accountancy', board: 'CBSE', cls: 'Class 12', subject: 'Accountancy', lessons: 24, duration: '28+ hrs', color: 'from-orange-500 to-red-600', free: false },
];

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Course Catalogue</h1>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto mb-8">
              Browse courses across all boards, classes, and competitive examinations.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search courses by subject, board, or class..."
                className="w-full px-12 py-4 rounded-2xl bg-white/95 backdrop-blur text-gray-900 placeholder:text-gray-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <span className="flex items-center gap-1 text-sm font-medium text-gray-700"><Filter className="w-4 h-4" />Filter:</span>
              {['All', 'CBSE', 'ICSE', 'TN Board', 'JEE', 'NEET'].map((f) => (
                <button key={f} className={`badge ${f === 'All' ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600'} transition-colors cursor-pointer`}>
                  {f}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link key={course.slug} href={`/courses/${course.slug}`} className="card-hover group overflow-hidden">
                  <div className={`h-36 bg-gradient-to-br ${course.color} relative p-5 flex flex-col justify-between`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium">{course.board}</span>
                      {course.free && <span className="text-xs px-3 py-1 rounded-full bg-emerald-400 text-white font-medium">Free</span>}
                    </div>
                    <p className="text-white/70 text-sm">{course.subject}</p>
                    <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/10" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{course.lessons} lessons</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <span className="badge bg-gray-100 text-gray-600">{course.cls}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 mt-10">
              Courses shown are sample entries for demonstration. Actual courses will be published by academy administrators via the admin dashboard.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
