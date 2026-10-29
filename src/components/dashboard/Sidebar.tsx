'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Users,
  BookOpen,
  ClipboardList,
  FileText,
  Calendar,
  MessageSquare,
  CreditCard,
  Bell,
  Shield,
  Database,
  Settings,
  Layers,
  Book,
  ClipboardCheck,
  TrendingUp,
  User,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';
import clsx from 'clsx';

const ICON_MAP: Record<string, LucideIcon> = {
  BarChart3,
  Users,
  BookOpen,
  ClipboardList,
  FileText,
  Calendar,
  MessageSquare,
  CreditCard,
  Bell,
  Shield,
  Database,
  Settings,
  Layers,
  Book,
  ClipboardCheck,
  TrendingUp,
  User,
  HelpCircle,
  Clock,
  Award,
  dashboard: BarChart3,
  users: Users,
  courses: BookOpen,
  curriculum: ClipboardList,
  'question-bank': FileText,
  exams: Calendar,
  enquiries: MessageSquare,
  payments: CreditCard,
  notifications: Bell,
  'audit-logs': Shield,
  health: Database,
  settings: Settings,
  boards: Layers,
  subjects: Book,
  tests: ClipboardCheck,
  progress: TrendingUp,
  planner: Clock,
  profile: User,
  classes: BookOpen,
  students: Users,
  assignments: ClipboardList,
  attendance: Calendar,
  children: Users,
  fees: CreditCard,
  'test-results': ClipboardCheck,
};

export interface NavItem {
  icon: LucideIcon | string;
  label: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
  /** @deprecated — ignored; active state is derived from usePathname() */
  currentPath?: string;
  portalName: string;
}

export default function Sidebar({ navItems, portalName }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16">
      {/* Portal label */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">{portalName}</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 py-2 space-y-1" aria-label={`${portalName} navigation`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && item.href !== '/admin' && item.href !== '/student' && item.href !== '/teacher' && item.href !== '/parent' && pathname.startsWith(item.href + '/'));
          const Icon = typeof item.icon === 'string' ? (ICON_MAP[item.icon] || BookOpen) : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <Icon
                className={clsx('w-5 h-5 shrink-0', isActive ? 'text-brand-600' : 'text-gray-400')}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
