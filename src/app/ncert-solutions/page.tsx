import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ExternalLink, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NCERT Solutions — Classes 6–12 All Subjects',
  description:
    'Chapter-wise NCERT solutions for Classes 6–12 — Mathematics, Science, Physics, Chemistry, Biology, Social Science, and English. Links to official NCERT resources.',
};

const classes = [
  { num: 6,  subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'] },
  { num: 7,  subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'] },
  { num: 8,  subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'] },
  { num: 9,  subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'] },
  { num: 10, subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'] },
  { num: 11, subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Accountancy', 'Business Studies', 'English'] },
  { num: 12, subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Accountancy', 'Business Studies', 'English'] },
];

const popularSolutions = [
  { class: 10, subject: 'Mathematics', chapters: ['Real Numbers', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Trigonometry', 'Circles', 'Constructions', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'] },
  { class: 10, subject: 'Science', chapters: ['Chemical Reactions', 'Acids Bases Salts', 'Metals and Non-metals', 'Carbon Compounds', 'Life Processes', 'Control and Coordination', 'Reproduction', 'Heredity and Evolution', 'Light', 'Human Eye', 'Electricity', 'Magnetic Effects', 'Our Environment'] },
  { class: 12, subject: 'Physics', chapters: ['Electric Charges and Fields', 'Electrostatic Potential', 'Current Electricity', 'Moving Charges', 'Magnetism', 'Electromagnetic Induction', 'Alternating Current', 'EM Waves', 'Ray Optics', 'Wave Optics', 'Dual Nature', 'Atoms', 'Nuclei', 'Semiconductor Electronics'] },
  { class: 12, subject: 'Chemistry', chapters: ['The Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'p-Block Elements', 'd and f Block Elements', 'Coordination Compounds', 'Haloalkanes', 'Alcohols Phenols', 'Aldehydes Ketones', 'Amines', 'Biomolecules', 'Polymers'] },
  { class: 12, subject: 'Mathematics', chapters: ['Relations and Functions', 'Inverse Trigonometric Functions', 'Matrices', 'Determinants', 'Continuity', 'Applications of Derivatives', 'Integrals', 'Applications of Integrals', 'Differential Equations', 'Vector Algebra', '3D Geometry', 'Linear Programming', 'Probability'] },
  { class: 12, subject: 'Biology', chapters: ['Reproduction in Organisms', 'Sexual Reproduction in Plants', 'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution', 'Human Health and Disease', 'Strategies for Enhancement', 'Microbes in Human Welfare', 'Biotechnology', 'Organisms and Populations', 'Ecosystem', 'Biodiversity'] },
];

const subjectColors: Record<string, string> = {
  'Mathematics':       'bg-blue-100 text-blue-700',
  'Science':           'bg-emerald-100 text-emerald-700',
  'Physics':           'bg-violet-100 text-violet-700',
  'Chemistry':         'bg-orange-100 text-orange-700',
  'Biology':           'bg-green-100 text-green-700',
  'Social Science':    'bg-amber-100 text-amber-700',
  'Economics':         'bg-cyan-100 text-cyan-700',
  'Accountancy':       'bg-indigo-100 text-indigo-700',
  'Business Studies':  'bg-pink-100 text-pink-700',
  'English':           'bg-rose-100 text-rose-700',
  'Hindi':             'bg-yellow-100 text-yellow-700',
};

export default function NCERTSolutionsPage() {
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
              <span className="text-slate-900 font-semibold">NCERT Solutions</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Classes 6–12 · All Subjects · NCERT Aligned
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                NCERT <span className="text-blue-600">Solutions</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Chapter-wise NCERT solutions for Classes 6–12. All solutions reference the official
                NCERT textbooks. For the textbook PDFs, visit{' '}
                <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline">ncert.nic.in</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Attribution disclaimer */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="container-wide py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Attribution:</strong> NCERT textbooks and curriculum are published by the
                National Council of Educational Research and Training (NCERT), Government of India.
                Solutions on this platform are academy-authored explanatory guides aligned to official
                NCERT textbooks. They are not official NCERT publications. Official textbooks are
                available free at{' '}
                <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener noreferrer"
                  className="text-amber-700 underline">ncert.nic.in</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Class navigator */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-4">
              Select Your Class
            </h2>
            <p className="text-gray-500 text-center mb-10">Choose a class to browse chapter-wise NCERT solutions.</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {classes.map((cls) => (
                <div key={cls.num} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-display font-black text-lg shadow-md">
                      {cls.num}
                    </div>
                    <div>
                      <p className="font-display font-bold text-gray-900">Class {cls.num}</p>
                      <p className="text-xs text-gray-500">{cls.subjects.length} subjects</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cls.subjects.map((sub) => (
                      <Link
                        key={sub}
                        href={`/subjects/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${subjectColors[sub] ?? 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-opacity`}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular solutions */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title mb-4">
              Popular NCERT Solutions
            </h2>
            <p className="text-gray-500 mb-10">Most-accessed chapter solutions for board and entrance exam preparation.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularSolutions.map((sol) => (
                <div key={`${sol.class}-${sol.subject}`} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 hover:border-blue-400 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${subjectColors[sol.subject] ?? 'bg-gray-100 text-gray-600'}`}>
                      {sol.subject}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Class {sol.class}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {sol.chapters.slice(0, 6).map((ch) => (
                      <li key={ch} className="flex items-center gap-2 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                        {ch}
                      </li>
                    ))}
                    {sol.chapters.length > 6 && (
                      <li className="text-xs text-blue-600 font-medium pl-3.5">
                        +{sol.chapters.length - 6} more chapters
                      </li>
                    )}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <Link
                      href={`/subjects/${sol.subject.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      View Solutions <ArrowRight className="w-3 h-3" />
                    </Link>
                    <a
                      href="https://ncert.nic.in/textbook.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-gray-600 inline-flex items-center gap-1"
                    >
                      NCERT PDF <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Official resources CTA */}
        <section className="section-padding bg-gradient-to-b from-teal-50/50 via-slate-50 to-white border-t border-teal-100">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: 'NCERT Official Textbooks', sub: 'Free PDF downloads', url: 'https://ncert.nic.in/textbook.php' },
                { label: 'NCERT Exemplar Problems', sub: 'Higher-order practice', url: 'https://ncert.nic.in/exemplar-problems.php' },
                { label: 'DIKSHA Digital Textbooks', sub: 'Interactive e-books', url: 'https://diksha.gov.in/' },
              ].map((r) => (
                <a
                  key={r.label}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-teal-400 hover:shadow-md transition-all group flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">{r.label}</p>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{r.sub}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-teal-600 group-hover:text-teal-700 transition-colors shrink-0" />
                </a>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">
              Official sources — ncert.nic.in · diksha.gov.in
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
