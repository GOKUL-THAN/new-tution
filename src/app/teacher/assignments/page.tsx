'use client';

import { useEffect, useState } from 'react';
import { ClipboardList, Plus, Loader2, X } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

interface Assignment {
  id: string; title: string; subjectName: string | null;
  dueDate: string | null; isPublished: boolean;
  _count: { submissions: number };
}

interface ToastState { message: string; type: 'success' | 'error' | 'info'; }

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState({
    title: '', instructions: '', subjectName: '',
    dueDate: '', totalMarks: '10',
  });

  useEffect(() => {
    fetch('/api/teacher/assignments')
      .then((r) => r.json())
      .then((d: { assignments?: Assignment[] }) => setAssignments(d.assignments ?? []))
      .catch(() => setToast({ message: 'Failed to load assignments', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/teacher/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          totalMarks: parseFloat(form.totalMarks) || 0,
          dueDate: form.dueDate || undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const created = await res.json() as Assignment;
      setAssignments((prev) => [created, ...prev]);
      setShowModal(false);
      setForm({ title: '', instructions: '', subjectName: '', dueDate: '', totalMarks: '10' });
      setToast({ message: 'Assignment created', type: 'success' });
    } catch {
      setToast({ message: 'Failed to create assignment', type: 'error' });
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
          <h1 className="text-2xl font-display font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-500 mt-1">Create and manage student assignments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      {assignments.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No Assignments Yet"
          description="Create your first assignment to give students work to complete."
        />
      ) : (
        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-gray-900">{a.title}</h3>
                  <Badge variant={a.isPublished ? 'success' : 'default'}>
                    {a.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  {a.subjectName && <span>{a.subjectName}</span>}
                  {a.dueDate && <span>Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}</span>}
                  <span>{a._count.submissions} submission{a._count.submissions !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Assignment">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input-field" placeholder="e.g. Chapter 5 Practice Problems" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              rows={3} className="input-field resize-none" placeholder="Instructions for students…" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input value={form.subjectName} onChange={(e) => setForm({ ...form, subjectName: e.target.value })}
                className="input-field" placeholder="e.g. Mathematics" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
              <input type="number" min="0" value={form.totalMarks}
                onChange={(e) => setForm({ ...form, totalMarks: e.target.value })}
                className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input type="datetime-local" value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="input-field" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
