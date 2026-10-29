import Link from 'next/link';
import {
  BookOpen, Users, ClipboardCheck, Calendar,
  ChevronRight, Clock,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import StatsCard from '@/components/ui/StatsCard';

export const metadata = {
  title: 'Teacher Dashboard — Global Minds Academy',
  robots: { index: false, follow: false },
};

async function getTeacherStats(userId: string) {
  try {
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });
    if (!teacherProfile) return { courses: 0, assignments: 0, sessions: 0, doubts: 0 };

    const [courses, assignments, sessions, doubts] = await Promise.all([
      prisma.course.count({ where: { instructorId: teacherProfile.id } }),
      prisma.assignment.count({ where: { teacherId: teacherProfile.id } }),
      prisma.liveSession.count({ where: { instructorId: teacherProfile.id } }),
      prisma.doubt.count({ where: { status: 'OPEN' } }),
    ]);
    return { courses, assignments, sessions, doubts };
  } catch {
    return { courses: 0, assignments: 0, sessions: 0, doubts: 0 };
  }
}

export default async function TeacherDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const stats = await getTeacherStats(user.id);

  const quickActions = [
    { icon: ClipboardCheck, label: 'Create Assignment', href: '/teacher/assignments', desc: 'Assign work to students' },
    { icon: BookOpen, label: 'Question Bank', href: '/teacher/question-bank', desc: 'Manage questions' },
    { icon: Calendar, label: 'Mark Attendance', href: '/teacher/attendance', desc: 'Record student attendance' },
    { icon: Clock, label: 'Create Test', href: '/teacher/tests', desc: 'Build assessments' },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Welcome, {user.firstName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Manage your classes, assignments, and assessments.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={BookOpen} label="My Courses" value={stats.courses} colorClass="bg-blue-100 text-blue-600" />
        <StatsCard icon={ClipboardCheck} label="Assignments" value={stats.assignments} colorClass="bg-violet-100 text-violet-600" />
        <StatsCard icon={Calendar} label="Live Sessions" value={stats.sessions} colorClass="bg-amber-100 text-amber-600" />
        <StatsCard icon={Users} label="Open Doubts" value={stats.doubts} colorClass="bg-rose-100 text-rose-600" />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="card-hover p-5 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-brand-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-brand-600">{action.label}</p>
                    <p className="text-xs text-gray-500">{action.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {stats.doubts > 0 && (
        <div className="card border-l-4 border-l-amber-500 p-5 mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-amber-500" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{stats.doubts} Unresolved Student Doubts</p>
              <p className="text-xs text-gray-500">Students are waiting for your response</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
