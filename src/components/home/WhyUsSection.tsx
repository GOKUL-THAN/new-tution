import { CheckCircle2, GraduationCap, Heart, Shield, BookOpen, Star } from 'lucide-react';

const reasons = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    desc: 'Qualified and experienced teachers who understand Indian education boards and competitive exams.',
  },
  {
    icon: BookOpen,
    title: 'Curriculum-Aligned Content',
    desc: 'All study material and practice sets are aligned to official board syllabi — CBSE, ICSE, and TN State Board.',
  },
  {
    icon: Star,
    title: 'Personalised Learning',
    desc: 'Smart analytics identify your strengths and areas for improvement, offering targeted recommendations.',
  },
  {
    icon: Shield,
    title: 'Safe Learning Environment',
    desc: 'Privacy-first design with role-based access, safe content moderation, and parental controls.',
  },
  {
    icon: Heart,
    title: 'Student-Centred Approach',
    desc: 'Learning paths designed for understanding, not just memorisation. Every student learns at their own pace.',
  },
  {
    icon: CheckCircle2,
    title: 'Complete Platform',
    desc: 'From school tuition to competitive exam prep, doubt resolution to parent reports — everything in one place.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-brand-950 to-gray-950 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Why <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">Global Minds Academy</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Built by educators, for students — designed to deliver real academic outcomes
            across every board and examination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center mb-5 group-hover:from-amber-400/30 group-hover:to-orange-400/30 transition-all">
                <reason.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
