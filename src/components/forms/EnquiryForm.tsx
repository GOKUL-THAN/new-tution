'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

interface EnquiryFormProps {
  onSuccess?: (referenceNo: string) => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  studentClass: string;
  board: string;
  interest: string;
  message: string;
  consentGiven: boolean;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  studentClass: '',
  board: '',
  interest: '',
  message: '',
  consentGiven: false,
};

export default function EnquiryForm({ onSuccess }: EnquiryFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to submit. Please try again.');
        return;
      }

      const successMsg = `Thank you! Your enquiry has been submitted. Reference: ${data.referenceNo}`;
      setSuccess(successMsg);
      setForm(initialForm);
      onSuccess?.(data.referenceNo as string);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {success && (
        <div className="bg-success-50 text-success-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
          {success}
        </div>
      )}

      {error && (
        <div role="alert" className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enq-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="enq-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="enq-phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span aria-hidden="true">*</span>
            </label>
            <input
              id="enq-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input-field"
              required
              minLength={10}
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label htmlFor="enq-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email (optional)
          </label>
          <input
            id="enq-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
            autoComplete="email"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enq-class" className="block text-sm font-medium text-gray-700 mb-1">
              Student Class
            </label>
            <select
              id="enq-class"
              value={form.studentClass}
              onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
              className="input-field"
            >
              <option value="">Select class</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="enq-board" className="block text-sm font-medium text-gray-700 mb-1">
              Board
            </label>
            <select
              id="enq-board"
              value={form.board}
              onChange={(e) => setForm({ ...form, board: e.target.value })}
              className="input-field"
            >
              <option value="">Select board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="ISC">ISC</option>
              <option value="TN State Board">TN State Board</option>
              <option value="TN Matriculation">TN Matriculation</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="enq-interest" className="block text-sm font-medium text-gray-700 mb-1">
            Area of Interest
          </label>
          <select
            id="enq-interest"
            value={form.interest}
            onChange={(e) => setForm({ ...form, interest: e.target.value })}
            className="input-field"
          >
            <option value="">Select interest</option>
            <option value="School Tuition">School Tuition</option>
            <option value="JEE Preparation">JEE Preparation</option>
            <option value="NEET Preparation">NEET Preparation</option>
            <option value="Board Exam Prep">Board Exam Preparation</option>
            <option value="Olympiads">Olympiads</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="enq-message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="enq-message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field min-h-[100px]"
            rows={4}
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="enq-consent"
            type="checkbox"
            checked={form.consentGiven}
            onChange={(e) => setForm({ ...form, consentGiven: e.target.checked })}
            className="mt-1 rounded border-gray-300"
            required
          />
          <label htmlFor="enq-consent" className="text-sm text-gray-600">
            I consent to Global Minds Academy collecting this information to respond to my enquiry.
            I have read the{' '}
            <a href="/privacy" className="text-brand-600 underline">
              Privacy Policy
            </a>
            .
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              Submit Enquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
