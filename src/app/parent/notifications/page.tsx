import { Bell } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Notifications — Parent Portal', robots: { index: false } };

export default async function ParentNotificationsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let notifications: {
    id: string; title: string; message: string;
    type: string; isRead: boolean; createdAt: Date;
  }[] = [];

  try {
    notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  } catch { /* DB unavailable */ }

  const unread = notifications.filter((n) => !n.isRead).length;

  const typeVariant = (t: string) => {
    if (t === 'SUCCESS') return 'success' as const;
    if (t === 'WARNING') return 'warning' as const;
    if (['ASSIGNMENT', 'TEST', 'PAYMENT'].includes(t)) return 'primary' as const;
    return 'default' as const;
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">{unread > 0 ? `${unread} unread` : 'All caught up!'}</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notifications"
          description="You have no notifications yet. Important updates about your children will appear here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className={`card p-4 ${!n.isRead ? 'border-l-4 border-l-brand-500 bg-brand-50/20' : ''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.isRead ? 'bg-brand-500' : 'bg-gray-200'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                    <Badge variant={typeVariant(n.type)}>{n.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
