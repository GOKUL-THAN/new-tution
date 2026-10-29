import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { resetPasswordSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { token, password } = parsed.data;

    let user;
    try {
      user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetExpiry: { gt: new Date() },
        },
        select: { id: true, status: true },
      });
    } catch {
      return NextResponse.json(
        { error: 'An unexpected error occurred. Please try again.' },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: 'This password reset link is invalid or has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetExpiry: null,
        // Activate the account if it was pending email verification
        ...(user.status === 'PENDING_VERIFICATION' ? { status: 'ACTIVE', emailVerified: true } : {}),
      },
    });

    return NextResponse.json({ message: 'Password reset successfully. You can now sign in with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
