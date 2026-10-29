'use client';

import { useEffect, useState } from 'react';
import { User, Loader2 } from 'lucide-react';
import Toast from '@/components/ui/Toast';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProfileData {
  id: string; firstName: string; lastName: string; email: string;
  teacherProfile: {
    qualification: string | null; experience: string | null;
    specializations: string[]; subjects: string[];
    showOnWebsite: boolean; isVerified: boolean;
  } | null;
}
interface ToastState { message: string; type: 'success' | 'error' | 'info'; }

export default function TeacherProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '',
    qualification: '', experience: '',
    specializations: '', subjects: '',
    showOnWebsite: false,
  });

  useEffect(() => {
    fetch('/api/teacher/profile')
      .then((r) => r.json())
      .then((d: { user?: ProfileData }) => {
        if (d.user) {
          setProfile(d.user);
          setForm({
            firstName: d.user.firstName,
            lastName: d.user.lastName,
            phone: '',
            qualification: d.user.teacherProfile?.qualification ?? '',
            experience: d.user.teacherProfile?.experience ?? '',
            specializations: d.user.teacherProfile?.specializations?.join(', ') ?? '',
            subjects: d.user.teacherProfile?.subjects?.join(', ') ?? '',
            showOnWebsite: d.user.teacherProfile?.showOnWebsite ?? false,
          });
        }
      })
      .catch(() => setToast({ message: 'Failed to load profile', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/teacher/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          qualification: form.qualification,
          experience: form.experience,
          specializations: form.specializations.split(',').map((s) => s.trim()).filter(Boolean),
          subjects: form.subjects.split(',').map((s) => s.trim()).filter(Boolean),
          showOnWebsite: form.showOnWebsite,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setToast({ message: 'Profile updated successfully', type: 'success' });
    } catch {
      setToast({ message: 'Failed to save profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24"><LoadingSpinner size="lg" /></div>
  );

  return (
    <div className="max-w-2xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Update your teaching profile and public information</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center text-accent-700 text-xl font-bold">
          <User className="w-8 h-8" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{profile?.firstName} {profile?.lastName}</p>
          <p className="text-sm text-gray-500">{profile?.email}</p>
          {profile?.teacherProfile?.isVerified && (
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">✓ Verified Teacher</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="card p-6 space-y-5">
          <h2 className="font-display font-semibold text-gray-900">Personal Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="input-field" required />
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h2 className="font-display font-semibold text-gray-900">Teaching Profile</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })}
              className="input-field" placeholder="e.g. M.Sc. Physics, B.Ed." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className="input-field" placeholder="e.g. 8 years teaching JEE Physics" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specializations <span className="text-xs text-gray-400">(comma-separated)</span>
            </label>
            <input value={form.specializations} onChange={(e) => setForm({ ...form, specializations: e.target.value })}
              className="input-field" placeholder="e.g. Mechanics, Thermodynamics, Optics" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects Taught <span className="text-xs text-gray-400">(comma-separated)</span>
            </label>
            <input value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })}
              className="input-field" placeholder="e.g. Physics, Mathematics" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.showOnWebsite}
              onChange={(e) => setForm({ ...form, showOnWebsite: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded" />
            <div>
              <span className="text-sm font-medium text-gray-700">Show profile on public website</span>
              <p className="text-xs text-gray-400">Your name and specializations will appear on the Teachers page</p>
            </div>
          </label>
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
