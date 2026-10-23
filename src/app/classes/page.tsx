import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Classes 1–12',
  description:
    'Browse all classes from 1 to 12. Find course content, subjects, and study material for CBSE, ICSE, and Tamil Nadu State Board students.',
};

const classGroups = [
  {
    label: 'Primary',
    range: 'Classes 1–5',
    color: 'from-emerald-400 to-teal-500',
    classes: [1, 2, 3, 4, 5],
    description: 'Build strong foundational skills in language, numeracy, and environmental science.',
  },
  {
    label: 'Middle School',
    range: 'Classes 6–8',
    color: 'from-blue-400 to-indigo-500',
    classes: [6, 7, 8],
    description: 'Expand conceptual understanding across core subjects with structured learning.',
  },
  {
    label: 'Secondary',
    range: 'Classes 9–10',
    color: 'from-violet-500 to-purple-600',
    classes: [9, 10],
    description: 'Focused board exam preparation with thorough chapter-wise coverage.',
  },
  {
    label: 'Senior Secondary',
    range: 'Classes 11–12',
    color: 'from-rose-500 to-orange-500',
    classes: [11, 12],
    description: 'Stream-specific learning alongside competitive entrance exam preparation.',
  },
];

export default function ClassesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              Classes 1–12
            </h1>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto">
              Grade-wise learning across all boards — pick your class to explore subjects and courses.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide space-y-12">
            {classGroups.map((group) => (
              <div key={group.label}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center shadow-lg`}
                  >
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-gray-900">{group.label}</h2>
                    <p className="text-sm text-gray-500">{group.range}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-5 text-sm max-w-2xl">{group.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {group.classes.map((num) => (
                    <Link
                      key={num}
                      href={`/classes/class-${num}`}
                      className="card-hover p-6 text-center group"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mx-auto mb-3 shadow-md`}
                      >
                        <span className="text-white font-bold font-display text-lg">{num}</span>
                      </div>
                      <div className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-sm">
                        Class {num}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
