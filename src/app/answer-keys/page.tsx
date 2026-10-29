import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Key, ExternalLink, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Answer Keys & Solutions — JEE Main, NEET, CBSE, TN Board | Global Minds Academy',
  description:
    'Download official answer keys and detailed solutions for JEE Main, JEE Advanced, NEET UG, CBSE board exams, and Tamil Nadu State Board exams.',
};

const answerKeyExams = [
  {
    exam: 'JEE Main 2025',
    sessions: ['January Session 1', 'January Session 2', 'April Session 1', 'April Session 2'],
    officialUrl: 'https://jeemain.nta.nic.in/',
    pdfNote: 'NTA releases official answer keys on jeemain.nta.nic.in after each session. Students can challenge answer keys within the given window.',
    color: 'bg-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    icon: '⚛️',
    keySteps: [
      'Go to jeemain.nta.nic.in',
      'Click "Answer Key" in the top menu',
      'Select your session and paper',
      'Download the PDF answer key',
      'Submit objections if any during the challenge window',
    ],
  },
  {
    exam: 'JEE Advanced 2025',
    sessions: ['Paper 1', 'Paper 2'],
    officialUrl: 'https://jeeadv.ac.in/',
    pdfNote: 'IIT releases provisional and final answer keys at jeeadv.ac.in. Candidates can view marks after final key publication.',
    color: 'bg-[#1A6B5A]',
    bg: 'bg-teal-50 border-teal-200',
    icon: '🎓',
    keySteps: [
      'Go to jeeadv.ac.in',
      'Click "Answer Keys" section',
      'Download Paper 1 and Paper 2 keys',
      'Use the official ORS (scanned responses) to check your answers',
    ],
  },
  {
    exam: 'NEET UG 2025',
    sessions: ['Official Answer Key', 'Question Paper Codes', 'OMR Sheets'],
    officialUrl: 'https://neet.nta.nic.in/',
    pdfNote: 'NTA releases answer keys at neet.nta.nic.in. All question paper codes (E1/E2/F1 etc.) are available. OMR scans also released.',
    color: 'bg-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    icon: '🩺',
    keySteps: [
      'Go to neet.nta.nic.in',
      'Click "Answer Key & Question Papers"',
      'Select your paper code',
      'Match your answers to calculate provisional score',
      'Raise objections if needed before final key release',
    ],
  },
  {
    exam: 'CBSE Class 10 Board 2025',
    sessions: ['All subjects — Marking Scheme PDFs'],
    officialUrl: 'https://cbseacademic.nic.in/marking-scheme.html',
    pdfNote: 'CBSE releases official marking schemes (answer keys) after the examination at cbseacademic.nic.in. Available for all subjects.',
    color: 'bg-orange-500',
    bg: 'bg-orange-50 border-orange-200',
    icon: '📚',
    keySteps: [
      'Go to cbseacademic.nic.in',
      'Click "Examination Material" → "Marking Scheme"',
      'Select the year and class',
      'Download the PDF marking scheme for each subject',
    ],
  },
  {
    exam: 'CBSE Class 12 Board 2025',
    sessions: ['Science', 'Commerce', 'Humanities — All subjects'],
    officialUrl: 'https://cbseacademic.nic.in/marking-scheme.html',
    pdfNote: 'CBSE marking schemes available for all Class 12 subjects at cbseacademic.nic.in after examination.',
    color: 'bg-red-600',
    bg: 'bg-red-50 border-red-200',
    icon: '🎯',
    keySteps: [
      'Go to cbseacademic.nic.in',
      'Navigate to "Marking Scheme"',
      'Select Class 12 and the academic year',
      'Download subject-wise marking schemes',
    ],
  },
  {
    exam: 'Tamil Nadu Board 2025 (SSLC & +2)',
    sessions: ['Class 10 SSLC', 'Class 11', 'Class 12 HSC'],
    officialUrl: 'https://www.dge.tn.gov.in/',
    pdfNote: 'TN DGE releases answer keys and model answer sheets after board examinations at dge.tn.gov.in.',
    color: 'bg-[#D4A017]',
    bg: 'bg-amber-50 border-amber-200',
    icon: '🌴',
    keySteps: [
      'Go to dge.tn.gov.in',
      'Check "Question Papers and Keys" section',
      'Select class and subject',
      'Download the official key or model answers',
    ],
  },
  {
    exam: 'CUET UG 2025',
    sessions: ['All domains', 'General Test', 'Language papers'],
    officialUrl: 'https://cuet.samarth.ac.in/',
    pdfNote: 'NTA releases CUET answer keys at cuet.samarth.ac.in after the examination window. Domain-wise keys available.',
    color: 'bg-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    icon: '🏛️',
    keySteps: [
      'Go to cuet.samarth.ac.in',
      'Click "Answer Key" after NTA announcement',
      'Select your domain/subject',
      'Download and verify your answers',
    ],
  },
  {
    exam: 'BITSAT 2025',
    sessions: ['Session 1', 'Session 2'],
    officialUrl: 'https://www.bitsadmission.com/',
    pdfNote: 'BITS Pilani releases answer keys at bitsadmission.com after BITSAT sessions.',
    color: 'bg-indigo-600',
    bg: 'bg-indigo-50 border-indigo-200',
    icon: '🔬',
    keySteps: [
      'Go to bitsadmission.com',
      'Navigate to "Answer Key" section',
      'Select your session',
      'Download the PDF key',
    ],
  },
];

