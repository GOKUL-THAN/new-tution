import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ExternalLink, BookOpen, Globe, FileText, GraduationCap, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Official Learning Resources — NCERT, DIKSHA, TN Board, CBSE',
  description:
    'Curated links to official government educational resources: NCERT textbooks, DIKSHA platform, Tamil Nadu School Education, CBSE sample papers, and NTA exam portals.',
};

const sections = [
  {
    title: 'NCERT — National Council of Educational Research and Training',
    icon: BookOpen,
    color: 'bg-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    resources: [
      { label: 'NCERT Official Website', url: 'https://ncert.nic.in/', desc: 'Textbooks, syllabuses, and publications for Classes 1–12.' },
      { label: 'NCERT Textbook Downloads', url: 'https://ncert.nic.in/textbook.php', desc: 'Free PDF downloads of all NCERT textbooks in English, Hindi, and Urdu.' },
      { label: 'NCERT Exemplar Problems', url: 'https://ncert.nic.in/exemplar-problems.php', desc: 'Higher-order practice problems for Science and Mathematics, Classes 6–12.' },
      { label: 'NCERT Solutions (Official)', url: 'https://ncert.nic.in/', desc: 'Official resource portal — no direct solution PDFs; solutions available in textbooks.' },
      { label: 'NCERT Lab Manuals', url: 'https://ncert.nic.in/lab-manual.php', desc: 'Official laboratory manuals for Science subjects.' },
    ],
  },
  {
    title: 'DIKSHA — Digital Infrastructure for Knowledge Sharing',
    icon: Globe,
    color: 'bg-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    resources: [
      { label: 'DIKSHA Platform', url: 'https://diksha.gov.in/', desc: 'India\'s national digital education platform with learning resources for all boards.' },
      { label: 'DIKSHA — Tamil Nadu Content', url: 'https://diksha.gov.in/explore?board=Tamil%20Nadu%20Government%20Schools', desc: 'Tamil Nadu school education content on DIKSHA.' },
      { label: 'DIKSHA e-Books', url: 'https://diksha.gov.in/resources/textbooks', desc: 'Interactive digital textbooks for multiple states and boards.' },
    ],
  },
  {
    title: 'CBSE — Central Board of Secondary Education',
    icon: FileText,
    color: 'bg-orange-500',
    bg: 'bg-orange-50 border-orange-200',
    resources: [
      { label: 'CBSE Official Website', url: 'https://www.cbse.gov.in/', desc: 'Circulars, results, and official notifications.' },
      { label: 'CBSE Curriculum & Syllabuses', url: 'https://www.cbse.gov.in/cbsenew/curriculum.html', desc: 'Updated syllabus documents for all classes and subjects.' },
      { label: 'CBSE Sample Question Papers', url: 'https://cbseacademic.nic.in/SQP.html', desc: 'Official sample papers and marking schemes for board examinations.' },
      { label: 'CBSE Previous Year Papers', url: 'https://cbse.digitallocker.gov.in/', desc: 'Board exam question papers from previous years.' },
      { label: 'CBSE Academic Content', url: 'https://cbseacademic.nic.in/', desc: 'Curriculum documents, support materials, and teacher resources.' },
    ],
  },
  {
    title: 'Tamil Nadu School Education',
    icon: BookOpen,
    color: 'bg-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    resources: [
      { label: 'TN School Education Department', url: 'https://www.tnschools.gov.in/', desc: 'Official portal of Tamil Nadu Department of School Education.' },
      { label: 'Samacheer Kalvi Textbooks (Official)', url: 'https://www.tnschools.gov.in/textbooks', desc: 'Official TN State Board textbook downloads for Classes 1–12.' },
      { label: 'TN SCERT', url: 'https://www.tntextbook.com/', desc: 'Tamil Nadu State Council of Educational Research and Training.' },
      { label: 'TN Government — Education Portal', url: 'https://www.tn.gov.in/department/8', desc: 'Tamil Nadu government education department official page.' },
      { label: 'TNPSC Group Exams', url: 'https://www.tnpsc.gov.in/', desc: 'Tamil Nadu Public Service Commission — for students planning government careers.' },
    ],
  },
  {
    title: 'NTA — National Testing Agency (JEE / NEET)',
    icon: GraduationCap,
    color: 'bg-violet-600',
    bg: 'bg-violet-50 border-violet-200',
    resources: [
      { label: 'NTA Official Website', url: 'https://www.nta.ac.in/', desc: 'Official NTA portal — exam dates, notifications, and admit cards.' },
      { label: 'JEE Main Official Portal', url: 'https://jeemain.nta.nic.in/', desc: 'Applications, admit cards, results, and official JEE Main notifications.' },
      { label: 'JEE Advanced Official Portal', url: 'https://jeeadv.ac.in/', desc: 'IIT JEE Advanced — conducted by IITs on rotational basis.' },
      { label: 'NEET UG Official Portal', url: 'https://neet.nta.nic.in/', desc: 'National Eligibility cum Entrance Test for MBBS, BDS, and allied courses.' },
      { label: 'NTA Abhyas (Free Mock Tests)', url: 'https://abhyas.nta.ac.in/', desc: 'Free official NTA mock test platform for JEE Main and NEET practice.' },
      { label: 'JoSAA Counselling', url: 'https://josaa.admissions.nic.in/', desc: 'Joint Seat Allocation Authority for IITs, NITs, IIITs, and CFTIs.' },
    ],
  },
  {
    title: 'IIT Official Websites',
    icon: GraduationCap,
    color: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200',
    resources: [
      { label: 'IIT Madras', url: 'https://www.iitm.ac.in/', desc: 'Indian Institute of Technology Madras — Chennai, Tamil Nadu.' },
      { label: 'IIT Bombay', url: 'https://www.iitb.ac.in/', desc: 'Indian Institute of Technology Bombay.' },
      { label: 'IIT Delhi', url: 'https://home.iitd.ac.in/', desc: 'Indian Institute of Technology Delhi.' },
      { label: 'CSAB — Central Seat Allocation Board', url: 'https://csab.nic.in/', desc: 'Seat allocation for NITs, IIITs, and other CFTIs.' },
      { label: 'Medical Counselling Committee', url: 'https://mcc.nic.in/', desc: 'Official MBBS and BDS counselling for AIQ seats after NEET UG.' },
    ],
  },
  {
    title: 'Olympiad & Scholarship Official Sources',
    icon: GraduationCap,
    color: 'bg-rose-600',
    bg: 'bg-rose-50 border-rose-200',
    resources: [
      { label: 'HBCSE — Homi Bhabha Centre', url: 'https://olympiads.hbcse.tifr.res.in/', desc: 'India\'s national Olympiad programme — Maths, Physics, Chemistry, Biology, Astronomy.' },
      { label: 'Science Olympiad Foundation', url: 'https://www.sofworld.org/', desc: 'IMO, NSO, IEO, and other school-level Olympiads.' },
      { label: 'NTSE — NCERT', url: 'https://ncert.nic.in/national-talent-examination.php', desc: 'National Talent Search Examination for Class 10 students.' },
      { label: 'Inspire Awards — DST', url: 'https://www.inspireawards-dst.gov.in/', desc: 'Government scholarship for innovative school students.' },
    ],
  },
];

