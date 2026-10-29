'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Clock, Flag, ChevronLeft, ChevronRight,
  CheckCircle2, AlertTriangle, Loader2, Wifi, WifiOff,
} from 'lucide-react';
import Modal from '@/components/ui/Modal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuestionOption { id: string; text: string; sortOrder: number; }
interface TestQuestion {
  id: string; text: string; type: string;
  marks: number; negativeMarks: number;
  diagramUrl?: string; hint?: string;
  options: QuestionOption[];
}
interface TestSectionQuestion { number: number; question: TestQuestion; }
interface TestSection { id: string; title: string; number: number; questions: TestSectionQuestion[]; }
interface AttemptResponse {
  questionNum: number; answer?: string; selectedIds: string[]; flagged: boolean;
}
interface Test {
  id: string; title: string; durationMinutes: number; totalMarks: number;
  negativeMarking: boolean; sections: TestSection[];
}
interface Attempt { id: string; startedAt: string; responses: AttemptResponse[]; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, '0'); }
function formatTime(secs: number) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

type QStatus = 'unanswered' | 'answered' | 'flagged' | 'answered-flagged';
function getStatus(r: AttemptResponse | undefined): QStatus {
  if (!r) return 'unanswered';
  const hasAnswer = r.selectedIds.length > 0 || (r.answer ?? '').trim().length > 0;
  if (r.flagged && hasAnswer) return 'answered-flagged';
  if (r.flagged) return 'flagged';
  if (hasAnswer) return 'answered';
  return 'unanswered';
}

