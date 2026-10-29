import { Users } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Students — Teacher Portal', robots: { index: false } };

export default async function TeacherStudentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type StudentRow = {
    id: string;
    user: { firstName: string; lastName: string; email: string };
    board: { shortName: string } | null;
    class: { name: string } | null;
    courseName: string;
    enrolledAt: Date;
  };

  let students: StudentRow[] = [];

  try {
    const teacherProfile = await prisma.teacherProfile.findUnique({ where: { userId: user.id } });
    if (teacherProfile) {
      const enrolments = await prisma.enrolment.findMany({
        where: { course: { instructorId: teacherProfile.id } },
        select: {
          enrolledAt: true,
          course: { select: { title: true } },
          user: {
            select: {
              firstName: true, lastName: true, email: true,
              studentProfile: {
                select: {
                  id: true,
                  board: { select: { shortName: true } },
                  class: { select: { name: true } },
                },
              },
            },
          },
        },
        orderBy: { enrolledAt: 'desc' },
        take: 200,
      });

      students = enrolments.map((e) => ({
        id: e.user.studentProfile?.id ?? e.user.email,
        user: { firstName: e.user.firstName, lastName: e.user.lastName, email: e.user.email },
        board: e.user.studentProfile?.board ?? null,
        class: e.user.studentProfile?.class ?? null,
        courseName: e.course.title,
        enrolledAt: e.enrolledAt,
      }));
    }
  } catch { /* DB unavailable */ }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Students</h1>
        <p className="text-gray-500 mt-1">{students.length} enrolled across your courses</p>
      </div>

      {students.length === 0 ? (
        <EmptyState icon={Users} title="No Students Yet" description="Students will appear here once they enrol in your courses." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {['Student', 'Board / Class', 'Course', 'Enrolled'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((s, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-xs">
                          {s.user.firstName[0]}{s.user.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{s.user.firstName} {s.user.lastName}</p>
                          <p className="text-xs text-gray-400">{s.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {s.board?.shortName ?? '—'} / {s.class?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700 max-w-[200px] truncate">{s.courseName}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(s.enrolledAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
            Showing {students.length} student{students.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
