import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login?verified=error', request.url));
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyExpiry: { gt: new Date() },
      },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.redirect(new URL('/login?verified=error', request.url));
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        status: 'ACTIVE',
        verifyToken: null,
        verifyExpiry: null,
      },
    });

    return NextResponse.redirect(new URL('/login?verified=1', request.url));
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.redirect(new URL('/login?verified=error', request.url));
  }
}
