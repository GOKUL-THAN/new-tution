import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: number; // positive = up, negative = down
  colorClass?: string; // e.g. 'bg-blue-100 text-blue-600'
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  colorClass = 'bg-brand-100 text-brand-600',
}: StatsCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div className="card p-5">
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center mb-3', colorClass)}>
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
      {trend !== undefined && (
        <div
          className={clsx(
            'flex items-center gap-1 text-xs font-medium mt-2',
            isPositive ? 'text-success-600' : 'text-danger-600',
          )}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-3 h-3" aria-hidden="true" />
          )}
          <span>
            {isPositive ? '+' : ''}
            {trend}%
          </span>
        </div>
      )}
    </div>
  );
}
