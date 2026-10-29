import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

const profileUpdateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().max(20).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  avatarUrl: z.string().url().max(500).optional().nullable().or(z.literal('')),
});

export async function GET() {
  try {
    const user = await requireAuth();

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
        studentProfile: {
          select: {
            board: { select: { name: true } },
            class: { select: { name: true } },
            school: true,
          },
        },
      },
    });

    return NextResponse.json({ user: profile });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireAuth();

    const body: unknown = await req.json();
    const parsed = profileUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const { firstName, lastName, phone, bio, avatarUrl } = parsed.data;

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        phone: phone ?? null,
        bio: bio ?? null,
        avatarUrl: avatarUrl === '' ? null : (avatarUrl ?? null),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        bio: true,
        avatarUrl: true,
      },
    });

    return NextResponse.json({ user: updated });
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
