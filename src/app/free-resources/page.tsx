import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  FileText, Download, BookOpen, Sigma, FlaskConical, LayoutGrid,
  ExternalLink, ArrowRight, Globe, ClipboardCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Resources — Notes, Worksheets, Formula Sheets, PYQ & Official Links',
  description:
    'Download free study materials — class notes, worksheets, formula sheets, previous year papers, and curated official resource links for CBSE, ICSE, and Tamil Nadu State Board students.',
};

/* ── Resource categories ──────────────────────────────────────────────── */
const categories = [
  { icon: FileText,      label: 'Notes',          color: 'bg-blue-100 text-blue-700',     desc: 'Chapter-wise notes for quick revision.' },
  { icon: LayoutGrid,    label: 'Worksheets',      color: 'bg-emerald-100 text-emerald-700',desc: 'Practice worksheets with graded difficulty.' },
  { icon: Sigma,         label: 'Formula Sheets',  color: 'bg-violet-100 text-violet-700', desc: 'Concise formula cards for Maths, Physics, Chemistry.' },
  { icon: FlaskConical,  label: 'Practice Sets',   color: 'bg-amber-100 text-amber-700',   desc: 'Topic-wise question sets with answers.' },
];

/* ── Formula bank ────────────────────────────────────────────────────── */
const formulaBankSubjects = [
  {
    subject: 'Physics',
    color: 'bg-violet-600',
    chapters: [
      { ch: 'Kinematics', formulas: ['v = u + at', 's = ut + ½at²', 'v² = u² + 2as'] },
      { ch: 'Laws of Motion', formulas: ['F = ma', 'Impulse J = FΔt', 'f = μN'] },
      { ch: 'Work & Energy', formulas: ['W = F·d·cosθ', 'KE = ½mv²', 'PE = mgh'] },
      { ch: 'Thermodynamics', formulas: ['ΔQ = ΔU + W', 'PV = nRT', 'η = 1 – T₂/T₁'] },
      { ch: 'Electrostatics', formulas: ['F = kq₁q₂/r²', 'E = F/q', 'V = kq/r'] },
      { ch: 'Optics', formulas: ['1/f = 1/v – 1/u', 'n = c/v', 'P = 1/f(m)'] },
    ],
  },
  {
    subject: 'Chemistry',
    color: 'bg-orange-500',
    chapters: [
      { ch: 'Mole Concept', formulas: ['n = m/M', 'N = n × Nₐ', 'Molarity = n/V(L)'] },
      { ch: 'Thermodynamics', formulas: ['ΔG = ΔH – TΔS', 'q = mcΔT', 'ΔH = ΔU + ΔnRT'] },
      { ch: 'Electrochemistry', formulas: ['E°cell = E°cathode – E°anode', 'ΔG = –nFE', 'Q = It'] },
      { ch: 'Kinetics', formulas: ['Rate = k[A]ᵐ[B]ⁿ', 't½ = 0.693/k', 'k = Ae^(–Ea/RT)'] },
    ],
  },
  {
    subject: 'Mathematics',
    color: 'bg-blue-600',
    chapters: [
      { ch: 'Quadratic', formulas: ['x = (–b ± √(b²–4ac)) / 2a', 'α+β = –b/a', 'αβ = c/a'] },
      { ch: 'Trigonometry', formulas: ['sin²θ + cos²θ = 1', 'sin(A+B) = sinA·cosB + cosA·sinB', 'tan(A+B) = (tanA+tanB)/(1–tanA·tanB)'] },
      { ch: 'Differentiation', formulas: ['d/dx(xⁿ) = nxⁿ⁻¹', 'd/dx(sinx) = cosx', 'Chain rule: dy/dx = dy/du · du/dx'] },
      { ch: 'Integration', formulas: ['∫xⁿdx = xⁿ⁺¹/(n+1) + C', '∫sinx dx = –cosx + C', '∫eˣdx = eˣ + C'] },
    ],
  },
];

