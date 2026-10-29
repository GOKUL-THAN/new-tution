import { CreditCard } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = { title: 'Fees — Parent Portal', robots: { index: false } };

export default async function ParentFeesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type OrderRow = {
    id: string; orderNo: string; amount: number;
    status: string; paidAt: Date | null; createdAt: Date;
    courseTitle: string | null;
  };

  let orders: OrderRow[] = [];

  try {
    const parent = await prisma.parentProfile.findUnique({
      where: { userId: user.id },
      include: {
        children: {
          where: { verified: true },
          include: { student: { select: { userId: true } } },
        },
      },
    });

    if (parent) {
      const childUserIds = parent.children.map((c) => c.student.userId);
      if (childUserIds.length > 0) {
        const raw = await prisma.order.findMany({
          where: { userId: { in: childUserIds } },
          include: {
            enrolment: { include: { course: { select: { title: true } } } },
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        });
        orders = raw.map((o) => ({
          id: o.id,
          orderNo: o.orderNo,
          amount: o.amount,
          status: o.status,
          paidAt: o.paidAt,
          createdAt: o.createdAt,
          courseTitle: o.enrolment?.course?.title ?? null,
        }));
      }
    }
  } catch { /* DB unavailable */ }

  const statusVariant = (s: string) =>
    s === 'PAID' ? 'success' : s === 'FAILED' ? 'danger' : s === 'REFUNDED' ? 'warning' : 'default';

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Fees & Payments</h1>
        <p className="text-gray-500 mt-1">Payment history for your children&apos;s courses</p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No Payment Records"
          description="Payment records will appear here once your children enrol in paid courses."
          actionLabel="My Children"
          actionHref="/parent/children"
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Order', 'Course', 'Amount', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-mono text-xs text-gray-500">
                      {o.orderNo.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-5 py-3 text-gray-900 max-w-[180px] truncate">
                      {o.courseTitle ?? '—'}
                    </td>
                    <td className="px-5 py-3 font-semibold text-gray-900">
                      ₹{(o.amount / 100).toLocaleString('en-IN')}
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={statusVariant(o.status) as 'success' | 'danger' | 'warning' | 'default'}>
                        {o.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">
                      {new Date(o.paidAt ?? o.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-5 py-3 text-xs text-gray-400 border-t border-gray-100">
            All amounts in Indian Rupees (INR). Prices stored in paise; 1 INR = 100 paise.
          </p>
        </div>
      )}
    </div>
  );
}
