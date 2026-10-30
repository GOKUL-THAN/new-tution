import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ExternalLink, FileText, AlertCircle, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Previous Year Question Papers — JEE, NEET, CBSE, TN Board',
  description:
    'Access previous year question papers for JEE Main, JEE Advanced, NEET UG, CBSE board exams, and Tamil Nadu State Board exams. Official sources and links.',
};

const paperCategories = [
  {
    category: 'JEE Main — Previous Year Papers',
    color: 'bg-violet-600',
    bg: 'border-violet-200 bg-violet-50',
    icon: '⚛️',
    description: 'JEE Main question papers from 2017–2025. Papers cover Physics, Chemistry, and Mathematics in both shifts.',
    officialUrl: 'https://jeemain.nta.nic.in/',
    officialLabel: 'NTA JEE Main Official',
    years: ['2025 (Jan & Apr sessions)', '2024 (Jan & Apr sessions)', '2023', '2022', '2021', '2020', '2019', '2018', '2017'],
    keyNote: 'NTA releases official question papers after each session. Download from jeemain.nta.nic.in.',
    subjectBreakdown: ['Physics — 20 MCQ + 10 Numerical (attempt 5)', 'Chemistry — 20 MCQ + 10 Numerical', 'Mathematics — 20 MCQ + 10 Numerical'],
  },
  {
    category: 'JEE Advanced — Previous Year Papers',
    color: 'bg-blue-600',
    bg: 'border-teal-200 bg-teal-50',
    icon: '🎓',
    description: 'JEE Advanced papers from 2007–2024. Includes Paper 1 and Paper 2, both in English and Hindi.',
    officialUrl: 'https://jeeadv.ac.in/',
    officialLabel: 'IIT JEE Advanced Official',
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2010–2014', '2007–2009'],
    keyNote: 'All previous papers available at jeeadv.ac.in. Paper pattern changes each year — verify before using old patterns.',
    subjectBreakdown: ['Paper 1 — Physics, Chemistry, Maths (3 hrs)', 'Paper 2 — Physics, Chemistry, Maths (3 hrs)', 'Both papers mandatory for all candidates'],
  },
  {
    category: 'NEET UG — Previous Year Papers',
    color: 'bg-emerald-600',
    bg: 'border-emerald-200 bg-emerald-50',
    icon: '🩺',
    description: 'NEET UG papers from 2013–2024. 180 questions: Physics (45), Chemistry (45), Biology (90).',
    officialUrl: 'https://neet.nta.nic.in/',
    officialLabel: 'NTA NEET Official',
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'],
    keyNote: 'NEET papers available at neet.nta.nic.in. NTA Abhyas (abhyas.nta.ac.in) provides free official mock tests.',
    subjectBreakdown: ['Physics — 45 questions, 180 marks', 'Chemistry — 45 questions, 180 marks', 'Biology (Botany + Zoology) — 90 questions, 360 marks'],
  },
  {
    category: 'CBSE Class 10 Board Papers',
    color: 'bg-orange-500',
    bg: 'border-orange-200 bg-orange-50',
    icon: '📚',
    description: 'CBSE Class 10 board question papers and marking schemes from recent years.',
    officialUrl: 'https://cbseacademic.nic.in/SQP.html',
    officialLabel: 'CBSE Sample Papers Official',
    years: ['2024–25 Sample Papers', '2023–24', '2022–23', '2021–22', '2020–21', '2019–20', '2018–19'],
    keyNote: 'CBSE releases official sample papers and marking schemes every year at cbseacademic.nic.in.',
    subjectBreakdown: ['Mathematics (Standard & Basic)', 'Science', 'Social Science', 'English Language & Literature', 'Hindi (A & B)'],
  },
  {
    category: 'CBSE Class 12 Board Papers',
    color: 'bg-red-600',
    bg: 'border-red-200 bg-red-50',
    icon: '🎯',
    description: 'CBSE Class 12 board question papers — Science, Commerce, and Humanities streams.',
    officialUrl: 'https://cbseacademic.nic.in/SQP.html',
    officialLabel: 'CBSE Official',
    years: ['2024–25 Sample Papers', '2023–24', '2022–23', '2021–22', '2020–21', '2019–20', '2018–19'],
    keyNote: 'Download official sample papers at cbseacademic.nic.in. Previous year main exam papers via DigiLocker.',
    subjectBreakdown: ['Physics, Chemistry, Maths/Biology', 'Accountancy, Economics, Business Studies', 'English Core', 'Computer Science / Informatics Practices'],
  },
  {
    category: 'Tamil Nadu State Board Papers',
    color: 'bg-amber-500',
    bg: 'border-amber-200 bg-amber-50',
    icon: '🌴',
    description: 'Tamil Nadu Class 10 (SSLC) and Class 12 board question papers in Tamil and English medium.',
    officialUrl: 'https://www.tnschools.gov.in/',
    officialLabel: 'TN School Education Official',
    years: ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'],
    keyNote: 'Official TN board papers and model question papers at tnschools.gov.in. Both Tamil and English medium available.',
    subjectBreakdown: ['Class 10 SSLC — Tamil, English, Maths, Science, Social Science', 'Class 11 & 12 — All streams (Science, Commerce, Arts)', 'Tamil Medium and English Medium papers'],
  },
];

