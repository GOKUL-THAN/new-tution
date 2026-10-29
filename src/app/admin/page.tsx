import {
  Users, BookOpen, ClipboardCheck, MessageSquare,
  CreditCard, TrendingUp, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import StatsCard from '@/components/ui/StatsCard';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard — Global Minds Academy',
  robots: { index: false, follow: false },
};

async function getAdminStats() {
  try {
    const [
      totalUsers, totalStudents, totalTeachers, totalCourses,
      publishedCourses, totalEnrolments, totalTests, totalEnquiries,
      newEnquiries, totalOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'TEACHER' } }),
      prisma.course.count(),
      prisma.course.count({ where: { status: 'PUBLISHED' } }),
      prisma.enrolment.count(),
      prisma.test.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.order.count(),
    ]);

    return {
      totalUsers, totalStudents, totalTeachers, totalCourses,
      publishedCourses, totalEnrolments, totalTests, totalEnquiries,
      newEnquiries, totalOrders,
    };
  } catch {
    return {
      totalUsers: 0, totalStudents: 0, totalTeachers: 0, totalCourses: 0,
      publishedCourses: 0, totalEnrolments: 0, totalTests: 0, totalEnquiries: 0,
      newEnquiries: 0, totalOrders: 0,
    };
  }
}

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const stats = await getAdminStats();

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Users} label="Total Users" value={stats.totalUsers} colorClass="bg-blue-100 text-blue-600" />
        <StatsCard icon={Users} label="Students" value={stats.totalStudents} colorClass="bg-violet-100 text-violet-600" />
        <StatsCard icon={Users} label="Teachers" value={stats.totalTeachers} colorClass="bg-emerald-100 text-emerald-600" />
        <StatsCard icon={BookOpen} label="Published Courses" value={stats.publishedCourses} colorClass="bg-amber-100 text-amber-600" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={TrendingUp} label="Enrolments" value={stats.totalEnrolments} colorClass="bg-cyan-100 text-cyan-600" />
        <StatsCard icon={ClipboardCheck} label="Tests Created" value={stats.totalTests} colorClass="bg-rose-100 text-rose-600" />
        <StatsCard icon={MessageSquare} label="Total Enquiries" value={stats.totalEnquiries} colorClass="bg-indigo-100 text-indigo-600" />
        <StatsCard icon={CreditCard} label="Orders" value={stats.totalOrders} colorClass="bg-orange-100 text-orange-600" />
      </div>

      {/* Action Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.newEnquiries > 0 && (
          <Link href="/admin/enquiries" className="card border-l-4 border-l-amber-500 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">{stats.newEnquiries} New Enquiries</p>
                <p className="text-xs text-gray-500">Require attention</p>
              </div>
            </div>
          </Link>
        )}

        <Link href="/admin/courses" className="card p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Manage Courses</p>
              <p className="text-xs text-gray-500">{stats.totalCourses} total, {stats.publishedCourses} published</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/users" className="card p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-600" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Manage Users</p>
              <p className="text-xs text-gray-500">{stats.totalUsers} registered users</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/question-bank" className="card p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-5 h-5 text-brand-600" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Question Bank</p>
              <p className="text-xs text-gray-500">Create and manage questions</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/health" className="card p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">System Health</p>
              <p className="text-xs text-gray-500">Check platform status</p>
            </div>
          </div>
        </Link>
      </div>

      <p className="text-xs text-gray-400 text-center">
        All figures are database-backed live counts. Dashboard data refreshes on each page load.
      </p>
    </div>
  );
}