export default function AnswerKeysPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs">
                <Key className="w-4 h-4 text-[#1A6B5A]" />
                Official Examination Sources Only
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Answer Keys &amp; <span className="text-[#1A6B5A]">Solutions Directory</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Step-by-step guides to download official answer keys for JEE Main,
                JEE Advanced, NEET UG, CBSE, Tamil Nadu Board, and more.
                All links go directly to official government and institutional portals.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="container-wide py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Official Sources:</strong> Global Minds Academy does not host answer key PDFs.
                All keys are available directly from official portals (NTA, CBSE, TN DGE, BITS Pilani).
                We provide step-by-step navigation guides. Check official sites for the latest availability.
              </p>
            </div>
          </div>
        </section>

        {/* Answer key cards */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Answer Keys by Exam</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {answerKeyExams.map((exam) => (
                <div key={exam.exam} className={`rounded-3xl border p-6 ${exam.bg}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{exam.icon}</span>
                    <div>
                      <h3 className="font-display font-bold text-gray-900 text-lg">{exam.exam}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {exam.sessions.map((s) => (
                          <span key={s} className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{exam.pdfNote}</p>

                  {/* Steps */}
                  <div className="bg-white rounded-2xl p-4 mb-4 border border-white">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      How to Download
                    </p>
                    <ol className="space-y-1.5">
                      {exam.keySteps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className={`w-4 h-4 rounded-full ${exam.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <a href={exam.officialUrl} target="_blank" rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-sm font-semibold text-white ${exam.color} px-4 py-2 rounded-xl hover:opacity-90 transition-opacity`}>
                    Go to Official Portal <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to use answer keys */}
        <section className="section-padding bg-white">
          <div className="container-wide max-w-3xl">
            <h2 className="section-title mb-4 text-center">
              How to Use Answer Keys Effectively
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Simply matching answers is not enough. Here is how to extract maximum value from answer key analysis.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { step: '01', title: 'Calculate Provisional Score', desc: 'Match your answers before the official result. Use the marking scheme carefully — negative marking rules differ by exam.' },
                { step: '02', title: 'Analyse Section-wise', desc: 'Break down accuracy by subject and topic. Which chapters cost you the most marks? Feed these into your error notebook.' },
                { step: '03', title: 'Challenge Wrong Keys', desc: 'If you believe an answer key is wrong, submit an official challenge within the given window with a valid reference. NTA accepts challenges for JEE/NEET.' },
                { step: '04', title: 'Use for Next Attempt', desc: 'Reviewing previous year answer keys before your next attempt reveals question patterns, common traps, and high-yield topics.' },
              ].map((item) => (
                <div key={item.step} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-display font-black text-[#1A6B5A]/20">{item.step}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-[#0D2B3E]">
          <div className="container-wide text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              Practice Before the Exam
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Use our mock tests to practise in exam conditions and check your answers with server-side scoring.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/practice" className="btn !bg-[#F5C518] !text-[#0D2B3E] font-bold px-8 py-3">
                Go to Practice Hub
              </Link>
              <Link href="/previous-year-papers" className="btn border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3">
                Previous Year Papers <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
