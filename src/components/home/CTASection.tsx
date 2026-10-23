import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-wide relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Start Your Learning Journey
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Transform Your Academic Future?
        </h2>

        <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
          Join Global Minds Academy for expert-guided learning across school tuition
          and competitive exam preparation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="btn bg-white text-brand-700 hover:bg-gray-50 shadow-xl px-8 py-4 text-base font-semibold rounded-2xl group"
          >
            <BookOpen className="w-5 h-5" />
            Start Learning Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="btn border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base rounded-2xl"
          >
            <Phone className="w-5 h-5" />
            Enquire Now
          </Link>
        </div>
      </div>
    </section>
  );
}
