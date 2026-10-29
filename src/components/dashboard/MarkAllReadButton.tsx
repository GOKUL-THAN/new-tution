'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface MarkAllReadButtonProps {
  userId: string;
}

export default function MarkAllReadButton({ userId: _userId }: MarkAllReadButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleMarkAll = async () => {
    setLoading(true);
    try {
      await fetch('/api/student/notifications/mark-read', { method: 'POST' });
      router.refresh();
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMarkAll}
      disabled={loading}
      className="btn-secondary btn-sm"
    >
      {loading ? 'Marking…' : 'Mark All Read'}
    </button>
  );
}
