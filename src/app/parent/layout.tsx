import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap, BarChart3, Users, BookOpen, ClipboardCheck,
  Calendar, CreditCard, Bell, Settings, User,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import type { UserRole } from '@prisma/client';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileLogoutButton from '@/components/dashboard/MobileLogoutButton';

const PARENT_ROLES: UserRole[] = ['PARENT', 'SUPER_ADMIN'];

const parentNavItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/parent/dashboard' },
  { icon: 'children', label: 'My Children', href: '/parent/children' },
  { icon: 'courses', label: 'Progress', href: '/parent/progress' },
  { icon: 'assignments', label: 'Assignments', href: '/parent/assignments' },
  { icon: 'tests', label: 'Test Results', href: '/parent/test-results' },
  { icon: 'attendance', label: 'Attendance', href: '/parent/attendance' },
  { icon: 'fees', label: 'Fees', href: '/parent/fees' },
  { icon: 'notifications', label: 'Notifications', href: '/parent/notifications' },
  { icon: 'settings', label: 'Settings', href: '/parent/settings' },
];

export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (!PARENT_ROLES.includes(user.role)) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-emblem.svg" alt="Global Minds Academy" width={36} height={29} priority className="shrink-0" />
            <span className="font-display font-black text-[#0E3B43] text-base hidden sm:block">Global Minds Academy</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/parent/notifications" className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold text-sm">
                {user.firstName[0]}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-none">{user.firstName}</p>
                <p className="text-xs text-gray-400 mt-0.5">Parent</p>
              </div>
              <MobileLogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar navItems={parentNavItems} portalName="Parent Portal" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40" aria-label="Mobile navigation">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: BarChart3, label: 'Home', href: '/parent/dashboard' },
            { icon: Users, label: 'Children', href: '/parent/children' },
            { icon: BookOpen, label: 'Progress', href: '/parent/progress' },
            { icon: Bell, label: 'Alerts', href: '/parent/notifications' },
            { icon: User, label: 'Settings', href: '/parent/settings' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-3 py-1">
              <item.icon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="text-[10px] text-gray-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
