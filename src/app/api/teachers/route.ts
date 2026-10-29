import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const teachers = await prisma.teacherProfile.findMany({
      where: { showOnWebsite: true, isVerified: true },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            avatarUrl: true,
            bio: true,
          },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Teachers API error:', error);
    return NextResponse.json([]);
  }
}
