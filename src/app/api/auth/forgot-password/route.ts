import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { generateResetToken } from '@/lib/auth';
import { forgotPasswordSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Always return the same message to prevent user enumeration
  const GENERIC_MESSAGE = 'If an account exists for this email, a reset link has been sent.';

  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      // Still return 200 generic message to prevent enumeration
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const { email } = parsed.data;

    try {
      const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, firstName: true } });

      if (user) {
        const resetToken = generateResetToken();
        const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.user.update({
          where: { id: user.id },
          data: { resetToken, resetExpiry },
        });

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const resetLink = `${appUrl}/reset-password?token=${resetToken}`;

        // In production: send email via your email service
        // Stub: log the reset link to server console
        console.log(`[Password Reset] User: ${user.email} | Link: ${resetLink}`);
      }
    } catch {
      // DB error — still return generic 200 (no enumeration via error shape)
    }

    return NextResponse.json({ message: GENERIC_MESSAGE });
  } catch {
    return NextResponse.json({ message: GENERIC_MESSAGE });
  }
}
