import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  Bell,
  User,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileLogoutButton from '@/components/dashboard/MobileLogoutButton';

const studentNavItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/student/dashboard' },
  { icon: 'courses', label: 'My Courses', href: '/student/my-courses' },
  { icon: 'tests', label: 'Tests', href: '/student/tests' },
  { icon: 'progress', label: 'Progress', href: '/student/progress' },
  { icon: 'planner', label: 'Study Planner', href: '/student/study-planner' },
  { icon: 'HelpCircle', label: 'AI Doubt Support', href: '/student/doubt-support' },
  { icon: 'notifications', label: 'Notifications', href: '/student/notifications' },
  { icon: 'profile', label: 'Profile', href: '/student/profile' },
];

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default async function StudentLayout({ children }: StudentLayoutProps) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

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
            <Link
              href="/student/notifications"
              className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-sm">
                {user.firstName[0]}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user.firstName}
              </span>
              <MobileLogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — currentPath is handled client-side by ActiveLink in Sidebar */}
        <Sidebar navItems={studentNavItems} portalName="Student Portal" />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around py-2">
          {[
            { icon: BarChart3, label: 'Home', href: '/student/dashboard' },
            { icon: BookOpen, label: 'Courses', href: '/student/my-courses' },
            { icon: ClipboardCheck, label: 'Tests', href: '/student/tests' },
            { icon: Bell, label: 'Alerts', href: '/student/notifications' },
            { icon: User, label: 'Profile', href: '/student/profile' },
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
