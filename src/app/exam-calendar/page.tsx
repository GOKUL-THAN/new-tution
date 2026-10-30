import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, AlertCircle, ExternalLink, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exam Calendar 2025–26 — JEE, NEET, CBSE, TN Board Dates',
  description:
    'Complete exam calendar for 2025–26: JEE Main, JEE Advanced, NEET UG, CUET, BITSAT, CBSE boards, Tamil Nadu State Board, NTSE, and Olympiad dates.',
};

/* NOTE: All dates are indicative based on historical patterns.
   Always verify from official sources before taking any action. */

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const examsByMonth: { month: string; exams: { name: string; type: string; color: string; note: string; url: string; status: string }[] }[] = [
  {
    month: 'November–December 2025',
    exams: [
      { name: 'JEE Main 2026 — Applications Open', type: 'Engineering', color: 'bg-violet-600', note: 'Session 1 application window typically opens Nov–Dec. Verify at jeemain.nta.nic.in.', url: 'https://jeemain.nta.nic.in/', status: 'Applications' },
      { name: 'BITSAT 2026 — Applications Open', type: 'Engineering', color: 'bg-orange-500', note: 'Application window typically opens in November. Verify at bitsadmission.com.', url: 'https://www.bitsadmission.com/', status: 'Applications' },
      { name: 'IMO / NSO Stage 1', type: 'Olympiad', color: 'bg-amber-500', note: 'SOF Olympiad Stage 1 conducted in schools during Oct–Nov. Verify at sofworld.org.', url: 'https://www.sofworld.org/', status: 'Exam' },
    ],
  },
  {
    month: 'January 2026',
    exams: [
      { name: 'JEE Main 2026 — Session 1', type: 'Engineering', color: 'bg-violet-600', note: 'Session 1 typically held in Jan. 13 sessions across India. Verify at jeemain.nta.nic.in.', url: 'https://jeemain.nta.nic.in/', status: 'Exam' },
      { name: 'NEET UG 2026 — Awareness', type: 'Medical', color: 'bg-emerald-600', note: 'NEET application notification typically released Jan–Feb. Monitor neet.nta.nic.in.', url: 'https://neet.nta.nic.in/', status: 'Notification' },
    ],
  },
  {
    month: 'February 2026',
    exams: [
      { name: 'NEET UG 2026 — Applications', type: 'Medical', color: 'bg-emerald-600', note: 'NEET application window typically Feb–Mar. Verify at neet.nta.nic.in.', url: 'https://neet.nta.nic.in/', status: 'Applications' },
      { name: 'NTSE Stage 2', type: 'Scholarship', color: 'bg-blue-600', note: 'NTSE Stage 2 (national level) typically Feb–May. Verify at ncert.nic.in.', url: 'https://ncert.nic.in/national-talent-examination.php', status: 'Exam' },
      { name: 'JEE Main 2026 — Session 1 Results', type: 'Engineering', color: 'bg-violet-600', note: 'Session 1 results and scores typically released 2–3 weeks after exam.', url: 'https://jeemain.nta.nic.in/', status: 'Results' },
    ],
  },
  {
    month: 'March–April 2026',
    exams: [
      { name: 'CBSE Class 10 Board Exams', type: 'Board', color: 'bg-orange-500', note: 'CBSE Class 10 board exams typically Feb–Mar. Exact datesheet at cbse.gov.in.', url: 'https://www.cbse.gov.in/', status: 'Exam' },
      { name: 'CBSE Class 12 Board Exams', type: 'Board', color: 'bg-red-600', note: 'CBSE Class 12 board exams typically Feb–Apr. Exact datesheet at cbse.gov.in.', url: 'https://www.cbse.gov.in/', status: 'Exam' },
      { name: 'TN State Board — Class 10 (SSLC)', type: 'Board', color: 'bg-amber-500', note: 'TN SSLC typically March–April. Exact dates from tnschools.gov.in.', url: 'https://www.tnschools.gov.in/', status: 'Exam' },
      { name: 'TN State Board — Class 12', type: 'Board', color: 'bg-amber-600', note: 'TN Class 12 typically March–April. Exact dates from tnschools.gov.in.', url: 'https://www.tnschools.gov.in/', status: 'Exam' },
      { name: 'JEE Main 2026 — Session 2', type: 'Engineering', color: 'bg-violet-600', note: 'Session 2 typically April. Verify dates at jeemain.nta.nic.in.', url: 'https://jeemain.nta.nic.in/', status: 'Exam' },
      { name: 'VITEEE 2026', type: 'Engineering', color: 'bg-indigo-600', note: 'VIT Engineering Entrance Exam typically April. Verify at viteee.vit.ac.in.', url: 'https://viteee.vit.ac.in/', status: 'Exam' },
    ],
  },
  {
    month: 'May 2026',
    exams: [
      { name: 'JEE Advanced 2026', type: 'Engineering', color: 'bg-blue-600', note: 'JEE Advanced typically May–June. Only top ~2.5L JEE Main qualifiers eligible. Verify at jeeadv.ac.in.', url: 'https://jeeadv.ac.in/', status: 'Exam' },
      { name: 'NEET UG 2026', type: 'Medical', color: 'bg-emerald-600', note: 'NEET UG typically May. Single exam for all India. Verify at neet.nta.nic.in.', url: 'https://neet.nta.nic.in/', status: 'Exam' },
      { name: 'BITSAT 2026', type: 'Engineering', color: 'bg-orange-500', note: 'BITSAT typically May–June. Verify at bitsadmission.com.', url: 'https://www.bitsadmission.com/', status: 'Exam' },
      { name: 'SRMJEEE 2026', type: 'Engineering', color: 'bg-cyan-600', note: 'SRM Joint Engineering Entrance Exam typically April–May. Verify at srmist.edu.in.', url: 'https://www.srmist.edu.in/', status: 'Exam' },
    ],
  },
  {
    month: 'June–July 2026',
    exams: [
      { name: 'CUET UG 2026', type: 'University', color: 'bg-blue-600', note: 'Common University Entrance Test typically May–June. Verify at cuet.samarth.ac.in.', url: 'https://cuet.samarth.ac.in/', status: 'Exam' },
      { name: 'JEE Main / Advanced Results & JoSAA', type: 'Engineering', color: 'bg-violet-600', note: 'JoSAA counselling for IITs, NITs, IIITs typically June–July. Verify at josaa.admissions.nic.in.', url: 'https://josaa.admissions.nic.in/', status: 'Counselling' },
      { name: 'NEET UG Results & NEET Counselling', type: 'Medical', color: 'bg-emerald-600', note: 'NEET results and MCC counselling for MBBS/BDS typically June–August. Verify at mcc.nic.in.', url: 'https://mcc.nic.in/', status: 'Results/Counselling' },
      { name: 'COMEDK UGET 2026', type: 'Engineering', color: 'bg-blue-600', note: 'Karnataka engineering entrance, typically May–June. Verify at comedk.org.', url: 'https://www.comedk.org/', status: 'Exam' },
    ],
  },
  {
    month: 'August–September 2026',
    exams: [
      { name: 'TN State Board Results', type: 'Board', color: 'bg-amber-500', note: 'TN Class 10 and 12 results typically May–June. Supplementary exams August–September.', url: 'https://www.tnschools.gov.in/', status: 'Results' },
      { name: 'HBCSE Olympiad Stage 2', type: 'Olympiad', color: 'bg-rose-600', note: 'HBCSE national Olympiad stage 2 typically Jan–April. Training camps in summer. Verify at hbcse.tifr.res.in.', url: 'https://olympiads.hbcse.tifr.res.in/', status: 'Training/Selection' },
    ],
  },
  {
    month: 'October–November 2026',
    exams: [
      { name: 'JEE Main 2027 — Early Notification', type: 'Engineering', color: 'bg-violet-600', note: 'NTA typically releases next-year JEE Main notification by October–November.', url: 'https://jeemain.nta.nic.in/', status: 'Notification' },
      { name: 'SOF Olympiads Stage 1 (2026–27)', type: 'Olympiad', color: 'bg-amber-500', note: 'New Olympiad cycle begins. IMO, NSO, IEO conducted in schools Nov–Dec.', url: 'https://www.sofworld.org/', status: 'Registration' },
    ],
  },
];

