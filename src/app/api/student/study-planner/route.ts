import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

const planSchema = z.object({
  title: z.string().min(1).max(200).optional().default('My Study Plan'),
  data: z.record(z.unknown()),
});

export async function GET() {
  try {
    const user = await requireAuth();

    const plan = await prisma.studyPlan.findFirst({
      where: { userId: user.id, isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();

    const body: unknown = await req.json();
    const parsed = planSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const plan = await prisma.studyPlan.create({
      data: {
        userId: user.id,
        title: parsed.data.title,
        data: parsed.data.data as Prisma.InputJsonValue,
        isActive: true,
      },
    });

    return NextResponse.json(plan, { status: 201 });
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
    const parsed = planSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // Find existing active plan
    const existing = await prisma.studyPlan.findFirst({
      where: { userId: user.id, isActive: true },
    });

    if (!existing) {
      // Create new if none exists
      const plan = await prisma.studyPlan.create({
        data: {
          userId: user.id,
          title: parsed.data.title,
          data: parsed.data.data as Prisma.InputJsonValue,
          isActive: true,
        },
      });
      return NextResponse.json(plan);
    }

    const updated = await prisma.studyPlan.update({
      where: { id: existing.id },
      data: {
        title: parsed.data.title,
        data: parsed.data.data as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof Error && err.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
