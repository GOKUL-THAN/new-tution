import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';

export const metadata = {
  title: 'My Courses | Student Portal — Global Minds Academy',
};

export default async function MyCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let enrolments: Array<{
    id: string;
    progress: number;
    enrolledAt: Date;
    course: { id: string; title: string; slug: string; status: string; thumbnailUrl: string | null; description: string };
  }> = [];

  try {
    enrolments = await prisma.enrolment.findMany({
      where: { userId: user.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            status: true,
            thumbnailUrl: true,
            description: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500 mt-1">
            {enrolments.length === 0
              ? 'No courses enrolled yet.'
              : `${enrolments.length} course${enrolments.length !== 1 ? 's' : ''} enrolled`}
          </p>
        </div>
        <Link href="/courses" className="btn-primary btn-sm inline-flex items-center gap-2">
          Browse More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {enrolments.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No Courses Yet"
          description="Enrol in a course to start your learning journey. We have courses for all boards, classes, and entrance exams."
          actionLabel="Browse Courses"
          actionHref="/courses"
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolments.map((enrolment) => (
            <div key={enrolment.id} className="card p-0 overflow-hidden">
              {/* Thumbnail / placeholder */}
              <div className="h-36 bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center">
                {enrolment.course.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={enrolment.course.thumbnailUrl}
                    alt={enrolment.course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen className="w-10 h-10 text-brand-400" />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-gray-900 text-sm leading-snug">
                    {enrolment.course.title}
                  </h3>
                  <Badge variant={enrolment.course.status === 'PUBLISHED' ? 'success' : 'warning'}>
                    {enrolment.course.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {enrolment.course.description}
                </p>
                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(enrolment.progress)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all"
                      style={{ width: `${enrolment.progress}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={`/courses/${enrolment.course.slug}`}
                  className="btn-secondary btn-sm w-full text-center"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
