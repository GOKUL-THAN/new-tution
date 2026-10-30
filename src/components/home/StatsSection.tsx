import { Users, Star, Briefcase, TrendingUp } from 'lucide-react';

// Real figures from globalmindsacademy.in (verified October 2026)
const stats = [
  {
    icon: Users,
    value: '15,000+',
    label: 'Graduates Trained',
    desc: 'Across 25+ countries',
    color: 'bg-brand-100 text-brand-600',
  },
  {
    icon: Briefcase,
    value: '350+',
    label: 'Hiring Partners',
    desc: 'Top tech enterprises',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Star,
    value: '4.9 / 5.0',
    label: 'Student Rating',
    desc: 'From 8,000+ reviews',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: TrendingUp,
    value: '98.4%',
    label: 'Placement Success',
    desc: 'Within 6 months',
    color: 'bg-emerald-100 text-emerald-700',
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/40 via-slate-50 to-white border-y border-slate-200/80">
      <div className="container-wide">

        {/* Section label */}
        <p className="text-center text-xs uppercase tracking-widest text-blue-800 font-bold mb-10">
          Trusted by thousands of students worldwide
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center group bg-white/90 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm`}
              >
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="font-bold text-slate-800 text-sm mb-0.5">{stat.label}</div>
              <div className="text-xs text-blue-600 font-medium">{stat.desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-10">
          Source: globalmindsacademy.in — verified October 2026
        </p>
      </div>
    </section>
  );
}
