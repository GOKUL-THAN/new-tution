import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

const boards = [
  {
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    slug: 'cbse',
    color: 'from-brand-600 to-brand-800',
    features: ['NCERT-aligned curriculum', 'Board exam preparation', 'All major subjects'],
  },
  {
    name: 'ICSE',
    fullName: 'Indian Certificate of Secondary Education',
    slug: 'icse',
    color: 'from-teal-600 to-teal-800',
    features: ['CISCE curriculum', 'Application-based learning', 'Language & Science focus'],
  },
  {
    name: 'ISC',
    fullName: 'Indian School Certificate',
    slug: 'isc',
    color: 'from-[#1A6B5A] to-emerald-800',
    features: ['Pre-university preparation', 'Stream specialisation', 'Board exam readiness'],
  },
  {
    name: 'TN State Board',
    fullName: 'Tamil Nadu State Board / Samacheer Kalvi',
    slug: 'tn-state-board',
    color: 'from-[#D4A017] to-amber-700',
    features: ['Samacheer Kalvi syllabus', 'Tamil & English medium', 'Public exam preparation'],
  },
  {
    name: 'TN Matriculation',
    fullName: 'Tamil Nadu Matriculation Board',
    slug: 'tn-matriculation',
    color: 'from-orange-600 to-orange-800',
    features: ['Matriculation curriculum', 'Comprehensive coverage', 'Exam-focused learning'],
  },
];

export default function BoardsSection() {
  return (
    <section className="section-padding bg-gray-50/50" id="boards">
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="badge-primary mb-4 inline-flex">
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            Curriculum
          </div>
          <h2 className="section-title mb-4">
            Learn with Your <span className="gradient-text">Board&apos;s Curriculum</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Content aligned to every major Indian education board. Choose your board and
            start learning with curriculum-specific materials for Classes 6–12.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board, i) => (
            <Link
              key={board.slug}
              href={`/boards/${board.slug}`}
              className="card-hover group p-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Board icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${board.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <span className="text-white font-display font-black text-xs tracking-wide">
                  {board.name.length > 4 ? board.name.split(' ')[0].substring(0, 4) : board.name}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">
                {board.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{board.fullName}</p>

              <ul className="space-y-2 mb-5">
                {board.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#1A6B5A] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                Explore Curriculum
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
