import Link from 'next/link';
import { ArrowRight, Clock, BookOpen, Target, FileText, Beaker, Stethoscope, Atom } from 'lucide-react';

const exams = [
  {
    name: 'JEE Main',
    slug: 'jee-main',
    category: 'Engineering',
    authority: 'National Testing Agency',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    icon: Atom,
    color: 'from-blue-600 to-indigo-600',
    desc: 'Gateway to NITs, IIITs, and other engineering institutions across India.',
  },
  {
    name: 'JEE Advanced',
    slug: 'jee-advanced',
    category: 'Engineering',
    authority: 'IIT (conducting institute)',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    icon: Target,
    color: 'from-violet-600 to-purple-600',
    desc: 'Entrance to the Indian Institutes of Technology (IITs).',
  },
  {
    name: 'NEET UG',
    slug: 'neet-ug',
    category: 'Medical',
    authority: 'National Testing Agency',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    icon: Stethoscope,
    color: 'from-emerald-600 to-teal-600',
    desc: 'All-India entrance for MBBS, BDS, AYUSH, and other medical programmes.',
  },
  {
    name: 'BITSAT',
    slug: 'bitsat',
    category: 'Engineering',
    authority: 'BITS Pilani',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Reasoning'],
    icon: Beaker,
    color: 'from-orange-500 to-red-500',
    desc: 'Admission to BITS Pilani, Goa, and Hyderabad campuses.',
  },
  {
    name: 'CUET UG',
    slug: 'cuet-ug',
    category: 'University',
    authority: 'National Testing Agency',
    subjects: ['Multiple subject domains'],
    icon: BookOpen,
    color: 'from-cyan-500 to-blue-500',
    desc: 'Central university admissions across India.',
  },
  {
    name: 'Olympiads',
    slug: 'olympiads',
    category: 'Scholarship',
    authority: 'Various organisations',
    subjects: ['Mathematics', 'Science', 'Computer Science'],
    icon: FileText,
    color: 'from-amber-500 to-orange-500',
    desc: 'National and international academic competitions for school students.',
  },
];

export default function ExamPrepSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-950 to-gray-900 text-white" id="exam-prep">
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-4">
            <Target className="w-4 h-4 text-amber-400" />
            Competitive Exam Preparation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Ace Your <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">Entrance Exams</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Structured preparation programmes for JEE, NEET, and other competitive
            examinations with expert guidance, mock tests, and analytics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <Link
              key={exam.slug}
              href={`/entrance-exams/${exam.slug}`}
              className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <exam.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60">
                  {exam.category}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-amber-300 transition-colors">
                {exam.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">{exam.authority}</p>
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{exam.desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {exam.subjects.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">{s}</span>
                ))}
              </div>

              <div className="flex items-center text-sm font-semibold text-amber-400 group-hover:text-amber-300">
                Start Preparing
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/entrance-exams"
            className="btn border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3"
          >
            View All Entrance Exams
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
