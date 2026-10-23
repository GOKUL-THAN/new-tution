import Link from 'next/link';
import { GraduationCap, Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-brand-100 flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-brand-600" />
        </div>

        <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-xl font-display font-bold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary w-full sm:w-auto">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link href="/courses" className="btn-secondary w-full sm:w-auto">
            <Search className="w-4 h-4" />
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
