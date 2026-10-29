import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen, Target, Stethoscope, Atom, FileText, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Entrance Exam Preparation',
  description: 'Prepare for JEE Main, JEE Advanced, NEET UG, BITSAT, CUET, and other competitive examinations with mock tests, study material, and expert guidance.',
};

const examCategories = [
  {
    category: 'Engineering',
    summary: 'Preparation for the most competitive engineering pathways, including IIT admissions, top technical universities, and national-level engineering counselling.',
    exams: [
      {
        name: 'JEE Main',
        slug: 'jee-main',
        authority: 'NTA',
        icon: Atom,
        color: 'from-blue-600 to-indigo-600',
        desc: 'A national-level engineering entrance exam that serves as the gateway to NITs, IIITs, and other CFTIs, while also acting as the qualifier for JEE Advanced.',
      },
      {
        name: 'JEE Advanced',
        slug: 'jee-advanced',
        authority: 'IIT',
        icon: Target,
        color: 'from-violet-600 to-purple-600',
        desc: 'The rigorous IIT entrance exam designed to test advanced problem-solving, analytical thinking, and deep conceptual understanding in Physics, Chemistry, and Mathematics.',
      },
      {
        name: 'BITSAT',
        slug: 'bitsat',
        authority: 'BITS Pilani',
        icon: GraduationCap,
        color: 'from-orange-500 to-red-500',
        desc: 'A fast-paced computer-based exam for admission to BITS Pilani, BITS Goa, and BITS Hyderabad campuses, with a strong emphasis on speed and accuracy.',
      },
      {
        name: 'VITEEE',
        slug: 'viteee',
        authority: 'VIT',
        icon: BookOpen,
        color: 'from-teal-500 to-emerald-500',
        desc: 'The entrance test for VIT campuses, focusing on core science concepts and aptitude with a competitive selection process for engineering aspirants.',
      },
      {
        name: 'SRMJEEE',
        slug: 'srmjeee',
        authority: 'SRM',
        icon: BookOpen,
        color: 'from-cyan-500 to-blue-500',
        desc: 'SRM Institute of Science and Technology admission test for students aiming for top engineering institutions with a strong exam-focused curriculum.',
      },
    ],
  },
  {
    category: 'Medical',
    summary: 'Focused preparation for the medical pathway, covering the NEET UG exam and the subject mastery needed to secure seats in top healthcare programmes.',
    exams: [
      {
        name: 'NEET UG',
        slug: 'neet-ug',
        authority: 'NTA',
        icon: Stethoscope,
        color: 'from-emerald-600 to-teal-600',
        desc: 'The national medical entrance exam for MBBS, BDS, AYUSH courses, and other allied healthcare programmes across India.',
      },
    ],
  },
  {
    category: 'University & Professional',
    summary: 'Preparation for university admissions, aptitude-based competitive tests, and academic excellence pathways beyond the standard school syllabus.',
    exams: [
      {
        name: 'CUET UG',
        slug: 'cuet-ug',
        authority: 'NTA',
        icon: GraduationCap,
        color: 'from-indigo-500 to-violet-500',
        desc: 'The common university entry test used by central universities and participating institutions to streamline undergraduate admissions.',
      },
      {
        name: 'Olympiads',
        slug: 'olympiads',
        authority: 'Various',
        icon: FileText,
        color: 'from-amber-500 to-orange-500',
        desc: 'High-level academic competitions such as IMO and NSO that reward conceptual depth, reasoning, and excellence in mathematics and science.',
      },
    ],
  },
];

export default function EntranceExamsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,107,90,0.08),transparent_60%)] pointer-events-none" />
          <div className="container-wide text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-4 shadow-xs">
              <GraduationCap className="w-4 h-4 text-[#1A6B5A]" />
              National &amp; State Level Entrances
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
              Entrance Exam <span className="text-[#1A6B5A]">Preparation</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              Structured preparation for India&apos;s top competitive examinations with mock tests,
              study material, and personalised analytics.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            {examCategories.map((cat) => (
              <div key={cat.category} className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">{cat.category}</h2>
                <p className="text-sm text-gray-600 mb-6 max-w-2xl">{cat.summary}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.exams.map((exam) => (
                    <Link key={exam.slug} href={`/entrance-exams/${exam.slug}`} className="card-hover group p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <exam.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">{exam.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">Conducted by: {exam.authority}</p>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{exam.desc}</p>
                      <div className="flex items-center text-sm font-semibold text-brand-600">
                        Start Preparing <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="font-display font-bold text-gray-900 mb-2">More Examinations Coming Soon</h3>
              <p className="text-sm text-gray-500 mb-4">
                NATA, CLAT, NIFT, NDA, IISER IAT, NEST, and state-specific entrance exams will be added as the platform grows.
              </p>
              <p className="text-xs text-gray-400">
                All examination information is sourced from official websites. Dates and patterns may change — always verify with the official conducting authority.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
