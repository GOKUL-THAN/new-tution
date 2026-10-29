import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword, generateToken, generateVerifyToken } from '@/lib/auth';
import { registerSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName, phone, role } = parsed.data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Prevent self-registration as admin
    if (['SUPER_ADMIN', 'ACADEMIC_ADMIN', 'FINANCE_ADMIN', 'CONTENT_EDITOR', 'MENTOR'].includes(role)) {
      return NextResponse.json(
        { error: 'This role cannot be self-assigned during registration' },
        { status: 403 }
      );
    }

    const passwordHash = await hashPassword(password);
    const verifyToken = generateVerifyToken();

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        role: role as any,
        status: 'ACTIVE',
        emailVerified: false,
        verifyToken,
        verifyExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        ...(role === 'STUDENT' ? { studentProfile: { create: {} } } : {}),
        ...(role === 'TEACHER' ? { teacherProfile: { create: { specializations: [], subjects: [] } } } : {}),
        ...(role === 'PARENT' ? { parentProfile: { create: {} } } : {}),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    // Generate auth token
    const token = generateToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({
      message: 'Account created successfully',
      user,
    }, { status: 201 });

    // Set auth cookie
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