const statusStyle: Record<QStatus, string> = {
  unanswered: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  answered: 'bg-emerald-500 text-white hover:bg-emerald-600',
  flagged: 'bg-amber-400 text-white hover:bg-amber-500',
  'answered-flagged': 'bg-amber-400 text-white hover:bg-amber-500 ring-2 ring-emerald-500',
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TakeTestPage() {
  const { id: testId } = useParams<{ id: string }>();
  const router = useRouter();

  const [test, setTest] = useState<Test | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // responses keyed by questionNum
  const [responses, setResponses] = useState<Map<number, AttemptResponse>>(new Map());

  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [online, setOnline] = useState(true);
  const [savingIndicator, setSavingIndicator] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autosaveRef = useRef<NodeJS.Timeout | null>(null);
  const pendingSave = useRef<{ questionNum: number; answer?: string; selectedIds: string[]; flagged: boolean } | null>(null);
  const attemptIdRef = useRef<string>('');

  // ── Load test + start/resume attempt ──────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const res = await fetch(`/api/tests/${testId}/attempt`, { method: 'POST' });
        if (!res.ok) {
          const d = await res.json() as { error?: string };
          setError(d.error ?? 'Failed to start test');
          setLoading(false);
          return;
        }
        const data = await res.json() as { attempt: Attempt; test: Test; resumed: boolean };
        if (cancelled) return;

        setTest(data.test);
        setAttempt(data.attempt);
        attemptIdRef.current = data.attempt.id;

        // Rebuild responses map from existing responses
        const map = new Map<number, AttemptResponse>();
        for (const r of data.attempt.responses) map.set(r.questionNum, r);
        setResponses(map);

        // Calculate remaining time
        const elapsed = Math.floor((Date.now() - new Date(data.attempt.startedAt).getTime()) / 1000);
        const total = data.test.durationMinutes * 60;
        setTimeRemaining(Math.max(0, total - elapsed));
      } catch {
        if (!cancelled) setError('Network error. Please check your connection.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    init();
    return () => { cancelled = true; };
  }, [testId]);

  // ── Countdown timer ────────────────────────────────────────────────────────

  useEffect(() => {
    if (!attempt || timeRemaining <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  // ── Online/offline detection ───────────────────────────────────────────────

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  // ── Autosave every 30 s ────────────────────────────────────────────────────

  const saveResponse = useCallback(async (questionNum: number, data: Omit<AttemptResponse, 'questionNum'>) => {
    if (!attemptIdRef.current) return;
    setSavingIndicator('saving');
    try {
      const res = await fetch(`/api/attempts/${attemptIdRef.current}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionNum, ...data }),
      });
      setSavingIndicator(res.ok ? 'saved' : 'error');
    } catch {
      setSavingIndicator('error');
    }
    setTimeout(() => setSavingIndicator('idle'), 2000);
  }, []);

  useEffect(() => {
    autosaveRef.current = setInterval(() => {
      if (pendingSave.current) {
        const { questionNum, ...rest } = pendingSave.current;
        saveResponse(questionNum, rest);
        pendingSave.current = null;
      }
    }, 30_000);
    return () => { if (autosaveRef.current) clearInterval(autosaveRef.current); };
  }, [saveResponse]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const allQuestions: { sectionIdx: number; questionNum: number; question: TestQuestion }[] = [];
  if (test) {
    test.sections.forEach((sec, sIdx) => {
      sec.questions.forEach((tq) => {
        allQuestions.push({ sectionIdx: sIdx, questionNum: tq.number, question: tq.question });
      });
    });
  }

  const currentSection_ = test?.sections[currentSection];
  const currentSectionQuestions = currentSection_?.questions ?? [];
  const currentTQ = currentSectionQuestions[currentQuestionIdx];
  const currentResponse = currentTQ ? responses.get(currentTQ.number) : undefined;

  const totalQuestions = allQuestions.length;
  const answeredCount = Array.from(responses.values()).filter(
    (r) => r.selectedIds.length > 0 || (r.answer ?? '').trim().length > 0,
  ).length;
  const unansweredCount = totalQuestions - answeredCount;

  // ── Answer handlers ────────────────────────────────────────────────────────

  function updateResponse(questionNum: number, patch: Partial<AttemptResponse>) {
    setResponses((prev) => {
      const existing = prev.get(questionNum) ?? { questionNum, selectedIds: [], flagged: false };
      const updated = { ...existing, ...patch };
      const next = new Map(prev);
      next.set(questionNum, updated);
      pendingSave.current = updated;
      return next;
    });
  }

  function handleSingleSelect(questionNum: number, optionId: string) {
    const r = responses.get(questionNum) ?? { questionNum, selectedIds: [], flagged: false };
    const alreadySelected = r.selectedIds[0] === optionId;
    const selectedIds = alreadySelected ? [] : [optionId];
    updateResponse(questionNum, { selectedIds });
    saveResponse(questionNum, { ...r, selectedIds });
  }

  function handleMultiSelect(questionNum: number, optionId: string) {
    const r = responses.get(questionNum) ?? { questionNum, selectedIds: [], flagged: false };
    const selectedIds = r.selectedIds.includes(optionId)
      ? r.selectedIds.filter((id) => id !== optionId)
      : [...r.selectedIds, optionId];
    updateResponse(questionNum, { selectedIds });
    saveResponse(questionNum, { ...r, selectedIds });
  }

  function handleNumericalInput(questionNum: number, value: string) {
    updateResponse(questionNum, { answer: value, selectedIds: [] });
  }

  function handleNumericalBlur(questionNum: number) {
    const r = responses.get(questionNum);
    if (r) saveResponse(questionNum, { selectedIds: r.selectedIds, answer: r.answer, flagged: r.flagged });
  }

  function handleClearResponse(questionNum: number) {
    updateResponse(questionNum, { selectedIds: [], answer: '' });
    saveResponse(questionNum, { selectedIds: [], answer: '', flagged: false });
  }

  function handleFlag(questionNum: number) {
    const r = responses.get(questionNum) ?? { questionNum, selectedIds: [], flagged: false };
    const flagged = !r.flagged;
    updateResponse(questionNum, { flagged });
    saveResponse(questionNum, { ...r, flagged });
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  function goToQuestion(sectionIdx: number, qIdx: number) {
    setCurrentSection(sectionIdx);
    setCurrentQuestionIdx(qIdx);
  }

  function navigateNext() {
    const sectionQs = test?.sections[currentSection]?.questions ?? [];
    if (currentQuestionIdx < sectionQs.length - 1) {
      setCurrentQuestionIdx((i) => i + 1);
    } else if (currentSection < (test?.sections.length ?? 1) - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentQuestionIdx(0);
    }
  }

  function navigatePrev() {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((i) => i - 1);
    } else if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      const prevSectionQs = test?.sections[currentSection - 1]?.questions ?? [];
      setCurrentQuestionIdx(prevSectionQs.length - 1);
    }
  }

  // ── Submit ────────────────────────────────────────────────────────────────

  async function doSubmit() {
    if (!attemptIdRef.current) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/attempts/${attemptIdRef.current}/submit`, { method: 'POST' });
      if (!res.ok) throw new Error('Submit failed');
      const data = await res.json() as { attemptId: string };
      if (timerRef.current) clearInterval(timerRef.current);
      if (autosaveRef.current) clearInterval(autosaveRef.current);
      router.push(`/student/results/${data.attemptId}`);
    } catch {
      setSubmitting(false);
      setShowSubmitModal(false);
      alert('Submission failed. Please try again.');
    }
  }

  function handleAutoSubmit() {
    if (attemptIdRef.current) doSubmit();
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Loading test…</p>
        </div>
      </div>
    );
  }

  if (error || !test || !attempt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="card p-8 max-w-md text-center">
          <AlertTriangle className="w-12 h-12 text-danger-500 mx-auto mb-3" />
          <h2 className="font-display font-bold text-xl text-gray-900 mb-2">Cannot Start Test</h2>
          <p className="text-gray-600 mb-6">{error || 'Test unavailable.'}</p>
          <button onClick={() => router.back()} className="btn-secondary">Go Back</button>
        </div>
      </div>
    );
  }

  const isWarningTime = timeRemaining > 0 && timeRemaining <= 300;
  const isAboutToExpire = timeRemaining > 0 && timeRemaining <= 60;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top bar ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-display font-bold text-gray-900 text-sm truncate">{test.title}</span>
            <span className="hidden sm:block text-xs text-gray-400">
              {totalQuestions}Q · {test.totalMarks}M
            </span>
          </div>

          {/* Save indicator */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hidden sm:block" aria-live="polite">
              {savingIndicator === 'saving' && 'Saving…'}
              {savingIndicator === 'saved' && '✓ Saved'}
              {savingIndicator === 'error' && '⚠ Save failed'}
            </span>
            {!online && (
              <span className="flex items-center gap-1 text-xs text-danger-600">
                <WifiOff className="w-3.5 h-3.5" /> Offline
              </span>
            )}
            {online && savingIndicator === 'saving' && (
              <Wifi className="w-3.5 h-3.5 text-brand-500" />
            )}

            {/* Timer */}
            <div
              role="timer"
              aria-live="polite"
              aria-label={`Time remaining: ${formatTime(timeRemaining)}`}
              className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1.5 rounded-lg ${
                isAboutToExpire
                  ? 'bg-danger-100 text-danger-700 animate-pulse'
                  : isWarningTime
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Clock className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-primary btn-sm"
            >
              Submit
            </button>
          </div>
        </div>

        {/* Section tabs */}
        {test.sections.length > 1 && (
          <div className="flex gap-1 px-4 pb-2 overflow-x-auto max-w-7xl mx-auto">
            {test.sections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => { setCurrentSection(idx); setCurrentQuestionIdx(0); }}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  currentSection === idx
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* ── Question area ── */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto pb-20 lg:pb-6">
          {currentTQ ? (
            <div className="max-w-3xl">
              {/* Question header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    Q{currentTQ.number}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {currentTQ.question.marks} mark{currentTQ.question.marks !== 1 ? 's' : ''}
                    {currentTQ.question.negativeMarks > 0 && (
                      <> · -{currentTQ.question.negativeMarks} negative</>
                    )}
                  </span>
                </div>
                <button
                  onClick={() => handleFlag(currentTQ.number)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                    currentResponse?.flagged
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                  aria-pressed={currentResponse?.flagged ?? false}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {currentResponse?.flagged ? 'Flagged' : 'Mark for Review'}
                </button>
              </div>

              {/* Diagram */}
              {currentTQ.question.diagramUrl && (
                <div className="mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentTQ.question.diagramUrl}
                    alt="Question diagram"
                    className="max-w-full rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* Question text */}
              <div className="text-gray-900 font-medium leading-relaxed mb-6 text-base whitespace-pre-wrap">
                {currentTQ.question.text}
              </div>

              {/* Answer area */}
              {['SINGLE_MCQ', 'TRUE_FALSE', 'ASSERTION_REASON', 'MATCH'].includes(currentTQ.question.type) && (
                <div className="space-y-3" role="radiogroup" aria-label="Answer options">
                  {currentTQ.question.options.map((opt) => {
                    const selected = currentResponse?.selectedIds[0] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSingleSelect(currentTQ.number, opt.id)}
                        role="radio"
                        aria-checked={selected}
                        className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
                          selected
                            ? 'border-brand-500 bg-brand-50'
                            : 'border-gray-200 bg-white hover:border-brand-300 hover:bg-gray-50'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                            selected ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                          }`}
                        >
                          {selected && <span className="w-2 h-2 bg-white rounded-full" />}
                        </span>
                        <span className="text-sm text-gray-800">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentTQ.question.type === 'MULTI_MCQ' && (
                <div className="space-y-3" role="group" aria-label="Answer options (select all that apply)">
                  <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
                  {currentTQ.question.options.map((opt) => {
                    const selected = currentResponse?.selectedIds.includes(opt.id) ?? false;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleMultiSelect(currentTQ.number, opt.id)}
                        role="checkbox"
                        aria-checked={selected}
                        className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all ${
                          selected
                            ? 'border-brand-500 bg-brand-50'
                            : 'border-gray-200 bg-white hover:border-brand-300 hover:bg-gray-50'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                            selected ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                          }`}
                        >
                          {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </span>
                        <span className="text-sm text-gray-800">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {['NUMERICAL', 'INTEGER'].includes(currentTQ.question.type) && (
                <div>
                  <label htmlFor="numerical-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your answer:
                  </label>
                  <input
                    id="numerical-input"
                    type="number"
                    value={currentResponse?.answer ?? ''}
                    onChange={(e) => handleNumericalInput(currentTQ.number, e.target.value)}
                    onBlur={() => handleNumericalBlur(currentTQ.number)}
                    className="input-field max-w-xs text-lg font-mono"
                    placeholder={currentTQ.question.type === 'INTEGER' ? 'Enter integer' : 'Enter decimal'}
                    step={currentTQ.question.type === 'INTEGER' ? '1' : 'any'}
                  />
                </div>
              )}

              {['SHORT_ANSWER', 'LONG_ANSWER'].includes(currentTQ.question.type) && (
                <div>
                  <label htmlFor="text-answer" className="block text-sm font-medium text-gray-700 mb-2">
                    Your answer:
                  </label>
                  <textarea
                    id="text-answer"
                    value={currentResponse?.answer ?? ''}
                    onChange={(e) => handleNumericalInput(currentTQ.number, e.target.value)}
                    onBlur={() => handleNumericalBlur(currentTQ.number)}
                    rows={currentTQ.question.type === 'LONG_ANSWER' ? 6 : 3}
                    className="input-field resize-y"
                    placeholder="Type your answer here…"
                  />
                </div>
              )}

              {/* Hint */}
              {currentTQ.question.hint && (
                <details className="mt-4">
                  <summary className="text-xs text-brand-600 cursor-pointer hover:underline">Show hint</summary>
                  <p className="mt-2 text-sm text-gray-600 bg-brand-50 rounded-lg p-3">{currentTQ.question.hint}</p>
                </details>
              )}

              {/* Clear + nav buttons */}
              <div className="flex items-center justify-between mt-8 gap-3">
                <button
                  onClick={() => handleClearResponse(currentTQ.number)}
                  className="btn-secondary btn-sm"
                  disabled={!currentResponse || (currentResponse.selectedIds.length === 0 && !currentResponse.answer)}
                >
                  Clear Response
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={navigatePrev}
                    disabled={currentSection === 0 && currentQuestionIdx === 0}
                    className="btn-secondary btn-sm"
                    aria-label="Previous question"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <button
                    onClick={navigateNext}
                    disabled={
                      currentSection === (test.sections.length - 1) &&
                      currentQuestionIdx === currentSectionQuestions.length - 1
                    }
                    className="btn-primary btn-sm"
                    aria-label="Next question"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No questions in this section.</p>
          )}
        </div>

        {/* ── Question navigator (desktop sidebar) ── */}
        <aside className="hidden lg:flex flex-col w-64 border-l border-gray-200 bg-white p-4 overflow-y-auto">
          <h2 className="font-display font-semibold text-gray-700 text-sm mb-4">Question Navigator</h2>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-1.5 text-xs mb-4">
            {[
              { color: 'bg-gray-200', label: 'Unanswered' },
              { color: 'bg-emerald-500', label: 'Answered' },
              { color: 'bg-amber-400', label: 'Flagged' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-sm ${l.color}`} />
                <span className="text-gray-500">{l.label}</span>
              </div>
            ))}
          </div>

          {test.sections.map((sec, sIdx) => (
            <div key={sec.id} className="mb-4">
              {test.sections.length > 1 && (
                <p className="text-xs font-semibold text-gray-500 mb-2">{sec.title}</p>
              )}
              <div className="grid grid-cols-5 gap-1">
                {Array.from(sec.questions).map((tq, qIdx) => {
                  const status = getStatus(responses.get(tq.number));
                  const isCurrent = sIdx === currentSection && qIdx === currentQuestionIdx;
                  return (
                    <button
                      key={tq.number}
                      onClick={() => goToQuestion(sIdx, qIdx)}
                      aria-label={`Question ${tq.number}, ${status}`}
                      aria-current={isCurrent ? 'true' : undefined}
                      className={`w-9 h-9 rounded-lg text-xs font-semibold transition-all ${statusStyle[status]} ${
                        isCurrent ? 'ring-2 ring-brand-600 ring-offset-1' : ''
                      }`}
                    >
                      {tq.number}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-auto pt-4 border-t border-gray-100 space-y-1 text-xs text-gray-500">
            <p><span className="font-semibold text-emerald-600">{answeredCount}</span> answered</p>
            <p><span className="font-semibold text-gray-600">{unansweredCount}</span> unanswered</p>
            <p><span className="font-semibold text-amber-500">
              {Array.from(responses.values()).filter((r) => r.flagged).length}
            </span> flagged</p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="btn-primary w-full mt-4"
          >
            Submit Test
          </button>
        </aside>
      </div>

      {/* ── Mobile bottom navigator ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between gap-2 z-30">
        <div className="text-xs text-gray-500">
          <span className="text-emerald-600 font-semibold">{answeredCount}</span>/{totalQuestions} answered
        </div>
        <button onClick={() => setShowSubmitModal(true)} className="btn-primary btn-sm">Submit Test</button>
      </div>

      {/* ── Submit confirmation modal ── */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => !submitting && setShowSubmitModal(false)}
        title="Submit Test"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-emerald-600">{answeredCount}</p>
              <p className="text-xs text-gray-500 mt-1">Answered</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-gray-600">{unansweredCount}</p>
              <p className="text-xs text-gray-500 mt-1">Unanswered</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-2xl font-bold text-amber-600">
                {Array.from(responses.values()).filter((r) => r.flagged).length}
              </p>
              <p className="text-xs text-gray-500 mt-1">Flagged</p>
            </div>
          </div>

          {unansweredCount > 0 && (
            <div className="flex items-start gap-2 bg-amber-50 rounded-xl p-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                You have {unansweredCount} unanswered question{unansweredCount !== 1 ? 's' : ''}. Unanswered questions score zero.
              </p>
            </div>
          )}

          <p className="text-sm text-gray-600">
            Once submitted, you cannot change your answers. Are you sure you want to submit?
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowSubmitModal(false)}
              disabled={submitting}
              className="btn-secondary flex-1"
            >
              Review Answers
            </button>
            <button
              onClick={doSubmit}
              disabled={submitting}
              className="btn-primary flex-1"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                'Confirm Submit'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
