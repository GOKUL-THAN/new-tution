import { Bell, Send, CheckCheck, AlertCircle, Info, Tag } from 'lucide-react';
import prisma from '@/lib/db';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Notifications & Announcements | Admin Panel' };

export default async function AdminNotificationsPage() {
  let notifications: any[] = [];
  let totalCount = 0;
  let unreadCount = 0;

  try {
    const [rawNotifications, total, unread] = await Promise.all([
      prisma.notification.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      prisma.notification.count(),
      prisma.notification.count({ where: { isRead: false } }),
    ]);

    notifications = rawNotifications;
    totalCount = total;
    unreadCount = unread;
  } catch (err) {
    console.error('Failed to load admin notifications:', err);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Notifications & Announcements</h1>
          <p className="text-sm text-gray-500">Track system notifications and student/teacher communications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          icon={Bell}
          label="Total Notifications"
          value={totalCount}
          colorClass="bg-brand-100 text-brand-600"
        />
        <StatsCard
          icon={AlertCircle}
          label="Unread by Recipients"
          value={unreadCount}
          colorClass="bg-amber-100 text-amber-600"
        />
        <StatsCard
          icon={CheckCheck}
          label="Delivered & Read"
          value={totalCount - unreadCount}
          colorClass="bg-emerald-100 text-emerald-600"
        />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Notification Feed</h2>
          <span className="text-xs text-gray-400">Showing latest {notifications.length} events</span>
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="No Notifications Logged"
            description="System notifications, test alerts, and assignments will appear here."
          />
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((n) => {
              const recipient = n.user ? `${n.user.firstName} ${n.user.lastName}` : 'System Broadcaster';
              const role = n.user?.role || 'ALL';

              return (
                <div key={n.id} className="p-5 hover:bg-gray-50/70 transition-colors flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{n.title}</h3>
                      <Badge variant="default">{n.type}</Badge>
                      <span className="text-xs text-gray-400">to</span>
                      <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                        {recipient} ({role})
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{n.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>
                        {new Date(n.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span>Status: {n.isRead ? 'Read' : 'Unread'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
