import { CreditCard, CheckCircle2, Clock, AlertTriangle, Download } from 'lucide-react';
import prisma from '@/lib/db';
import StatsCard from '@/components/ui/StatsCard';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Payments & Revenue | Admin Panel' };

export default async function AdminPaymentsPage() {
  let orders: any[] = [];
  let totalRevenue = 0;
  let paidCount = 0;
  let pendingCount = 0;
  let failedCount = 0;

  try {
    orders = await prisma.order.findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      include: {
        enrolment: {
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
            course: { select: { title: true } },
          },
        },
      },
    });

    for (const order of orders) {
      if (order.status === 'PAID') {
        totalRevenue += order.amount;
        paidCount++;
      } else if (order.status === 'PENDING' || order.status === 'CREATED') {
        pendingCount++;
      } else {
        failedCount++;
      }
    }
  } catch (err) {
    console.error('Failed to fetch admin payments:', err);
  }

  const formatAmount = (paise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Payments & Revenue</h1>
          <p className="text-sm text-gray-500">Monitor fee collections, transactions, and payment statuses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={CreditCard}
          label="Total Collected"
          value={formatAmount(totalRevenue)}
          colorClass="bg-brand-100 text-brand-600"
        />
        <StatsCard
          icon={CheckCircle2}
          label="Successful Orders"
          value={paidCount}
          colorClass="bg-emerald-100 text-emerald-600"
        />
        <StatsCard
          icon={Clock}
          label="Pending Payments"
          value={pendingCount}
          colorClass="bg-amber-100 text-amber-600"
        />
        <StatsCard
          icon={AlertTriangle}
          label="Failed / Refunded"
          value={failedCount}
          colorClass="bg-rose-100 text-rose-600"
        />
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
          <span className="text-xs text-gray-400">{orders.length} transactions recorded</span>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="No Payment Records Found"
            description="When students or parents enrol in premium courses, transactions will be tracked here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Order No</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => {
                  const customer = o.enrolment?.user;
                  const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Direct Purchase';
                  const courseTitle = o.enrolment?.course?.title || 'Standard Tuition Fee';

                  let statusVariant: 'success' | 'warning' | 'danger' | 'default' = 'default';
                  if (o.status === 'PAID') statusVariant = 'success';
                  else if (o.status === 'PENDING' || o.status === 'CREATED') statusVariant = 'warning';
                  else if (o.status === 'FAILED') statusVariant = 'danger';

                  return (
                    <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs font-medium text-gray-900">
                        {o.orderNo}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{customerName}</p>
                        {customer?.email && <p className="text-xs text-gray-400">{customer.email}</p>}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{courseTitle}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{formatAmount(o.amount)}</td>
                      <td className="px-6 py-4">
                        <Badge variant={statusVariant}>{o.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(o.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
