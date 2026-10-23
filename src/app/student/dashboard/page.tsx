'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen, ClipboardCheck, BarChart3, Calendar,
  Bell, User, LogOut, GraduationCap, Clock,
  MessageCircle, Bookmark, Settings, ChevronRight,
  TrendingUp, Award, Target, ArrowRight,
} from 'lucide-react';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!data.user) {
          router.push('/login');
          return;
        }
        setUser(data.user);
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/student/dashboard', active: true },
    { icon: BookOpen, label: 'My Courses', href: '/student/my-courses' },
    { icon: ClipboardCheck, label: 'Tests', href: '/student/tests' },
    { icon: Calendar, label: 'Assignments', href: '/student/assignments' },
    { icon: TrendingUp, label: 'Progress', href: '/student/progress' },
    { icon: MessageCircle, label: 'Doubts', href: '/student/doubt-support' },
    { icon: Bookmark, label: 'Bookmarks', href: '/student/bookmarks' },
    { icon: Bell, label: 'Notifications', href: '/student/notifications' },
    { icon: User, label: 'Profile', href: '/student/profile' },
    { icon: Settings, label: 'Settings', href: '/student/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-accent-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 hidden sm:block">Global Minds Academy</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold text-sm">
                {user.firstName[0]}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.firstName}</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-danger-500 transition-colors ml-1" title="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-gray-500 mt-1">Continue where you left off.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: BookOpen, label: 'Enrolled Courses', value: '0', color: 'bg-blue-100 text-blue-600' },
              { icon: ClipboardCheck, label: 'Tests Taken', value: '0', color: 'bg-violet-100 text-violet-600' },
              { icon: Target, label: 'Assignments', value: '0', color: 'bg-amber-100 text-amber-600' },
              { icon: Award, label: 'Study Streak', value: '0 days', color: 'bg-emerald-100 text-emerald-600' },
            ].map((stat, i) => (
              <div key={i} className="card p-5">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-display font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: BookOpen, label: 'Browse Courses', href: '/courses', desc: 'Explore and enrol in courses' },
                { icon: ClipboardCheck, label: 'Take a Test', href: '/student/tests', desc: 'Practice with mock exams' },
                { icon: Clock, label: 'Study Planner', href: '/student/study-planner', desc: 'Plan your revision schedule' },
              ].map((action) => (
                <Link key={action.href} href={action.href} className="card-hover p-5 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                        <action.icon className="w-5 h-5 text-brand-600" />
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

          {/* Empty State */}
          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-brand-600" />
            </div>
            <h3 className="font-display font-bold text-gray-900 mb-2">Start Your Learning Journey</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              You haven&apos;t enrolled in any courses yet. Browse our catalogue to find
              courses matching your board, class, and preparation goals.
            </p>
            <Link href="/courses" className="btn-primary">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: BarChart3, label: 'Home', href: '/student/dashboard' },
            { icon: BookOpen, label: 'Courses', href: '/student/my-courses' },
            { icon: ClipboardCheck, label: 'Tests', href: '/student/tests' },
            { icon: MessageCircle, label: 'Doubts', href: '/student/doubt-support' },
            { icon: User, label: 'Profile', href: '/student/profile' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-3 py-1">
              <item.icon className="w-5 h-5 text-gray-400" />
              <span className="text-[10px] text-gray-500">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
