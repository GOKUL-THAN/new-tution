import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { BookOpen, Plus, Eye, Edit, Clock } from 'lucide-react';

export const metadata = {
  title: 'Course Management — Admin',
  robots: { index: false, follow: false },
};

async function getCourses() {
  try {
    return await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        board: { select: { shortName: true } },
        class: { select: { name: true } },
        subject: { select: { name: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function AdminCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const courses = await getCourses();

  const statusColors: Record<string, string> = {
    DRAFT: 'bg-gray-100 text-gray-700',
    REVIEW: 'bg-amber-100 text-amber-700',
    PUBLISHED: 'bg-emerald-100 text-emerald-700',
    ARCHIVED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500 mt-1">Create, edit, and publish courses</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-700">Course</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden md:table-cell">Board / Class</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden sm:table-cell">Subject</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden lg:table-cell">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No courses created yet. Use the database seed or create courses via the API.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">/{course.slug}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs">
                      {course.board?.shortName || '—'} / {course.class?.name || '—'}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600 text-xs">
                      {course.subject?.name || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[course.status] || 'bg-gray-100 text-gray-600'}`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-600 text-xs">
                      {course.isFree ? 'Free' : `₹${(course.price / 100).toFixed(0)}`}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {courses.length} course{courses.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
