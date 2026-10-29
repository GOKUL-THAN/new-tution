'use client';

import { useEffect, useState, useCallback } from 'react';
import { Calendar, Save, Loader2 } from 'lucide-react';
import Toast from '@/components/ui/Toast';
import EmptyState from '@/components/ui/EmptyState';

interface Student {
  studentId: string;
  name: string;
  email: string;
}

type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
interface ToastState { message: string; type: 'success' | 'error' | 'info'; }

const STATUS_OPTIONS: AttendanceStatus[] = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'];
const STATUS_COLOR: Record<AttendanceStatus, string> = {
  PRESENT: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  ABSENT: 'bg-danger-50 text-danger-700 border-danger-200',
  LATE: 'bg-amber-100 text-amber-700 border-amber-300',
  EXCUSED: 'bg-gray-100 text-gray-600 border-gray-300',
};

export default function TeacherAttendancePage() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const loadStudents = useCallback(() => {
    setLoading(true);
    fetch(`/api/teacher/attendance?date=${date}`)
      .then((r) => r.json())
      .then((d: { students?: Student[]; existing?: Record<string, AttendanceStatus> }) => {
        setStudents(d.students ?? []);
        // Pre-fill with existing records or default to PRESENT
        const init: Record<string, AttendanceStatus> = {};
        (d.students ?? []).forEach((s) => {
          init[s.studentId] = d.existing?.[s.studentId] ?? 'PRESENT';
        });
        setAttendance(init);
      })
      .catch(() => setToast({ message: 'Failed to load students', type: 'error' }))
      .finally(() => setLoading(false));
  }, [date]);

  useEffect(() => { loadStudents(); }, [loadStudents]);

  function setStatus(studentId: string, status: AttendanceStatus) {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  }

  function markAll(status: AttendanceStatus) {
    const next: Record<string, AttendanceStatus> = {};
    students.forEach((s) => { next[s.studentId] = status; });
    setAttendance(next);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const records = students.map((s) => ({
        studentId: s.studentId,
        status: attendance[s.studentId] ?? 'PRESENT',
      }));
      const res = await fetch('/api/teacher/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, records }),
      });
      if (!res.ok) throw new Error('Failed');
      setToast({ message: 'Attendance saved successfully', type: 'success' });
    } catch {
      setToast({ message: 'Failed to save attendance', type: 'error' });
    } finally {
      setSaving(false);
    }
  }

  const presentCount = Object.values(attendance).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(attendance).filter((s) => s === 'ABSENT').length;

  return (
    <div className="max-w-4xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}

      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-500 mt-1">Mark daily student attendance</p>
      </div>

      {/* Date picker + summary */}
      <div className="card p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <label htmlFor="attendance-date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              id="attendance-date"
              type="date"
              max={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field max-w-xs"
            />
          </div>
          {students.length > 0 && (
            <div className="flex items-center gap-6 text-sm sm:ml-auto">
              <span className="text-emerald-600 font-semibold">{presentCount} Present</span>
              <span className="text-danger-500 font-semibold">{absentCount} Absent</span>
              <span className="text-gray-500">{students.length} Total</span>
            </div>
          )}
        </div>
        {students.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500 self-center mr-1">Mark all:</span>
            {STATUS_OPTIONS.map((s) => (
              <button key={s} onClick={() => markAll(s)}
                className={`text-xs px-3 py-1 rounded-lg border font-medium transition-colors ${STATUS_COLOR[s]}`}>
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        </div>
      ) : students.length === 0 ? (
        <EmptyState icon={Calendar} title="No Students Found"
          description="No students are enrolled in your courses, or no courses are assigned to you." />
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {students.map((s) => {
              const status = attendance[s.studentId] ?? 'PRESENT';
              return (
                <div key={s.studentId} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
                      {s.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400 truncate">{s.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setStatus(s.studentId, opt)}
                        aria-pressed={status === opt}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          status === opt ? STATUS_COLOR[opt] + ' shadow-sm' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="btn-primary inline-flex items-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save Attendance</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
