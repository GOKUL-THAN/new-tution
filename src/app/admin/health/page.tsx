import { getCurrentUser } from '@/lib/auth';
import { CheckCircle2, AlertTriangle, XCircle, Database, Globe, Mail, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'System Health — Admin',
  robots: { index: false, follow: false },
};

interface HealthCheck {
  name: string;
  status: 'ok' | 'warning' | 'error' | 'unconfigured';
  message: string;
  icon: typeof Database;
}

async function getSystemHealth(): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];

  // Database
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    checks.push({ name: 'Database (PostgreSQL)', status: 'ok', message: 'Connected and responding', icon: Database });
  } catch {
    checks.push({ name: 'Database (PostgreSQL)', status: 'error', message: 'Cannot connect — check DATABASE_URL', icon: Database });
  }

  // App URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  checks.push({
    name: 'Application URL',
    status: appUrl ? 'ok' : 'warning',
    message: appUrl || 'NEXT_PUBLIC_APP_URL not set — using localhost',
    icon: Globe,
  });

  // JWT Secret
  const jwtSecret = process.env.JWT_SECRET;
  checks.push({
    name: 'JWT Authentication',
    status: jwtSecret && jwtSecret !== 'dev-secret-change-in-production' ? 'ok' : 'warning',
    message: jwtSecret && jwtSecret !== 'dev-secret-change-in-production' ? 'Custom secret configured' : 'Using default dev secret — change for production',
    icon: Database,
  });

  // Email
  const smtpHost = process.env.SMTP_HOST;
  checks.push({
    name: 'Email Service (SMTP)',
    status: smtpHost ? 'ok' : 'unconfigured',
    message: smtpHost ? `Configured: ${smtpHost}` : 'Not configured — email features unavailable',
    icon: Mail,
  });

  // Payments
  const razorpayKey = process.env.RAZORPAY_KEY_ID;
  checks.push({
    name: 'Payment Provider (Razorpay)',
    status: razorpayKey ? 'ok' : 'unconfigured',
    message: razorpayKey ? 'Razorpay keys configured' : 'Not configured — payments unavailable',
    icon: CreditCard,
  });

  return checks;
}

export default async function AdminHealthPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const checks = await getSystemHealth();

  const statusIcons = {
    ok: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    unconfigured: <AlertTriangle className="w-5 h-5 text-gray-400" />,
  };

  const statusLabels = {
    ok: 'Healthy',
    warning: 'Warning',
    error: 'Error',
    unconfigured: 'Not Configured',
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">System Health</h1>
        <p className="text-gray-500 mt-1">Check the status of platform services and integrations</p>
      </div>

      <div className="space-y-3">
        {checks.map((check) => (
          <div key={check.name} className="card p-5">
            <div className="flex items-center gap-4">
              {statusIcons[check.status]}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{check.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    check.status === 'ok' ? 'bg-emerald-100 text-emerald-700' :
                    check.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                    check.status === 'error' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {statusLabels[check.status]}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{check.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-6 text-center">
        Health checks run on page load. Timestamps: {new Date().toISOString()}
      </p>
    </div>
  );
}