export default function OfficialResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-5 shadow-xs">
              <Globe className="w-4 h-4 text-blue-600" />
              Government &amp; Official Portals Directory
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
              Official Learning <span className="text-blue-600">Resources</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Curated links to official government educational portals — NCERT, DIKSHA,
              Tamil Nadu School Education, CBSE, NTA, IITs, and Olympiad organisations.
              All links go directly to official government websites.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="container-wide py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Attribution:</strong> All links on this page point to official government and institutional websites.
                Global Minds Academy does not host, mirror, or redistribute any official content.
                Links are provided for student convenience only. Always verify current dates and information
                from the official source as it may change after our last verification date.
              </p>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title} className={`rounded-3xl border p-6 sm:p-8 ${section.bg}`}>
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl ${section.color} flex items-center justify-center shrink-0`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-display font-bold text-gray-900 text-lg leading-tight">{section.title}</h2>
                  </div>

                  {/* Resource links */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.resources.map((r) => (
                      <a
                        key={r.url}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-2xl p-4 border border-white hover:border-gray-200 hover:shadow-md transition-all group flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors leading-snug flex-1">
                            {r.label}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 shrink-0 mt-0.5 transition-colors" />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
                        <p className="text-[10px] text-gray-300 mt-auto truncate">{r.url}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Attribution note */}
            <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Links last verified: October 2026. Government website URLs may change.
                If you find a broken link, please{' '}
                <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
                Global Minds Academy is an independent platform and is not affiliated with
                NCERT, NTA, CBSE, Tamil Nadu Government, or any institution listed above.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white">
          <div className="container-wide text-center">
            <h2 className="section-title mb-4">
              Want Guided Preparation?
            </h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Browse our courses for structured learning, mock tests, and expert guidance
              aligned to NCERT, CBSE, and TN State Board syllabuses.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses" className="btn-primary bg-blue-600 hover:bg-blue-700">Browse Courses</Link>
              <Link href="/ncert-solutions" className="btn-secondary">NCERT Solutions</Link>
              <Link href="/previous-year-papers" className="btn-secondary">Previous Year Papers</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