const typeColors: Record<string, string> = {
  'Engineering':  'bg-violet-100 text-violet-700',
  'Medical':      'bg-emerald-100 text-emerald-700',
  'Board':        'bg-orange-100 text-orange-700',
  'University':   'bg-blue-100 text-blue-700',
  'Olympiad':     'bg-amber-100 text-amber-700',
  'Scholarship':  'bg-cyan-100 text-cyan-700',
};

const statusColors: Record<string, string> = {
  'Exam':                'bg-red-100 text-red-700',
  'Applications':        'bg-green-100 text-green-700',
  'Results':             'bg-blue-100 text-blue-700',
  'Results/Counselling': 'bg-blue-100 text-blue-700',
  'Counselling':         'bg-indigo-100 text-indigo-700',
  'Notification':        'bg-yellow-100 text-yellow-700',
  'Registration':        'bg-blue-100 text-blue-600',
  'Training/Selection':  'bg-purple-100 text-purple-700',
};

export default function ExamCalendarPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-5 shadow-xs">
                <Calendar className="w-4 h-4 text-blue-600" />
                Academic Year 2025–26
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Exam Calendar <span className="text-blue-600">2025–26</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Indicative exam dates for JEE Main, JEE Advanced, NEET UG, CUET, BITSAT,
                CBSE boards, Tamil Nadu State Board, NTSE, and Olympiads.
                All dates must be verified from official sources before acting on them.
              </p>
            </div>
          </div>
        </section>

        {/* Critical disclaimer */}
        <section className="bg-red-50 border-b border-red-200">
          <div className="container-wide py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-800 font-semibold mb-1">
                  Important: Dates are indicative only — always verify from official sources
                </p>
                <p className="text-xs text-red-700">
                  Dates shown are based on historical patterns and may change each year.
                  NTA, CBSE, and Tamil Nadu School Education may shift dates without prior notice.
                  Always check{' '}
                  <a href="https://www.nta.ac.in/" target="_blank" rel="noopener noreferrer" className="underline">nta.ac.in</a>,{' '}
                  <a href="https://www.cbse.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">cbse.gov.in</a>, and{' '}
                  <a href="https://www.tnschools.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">tnschools.gov.in</a>{' '}
                  for confirmed dates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legend */}
        <section className="bg-white border-b border-gray-100">
          <div className="container-wide py-4">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <span className="font-semibold text-gray-600">Type:</span>
              {Object.entries(typeColors).map(([type, cls]) => (
                <span key={type} className={`px-2.5 py-1 rounded-full font-medium ${cls}`}>{type}</span>
              ))}
              <span className="font-semibold text-gray-600 ml-4">Status:</span>
              {Object.entries(statusColors).slice(0, 4).map(([s, cls]) => (
                <span key={s} className={`px-2.5 py-1 rounded-full font-medium ${cls}`}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <div className="space-y-8">
              {examsByMonth.map((month) => (
                <div key={month.month}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="font-display font-bold text-gray-900 text-lg">{month.month}</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {month.exams.map((exam) => (
                      <div key={exam.name} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-400 hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div className="flex flex-col gap-1.5">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${typeColors[exam.type] ?? 'bg-gray-100 text-gray-600'}`}>
                              {exam.type}
                            </span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full w-fit ${statusColors[exam.status] ?? 'bg-gray-100 text-gray-600'}`}>
                              {exam.status}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-display font-bold text-gray-900 text-sm mb-2 leading-snug">{exam.name}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{exam.note}</p>

                        <a
                          href={exam.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline"
                        >
                          Official Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-display font-bold text-gray-900 mb-4">Official Exam Portals</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'NTA (JEE/NEET)',      url: 'https://www.nta.ac.in/' },
                  { label: 'JEE Main',             url: 'https://jeemain.nta.nic.in/' },
                  { label: 'JEE Advanced',         url: 'https://jeeadv.ac.in/' },
                  { label: 'NEET UG',              url: 'https://neet.nta.nic.in/' },
                  { label: 'CBSE',                 url: 'https://www.cbse.gov.in/' },
                  { label: 'TN School Education',  url: 'https://www.tnschools.gov.in/' },
                  { label: 'JoSAA Counselling',    url: 'https://josaa.admissions.nic.in/' },
                  { label: 'MCC MBBS Counselling', url: 'https://mcc.nic.in/' },
                ].map((r) => (
                  <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-blue-600 font-medium p-3 bg-gray-50 rounded-xl hover:bg-blue-50/50 transition-colors group">
                    {r.label}
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-wide text-center">
            <h2 className="section-title mb-4">Start Your Exam Preparation</h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Use our platform to practise with full-length mock tests, DPPs, and syllabus checklists for every exam.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/entrance-exams" className="btn-primary bg-blue-600 hover:bg-blue-700">View All Exams</Link>
              <Link href="/previous-year-papers" className="btn-secondary">Previous Year Papers</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
