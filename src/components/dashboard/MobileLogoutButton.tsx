'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function MobileLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-400 hover:text-danger-500 transition-colors ml-1"
      title="Logout"
      aria-label="Logout"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
