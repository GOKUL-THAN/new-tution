import { ClipboardList, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Assignments — Parent Portal', robots: { index: false } };

export default async function ParentAssignmentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  type SubmissionRow = {
    id: string;
    studentName: string;
    title: string;
    subjectName: string | null;
    status: string;
    marks: number | null;
    totalMarks: number | null;
    submittedAt: Date;
    feedback: string | null;
  };

  let submissions: SubmissionRow[] = [];

  try {
    const parent = await prisma.parentProfile.findUnique({
      where: { userId: user.id },
      include: {
        children: {
          where: { verified: true },
          include: {
            student: {
              include: {
                user: { select: { id: true, firstName: true, lastName: true } },
              },
            },
          },
        },
      },
    });

    if (parent && parent.children.length > 0) {
      const childUserMap = new Map<string, string>();
      for (const link of parent.children) {
        childUserMap.set(
          link.student.userId,
          `${link.student.user.firstName} ${link.student.user.lastName}`
        );
      }

      const childUserIds = Array.from(childUserMap.keys());

      const raw = await prisma.assignmentSubmission.findMany({
        where: { userId: { in: childUserIds } },
        include: {
          assignment: true,
        },
        orderBy: { submittedAt: 'desc' },
        take: 50,
      });

      submissions = raw.map((s) => ({
        id: s.id,
        studentName: childUserMap.get(s.userId) || 'Student',
        title: s.assignment.title,
        subjectName: s.assignment.subjectName,
        status: s.status,
        marks: s.marks,
        totalMarks: s.assignment.totalMarks,
        submittedAt: s.submittedAt,
        feedback: s.feedback,
      }));
    }
  } catch (err) {
    console.error('Failed to load parent assignments:', err);
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900">Child Assignments</h1>
        <p className="text-gray-500 mt-1">
          Review your children&apos;s homework, submissions, scores, and teacher evaluations.
        </p>
      </div>

      {submissions.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No Assignment Submissions"
          description="When your linked child submits assignments or homework tasks, their progress and grades will appear here."
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Assignment</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((sub) => {
                  let badgeVariant: 'success' | 'warning' | 'default' = 'default';
                  if (sub.status === 'GRADED') badgeVariant = 'success';
                  else if (sub.status === 'SUBMITTED') badgeVariant = 'warning';

                  return (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {sub.studentName}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{sub.title}</p>
                        {sub.feedback && (
                          <p className="text-xs text-emerald-600 mt-0.5">Feedback: {sub.feedback}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">{sub.subjectName || 'General'}</td>
                      <td className="px-6 py-4">
                        <Badge variant={badgeVariant}>{sub.status}</Badge>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {sub.marks !== null ? `${sub.marks} / ${sub.totalMarks || 100}` : 'Pending review'}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(sub.submittedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
