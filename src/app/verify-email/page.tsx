import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Mail, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verify Your Email',
  description: 'Verify your email address for your Global Minds Academy account.',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;

  // If no token, show "check your email" message
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-10 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900">Global Minds Academy</span>
          </Link>

          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-3">Check your email</h1>
          <p className="text-gray-500 mb-8">
            We sent a verification link to your email address. Click the link in that email to
            activate your account.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Didn&apos;t receive it? Check your spam folder, or contact us at{' '}
            <a href="mailto:support@globalmindsacademy.in" className="text-brand-600 hover:underline">
              support@globalmindsacademy.in
            </a>
          </p>
          <Link href="/login" className="btn-primary btn-lg inline-flex">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Token present — verify directly via Prisma (server component)
  // We call the API endpoint instead to keep Prisma imports clean in pages
  // and to get the redirect side-effect. The GET /api/auth/verify-email
  // already redirects to /login?verified=1 — so this page is only shown
  // when someone visits /verify-email with a token without the API redirect.
  // For full server-side verification without the redirect, we do it here:
  let verified = false;
  let errorMessage = '';

  try {
    const { default: prisma } = await import('@/lib/db');
    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyExpiry: { gt: new Date() },
      },
      select: { id: true },
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          status: 'ACTIVE',
          verifyToken: null,
          verifyExpiry: null,
        },
      });
      verified = true;
    } else {
      errorMessage = 'This verification link is invalid or has expired.';
    }
  } catch {
    errorMessage = 'An error occurred. Please try again later.';
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-10 justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-gray-900">Global Minds Academy</span>
        </Link>

        {verified ? (
          <>
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-3">Email Verified!</h1>
            <p className="text-gray-500 mb-8">
              Your email address has been verified successfully. You can now sign in to your account.
            </p>
            <Link href="/login?verified=1" className="btn-primary btn-lg inline-flex">
              Sign In
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-danger-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-3">Verification Failed</h1>
            <p className="text-gray-500 mb-8">{errorMessage}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register" className="btn-primary btn-lg inline-flex">
                Create Account
              </Link>
              <Link href="/login" className="btn-secondary btn-lg inline-flex">
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
