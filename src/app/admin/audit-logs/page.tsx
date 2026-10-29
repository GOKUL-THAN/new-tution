import { Shield } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'Audit Logs — Admin', robots: { index: false } };

export default async function AdminAuditLogsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let logs: {
    id: string; action: string; entity: string; entityId: string | null;
    ipAddress: string | null; createdAt: Date;
    user: { firstName: string; lastName: string; email: string } | null;
  }[] = [];
  let total = 0;

  try {
    [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 200,
        include: {
          user: { select: { firstName: true, lastName: true, email: true } },
        },
      }),
      prisma.auditLog.count(),
    ]);
  } catch { /* DB unavailable */ }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-500 mt-1">{total} log entries total — showing most recent 200</p>
      </div>

      {logs.length === 0 ? (
        <EmptyState icon={Shield} title="No Audit Logs"
          description="Privileged actions (role changes, deletions, financial operations) will be recorded here." />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Timestamp', 'User', 'Action', 'Entity', 'Entity ID', 'IP'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(l.createdAt).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {l.user ? (
                        <div>
                          <p className="text-xs font-medium text-gray-900">{l.user.firstName} {l.user.lastName}</p>
                          <p className="text-xs text-gray-400">{l.user.email}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">System</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{l.action}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{l.entity}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-400 max-w-[120px] truncate">{l.entityId ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{l.ipAddress ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-4 py-3 text-xs text-gray-400 border-t border-gray-100">
            Showing {logs.length} of {total} entries. Passwords, tokens, and payment secrets are never logged.
          </p>
        </div>
      )}
    </div>
  );
}
