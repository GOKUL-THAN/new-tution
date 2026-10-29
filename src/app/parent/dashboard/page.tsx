import Link from 'next/link';
import { Users, BookOpen, ClipboardCheck, Calendar, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import StatsCard from '@/components/ui/StatsCard';

export const metadata = {
  title: 'Parent Dashboard — Global Minds Academy',
  robots: { index: false, follow: false },
};

async function getParentData(userId: string) {
  try {
    const parentProfile = await prisma.parentProfile.findUnique({
      where: { userId },
      include: {
        children: {
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true } },
                board: { select: { shortName: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    return { children: parentProfile?.children || [] };
  } catch {
    return { children: [] };
  }
}

export default async function ParentDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const data = await getParentData(user.id);

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Welcome, {user.firstName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Monitor your child&apos;s academic progress.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Linked Children" value={data.children.length} colorClass="bg-blue-100 text-blue-600" />
        <StatsCard icon={BookOpen} label="Courses" value={0} colorClass="bg-violet-100 text-violet-600" />
        <StatsCard icon={ClipboardCheck} label="Tests Taken" value={0} colorClass="bg-amber-100 text-amber-600" />
        <StatsCard icon={Calendar} label="Attendance" value="—" colorClass="bg-emerald-100 text-emerald-600" />
      </div>

      {data.children.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Your Children</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.children.map((link) => (
              <div key={link.id} className="card p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-lg">
                    {link.student.user.firstName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {link.student.user.firstName} {link.student.user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {link.student.class?.name || 'Class not set'}
                      {link.student.board ? ` · ${link.student.board.shortName}` : ''}
                    </p>
                    {!link.verified && (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                        Pending verification
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="font-display font-bold text-gray-900 mb-2">No Children Linked</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            Your account is not linked to any student yet. Contact the academy administration
            to link your child&apos;s account to your parent dashboard.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Contact Academy <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