/* ── Official links ──────────────────────────────────────────────────── */
const officialLinks = [
  { label: 'NCERT Textbooks (Free PDF)', url: 'https://ncert.nic.in/textbook.php', source: 'ncert.nic.in', color: 'bg-blue-600' },
  { label: 'NCERT Exemplar Problems', url: 'https://ncert.nic.in/exemplar-problems.php', source: 'ncert.nic.in', color: 'bg-blue-500' },
  { label: 'DIKSHA Digital Textbooks', url: 'https://diksha.gov.in/', source: 'diksha.gov.in', color: 'bg-emerald-600' },
  { label: 'CBSE Sample Papers', url: 'https://cbseacademic.nic.in/SQP.html', source: 'cbseacademic.nic.in', color: 'bg-orange-500' },
  { label: 'TN Board Textbooks', url: 'https://www.tnschools.gov.in/textbooks', source: 'tnschools.gov.in', color: 'bg-[#D4A017]' },
  { label: 'NTA Abhyas (Free Mocks)', url: 'https://abhyas.nta.ac.in/', source: 'abhyas.nta.ac.in', color: 'bg-violet-600' },
  { label: 'JEE Previous Papers', url: 'https://jeemain.nta.nic.in/', source: 'jeemain.nta.nic.in', color: 'bg-indigo-600' },
  { label: 'NEET Previous Papers', url: 'https://neet.nta.nic.in/', source: 'neet.nta.nic.in', color: 'bg-teal-600' },
];

/* ── PYQ section ─────────────────────────────────────────────────────── */
const pyqExams = [
  { name: 'JEE Main PYQs', years: '2017–2025', url: 'https://jeemain.nta.nic.in/', color: 'bg-violet-600' },
  { name: 'JEE Advanced PYQs', years: '2007–2024', url: 'https://jeeadv.ac.in/', color: 'bg-[#1A6B5A]' },
  { name: 'NEET UG PYQs', years: '2013–2024', url: 'https://neet.nta.nic.in/', color: 'bg-emerald-600' },
  { name: 'CBSE Class 10 Papers', years: '2018–2025', url: 'https://cbseacademic.nic.in/SQP.html', color: 'bg-orange-500' },
  { name: 'CBSE Class 12 Papers', years: '2018–2025', url: 'https://cbseacademic.nic.in/SQP.html', color: 'bg-red-600' },
  { name: 'TN Board Papers', years: '2017–2024', url: 'https://www.tnschools.gov.in/', color: 'bg-[#D4A017]' },
];

