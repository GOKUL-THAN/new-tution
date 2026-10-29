'use client';

import { useEffect, useState } from 'react';
import { ClipboardCheck, Plus, Loader2, Clock } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

interface Test {
  id: string; title: string; testType: string; durationMinutes: number;
  totalMarks: number; isPublished: boolean;
  _count: { questions: number; attempts: number };
}
interface ToastState { message: string; type: 'success' | 'error' | 'info'; }

const TEST_TYPES = ['CHAPTER_TEST','UNIT_TEST','SUBJECT_TEST','MOCK_TEST','DIAGNOSTIC','PRACTICE','BOARD_EXAM_PRACTICE'];

export default function TeacherTestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState({
    title: '', description: '', testType: 'CHAPTER_TEST',
    durationMinutes: '60', totalMarks: '100',
    negativeMarking: false, maxAttempts: '3',
  });

  useEffect(() => {
    fetch('/api/tests')
      .then((r) => r.json())
      .then((d: { tests?: Test[] }) => setTests(d.tests ?? []))
      .catch(() => setToast({ message: 'Failed to load tests', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          durationMinutes: parseInt(form.durationMinutes) || 60,
          totalMarks: parseFloat(form.totalMarks) || 100,
          maxAttempts: parseInt(form.maxAttempts) || 3,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const created = await res.json() as Test;
      setTests((prev) => [created, ...prev]);
      setShowModal(false);
      setToast({ message: 'Test created', type: 'success' });
    } catch {
      setToast({ message: 'Failed to create test', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Tests</h1>
          <p className="text-gray-500 mt-1">{tests.length} test{tests.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Test
        </button>
      </div>

      {tests.length === 0 ? (
        <EmptyState icon={ClipboardCheck} title="No Tests Yet"
          description="Create a test to assess your students' understanding." />
      ) : (
        <div className="space-y-4">
          {tests.map((t) => (
            <div key={t.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-display font-semibold text-gray-900">{t.title}</h3>
                  <Badge variant={t.isPublished ? 'success' : 'default'}>{t.isPublished ? 'Published' : 'Draft'}</Badge>
                  <Badge variant="default">{t.testType.replace(/_/g, ' ')}</Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.durationMinutes} min</span>
                  <span>{t.totalMarks} marks</span>
                  <span>{t._count.questions} questions</span>
                  <span>{t._count.attempts} attempts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Test">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field" placeholder="e.g. Physics Chapter 3 Test" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={2} value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input-field resize-none" placeholder="Brief description…" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
            <select value={form.testType} onChange={(e) => setForm({ ...form, testType: e.target.value })} className="input-field">
              {TEST_TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input type="number" min="1" value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
              <input type="number" min="0" value={form.totalMarks}
                onChange={(e) => setForm({ ...form, totalMarks: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Attempts</label>
              <input type="number" min="1" value={form.maxAttempts}
                onChange={(e) => setForm({ ...form, maxAttempts: e.target.value })} className="input-field" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.negativeMarking}
              onChange={(e) => setForm({ ...form, negativeMarking: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded" />
            <span className="text-sm text-gray-700">Enable negative marking</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Create Test'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
