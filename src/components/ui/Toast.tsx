'use client';

import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onDismiss: () => void;
}

const typeConfig: Record<ToastType, { icon: React.ReactNode; classes: string }> = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-success-600 shrink-0" />,
    classes: 'bg-success-50 border-success-200 text-success-700',
  },
  error: {
    icon: <XCircle className="w-5 h-5 text-danger-600 shrink-0" />,
    classes: 'bg-danger-50 border-danger-200 text-danger-700',
  },
  info: {
    icon: <Info className="w-5 h-5 text-brand-600 shrink-0" />,
    classes: 'bg-brand-50 border-brand-200 text-brand-700',
  },
};

export default function Toast({ message, type = 'info', onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const config = typeConfig[type];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={clsx(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm',
        'animate-in slide-in-right',
        config.classes,
      )}
    >
      {config.icon}
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="ml-1 text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