export default function FreeResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs">
              <Download className="w-4 h-4 text-[#1A6B5A]" />
              100% Free · Open Academic Resources
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
              Free Learning <span className="text-[#1A6B5A]">Resources</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Notes, worksheets, formula sheets, previous year papers, and curated
              official links — all free for CBSE, ICSE, and TN Board students.
            </p>
          </div>
        </section>

        {/* Quick navigation */}
        <section className="bg-white border-b border-gray-100">
          <div className="container-wide py-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'Study Materials', href: '#study-materials', icon: FileText },
                { label: 'Formula Bank', href: '#formula-bank', icon: Sigma },
                { label: 'Previous Year Papers', href: '#pyq', icon: ClipboardCheck },
                { label: 'Official Links', href: '#official-links', icon: Globe },
              ].map((tab) => (
                <a key={tab.label} href={tab.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-[#1A6B5A]/10 hover:border-[#1A6B5A]/40 hover:text-[#1A6B5A] transition-all">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Study Materials */}
        <section className="section-padding bg-gray-50" id="study-materials">
          <div className="container-wide">
            <h2 className="section-title mb-3">Study Materials</h2>
            <p className="text-gray-500 mb-10">Download notes, worksheets, and practice sets for Classes 6–12.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {categories.map((cat) => (
                <div key={cat.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-md hover:border-[#1A6B5A]/30 transition-all">
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-4`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{cat.label}</h3>
                  <p className="text-sm text-gray-500">{cat.desc}</p>
                </div>
              ))}
            </div>

            {/* DB-backed resources placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <BookOpen className="w-12 h-12 text-[#1A6B5A]/30 mx-auto mb-4" />
              <h3 className="font-display font-bold text-gray-900 mb-2">Resources Coming Soon</h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                Our team is preparing high-quality study materials. Register to get notified
                when new resources are added, or browse our courses for full content access.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/register" className="btn-primary !bg-[#1A6B5A] hover:!bg-[#145248] text-sm">Get Notified</Link>
                <Link href="/courses" className="btn-secondary text-sm">Browse Courses</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Formula Bank */}
        <section className="section-padding bg-white" id="formula-bank">
          <div className="container-wide">
            <h2 className="section-title mb-3">Formula Bank</h2>
            <p className="text-gray-500 mb-10">
              Key formulas for Physics, Chemistry, and Mathematics — Class 11–12 and JEE/NEET level.
              Academy-authored content aligned to NCERT.
            </p>

            <div className="space-y-8">
              {formulaBankSubjects.map((sub) => (
                <div key={sub.subject} className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
                  <div className={`${sub.color} px-6 py-4`}>
                    <h3 className="font-display font-bold text-white text-lg">{sub.subject} Formulas</h3>
                  </div>
                  <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sub.chapters.map((ch) => (
                      <div key={ch.ch} className="bg-white rounded-xl border border-gray-100 p-4">
                        <p className="font-semibold text-gray-900 text-sm mb-3">{ch.ch}</p>
                        <ul className="space-y-1.5">
                          {ch.formulas.map((f) => (
                            <li key={f} className="font-mono text-xs text-gray-700 bg-gray-50 rounded-lg px-3 py-1.5 leading-relaxed">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center">
              Formulas are academy-authored and aligned to NCERT. Always verify from your official textbook.
            </p>
          </div>
        </section>

        {/* Previous Year Papers */}
        <section className="section-padding bg-gray-50" id="pyq">
          <div className="container-wide">
            <h2 className="section-title mb-3">Previous Year Papers</h2>
            <p className="text-gray-500 mb-10">
              Access question papers from official sources. All links go directly to official government/NTA portals.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {pyqExams.map((exam) => (
                <a key={exam.name} href={exam.url} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#1A6B5A]/40 hover:shadow-md transition-all group flex items-center justify-between">
                  <div>
                    <div className={`w-2 h-2 rounded-full ${exam.color} mb-2`} />
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#1A6B5A] transition-colors">{exam.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{exam.years}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#1A6B5A] shrink-0 transition-colors" />
                </a>
              ))}
            </div>

            <div className="text-center">
              <Link href="/previous-year-papers" className="btn-primary !bg-[#1A6B5A] hover:!bg-[#145248] inline-flex items-center gap-2">
                Full PYQ Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Official Links */}
        <section className="section-padding bg-white" id="official-links">
          <div className="container-wide">
            <h2 className="section-title mb-3">Official Resource Links</h2>
            <p className="text-gray-500 mb-10">
              Direct links to official government educational portals — NCERT, DIKSHA, CBSE, TN Board, and NTA.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {officialLinks.map((r) => (
                <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:border-[#1A6B5A]/40 hover:shadow-sm transition-all group">
                  <div className={`w-8 h-8 rounded-lg ${r.color} flex items-center justify-center mb-3`}>
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs mb-1 group-hover:text-[#1A6B5A] transition-colors leading-snug">
                    {r.label}
                  </h3>
                  <p className="text-[10px] text-gray-400 truncate">{r.source}</p>
                </a>
              ))}
            </div>

            <div className="text-center">
              <Link href="/official-resources" className="btn-secondary inline-flex items-center gap-2">
                View All Official Resources <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-[#1A6B5A]/10">
          <div className="container-wide text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Want Access to All Premium Resources?
            </h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Enrol in a course to unlock chapter-wise notes, video lessons, DPPs, and unlimited mock tests.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses" className="btn-primary !bg-[#1A6B5A] hover:!bg-[#145248]">Browse Courses</Link>
              <Link href="/practice" className="btn-secondary">Practice Hub</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
