import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Enquiry Management — Admin',
  robots: { index: false, follow: false },
};

async function getEnquiries() {
  try {
    return await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        handler: { select: { firstName: true, lastName: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function AdminEnquiriesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const enquiries = await getEnquiries();

  const statusColors: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-700',
    CONTACTED: 'bg-indigo-100 text-indigo-700',
    COUNSELLING: 'bg-violet-100 text-violet-700',
    FOLLOW_UP: 'bg-amber-100 text-amber-700',
    ENROLLED: 'bg-emerald-100 text-emerald-700',
    CLOSED: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Enquiry Management</h1>
          <p className="text-gray-500 mt-1">View and manage student/parent enquiries</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-700">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden sm:table-cell">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Interest</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No enquiries yet. Enquiries submitted via the contact page will appear here.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{enq.name}</p>
                      <p className="text-xs text-gray-400">{enq.studentClass} · {enq.board}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="space-y-1">
                        {enq.phone && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Phone className="w-3 h-3" />{enq.phone}
                          </div>
                        )}
                        {enq.email && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Mail className="w-3 h-3" />{enq.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{enq.interest || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[enq.status] || 'bg-gray-100 text-gray-600'}`}>
                        {enq.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {enquiries.length} enquir{enquiries.length !== 1 ? 'ies' : 'y'}
        </div>
      </div>
    </div>
  );
}
