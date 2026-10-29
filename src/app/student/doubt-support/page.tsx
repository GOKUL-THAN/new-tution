'use client';

import { useState } from 'react';
import {
  HelpCircle,
  Send,
  Sparkles,
  BookOpen,
  CheckCircle,
  Lightbulb,
  MessageSquare,
  ChevronRight,
  Bot,
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface DoubtItem {
  id: string;
  subject: string;
  question: string;
  answer: string;
  hints: string[];
  createdAt: string;
}

const SAMPLE_DOUBTS: DoubtItem[] = [
  {
    id: '1',
    subject: 'Physics',
    question: 'How do you derive the time period of a simple pendulum for small oscillations?',
    answer:
      'For small angles (θ < 15° or ~0.26 rad), sin(θ) ≈ θ. The restoring force is F = -mg*sin(θ) ≈ -mg*(x/L). By Newton\'s second law, m*a = -mg*(x/L) => a = -(g/L)*x. Comparing with SHM standard equation a = -ω²*x gives ω = √(g/L). Hence time period T = 2π/ω = 2π√(L/g).',
    hints: [
      'Use the small-angle approximation sin(θ) ≈ θ in radians.',
      'Identify the restoring force component along the arc: F = -mg sin(θ).',
      'Compare acceleration with standard SHM equation a = -ω² x.',
    ],
    createdAt: 'Just now',
  },
  {
    id: '2',
    subject: 'Mathematics',
    question: 'What is the easiest way to solve ∫ (x * e^x) dx?',
    answer:
      'Apply Integration by Parts (ILATE rule): ∫ u v\' dx = u v - ∫ u\' v dx. Choose u = x (algebraic) and v\' = e^x (exponential). Then u\' = 1 and v = e^x. Thus: ∫ x e^x dx = x e^x - ∫ 1 * e^x dx = x e^x - e^x + C = e^x(x - 1) + C.',
    hints: [
      'Choose u according to ILATE (Inverse, Log, Algebraic, Trig, Exponential).',
      'Here u = x and dv = e^x dx.',
      'Differentiate u to get du = dx, and integrate dv to get v = e^x.',
    ],
    createdAt: 'Earlier today',
  },
];

export default function StudentDoubtSupportPage() {
  const [subject, setSubject] = useState('Mathematics');
  const [question, setQuestion] = useState('');
  const [doubts, setDoubts] = useState<DoubtItem[]>(SAMPLE_DOUBTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState<DoubtItem | null>(SAMPLE_DOUBTS[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsSubmitting(true);

    // Simulate AI Tutor instant response based on problem subject
    setTimeout(() => {
      const newDoubt: DoubtItem = {
        id: Date.now().toString(),
        subject,
        question: question.trim(),
        answer: `Here is the structured step-by-step breakdown for your ${subject} query:\n\n1. Concept Overview: This problem involves foundational principles of ${subject}.\n2. Core Formula / Method: Recall the relevant governing equation and identify known and unknown variables.\n3. Detailed Solution: Carefully substitute values, simplify algebraic expressions, and verify unit consistency.\n4. Verification: Check the limiting behavior or dimensional correctness to confirm validity.`,
        hints: [
          'Break down complex expressions into simpler constituent parts.',
          'Double check signs and arithmetic steps carefully.',
          'Review the NCERT / textbook chapter examples for corresponding standard formats.',
        ],
        createdAt: 'Just now',
      };

      setDoubts([newDoubt, ...doubts]);
      setSelectedDoubt(newDoubt);
      setQuestion('');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="badge bg-purple-100 text-purple-700 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5" /> 24/7 AI Tutor & Doubt Assistance
          </span>
        </div>
        <h1 className="text-2xl font-display font-bold text-gray-900">Ask a Doubt</h1>
        <p className="text-gray-500 mt-1">
          Get step-by-step explanations, conceptual hints, and problem-solving tips instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Ask Form & History */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-600" /> Submit Your Question
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                  Question / Problem
                </label>
                <textarea
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question or homework problem here..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !question.trim()}
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner /> Analyzing Question...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Ask AI Tutor
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Past Doubts List */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center justify-between">
              <span>Recent Doubts</span>
              <span className="text-xs text-gray-400 font-normal">{doubts.length} items</span>
            </h3>
            <div className="space-y-2">
              {doubts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDoubt(d)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    selectedDoubt?.id === d.id
                      ? 'border-brand-500 bg-brand-50/60 shadow-sm'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-brand-700">{d.subject}</span>
                    <span className="text-gray-400 text-[10px]">{d.createdAt}</span>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{d.question}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Solution View */}
        <div className="lg:col-span-7">
          {selectedDoubt ? (
            <div className="card p-6 lg:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-5">
                <span className="badge bg-brand-100 text-brand-700 text-xs mb-2">
                  {selectedDoubt.subject}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mt-2">
                  {selectedDoubt.question}
                </h2>
              </div>

              {/* Step by step answer */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Step-by-Step Solution
                </h3>
                <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-line border border-gray-100 font-sans">
                  {selectedDoubt.answer}
                </div>
              </div>

              {/* Helpful Hints */}
              {selectedDoubt.hints && selectedDoubt.hints.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Key Concepts & Hints
                  </h3>
                  <div className="grid gap-2">
                    {selectedDoubt.hints.map((hint, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold shrink-0 text-[10px]">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed">{hint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-12 text-center text-gray-400">
              Select or ask a question to view the detailed explanation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

