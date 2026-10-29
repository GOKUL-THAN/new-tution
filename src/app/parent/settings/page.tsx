'use client';

import { useEffect, useState } from 'react';
import { Settings, Loader2, Save } from 'lucide-react';
import Toast from '@/components/ui/Toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ToastState { message: string; type: 'success' | 'error' | 'info'; }

const CATEGORIES = ['ACADEMIC', 'PAYMENT', 'SYSTEM'] as const;
const CHANNELS = ['EMAIL', 'IN_APP'] as const;

type Prefs = Record<string, boolean>;

export default function ParentSettingsPage() {
  const [prefs, setPrefs] = useState<Prefs>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    // Default all to true — actual prefs would come from /api/notifications/preferences
    const defaults: Prefs = {};
    CATEGORIES.forEach((cat) => CHANNELS.forEach((ch) => { defaults[`${cat}_${ch}`] = true; }));
    setPrefs(defaults);
    setLoading(false);
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    // In a full implementation this would call PATCH /api/notifications/preferences
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setToast({ message: 'Settings saved', type: 'success' });
  }

  if (loading) return <div className="flex items-center justify-center py-24"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="max-w-2xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your notification preferences</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Settings className="w-5 h-5 text-brand-600" />
            <h2 className="font-display font-semibold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  {CHANNELS.map((ch) => (
                    <th key={ch} className="text-center px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{ch.replace('_', ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {CATEGORIES.map((cat) => (
                  <tr key={cat}>
                    <td className="py-3 pr-4 font-medium text-gray-700 capitalize">{cat.toLowerCase()}</td>
                    {CHANNELS.map((ch) => (
                      <td key={ch} className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={prefs[`${cat}_${ch}`] ?? true}
                          onChange={(e) => setPrefs((prev) => ({ ...prev, [`${cat}_${ch}`]: e.target.checked }))}
                          className="w-4 h-4 text-brand-600 rounded"
                          aria-label={`${cat} notifications via ${ch}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full inline-flex items-center justify-center gap-2">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Settings</>}
        </button>
      </form>
    </div>
  );
}
