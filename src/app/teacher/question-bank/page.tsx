'use client';

import { useEffect, useState } from 'react';
import { HelpCircle, Plus, Loader2 } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

interface Question {
  id: string; text: string; type: string; difficulty: string;
  marks: number; isPublished: boolean;
  subject: { name: string } | null;
  chapter: { name: string } | null;
}
interface ToastState { message: string; type: 'success' | 'error' | 'info'; }

const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD', 'VERY_HARD'];
const TYPES = ['SINGLE_MCQ', 'MULTI_MCQ', 'NUMERICAL', 'INTEGER', 'TRUE_FALSE', 'SHORT_ANSWER', 'LONG_ANSWER'];

export default function TeacherQuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const [form, setForm] = useState({
    text: '', type: 'SINGLE_MCQ', difficulty: 'MEDIUM', marks: '1',
    negativeMarks: '0', explanation: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
  });

  useEffect(() => {
    fetch('/api/question-bank')
      .then((r) => r.json())
      .then((d: { questions?: Question[] }) => setQuestions(d.questions ?? []))
      .catch(() => setToast({ message: 'Failed to load questions', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  function updateOption(idx: number, field: 'text' | 'isCorrect', value: string | boolean) {
    setForm((prev) => {
      const options = [...prev.options];
      options[idx] = { ...options[idx], [field]: value };
      return { ...prev, options };
    });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/question-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          marks: parseFloat(form.marks) || 1,
          negativeMarks: parseFloat(form.negativeMarks) || 0,
          options: form.options
            .filter((o) => o.text.trim())
            .map((o, i) => ({ ...o, sortOrder: i })),
        }),
      });
      if (!res.ok) throw new Error('Failed');
      const created = await res.json() as Question;
      setQuestions((prev) => [created, ...prev]);
      setShowModal(false);
      setToast({ message: 'Question created', type: 'success' });
    } catch {
      setToast({ message: 'Failed to create question', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  const diffColor = (d: string) =>
    d === 'EASY' ? 'success' : d === 'MEDIUM' ? 'warning' : 'danger';

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
          <h1 className="text-2xl font-display font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-500 mt-1">{questions.length} question{questions.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      {questions.length === 0 ? (
        <EmptyState icon={HelpCircle} title="No Questions Yet"
          description="Add questions to build your question bank for tests and exams." />
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="card p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm text-gray-900 font-medium line-clamp-2 flex-1">{q.text}</p>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant={diffColor(q.difficulty) as 'success' | 'warning' | 'danger'}>
                    {q.difficulty}
                  </Badge>
                  <Badge variant="default">{q.type.replace(/_/g, ' ')}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                {q.subject && <span>{q.subject.name}</span>}
                {q.chapter && <span>{q.chapter.name}</span>}
                <span>{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Question">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
            <textarea required rows={3} value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="input-field resize-none" placeholder="Enter question text…" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                {TYPES.map((t) => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="input-field">
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
              <input type="number" min="0" step="0.5" value={form.marks}
                onChange={(e) => setForm({ ...form, marks: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Negative Marks</label>
              <input type="number" min="0" step="0.25" value={form.negativeMarks}
                onChange={(e) => setForm({ ...form, negativeMarks: e.target.value })} className="input-field" />
            </div>
          </div>

          {['SINGLE_MCQ', 'MULTI_MCQ', 'TRUE_FALSE'].includes(form.type) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options <span className="text-xs text-gray-400">(check the correct answer)</span>
              </label>
              <div className="space-y-2">
                {form.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type={form.type === 'MULTI_MCQ' ? 'checkbox' : 'radio'}
                      name="correct-option"
                      checked={opt.isCorrect}
                      onChange={(e) => {
                        if (form.type === 'MULTI_MCQ') {
                          updateOption(idx, 'isCorrect', e.target.checked);
                        } else {
                          form.options.forEach((_, i) => updateOption(i, 'isCorrect', i === idx));
                        }
                      }}
                      className="w-4 h-4 text-brand-600"
                    />
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => updateOption(idx, 'text', e.target.value)}
                      className="input-field flex-1 py-2"
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (optional)</label>
            <textarea rows={2} value={form.explanation}
              onChange={(e) => setForm({ ...form, explanation: e.target.value })}
              className="input-field resize-none" placeholder="Explain the correct answer…" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : 'Add Question'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
