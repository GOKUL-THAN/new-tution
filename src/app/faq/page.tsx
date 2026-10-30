import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Global Minds Academy — courses, boards, exams, pricing, and more.',
};

const faqCategories = [
  {
    category: 'General',
    questions: [
      { q: 'What is Global Minds Academy?', a: 'Global Minds Academy is a comprehensive education platform for Indian students covering school tuition (Classes 6–12), competitive exam preparation (JEE, NEET), curriculum resources, mock tests, and personalised learning analytics.' },
      { q: 'Who is this platform for?', a: 'Students from Classes 6–12, JEE and NEET aspirants, parents who want to track their child\'s progress, and teachers who want to manage their classes and assessments.' },
      { q: 'Is this platform free?', a: 'We offer both free and paid content. Free resources include select notes, worksheets, and practice sets. Premium courses include full video lessons, mock tests, and teacher support.' },
    ],
  },
  {
    category: 'Curriculum & Boards',
    questions: [
      { q: 'Which boards do you support?', a: 'CBSE, ICSE, ISC, Tamil Nadu State Board (Samacheer Kalvi), and Tamil Nadu Matriculation Board. Additional boards can be configured by administrators.' },
      { q: 'Is the content aligned to official syllabi?', a: 'Yes, all study material is aligned to the respective board\'s syllabus. We clearly distinguish verified official syllabus coverage from supplementary material created by our academy.' },
    ],
  },
  {
    category: 'Competitive Exams',
    questions: [
      { q: 'Do you offer JEE preparation?', a: 'Yes, we offer structured preparation for both JEE Main and JEE Advanced with Physics, Chemistry, and Mathematics courses, mock tests, and performance analytics.' },
      { q: 'Do you offer NEET preparation?', a: 'Yes, we offer NEET UG preparation covering Biology, Physics, and Chemistry with NCERT-focused study material and NEET-pattern mock tests.' },
      { q: 'Are exam dates accurate?', a: 'Examination dates and patterns change annually. We source information from official websites and mark verification dates. Always verify from the official conducting authority.' },
    ],
  },
  {
    category: 'Parents',
    questions: [
      { q: 'Can I track my child\'s progress?', a: 'Yes, parents get a dedicated dashboard to view attendance, assignments, test results, and learning progress for their linked children.' },
      { q: 'Is student data safe?', a: 'Student privacy is our priority. We use role-based access controls, do not publicly expose student records, and follow data protection practices in accordance with applicable Indian law.' },
    ],
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqCategories.flatMap((cat) =>
    cat.questions.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
              Help &amp; Support Centre
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Find answers to common questions about courses, boards, exams, pricing, and admissions.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide max-w-3xl">
            {faqCategories.map((cat) => (
              <div key={cat.category} className="mb-12">
                <h2 className="text-xl font-display font-bold text-gray-900 mb-6">{cat.category}</h2>
                <div className="space-y-4">
                  {cat.questions.map((faq, i) => (
                    <div key={i} className="card p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="text-center mt-12">
              <p className="text-gray-500 mb-4">Still have questions?</p>
              <Link href="/contact" className="btn-primary">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
