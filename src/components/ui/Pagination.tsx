'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={clsx(
          'w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors',
          page <= 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-200 text-gray-600 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600',
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={clsx(
              'w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors',
              p === page
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'border-gray-200 text-gray-600 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600',
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={clsx(
          'w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors',
          page >= totalPages
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-gray-200 text-gray-600 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-600',
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}
