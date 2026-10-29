import { BookOpen } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Subject Management — Admin', robots: { index: false } };

export default async function AdminSubjectsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let subjects: {
    id: string; name: string; slug: string; isActive: boolean; sortOrder: number;
    _count: { courses: number; chapters: number };
  }[] = [];

  try {
    subjects = await prisma.subject.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { courses: true, chapters: true } } },
    });
  } catch { /* DB unavailable */ }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Subject Management</h1>
        <p className="text-gray-500 mt-1">{subjects.length} subject{subjects.length !== 1 ? 's' : ''} configured</p>
      </div>

      {subjects.length === 0 ? (
        <EmptyState icon={BookOpen} title="No Subjects Found"
          description="Run npm run db:seed to populate subjects." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Subject', 'Slug', 'Chapters', 'Courses', 'Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subjects.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.slug}</td>
                    <td className="px-4 py-3 text-gray-600">{s._count.chapters}</td>
                    <td className="px-4 py-3 text-gray-600">{s._count.courses}</td>
                    <td className="px-4 py-3">
                      <Badge variant={s.isActive ? 'success' : 'default'}>{s.isActive ? 'Active' : 'Inactive'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
