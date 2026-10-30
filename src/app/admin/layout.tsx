import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap, BarChart3, Users, BookOpen, ClipboardList,
  Settings, Shield, Bell, FileText, CreditCard, MessageSquare,
  Database, Calendar, User,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import type { UserRole } from '@prisma/client';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileLogoutButton from '@/components/dashboard/MobileLogoutButton';

const ADMIN_ROLES: UserRole[] = ['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'CONTENT_EDITOR'];

const adminNavItems = [
  { icon: 'dashboard', label: 'Dashboard', href: '/admin' },
  { icon: 'users', label: 'Users', href: '/admin/users' },
  { icon: 'courses', label: 'Courses', href: '/admin/courses' },
  { icon: 'curriculum', label: 'Curriculum', href: '/admin/curriculum' },
  { icon: 'boards', label: 'Boards', href: '/admin/boards' },
  { icon: 'subjects', label: 'Subjects', href: '/admin/subjects' },
  { icon: 'question-bank', label: 'Question Bank', href: '/admin/question-bank' },
  { icon: 'exams', label: 'Exams', href: '/admin/exams' },
  { icon: 'enquiries', label: 'Enquiries', href: '/admin/enquiries' },
  { icon: 'payments', label: 'Payments', href: '/admin/payments' },
  { icon: 'notifications', label: 'Notifications', href: '/admin/notifications' },
  { icon: 'audit-logs', label: 'Audit Logs', href: '/admin/audit-logs' },
  { icon: 'health', label: 'System Health', href: '/admin/health' },
  { icon: 'settings', label: 'Settings', href: '/admin/settings' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (!ADMIN_ROLES.includes(user.role)) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="Global Minds Academy" width={32} height={32} priority />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-gray-900 text-sm block leading-tight">Global Minds Academy</span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider">Admin Panel</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-semibold text-sm">
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
        <Sidebar navItems={adminNavItems} portalName="Administration" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40" aria-label="Mobile navigation">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: BarChart3, label: 'Home', href: '/admin' },
            { icon: Users, label: 'Users', href: '/admin/users' },
            { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
            { icon: MessageSquare, label: 'Enquiries', href: '/admin/enquiries' },
            { icon: Settings, label: 'Settings', href: '/admin/settings' },
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
