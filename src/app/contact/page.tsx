'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', studentClass: '', board: '',
    interest: '', message: '', consentGiven: false,
  });
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

      setSuccess(`Thank you! Your enquiry has been submitted. Reference: ${data.referenceNo}`);
      setForm({ name: '', email: '', phone: '', studentClass: '', board: '', interest: '', message: '', consentGiven: false });
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
              Admissions &amp; Academic Inquiries
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Have questions about our programmes? Submit an enquiry and our team will get back to you promptly.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-sm text-gray-500">Tamil Nadu, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-sm text-gray-500">info@globalmindsacademy.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-sm text-gray-500">Available via enquiry form</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Contact details shown are configurable by administrators. Email and phone will be updated once academy operations begin.
                </p>
              </div>

              {/* Enquiry Form */}
              <div className="lg:col-span-3">
                <div className="card p-6 sm:p-8">
                  <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Enquiry Form</h2>

                  {success && (
                    <div className="bg-success-50 text-success-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      {success}
                    </div>
                  )}

                  {error && (
                    <div className="bg-danger-50 text-danger-600 px-4 py-3 rounded-xl text-sm mb-6">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
                      </div>
                      <div>
                        <label htmlFor="cphone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <input id="cphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" required minLength={10} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cemail" className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                      <input id="cemail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sclass" className="block text-sm font-medium text-gray-700 mb-1">Student Class</label>
                        <select id="sclass" value={form.studentClass} onChange={(e) => setForm({ ...form, studentClass: e.target.value })} className="input-field">
                          <option value="">Select class</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="board" className="block text-sm font-medium text-gray-700 mb-1">Board</label>
                        <select id="board" value={form.board} onChange={(e) => setForm({ ...form, board: e.target.value })} className="input-field">
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
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
                      <select id="interest" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className="input-field">
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
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field min-h-[100px]" rows={4} />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={form.consentGiven}
                        onChange={(e) => setForm({ ...form, consentGiven: e.target.checked })}
                        className="mt-1 rounded border-gray-300"
                        required
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        I consent to Global Minds Academy collecting this information to respond to my enquiry.
                        I have read the <a href="/privacy" className="text-brand-600 underline">Privacy Policy</a>.
                      </label>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" />Submit Enquiry</>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
