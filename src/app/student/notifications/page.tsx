import { Bell } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import MarkAllReadButton from '@/components/dashboard/MarkAllReadButton';
import Badge from '@/components/ui/Badge';

export const metadata = {
  title: 'Notifications | Student Portal — Global Minds Academy',
};

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type NotifRow = {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    link: string | null;
    createdAt: Date;
  };

  let notifications: NotifRow[] = [];

  try {
    notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  } catch {
    // DB unavailable
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const typeVariant = (type: string) => {
    switch (type) {
      case 'SUCCESS': return 'success' as const;
      case 'WARNING': return 'warning' as const;
      case 'ASSIGNMENT':
      case 'TEST': return 'primary' as const;
      default: return 'default' as const;
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && <MarkAllReadButton userId={user.id} />}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notifications"
          description="You have no notifications yet. We'll let you know about important updates here."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`card p-4 transition-colors ${!n.isRead ? 'border-l-4 border-l-brand-500 bg-brand-50/30' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.isRead ? 'bg-brand-500' : 'bg-gray-200'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                    <Badge variant={typeVariant(n.type)}>{n.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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
