'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

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
            Reset Your Password
          </h1>
          <p className="text-slate-600 font-medium leading-relaxed">
            Enter the email address linked to your account and we will send you
            a secure reset link.
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

          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-success-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Check your email</h2>
              <p className="text-gray-500 mb-2">
                If an account exists for <span className="font-medium text-gray-700">{email}</span>,
                a password reset link has been sent.
              </p>
              <p className="text-sm text-gray-400 mb-8">
                In development, check the server console for the reset link.
                The link expires in 1 hour.
              </p>
              <Link href="/login" className="btn-primary btn-lg inline-flex">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Forgot your password?</h2>
              <p className="text-gray-500 mb-8">
                No problem. Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
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

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full btn-lg"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
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
          )}
        </div>
      </div>
    </div>
  );
}
