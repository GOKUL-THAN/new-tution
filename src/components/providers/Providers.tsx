'use client';

import { AuthProvider } from '@/context/AuthContext';
import FloatingActions from '@/components/ui/FloatingActions';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <FloatingActions />
    </AuthProvider>
  );
}
