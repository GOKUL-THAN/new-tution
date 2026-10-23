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
    exams: [
      { name: 'JEE Main', slug: 'jee-main', authority: 'NTA', icon: Atom, color: 'from-blue-600 to-indigo-600', desc: 'Gateway to NITs, IIITs, and GFTIs' },
      { name: 'JEE Advanced', slug: 'jee-advanced', authority: 'IIT', icon: Target, color: 'from-violet-600 to-purple-600', desc: 'Entrance to IITs' },
      { name: 'BITSAT', slug: 'bitsat', authority: 'BITS Pilani', icon: GraduationCap, color: 'from-orange-500 to-red-500', desc: 'BITS Pilani, Goa, Hyderabad' },
      { name: 'VITEEE', slug: 'viteee', authority: 'VIT', icon: BookOpen, color: 'from-teal-500 to-emerald-500', desc: 'VIT University admissions' },
      { name: 'SRMJEEE', slug: 'srmjeee', authority: 'SRM', icon: BookOpen, color: 'from-cyan-500 to-blue-500', desc: 'SRM University admissions' },
    ],
  },
  {
    category: 'Medical',
    exams: [
      { name: 'NEET UG', slug: 'neet-ug', authority: 'NTA', icon: Stethoscope, color: 'from-emerald-600 to-teal-600', desc: 'All-India medical entrance' },
    ],
  },
  {
    category: 'University & Professional',
    exams: [
      { name: 'CUET UG', slug: 'cuet-ug', authority: 'NTA', icon: GraduationCap, color: 'from-indigo-500 to-violet-500', desc: 'Central university admissions' },
      { name: 'Olympiads', slug: 'olympiads', authority: 'Various', icon: FileText, color: 'from-amber-500 to-orange-500', desc: 'Academic competitions' },
    ],
  },
];

export default function EntranceExamsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-b from-gray-950 to-gray-900 pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">Entrance Exam Preparation</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Structured preparation for India&apos;s top competitive examinations with mock tests,
              study material, and personalised analytics.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            {examCategories.map((cat) => (
              <div key={cat.category} className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">{cat.category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.exams.map((exam) => (
                    <Link key={exam.slug} href={`/entrance-exams/${exam.slug}`} className="card-hover group p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <exam.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">{exam.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">Conducted by: {exam.authority}</p>
                      <p className="text-sm text-gray-600 mb-4">{exam.desc}</p>
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
