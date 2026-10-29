'use client';

import { useEffect, useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Toast from '@/components/ui/Toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DayPlan {
  subject: string;
  topic: string;
  duration: string;
}

type WeeklyPlan = Record<string, DayPlan[]>;

interface StudyPlanRecord {
  id: string;
  title: string;
  data: { weekly: WeeklyPlan };
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

function emptyWeek(): WeeklyPlan {
  return Object.fromEntries(DAYS.map((d) => [d, []]));
}

export default function StudyPlannerPage() {
  const [plan, setPlan] = useState<StudyPlanRecord | null>(null);
  const [weekly, setWeekly] = useState<WeeklyPlan>(emptyWeek());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch('/api/student/study-planner')
      .then(async (r) => {
        if (r.status === 404) {
          setIsNew(true);
          return null;
        }
        return r.json() as Promise<StudyPlanRecord>;
      })
      .then((data) => {
        if (data) {
          setPlan(data);
          setWeekly((data.data?.weekly as WeeklyPlan) ?? emptyWeek());
        }
      })
      .catch(() => setToast({ message: 'Could not load study plan', type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const addSlot = (day: string) => {
    setWeekly((prev) => ({
      ...prev,
      [day]: [...(prev[day] ?? []), { subject: '', topic: '', duration: '1h' }],
    }));
  };

  const removeSlot = (day: string, idx: number) => {
    setWeekly((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx),
    }));
  };

  const updateSlot = (day: string, idx: number, field: keyof DayPlan, value: string) => {
    setWeekly((prev) => ({
      ...prev,
      [day]: prev[day].map((slot, i) => (i === idx ? { ...slot, [field]: value } : slot)),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = JSON.stringify({
        title: 'My Weekly Study Plan',
        data: { weekly },
      });
      const method = isNew ? 'POST' : 'PUT';
      const res = await fetch('/api/student/study-planner', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (!res.ok) throw new Error('Save failed');
      const saved = (await res.json()) as StudyPlanRecord;
      setPlan(saved);
      setIsNew(false);
      setToast({ message: 'Study plan saved!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to save study plan', type: 'error' });
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

  const hasAnySlot = DAYS.some((d) => (weekly[d]?.length ?? 0) > 0);

  return (
    <div className="max-w-5xl">
      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}

      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Study Planner</h1>
          <p className="text-gray-500 mt-1">Plan your weekly revision schedule.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
        >
          {saving ? 'Saving…' : plan ? 'Update Plan' : 'Save Plan'}
        </button>
      </div>

      {!hasAnySlot && (
        <div className="mb-6">
          <EmptyState
            icon={Calendar}
            title="No Study Sessions Planned"
            description="Add subjects and topics to each day to create your weekly study schedule."
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DAYS.map((day) => (
          <div key={day} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-semibold text-gray-800 text-sm">{day}</h3>
              <button
                onClick={() => addSlot(day)}
                className="w-6 h-6 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 hover:bg-brand-200 transition-colors"
                aria-label={`Add session on ${day}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              {(weekly[day] ?? []).map((slot, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between gap-1">
                    <input
                      type="text"
                      placeholder="Subject"
                      value={slot.subject}
                      onChange={(e) => updateSlot(day, idx, 'subject', e.target.value)}
                      className="input-field text-xs py-1 px-2 flex-1"
                    />
                    <button
                      onClick={() => removeSlot(day, idx)}
                      className="text-gray-300 hover:text-danger-500 transition-colors flex-shrink-0"
                      aria-label="Remove session"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Topic"
                    value={slot.topic}
                    onChange={(e) => updateSlot(day, idx, 'topic', e.target.value)}
                    className="input-field text-xs py-1 px-2 w-full"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 1h)"
                    value={slot.duration}
                    onChange={(e) => updateSlot(day, idx, 'duration', e.target.value)}
                    className="input-field text-xs py-1 px-2 w-full"
                  />
                </div>
              ))}
              {(weekly[day]?.length ?? 0) === 0 && (
                <p className="text-xs text-gray-300 text-center py-2">No sessions</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
