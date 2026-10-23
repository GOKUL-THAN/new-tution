import clsx from 'clsx';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'bg-danger-50 text-danger-600',
  default: 'bg-gray-100 text-gray-600',
};

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span className={clsx('badge', variantClasses[variant], className)}>
      {children}
    </span>
  );
}
