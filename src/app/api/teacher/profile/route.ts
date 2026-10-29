import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const schema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  qualification: z.string().optional(),
  experience: z.string().optional(),
  specializations: z.array(z.string()).optional().default([]),
  subjects: z.array(z.string()).optional().default([]),
  showOnWebsite: z.boolean().optional().default(false),
});

export async function GET() {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        bio: true,
        avatarUrl: true,
        teacherProfile: {
          select: {
            id: true,
            qualification: true,
            experience: true,
            specializations: true,
            subjects: true,
            showOnWebsite: true,
            isVerified: true,
          },
        },
      },
    });

    return NextResponse.json({ user: profile });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN')) {
      return NextResponse.json(
        { error: err.message },
        { status: err.message === 'UNAUTHORIZED' ? 401 : 403 }
      );
    }
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth(['TEACHER', 'MENTOR', 'ACADEMIC_ADMIN', 'SUPER_ADMIN']);
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: 'Validation failed' }, { status: 400 });

    const { firstName, lastName, qualification, experience, specializations, subjects, showOnWebsite } = parsed.data;

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { firstName, lastName } }),
      prisma.teacherProfile.upsert({
        where: { userId: user.id },
        create: { userId: user.id, qualification, experience, specializations: specializations ?? [], subjects: subjects ?? [], showOnWebsite: showOnWebsite ?? false },
        update: { qualification, experience, specializations: specializations ?? [], subjects: subjects ?? [], showOnWebsite: showOnWebsite ?? false },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && (err.message === 'UNAUTHORIZED' || err.message === 'FORBIDDEN'))
      return NextResponse.json({ error: err.message }, { status: err.message === 'UNAUTHORIZED' ? 401 : 403 });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
