import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  BarChart3,
  BookOpen,
  Users,
  ClipboardList,
  HelpCircle,
  ClipboardCheck,
  Calendar,
  User,
  Bell,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import type { UserRole } from '@prisma/client';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileLogoutButton from '@/components/dashboard/MobileLogoutButton';

const TEACHER_ROLES: UserRole[] = ['TEACHER', 'MENTOR', 'CONTENT_EDITOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN'];

const teacherNavItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/teacher/dashboard' },
  { icon: 'classes', label: 'Classes', href: '/teacher/classes' },
  { icon: 'students', label: 'Students', href: '/teacher/students' },
  { icon: 'assignments', label: 'Assignments', href: '/teacher/assignments' },
  { icon: 'question-bank', label: 'Question Bank', href: '/teacher/question-bank' },
  { icon: 'tests', label: 'Tests', href: '/teacher/tests' },
  { icon: 'attendance', label: 'Attendance', href: '/teacher/attendance' },
  { icon: 'profile', label: 'Profile', href: '/teacher/profile' },
];

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export default async function TeacherLayout({ children }: TeacherLayoutProps) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (!TEACHER_ROLES.includes(user.role)) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-emblem.svg" alt="Global Minds Academy" width={36} height={29} priority className="shrink-0" />
            <span className="font-display font-black text-[#0E3B43] text-base hidden sm:block">
              Global Minds Academy
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-semibold text-sm">
                {user.firstName[0]}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-none">{user.firstName}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user.role.replace(/_/g, ' ')}</p>
              </div>
              <MobileLogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar navItems={teacherNavItems} portalName="Teacher Portal" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around py-2">
          {[
            { icon: BarChart3, label: 'Home', href: '/teacher/dashboard' },
            { icon: BookOpen, label: 'Classes', href: '/teacher/classes' },
            { icon: Users, label: 'Students', href: '/teacher/students' },
            { icon: Bell, label: 'Tests', href: '/teacher/tests' },
            { icon: User, label: 'Profile', href: '/teacher/profile' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <item.icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="text-[10px] text-gray-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
