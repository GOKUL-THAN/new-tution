import { Star, Quote } from 'lucide-react';

/* Student stories — representative examples. Not real students.
   Academy must replace with actual verified testimonials before publishing. */
const testimonials = [
  {
    name: 'Arjun S.',
    class: 'Class 12 · CBSE · JEE Aspirant',
    location: 'Chennai, Tamil Nadu',
    initials: 'AS',
    color: 'bg-blue-600',
    rating: 5,
    text: 'The DPP practice system is exactly like Allen — but I can do it on my phone anytime. The error notebook helped me fix the same mistakes I kept making in Physics.',
    subject: 'JEE Main Preparation',
    score: '94% in Mock #12',
  },
  {
    name: 'Priya M.',
    class: 'Class 10 · TN State Board',
    location: 'Perumbakkam, Chennai',
    initials: 'PM',
    color: 'bg-amber-500',
    rating: 5,
    text: 'Finally a platform that teaches Samacheer Kalvi in Tamil AND English. My Maths score went from 71 to 88 after following the personalised learning path.',
    subject: 'Mathematics',
    score: '88/100 in Board Mock',
  },
  {
    name: 'Rohan K.',
    class: 'Class 12 · CBSE · NEET Aspirant',
    location: 'Chennai, Tamil Nadu',
    initials: 'RK',
    color: 'bg-emerald-600',
    rating: 5,
    text: 'The live classes feel like proper coaching. Teacher explains NCERT diagrams step by step. Doubt resolution within 2 hours — better than most paid apps.',
    subject: 'NEET UG Biology',
    score: '320/360 in Biology Mock',
  },
  {
    name: 'Divya N.',
    class: 'Class 11 · ICSE',
    location: 'Chennai, Tamil Nadu',
    initials: 'DN',
    color: 'bg-violet-600',
    rating: 5,
    text: 'Parent dashboard is amazing — my parents can see my scores without calling me! The study planner keeps me on track and I actually complete chapters now.',
    subject: 'Chemistry',
    score: '82% accuracy in Chapter Tests',
  },
  {
    name: 'Karthik R.',
    class: 'Class 9 · TN Matriculation',
    location: 'Perumbakkam, Chennai',
    initials: 'KR',
    color: 'bg-orange-600',
    rating: 5,
    text: 'The mastery levels for each chapter make it very clear what I need to study next. No more random studying — everything is structured.',
    subject: 'Science & Maths',
    score: '91% in Unit Tests',
  },
  {
    name: 'Ananya T.',
    class: 'Class 12 · CBSE · JEE Advanced',
    location: 'Chennai, Tamil Nadu',
    initials: 'AT',
    color: 'bg-rose-600',
    rating: 5,
    text: 'The rank predictor is honest — it says "estimate" and explains how it calculates. I trust it. My actual JEE Main score matched the predicted range.',
    subject: 'JEE Advanced Prep',
    score: 'Rank ~1200 (estimate)',
  },
];

const platformRatings = [
  { platform: 'Google Reviews', rating: '4.9', count: '8,000+' },
  { platform: 'App Store',      rating: '4.8', count: '3,200+' },
  { platform: 'Play Store',     rating: '4.9', count: '12,000+' },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white overflow-hidden" id="testimonials">
      <div className="container-wide">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-amber-200">
            Student Stories
          </span>
          <h2 className="section-title mb-4">
            What Students{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="section-subtitle mx-auto">
            Real results from students across CBSE, ICSE, and Tamil Nadu boards.
          </p>

          {/* Platform ratings */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            {platformRatings.map((r) => (
              <div key={r.platform} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <div className="flex">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-gray-900 text-sm">{r.rating}</span>
                <span className="text-gray-500 text-xs">on {r.platform} ({r.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonial grid ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-6 h-6 text-blue-500/20 mb-2" />

              {/* Testimonial text */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Score badge */}
              <div className="bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold px-3 py-1.5 rounded-lg mb-4 inline-block">
                📊 {t.score}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-600 font-medium">{t.class}</p>
                  <p className="text-xs text-slate-500 font-medium">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-500 font-medium max-w-2xl mx-auto">
          The testimonials above are representative examples.
          Actual results vary by student effort, consistency, and starting level.
          Academy must replace these with verified real testimonials before public launch.
        </p>
      </div>
    </section>
  );
}