const practiceResources = [
  { label: 'NTA Abhyas App',         url: 'https://abhyas.nta.ac.in/',          desc: 'Free official NTA mock tests for JEE Main and NEET — chapter & full-length tests' },
  { label: 'CBSE Sample Papers',     url: 'https://cbseacademic.nic.in/SQP.html', desc: 'Official CBSE sample question papers and marking schemes' },
  { label: 'JEE Main Official',      url: 'https://jeemain.nta.nic.in/',         desc: 'Previous year papers and answer keys from NTA' },
  { label: 'JEE Advanced Archive',   url: 'https://jeeadv.ac.in/',              desc: 'All previous year papers with solutions from official IIT source' },
  { label: 'NEET NTA Official',      url: 'https://neet.nta.nic.in/',           desc: 'NEET question papers, answer keys, and OMR sheets' },
  { label: 'NCERT Exemplar',         url: 'https://ncert.nic.in/exemplar-problems.php', desc: 'Higher-order NCERT practice problems for Science and Maths' },
];

export default function PreviousYearPapersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/free-resources" className="hover:text-slate-900 transition-colors">Free Resources</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Previous Year Papers</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs">
                <FileText className="w-4 h-4 text-blue-600" />
                JEE · NEET · CBSE · TN Board Archive
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Previous Year <span className="text-blue-600">Question Papers</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Practice with actual board and entrance exam question papers.
                All papers reference official government sources — NTA, CBSE, and TN School Education.
              </p>
            </div>
          </div>
        </section>

        {/* Why PYQs matter */}
        <section className="bg-blue-50/60 border-b border-blue-200/50">
          <div className="container-wide py-5">
            <div className="flex flex-wrap items-center justify-around gap-4 text-sm text-center">
              {[
                { stat: '#1', label: 'Most recommended preparation strategy by Allen, Aakash, FIITJEE' },
                { stat: '60%', label: 'JEE/NEET questions follow patterns from past papers' },
                { stat: '3–5x', label: 'Improvement in speed after practising 5+ past papers' },
                { stat: 'Free', label: 'All PYQs officially available from NTA and CBSE websites' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-2xl font-display font-black text-amber-600">{s.stat}</span>
                  <span className="text-gray-600 text-xs max-w-[140px] text-left leading-snug">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Paper categories */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-10">Question Papers by Exam</h2>
            <div className="space-y-6">
              {paperCategories.map((cat) => (
                <div key={cat.category} className={`rounded-3xl border p-6 sm:p-8 ${cat.bg}`}>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <h3 className="font-display font-bold text-gray-900 text-lg">{cat.category}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cat.description}</p>

                      {/* Subject breakdown */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Paper Structure</p>
                        <ul className="space-y-1">
                          {cat.subjectBreakdown.map((s) => (
                            <li key={s} className="flex items-center gap-2 text-xs text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Official link */}
                      <a
                        href={cat.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl ${cat.color} hover:opacity-90 transition-opacity`}
                      >
                        <Download className="w-4 h-4" />
                        {cat.officialLabel}
                        <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                      </a>
                    </div>

                    {/* Right: Years */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Available Years</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.years.map((y) => (
                          <span key={y} className="bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                            {y}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 bg-white/60 rounded-xl p-3 border border-white">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-gray-600">{cat.keyNote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice resources */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title mb-4">Free Official Practice Resources</h2>
            <p className="text-gray-500 mb-8">
              These official platforms provide free access to past papers and mock tests.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {practiceResources.map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{r.label}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 shrink-0 mt-0.5 transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center">
              Links verified October 2026. All links go to official government/institutional websites.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-b from-teal-50/50 via-slate-50 to-white border-t border-teal-100">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4">
              Practise with Full Mock Tests
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto font-medium">
              Take timed full-length mock tests in our platform — JEE and NEET pattern with
              server-side scoring, rank predictor, and detailed question analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register" className="btn bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 py-3 shadow-md shadow-blue-500/25">
                Start Free Mock Test
              </Link>
              <Link href="/entrance-exams" className="btn bg-white border-2 border-slate-300 text-slate-800 hover:border-teal-600 hover:text-teal-700 hover:bg-teal-50/50 shadow-sm px-8 py-3">
                View All Exam Prep
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
