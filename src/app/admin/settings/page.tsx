import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { Settings } from 'lucide-react';

export const metadata = { title: 'Settings — Admin', robots: { index: false } };

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  let configs: { id: string; key: string; value: unknown; updatedAt: Date }[] = [];
  try {
    configs = await prisma.siteConfig.findMany({ orderBy: { key: 'asc' } });
  } catch { /* DB unavailable */ }

  const displayValue = (v: unknown): string => {
    if (typeof v === 'string') return v;
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    if (v === null || v === undefined) return '—';
    return JSON.stringify(v);
  };

  const sections = [
    {
      title: 'Platform Information',
      description: 'Core academy details used across the platform.',
      keys: ['academy_name', 'academy_tagline', 'contact_email', 'contact_phone', 'address', 'city', 'state'],
    },
    {
      title: 'Feature Flags',
      description: 'Enable or disable platform features.',
      keys: ['enable_payments', 'enable_ai_tutor', 'enable_live_classes', 'enable_public_registration'],
    },
    {
      title: 'SEO & Social',
      description: 'Metadata shown in search results and social sharing.',
      keys: ['seo_description', 'og_image_url', 'twitter_handle', 'facebook_url'],
    },
  ];

  const configMap = new Map(configs.map((c) => [c.key, c]));

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 mt-1">Platform configuration managed via the SiteConfig database table</p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="card p-6">
            <h2 className="font-display font-semibold text-gray-900 mb-1">{section.title}</h2>
            <p className="text-sm text-gray-500 mb-5">{section.description}</p>
            <div className="space-y-3">
              {section.keys.map((key) => {
                const config = configMap.get(key);
                return (
                  <div key={key} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-700 font-mono">{key}</p>
                      {config && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Last updated: {new Date(config.updatedAt).toLocaleDateString('en-IN')}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 text-right max-w-[200px] truncate">
                      {config ? displayValue(config.value) : <span className="text-gray-300 italic">not set</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="card p-6 border-l-4 border-l-amber-400">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Settings Management</p>
              <p className="text-sm text-gray-600 mt-1">
                Settings are stored in the <code className="bg-gray-100 px-1 rounded text-xs">SiteConfig</code> table.
                Use Prisma Studio (<code className="bg-gray-100 px-1 rounded text-xs">npm run db:studio</code>) to create
                or update configuration keys, or build a dedicated settings form for each section above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
