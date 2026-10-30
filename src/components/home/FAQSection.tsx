'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    category: 'Platform & Courses',
    faqs: [
      {
        q: 'What boards does Global Minds Academy support?',
        a: 'We support CBSE, ICSE, ISC, Tamil Nadu State Board (Samacheer Kalvi), and Tamil Nadu Matriculation Board for Classes 6–12. Additional boards can be configured by administrators.',
      },
      {
        q: 'Which classes are covered?',
        a: 'We provide tuition for Classes 6 through 12 — Middle School (6–8), Secondary (9–10), and Senior Secondary (11–12) with board and entrance exam preparation.',
      },
      {
        q: 'Are the courses free?',
        a: 'We offer both free and premium courses. Free access includes select notes, worksheets, formula sheets, and diagnostic tests. Premium courses include full video lessons, live classes, mock tests, DPPs, and teacher support.',
      },
      {
        q: 'Can I watch recorded classes after the live session?',
        a: 'Yes. All live classes are recorded and available for unlimited revision. This is especially useful for revision before exams — just like Physics Wallah and Vedantu recordings.',
      },
    ],
  },
  {
    category: 'JEE & NEET Preparation',
    faqs: [
      {
        q: 'Do you offer JEE and NEET preparation?',
        a: 'Yes. We offer dedicated preparation for JEE Main, JEE Advanced, and NEET UG — including full-length mock tests in NTA pattern, chapter-wise DPPs, error notebook, syllabus checklist, and rank predictor.',
      },
      {
        q: 'How are your mock tests different from other platforms?',
        a: 'Our mock tests run in NTA-style interface with server-side scoring — answers are never sent to your browser during the test. You get question-type analysis, time per question, accuracy breakdown, and an estimated rank after each test.',
      },
      {
        q: 'What is the Error Notebook?',
        a: 'Wrong answers are automatically saved as revision cards in your Error Notebook. You can review them, re-attempt the questions, and track how your accuracy improves over time — inspired by Unacademy\'s error analysis feature.',
      },
      {
        q: 'How accurate is the rank predictor?',
        a: 'The rank predictor is clearly labelled as an estimate — not a guarantee. It uses your mock score, accuracy, difficulty level, and historical data to give a probable rank range. Actual JEE/NEET ranks depend on that year\'s paper and competition.',
      },
    ],
  },
  {
    category: 'Parents & Accounts',
    faqs: [
      {
        q: 'Can parents track their child\'s progress?',
        a: 'Yes. Parents get a dedicated dashboard showing attendance, test scores, assignment status, chapter progress, and teacher feedback. Parent accounts are linked to children by the academy administrator — your child\'s data is never visible to other parents.',
      },
      {
        q: 'Is student data safe and private?',
        a: 'Student privacy is our top priority. Data stays on your academy\'s own server — we do not use third-party ad networks or tracking. Role-based access controls ensure only authorised users see each student\'s information.',
      },
      {
        q: 'How do I get started?',
        a: 'Create a free account, select your board and class, and take the free diagnostic test. This shows your current level and creates a personalised study path. No payment is needed to browse or access free content.',
      },
      {
        q: 'Do you support Tamil medium content?',
        a: 'Yes. Content is available in both English and Tamil — ideal for TN State Board and Matriculation students. This is one of our key differentiators from national platforms that focus only on English-medium learners.',
      },
    ],
  },
];

export default function FAQSection() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="section-padding bg-gray-50/50" id="faq">
      <div className="container-wide max-w-4xl">
        <div className="text-center mb-14">
          <div className="badge-primary mb-4 inline-flex">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            FAQ
          </div>
          <h2 className="section-title mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#1A6B5A] to-[#F5C518] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="section-subtitle mx-auto">
            Find answers to common questions about our programmes and platform.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              {/* Category header */}
              <h3 className="font-display font-bold text-blue-600 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="h-px bg-blue-100 flex-1" />
                {cat.category}
                <span className="h-px bg-blue-100 flex-1" />
              </h3>

              <div className="space-y-3">
                {cat.faqs.map((faq, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                      <button
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-gray-900 pr-4 text-sm leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-0 animate-fade-in border-t border-gray-50">
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500 mb-4">
            Still have questions? We&apos;re happy to help.
          </p>
          <Link href="/contact" className="btn-primary bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-2">
            Ask Us Anything
          </Link>
          <Link href="/faq" className="btn-secondary ml-3 inline-flex items-center gap-2">
            Full FAQ Page
          </Link>
        </div>
      </div>
    </section>
  );
}
