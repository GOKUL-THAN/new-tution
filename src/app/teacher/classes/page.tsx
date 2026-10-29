import Link from 'next/link';
import { BookOpen, Users } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'My Classes — Teacher Portal', robots: { index: false } };

export default async function TeacherClassesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let courses: Array<{
    id: string; title: string; slug: string; status: string;
    board: { shortName: string } | null;
    class: { name: string } | null;
    subject: { name: string } | null;
    _count: { enrolments: number; modules: number };
  }> = [];

  try {
    const teacherProfile = await prisma.teacherProfile.findUnique({ where: { userId: user.id } });
    if (teacherProfile) {
      courses = await prisma.course.findMany({
        where: { instructorId: teacherProfile.id },
        select: {
          id: true, title: true, slug: true, status: true,
          board: { select: { shortName: true } },
          class: { select: { name: true } },
          subject: { select: { name: true } },
          _count: { select: { enrolments: true, modules: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }
  } catch { /* DB unavailable */ }

  const statusVariant = (s: string) =>
    s === 'PUBLISHED' ? 'success' : s === 'DRAFT' ? 'default' : 'warning';

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">My Classes</h1>
        <p className="text-gray-500 mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''} assigned to you</p>
      </div>

      {courses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No Classes Assigned"
          description="You have no courses assigned yet. Contact an administrator to get your courses set up."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <div key={c.id} className="card p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-display font-semibold text-gray-900 text-sm leading-snug">{c.title}</h3>
                <Badge variant={statusVariant(c.status) as 'success' | 'default' | 'warning'}>{c.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                {c.board && <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded">{c.board.shortName}</span>}
                {c.class && <span className="bg-gray-100 px-2 py-0.5 rounded">{c.class.name}</span>}
                {c.subject && <span className="bg-gray-100 px-2 py-0.5 rounded">{c.subject.name}</span>}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c._count.enrolments} students</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{c._count.modules} modules</span>
              </div>
              <Link href={`/courses/${c.slug}`} className="btn-secondary btn-sm w-full text-center">View Course</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
