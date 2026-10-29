import prisma from '@/lib/db';
import { getCurrentUser, requireAuth } from '@/lib/auth';
import StatsCard from '@/components/ui/StatsCard';
import { Users, UserCheck, Shield, Search } from 'lucide-react';
import Table from '@/components/ui/Table';

export const metadata = {
  title: 'User Management — Admin',
  robots: { index: false, follow: false },
};

async function getUsers() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true, email: true, firstName: true, lastName: true,
        role: true, status: true, emailVerified: true, createdAt: true,
        lastLoginAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const users = await getUsers();

  const roleColors: Record<string, string> = {
    STUDENT: 'bg-blue-100 text-blue-700',
    PARENT: 'bg-emerald-100 text-emerald-700',
    TEACHER: 'bg-violet-100 text-violet-700',
    MENTOR: 'bg-indigo-100 text-indigo-700',
    CONTENT_EDITOR: 'bg-amber-100 text-amber-700',
    ACADEMIC_ADMIN: 'bg-rose-100 text-rose-700',
    FINANCE_ADMIN: 'bg-orange-100 text-orange-700',
    SUPER_ADMIN: 'bg-red-100 text-red-700',
  };

  const statusColors: Record<string, string> = {
    ACTIVE: 'bg-emerald-100 text-emerald-700',
    PENDING_VERIFICATION: 'bg-amber-100 text-amber-700',
    SUSPENDED: 'bg-red-100 text-red-700',
    DEACTIVATED: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">View and manage platform users</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-700">User</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Role</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden md:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden lg:table-cell">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-xs">
                          {u.firstName[0]}{u.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{u.firstName} {u.lastName}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role] || 'bg-gray-100 text-gray-600'}`}>
                        {u.role.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.status] || 'bg-gray-100 text-gray-600'}`}>
                        {u.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString('en-IN') : 'Never'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {users.length} user{users.length !== 1 ? 's' : ''} (most recent 100)
        </div>
      </div>
    </div>
  );
}
