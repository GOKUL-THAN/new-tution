'use client';

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface ProgressDataPoint {
  date: string;
  percentage: number;
  scored: number;
  totalMarks: number;
}

interface SubjectScore {
  subject: string;
  avgScore: number;
  attempts: number;
}

interface ProgressData {
  timeline: ProgressDataPoint[];
  bySubject: SubjectScore[];
}

export default function StudentProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/student/progress')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load progress data');
        return res.json() as Promise<ProgressData>;
      })
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to load progress');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isEmpty =
    !data || (data.timeline.length === 0 && data.bySubject.length === 0);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">My Progress</h1>
        <p className="text-gray-500 mt-1">Track your performance over time across subjects.</p>
      </div>

      {error && (
        <div className="rounded-xl bg-danger-50 border border-danger-100 text-danger-700 px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {isEmpty ? (
        <EmptyState
          icon={TrendingUp}
          title="No Progress Data Yet"
          description="Complete some tests to see your progress charts and subject-wise performance here."
          actionLabel="Take a Test"
          actionHref="/student/tests"
        />
      ) : (
        <div className="space-y-8">
          {/* Timeline chart */}
          {data && data.timeline.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">
                Score Over Time
              </h2>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data.timeline}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [`${Number(value ?? 0).toFixed(1)}%`, 'Score']}
                  />
                  <Area
                    type="monotone"
                    dataKey="percentage"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Subject-wise chart */}
          {data && data.bySubject.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">
                Subject-wise Average Score
              </h2>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.bySubject} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <YAxis type="category" dataKey="subject" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip formatter={(v: unknown) => [`${Number(v ?? 0).toFixed(1)}%`, 'Avg Score']} />
                  <Bar dataKey="avgScore" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
