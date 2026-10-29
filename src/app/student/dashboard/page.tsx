import Link from 'next/link';
import {
  BookOpen, ClipboardCheck, Target, Award,
  ArrowRight, Clock, ChevronRight,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import StatsCard from '@/components/ui/StatsCard';

export const metadata = {
  title: 'Dashboard | Student Portal — Global Minds Academy',
};

async function getDashboardStats(userId: string) {
  try {
    const [enrolments, testAttempts, studyPlans] = await Promise.all([
      prisma.enrolment.count({ where: { userId } }),
      prisma.testAttempt.count({ where: { userId } }),
      prisma.studyPlan.count({ where: { userId, isActive: true } }),
    ]);
    return { enrolments, testAttempts, studyPlans };
  } catch {
    return { enrolments: 0, testAttempts: 0, studyPlans: 0 };
  }
}

export default async function StudentDashboardPage() {
  // getCurrentUser() is already called in layout — pages can call it too (cached by Next.js).
  const user = await getCurrentUser();
  // Layout already redirects if null, but narrow the type for TypeScript.
  if (!user) return null;

  const stats = await getDashboardStats(user.id);

  const quickActions = [
    { icon: BookOpen, label: 'Browse Courses', href: '/courses', desc: 'Explore and enrol in courses' },
    { icon: ClipboardCheck, label: 'Take a Test', href: '/student/tests', desc: 'Practice with mock exams' },
    { icon: Clock, label: 'Study Planner', href: '/student/study-planner', desc: 'Plan your revision schedule' },
  ];

  return (
    <div className="max-w-6xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Welcome back, {user.firstName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Continue where you left off.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          icon={BookOpen}
          label="Enrolled Courses"
          value={stats.enrolments}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatsCard
          icon={ClipboardCheck}
          label="Tests Taken"
          value={stats.testAttempts}
          colorClass="bg-violet-100 text-violet-600"
        />
        <StatsCard
          icon={Target}
          label="Study Plans"
          value={stats.studyPlans}
          colorClass="bg-amber-100 text-amber-600"
        />
        <StatsCard
          icon={Award}
          label="Days Active"
          value="0"
          colorClass="bg-emerald-100 text-emerald-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="card-hover p-5 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-brand-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-500">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty / CTA state */}
      {stats.enrolments === 0 && (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-brand-600" />
          </div>
          <h3 className="font-display font-bold text-gray-900 mb-2">
            Start Your Learning Journey
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            You haven&apos;t enrolled in any courses yet. Browse our catalogue to find courses
            matching your board, class, and preparation goals.
          </p>
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2">
            Browse Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
