import { BookOpen, Users, ClipboardCheck, GraduationCap } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    label: 'Boards Supported',
    value: '5+',
    desc: 'CBSE, ICSE, ISC, TN State Board, Matriculation',
  },
  {
    icon: GraduationCap,
    label: 'Classes Covered',
    value: '1–12',
    desc: 'Primary through Senior Secondary',
  },
  {
    icon: ClipboardCheck,
    label: 'Entrance Exams',
    value: '10+',
    desc: 'JEE, NEET, BITSAT, CUET & more',
  },
  {
    icon: Users,
    label: 'Subject Areas',
    value: '20+',
    desc: 'From Mathematics to Computer Science',
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-brand-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-gray-700 mb-1 text-sm">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.desc}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">
          These figures represent platform capabilities, not student enrolment counts.
        </p>
      </div>
    </section>
  );
}
