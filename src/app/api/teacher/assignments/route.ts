import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const schema = z.object({
  title: z.string().min(1).max(500),
  instructions: z.string().optional(),
  subjectName: z.string().optional(),
  courseId: z.string().optional(),
  totalMarks: z.number().min(0).optional(),
  dueDate: z.string().optional(),
  allowLate: z.boolean().default(false),
});

export async function GET(_req: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);
    const teacherProfile = await prisma.teacherProfile.findUnique({ where: { userId: user.id } });
    if (!teacherProfile) return NextResponse.json({ assignments: [] });

    const assignments = await prisma.assignment.findMany({
      where: { teacherId: teacherProfile.id },
      include: { _count: { select: { submissions: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ assignments });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);
    const teacherProfile = await prisma.teacherProfile.findUnique({ where: { userId: user.id } });
    if (!teacherProfile) return NextResponse.json({ error: 'Teacher profile not found' }, { status: 404 });

    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten().fieldErrors }, { status: 400 });

    const assignment = await prisma.assignment.create({
      data: {
        ...parsed.data,
        teacherId: teacherProfile.id,
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
      },
    });
    return NextResponse.json(assignment, { status: 201 });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
