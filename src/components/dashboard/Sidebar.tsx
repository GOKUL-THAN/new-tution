'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
  currentPath: string;
  portalName: string;
}

export default function Sidebar({ navItems, currentPath, portalName }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16">
      {/* Portal label */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">{portalName}</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-4 py-2 space-y-1" aria-label={`${portalName} navigation`}>
        {navItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <item.icon
                className={clsx('w-5 h-5', isActive ? 'text-brand-600' : 'text-gray-400')}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
