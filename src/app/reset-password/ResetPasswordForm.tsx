'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { GraduationCap, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

function ResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-danger-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Invalid Reset Link</h2>
        <p className="text-gray-500 mb-8">
          This password reset link is missing a token. Please request a new one.
        </p>
        <Link href="/forgot-password" className="btn-primary btn-lg inline-flex">
          Request New Link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to reset password. Please try again.');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/login?reset=1'), 2000);
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-success-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Password Reset!</h2>
        <p className="text-gray-500 mb-8">
          Your password has been updated. Redirecting you to sign in&hellip;
        </p>
        <Link href="/login" className="btn-primary btn-lg inline-flex">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Set a new password</h2>
      <p className="text-gray-500 mb-8">
        Choose a strong password with at least 8 characters, one uppercase letter, one lowercase letter,
        and one number.
      </p>

      {error && (
        <div className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-sm mb-6">
          {error}{' '}
          {error.toLowerCase().includes('expired') || error.toLowerCase().includes('invalid') ? (
            <Link href="/forgot-password" className="font-semibold underline">
              Request a new link
            </Link>
          ) : null}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-10 pr-10"
              placeholder="New password"
              required
              minLength={8}
              autoComplete="new-password"
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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field pl-10 pr-10"
              placeholder="Confirm new password"
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
              Reset Password
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Remembered your password?{' '}
        <Link href="/login" className="text-brand-600 font-semibold hover:text-brand-700">
          Sign in
        </Link>
      </p>
    </>
  );
}

export default function ResetPasswordForm() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-50 via-teal-50/50 to-emerald-50/50 border-r border-slate-200 relative items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,107,90,0.06),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 text-center max-w-md">
          <Link href="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white border border-teal-200/80 shadow-md rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-teal-700" />
            </div>
            <div className="text-left">
              <span className="font-display font-black text-2xl text-[#0D2B3E] block">Global Minds</span>
              <span className="text-xs uppercase tracking-widest text-[#1A6B5A] font-bold">Academy</span>
            </div>
          </Link>
          <h1 className="text-3xl font-display font-black text-slate-900 mb-4">
            Create a New Password
          </h1>
          <p className="text-slate-600 font-medium leading-relaxed">
            Choose a strong password to secure your account and get back to
            learning.
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

          <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-2xl" />}>
            <ResetPasswordFormInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
