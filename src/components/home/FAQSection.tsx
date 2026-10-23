'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What boards does Global Minds Academy support?',
    a: 'We support CBSE, ICSE, ISC, Tamil Nadu State Board (Samacheer Kalvi), and Tamil Nadu Matriculation Board. Additional boards can be configured by administrators.',
  },
  {
    q: 'Which classes are covered?',
    a: 'We provide tuition and learning resources for Classes 1 through 12, with age-appropriate content and curriculum-aligned study materials.',
  },
  {
    q: 'Do you offer JEE and NEET preparation?',
    a: 'Yes. We offer dedicated preparation programmes for JEE Main, JEE Advanced, and NEET UG with mock tests, topic-wise practice, and study planners.',
  },
  {
    q: 'Can parents track their child\'s progress?',
    a: 'Absolutely. Parents get a dedicated dashboard to view attendance, assignments, test results, and learning progress for their linked children.',
  },
  {
    q: 'Are the courses free?',
    a: 'We offer both free and premium courses. Free resources include select notes, worksheets, and practice sets. Premium courses include full video lessons, mock tests, and teacher support.',
  },
  {
    q: 'How do I get started?',
    a: 'Simply create a free account, select your board and class, and start exploring courses and resources. No payment is required to browse or access free content.',
  },
  {
    q: 'Is student data safe?',
    a: 'Student privacy is our priority. We use role-based access controls, encrypted storage, and follow data protection practices. Student data is never shared publicly.',
  },
  {
    q: 'Do you offer offline classes?',
    a: 'Our platform primarily offers online learning. If the academy offers offline classes, they will be listed with batch schedules and location information.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding" id="faq">
      <div className="container-wide max-w-3xl">
        <div className="text-center mb-14">
          <div className="badge-primary mb-4 inline-flex">
            <HelpCircle className="w-3.5 h-3.5 mr-1" />
            FAQ
          </div>
          <h2 className="section-title mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Find answers to common questions about our programmes and platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-gray-900 pr-4 text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 animate-fade-in">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
