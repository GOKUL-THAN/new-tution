import {
  Video, FileText, ClipboardCheck, BarChart3,
  Users, MessageCircle, Clock, Shield,
  BookOpen, Lightbulb, Zap, Globe,
} from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'Live & Recorded Classes',
    desc: 'Interactive live sessions with expert teachers, plus recorded lessons for self-paced revision.',
    color: 'bg-blue-500',
  },
  {
    icon: ClipboardCheck,
    title: 'Timed Mock Tests',
    desc: 'Full-length and sectional mock exams with instant scoring, detailed analytics, and explanations.',
    color: 'bg-violet-500',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    desc: 'Track progress, identify weak topics, and get personalised revision recommendations.',
    color: 'bg-emerald-500',
  },
  {
    icon: FileText,
    title: 'Comprehensive Study Material',
    desc: 'Notes, worksheets, formula sheets, and practice sets aligned to your board and syllabus.',
    color: 'bg-amber-500',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Resolution',
    desc: 'Ask questions and get responses from qualified teachers with image and file support.',
    color: 'bg-rose-500',
  },
  {
    icon: Users,
    title: 'Parent Dashboard',
    desc: 'Parents can track attendance, progress, assignments, test results, and teacher feedback.',
    color: 'bg-cyan-500',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    desc: 'Daily and weekly study plans with chapter prioritisation and revision scheduling.',
    color: 'bg-indigo-500',
  },
  {
    icon: Lightbulb,
    title: 'Adaptive Practice',
    desc: 'Practice questions that adapt to your level — building confidence step by step.',
    color: 'bg-orange-500',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    desc: 'Privacy-first platform designed for student safety with role-based access controls.',
    color: 'bg-teal-500',
  },
  {
    icon: BookOpen,
    title: 'Multi-Board Support',
    desc: 'CBSE, ICSE, ISC, TN State Board, and Matriculation — all in one platform.',
    color: 'bg-pink-500',
  },
  {
    icon: Globe,
    title: 'Bilingual Support',
    desc: 'Content available in English and Tamil, with more languages configurable.',
    color: 'bg-purple-500',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'Automated scoring for MCQ tests with detailed question-wise performance breakdown.',
    color: 'bg-yellow-500',
  },
];

export default function FeaturesSection() {
  return (
    <section className="section-padding" id="features">
      <div className="container-wide">
        <div className="text-center mb-14">
          <h2 className="section-title mb-4">
            Everything You Need to <span className="gradient-text">Excel</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A complete learning ecosystem with tools for students, parents, and teachers
            — designed for real academic progress.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="card-hover p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
