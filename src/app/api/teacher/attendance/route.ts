import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const saveSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  records: z.array(z.object({
    studentId: z.string(),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
  })),
});

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date') ?? new Date().toISOString().split('T')[0];

    const teacherProfile = await prisma.teacherProfile.findUnique({ where: { userId: user.id } });
    if (!teacherProfile) return NextResponse.json({ students: [], existing: {} });

    // Get unique students from teacher's courses
    const enrolments = await prisma.enrolment.findMany({
      where: { course: { instructorId: teacherProfile.id } },
      select: {
        user: {
          select: {
            firstName: true, lastName: true, email: true,
            studentProfile: { select: { id: true } },
          },
        },
      },
    });

    const seen = new Set<string>();
    const students: { studentId: string; name: string; email: string }[] = [];
    for (const e of enrolments) {
      const spId = e.user.studentProfile?.id;
      if (spId && !seen.has(spId)) {
        seen.add(spId);
        students.push({ studentId: spId, name: `${e.user.firstName} ${e.user.lastName}`, email: e.user.email });
      }
    }

    // Get existing attendance for this date
    const existing: Record<string, string> = {};
    if (students.length > 0) {
      const date = new Date(dateStr);
      const records = await prisma.attendanceRecord.findMany({
        where: {
          studentId: { in: students.map((s) => s.studentId) },
          date,
        },
        select: { studentId: true, status: true },
      });
      records.forEach((r) => { existing[r.studentId] = r.status; });
    }

    return NextResponse.json({ students, existing });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);
    const body = await request.json();
    const parsed = saveSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Validation failed' }, { status: 400 });

    const { date: dateStr, records } = parsed.data;
    const date = new Date(dateStr);

    // Upsert each record
    await Promise.all(
      records.map((r) =>
        prisma.attendanceRecord.upsert({
          where: { studentId_date_sessionName: { studentId: r.studentId, date, sessionName: 'default' } },
          create: { studentId: r.studentId, date, status: r.status, markedById: user.id, sessionName: 'default' },
          update: { status: r.status, markedById: user.id },
        })
      )
    );

    return NextResponse.json({ saved: true });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
