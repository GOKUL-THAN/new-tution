'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');
  const reset = searchParams.get('reset');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Redirect based on role
      const dashboardMap: Record<string, string> = {
        STUDENT: '/student/dashboard',
        PARENT: '/parent/dashboard',
        TEACHER: '/teacher/dashboard',
        MENTOR: '/teacher/dashboard',
        CONTENT_EDITOR: '/admin',
        ACADEMIC_ADMIN: '/admin',
        FINANCE_ADMIN: '/admin',
        SUPER_ADMIN: '/admin',
      };
      router.push(dashboardMap[data.user.role] || '/student/dashboard');
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-50 via-blue-50/40 to-sky-50/40 border-r border-slate-200 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.05),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 text-center max-w-md">
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <Image
              src="/logo.svg"
              alt="Global Minds Academy"
              width={56}
              height={56}
              priority
              className="transition-transform group-hover:scale-105"
            />
            <div className="text-left">
              <span className="font-display font-black text-2xl text-slate-900 block leading-tight">Global Minds</span>
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold">Academy</span>
            </div>
          </Link>
          <h1 className="text-3xl font-display font-black text-slate-900 mb-4">
            Welcome Back
          </h1>
          <p className="text-slate-600 font-medium leading-relaxed">
            Continue your learning journey. Access your courses, tests, and
            personalised study plans.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900">Global Minds Academy</span>
          </Link>

          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Sign in to your account</h2>
          <p className="text-gray-500 mb-8">Access your dashboard, courses, and more.</p>

          {verified === '1' && (
            <div className="flex items-center gap-2 bg-success-50 text-success-700 px-4 py-3 rounded-xl text-sm mb-6">
              <CheckCircle className="w-4 h-4 shrink-0" />
              Email verified successfully! You can now sign in.
            </div>
          )}

          {reset === '1' && (
            <div className="flex items-center gap-2 bg-success-50 text-success-700 px-4 py-3 rounded-xl text-sm mb-6">
              <CheckCircle className="w-4 h-4 shrink-0" />
              Password reset successfully. Please sign in with your new password.
            </div>
          )}

          {error && (
            <div className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full btn-lg"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-brand-600 font-semibold hover:text-brand-700">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <LoginForm />
    </Suspense>
  );
}
