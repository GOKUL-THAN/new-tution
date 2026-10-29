import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Trophy, CheckCircle2, Star, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Scholarships — Merit-Based Fee Concessions',
  description:
    'Global Minds Academy offers merit-based scholarships and fee concessions for deserving students. Find out how to apply.',
};

const scholarships = [
  {
    name: 'Academic Excellence Scholarship',
    amount: 'Up to 50% fee waiver',
    criteria: 'Students scoring 90%+ in their previous board examinations.',
    eligibility: ['Classes 6–12', 'All boards'],
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'JEE / NEET Merit Scholarship',
    amount: 'Up to 40% fee waiver',
    criteria: 'Students who have cleared JEE Main or NEET UG in a previous attempt or qualified in a JEE/NEET mock test at our centre.',
    eligibility: ['Classes 11–12 and Repeaters'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Sibling Benefit',
    amount: '10% fee concession',
    criteria: 'Applicable when two or more siblings enrol simultaneously at Global Minds Academy.',
    eligibility: ['Classes 6–12', 'All programmes'],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Financial Assistance Bursary',
    amount: 'Case-by-case assessment',
    criteria: 'For academically strong students facing genuine financial hardship. Supporting documents required.',
    eligibility: ['Classes 6–12'],
    color: 'from-emerald-500 to-teal-600',
  },
];

const steps = [
  { step: '1', title: 'Register', desc: 'Create an account and fill in the scholarship application form available in your dashboard.' },
  { step: '2', title: 'Submit Documents', desc: 'Upload mark sheets, proof of previous academic record, and any supporting documents.' },
  { step: '3', title: 'Assessment', desc: 'Our team reviews your application. You may be invited for a short online test or interview.' },
  { step: '4', title: 'Offer Letter', desc: 'Successful applicants receive a scholarship offer letter within 7 working days.' },
];

export default function ScholarshipsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-6 shadow-xs">
                <Trophy className="w-4 h-4 text-[#1A6B5A]" />
                Merit-Based · Transparent · Fair
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-6 tracking-tight">
                Scholarships &amp; <span className="text-[#1A6B5A]">Fee Concessions</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
                We believe talent should not be held back by financial barriers. Global Minds Academy offers merit-based scholarships and fee concessions for deserving students.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-[#1A6B5A] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#145346] shadow-md shadow-teal-900/10 transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors">
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarship Types */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Available Scholarships</h2>
            <p className="section-subtitle text-center mb-12">Multiple pathways for eligible students.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {scholarships.map((s, i) => (
                <div key={i} className="card p-6 sm:p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-1">{s.name}</h3>
                  <p className="text-brand-600 font-semibold text-sm mb-3">{s.amount}</p>
                  <p className="text-sm text-gray-600 mb-4">{s.criteria}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.eligibility.map((e) => (
                      <span key={e} className="badge bg-gray-100 text-gray-600 text-xs">{e}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-700">
              Scholarships are subject to availability, eligibility verification, and the academy&apos;s terms.
              Global Minds Academy reserves the right to modify or discontinue any scholarship at any time.
              All decisions are final.
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide max-w-3xl">
            <h2 className="section-title text-center mb-3">How to Apply</h2>
            <p className="section-subtitle text-center mb-12">The application process is simple and fully online.</p>
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-display font-bold text-lg shrink-0 shadow-lg">
                    {s.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-display font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="section-padding">
          <div className="container-wide max-w-2xl text-center">
            <h2 className="section-title mb-3">Questions About Scholarships?</h2>
            <p className="section-subtitle mb-8">Our team is happy to help you understand the options available.</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <a href="tel:+919999999999" className="card p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-0.5">Phone</div>
                  <div className="font-semibold text-gray-900 text-sm">+91 99999 99999</div>
                </div>
              </a>
              <a href="mailto:scholarships@globalmindsacademy.in" className="card p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500 mb-0.5">Email</div>
                  <div className="font-semibold text-gray-900 text-sm">scholarships@globalmindsacademy.in</div>
                </div>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn-primary">
                Apply for Scholarship <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
