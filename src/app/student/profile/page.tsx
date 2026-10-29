'use client';

import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Toast from '@/components/ui/Toast';

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  bio: string | null;
  avatarUrl: string | null;
  studentProfile: {
    board: { name: string } | null;
    class: { name: string } | null;
    school: string | null;
  } | null;
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    avatarUrl: '',
  });

  useEffect(() => {
    fetch('/api/student/profile')
      .then((r) => r.json())
      .then((data: { user: ProfileData }) => {
        setProfile(data.user);
        setForm({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          phone: data.user.phone ?? '',
          bio: data.user.bio ?? '',
          avatarUrl: data.user.avatarUrl ?? '',
        });
      })
      .catch(() => setToast({ message: 'Failed to load profile', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = (await res.json()) as { error?: string };
        throw new Error(d.error ?? 'Save failed');
      }
      setToast({ message: 'Profile updated successfully', type: 'success' });
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : 'Failed to save',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500 mt-1">Update your personal information.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600 text-xl font-bold overflow-hidden">
          {form.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">
            {profile?.firstName} {profile?.lastName}
          </p>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-field"
            placeholder="+91 9876543210"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input
            type="url"
            value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            className="input-field"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="input-field min-h-[100px] resize-y"
            placeholder="A short bio about yourself..."
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn-primary w-full"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>

      {/* Academic info (read-only) */}
      {profile?.studentProfile && (
        <div className="card p-6 mt-6">
          <h2 className="font-display font-semibold text-gray-900 mb-4">
            Academic Information
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            These details are managed by your academy administrator.
          </p>
          <dl className="space-y-3">
            {[
              { label: 'Board', value: profile.studentProfile.board?.name },
              { label: 'Class', value: profile.studentProfile.class?.name },
              { label: 'School', value: profile.studentProfile.school },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <dt className="text-sm text-gray-500">{item.label}</dt>
                <dd className="text-sm font-medium text-gray-800">{item.value ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
