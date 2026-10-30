import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Primary (Classes 1–5) removed — platform serves Classes 6–12
const classGroups = [
  {
    range: 'Middle School',
    classes: [6, 7, 8],
    color: 'from-brand-500 to-brand-700',
    bgColor: 'bg-brand-50',
    textColor: 'text-brand-700',
    description: 'Deepening understanding & subject foundations',
  },
  {
    range: 'Secondary',
    classes: [9, 10],
    color: 'from-brand-700 to-brand-500',
    bgColor: 'bg-brand-50',
    textColor: 'text-brand-700',
    description: 'Board exam preparation & concept mastery',
  },
  {
    range: 'Senior Secondary',
    classes: [11, 12],
    color: 'from-accent-600 to-accent-400',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-800',
    description: 'Board exams + JEE / NEET / entrance exams',
  },
];

export default function ClassesSection() {
  return (
    <section className="section-padding" id="classes">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">
            Classes <span className="gradient-text">6 to 12</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Expert tuition for every grade — from building strong foundations in
            middle school to mastering board and entrance exams in senior secondary.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {classGroups.map((group) => (
            <div key={group.range} className="card-hover p-6">
              <div className={`${group.bgColor} rounded-2xl p-5 mb-5`}>
                <p className={`text-sm font-bold ${group.textColor} mb-3`}>{group.range}</p>
                <div className="flex flex-wrap gap-2">
                  {group.classes.map((cls) => (
                    <Link
                      key={cls}
                      href={`/classes/class-${cls}`}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} text-white font-bold text-sm flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all`}
                      aria-label={`Class ${cls}`}
                    >
                      {cls}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{group.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/classes" className="btn-secondary">
            View All Classes
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
