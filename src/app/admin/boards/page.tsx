import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { GraduationCap } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Board Management — Admin', robots: { index: false } };

export default async function AdminBoardsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let boards: {
    id: string; name: string; shortName: string;
    description: string | null; isActive: boolean; sortOrder: number;
    _count: { classes: number; courses: number; subjects: number };
  }[] = [];

  try {
    boards = await prisma.board.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { classes: true, courses: true, subjects: true } },
      },
    });
  } catch { /* DB unavailable */ }

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Board Management</h1>
          <p className="text-gray-500 mt-1">{boards.length} board{boards.length !== 1 ? 's' : ''} configured</p>
        </div>
      </div>

      {boards.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No Boards Configured"
          description="Run the seed script to populate boards: npm run db:seed" />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Board', 'Short Name', 'Classes', 'Subjects', 'Courses', 'Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {boards.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{b.name}</p>
                      {b.description && <p className="text-xs text-gray-400 mt-0.5">{b.description}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{b.shortName}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b._count.classes}</td>
                    <td className="px-4 py-3 text-gray-600">{b._count.subjects}</td>
                    <td className="px-4 py-3 text-gray-600">{b._count.courses}</td>
                    <td className="px-4 py-3">
                      <Badge variant={b.isActive ? 'success' : 'default'}>{b.isActive ? 'Active' : 'Inactive'}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
            Boards are seeded via <code className="bg-gray-100 px-1 rounded">npm run db:seed</code>. Add custom boards directly via Prisma Studio or a future admin form.
          </p>
        </div>
      )}
    </div>
  );
}
