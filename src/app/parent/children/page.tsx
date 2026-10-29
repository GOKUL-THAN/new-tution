import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';

export const metadata = { title: 'My Children — Parent Portal', robots: { index: false } };

export default async function ParentChildrenPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type ChildLink = {
    id: string; verified: boolean;
    student: {
      id: string;
      user: { firstName: string; lastName: string; email: string };
      board: { name: string; shortName: string } | null;
      class: { name: string } | null;
      school: string | null;
    };
  };

  let children: ChildLink[] = [];
  try {
    const parent = await prisma.parentProfile.findUnique({
      where: { userId: user.id },
      include: {
        children: {
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true, email: true } },
                board: { select: { name: true, shortName: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
      },
    });
    children = (parent?.children ?? []) as ChildLink[];
  } catch { /* DB unavailable */ }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">My Children</h1>
        <p className="text-gray-500 mt-1">Students linked to your parent account</p>
      </div>

      {children.length === 0 ? (
        <>
          <EmptyState
            icon={Users}
            title="No Children Linked"
            description="Your account is not linked to any student yet. Contact the academy to link your child's account."
          />
          <div className="mt-6 text-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Academy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {children.map((link) => (
            <div key={link.id} className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xl">
                    {link.student.user.firstName[0]}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-gray-900 text-lg">
                      {link.student.user.firstName} {link.student.user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{link.student.user.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {link.student.class && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {link.student.class.name}
                        </span>
                      )}
                      {link.student.board && (
                        <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded">
                          {link.student.board.shortName}
                        </span>
                      )}
                      {link.student.school && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {link.student.school}
                        </span>
                      )}
                      {!link.verified && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                          Pending verification
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {link.verified && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-gray-100">
                  {[
                    { label: 'Progress', href: '/parent/progress' },
                    { label: 'Attendance', href: '/parent/attendance' },
                    { label: 'Test Results', href: '/parent/test-results' },
                    { label: 'Assignments', href: '/parent/assignments' },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}
                      className="text-center text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl py-2.5 transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
