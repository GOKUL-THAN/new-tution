import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const classGroups = [
  {
    range: 'Primary',
    classes: [1, 2, 3, 4, 5],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    description: 'Building strong foundations',
  },
  {
    range: 'Middle School',
    classes: [6, 7, 8],
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    description: 'Deepening understanding',
  },
  {
    range: 'Secondary',
    classes: [9, 10],
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    description: 'Board exam preparation',
  },
  {
    range: 'Senior Secondary',
    classes: [11, 12],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    description: 'Board + entrance exams',
  },
];

export default function ClassesSection() {
  return (
    <section className="section-padding" id="classes">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">
            Classes <span className="gradient-text">1 to 12</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Expert tuition for every grade — from building foundations in primary school
            to mastering board exams in senior secondary.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classGroups.map((group) => (
            <div key={group.range} className="card-hover p-6">
              <div className={`${group.bgColor} rounded-2xl p-4 mb-5`}>
                <p className={`text-sm font-semibold ${group.textColor} mb-3`}>{group.range}</p>
                <div className="flex flex-wrap gap-2">
                  {group.classes.map((cls) => (
                    <Link
                      key={cls}
                      href={`/classes/class-${cls}`}
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} text-white font-bold text-sm flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all`}
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
