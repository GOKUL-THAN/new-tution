import { Calendar } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Attendance — Parent Portal', robots: { index: false } };

const STATUS_COLOR: Record<string, string> = {
  PRESENT: 'bg-emerald-100 text-emerald-700',
  ABSENT: 'bg-danger-50 text-danger-600',
  LATE: 'bg-amber-100 text-amber-700',
  EXCUSED: 'bg-gray-100 text-gray-600',
};

export default async function ParentAttendancePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type AttRow = {
    childName: string;
    records: { date: Date; status: string; sessionName: string | null }[];
    presentPct: number;
  };

  let childrenData: AttRow[] = [];

  try {
    const parent = await prisma.parentProfile.findUnique({
      where: { userId: user.id },
      include: {
        children: {
          where: { verified: true },
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true } },
                attendances: {
                  orderBy: { date: 'desc' },
                  take: 30,
                },
              },
            },
          },
        },
      },
    });

    if (parent) {
      for (const link of parent.children) {
        const records = link.student.attendances;
        const presentCount = records.filter((r) => r.status === 'PRESENT').length;
        const pct = records.length > 0 ? Math.round((presentCount / records.length) * 100) : 0;
        childrenData.push({
          childName: `${link.student.user.firstName} ${link.student.user.lastName}`,
          records: records.map((r) => ({ date: r.date, status: r.status, sessionName: r.sessionName })),
          presentPct: pct,
        });
      }
    }
  } catch { /* DB unavailable */ }

  if (childrenData.length === 0) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-gray-900">Attendance</h1>
        </div>
        <EmptyState
          icon={Calendar}
          title="No Attendance Records"
          description="Attendance records will appear here once your children are linked and classes begin."
          actionLabel="My Children"
          actionHref="/parent/children"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1">Last 30 attendance records per child</p>
      </div>

      <div className="space-y-8">
        {childrenData.map((child) => (
          <div key={child.childName} className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-gray-900 text-lg">{child.childName}</h2>
              <div className="text-right">
                <p className="text-2xl font-bold text-brand-600">{child.presentPct}%</p>
                <p className="text-xs text-gray-500">Attendance</p>
              </div>
            </div>

            {/* Attendance bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
              <div
                className={`h-full rounded-full transition-all ${child.presentPct >= 75 ? 'bg-emerald-500' : child.presentPct >= 50 ? 'bg-amber-400' : 'bg-danger-500'}`}
                style={{ width: `${child.presentPct}%` }}
                role="progressbar"
                aria-valuenow={child.presentPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Attendance: ${child.presentPct}%`}
              />
            </div>

            {child.records.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No attendance records yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Session</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {child.records.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-2 px-3 text-gray-700">
                          {new Date(r.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-2 px-3 text-gray-500 capitalize">{r.sessionName ?? 'Default'}</td>
                        <td className="py-2 px-3">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
