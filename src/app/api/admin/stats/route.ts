import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAuth(['ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR']);

    const [
      totalUsers, students, parents, teachers,
      totalCourses, publishedCourses, totalEnrolments,
      totalTests, totalAttempts,
      totalEnquiries, newEnquiries,
      totalOrders, paidOrders,
      totalQuestions, publishedQuestions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'PARENT' } }),
      prisma.user.count({ where: { role: 'TEACHER' } }),
      prisma.course.count(),
      prisma.course.count({ where: { status: 'PUBLISHED' } }),
      prisma.enrolment.count(),
      prisma.test.count(),
      prisma.testAttempt.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PAID' } }),
      prisma.question.count(),
      prisma.question.count({ where: { isPublished: true } }),
    ]);

    // Recent registrations (last 7 days)
    const since7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentUsers = await prisma.user.findMany({
      where: { createdAt: { gte: since7Days } },
      select: { firstName: true, lastName: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Recent enquiries
    const recentEnquiries = await prisma.enquiry.findMany({
      select: { id: true, name: true, studentClass: true, board: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      users: { total: totalUsers, students, parents, teachers },
      courses: { total: totalCourses, published: publishedCourses, enrolments: totalEnrolments },
      assessments: { tests: totalTests, attempts: totalAttempts, questions: totalQuestions, publishedQuestions },
      enquiries: { total: totalEnquiries, new: newEnquiries },
      orders: { total: totalOrders, paid: paidOrders },
      recentUsers,
      recentEnquiries,
    });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
