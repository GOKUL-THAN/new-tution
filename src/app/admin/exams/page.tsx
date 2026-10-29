import { GraduationCap } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Exam Catalogue — Admin', robots: { index: false } };

const STATUS_VARIANT: Record<string, 'default' | 'success' | 'warning' | 'danger'> = {
  UPCOMING: 'default',
  APPLICATIONS_OPEN: 'success',
  CLOSED: 'warning',
  COMPLETED: 'warning',
  RESULTS: 'success',
  ARCHIVED: 'default',
  VERIFICATION_REQUIRED: 'danger',
};

export default async function AdminExamsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let exams: {
    id: string; name: string; shortName: string; category: string;
    conductingAuth: string | null; status: string;
    applicationClose: Date | null; examDate: Date | null;
    lastVerified: Date | null; isActive: boolean;
  }[] = [];

  try {
    exams = await prisma.examCatalogue.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
      select: {
        id: true, name: true, shortName: true, category: true,
        conductingAuth: true, status: true,
        applicationClose: true, examDate: true,
        lastVerified: true, isActive: true,
      },
    });
  } catch { /* DB unavailable */ }

  const fmtDate = (d: Date | null) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Exam Catalogue</h1>
        <p className="text-gray-500 mt-1">{exams.length} exam{exams.length !== 1 ? 's' : ''} in catalogue</p>
      </div>

      {exams.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No Exams Configured"
          description="Run npm run db:seed to populate the exam catalogue." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Exam', 'Category', 'Authority', 'App Close', 'Exam Date', 'Status', 'Last Verified'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {exams.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{e.shortName}</p>
                      <p className="text-xs text-gray-400 mt-0.5 max-w-[180px] truncate">{e.name}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{e.category}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{e.conductingAuth ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{fmtDate(e.applicationClose)}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{fmtDate(e.examDate)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[e.status] ?? 'default'}>
                        {e.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{fmtDate(e.lastVerified)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-amber-600 bg-amber-50 border-t border-amber-100">
            ⚠ Exam dates are year-specific records. Review and update each exam cycle. Mark stale entries as VERIFICATION_REQUIRED.
          </p>
        </div>
      )}
    </div>
  );
}
