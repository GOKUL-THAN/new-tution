import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, MapPin, Users, Clock, BookOpen, CheckCircle2, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Offline Classes — In-Person Tuition',
  description:
    'Join Global Minds Academy\'s in-person offline classes in Tamil Nadu. Small batch sizes, experienced teachers, and board-aligned curriculum for Classes 6–12, JEE, and NEET.',
};

const benefits = [
  { icon: Users, title: 'Small Batch Sizes', desc: 'Limited seats per batch ensure focused attention and personal interaction with teachers.' },
  { icon: Clock, title: 'Scheduled Sessions', desc: 'Regular timetabled classes help students maintain consistent learning habits.' },
  { icon: BookOpen, title: 'Structured Teaching', desc: 'Board-aligned lessons with textbook coverage, practice, and revision built in.' },
  { icon: CheckCircle2, title: 'Doubt Clearing', desc: 'Dedicated doubt sessions after each class to address individual questions.' },
  { icon: MapPin, title: 'Convenient Location', desc: 'Classes held at our centre with a safe, distraction-free learning environment.' },
  { icon: Phone, title: 'Parent Updates', desc: 'Regular feedback and attendance reports shared with parents and guardians.' },
];

const formats = [
  {
    label: 'Morning Batch',
    timing: '7:00 AM – 9:00 AM',
    bestFor: 'School students (before school)',
    desc: 'Ideal for students who prefer learning before the school day starts.',
  },
  {
    label: 'Evening Batch',
    timing: '4:30 PM – 7:00 PM',
    bestFor: 'School students (after school)',
    desc: 'Most popular slot — reinforces school lessons the same day.',
  },
  {
    label: 'Weekend Batch',
    timing: 'Saturday & Sunday',
    bestFor: 'All students',
    desc: 'Comprehensive coverage over weekends for students with busy weekday schedules.',
  },
  {
    label: 'JEE / NEET Intensive',
    timing: 'Daily 3–4 hour sessions',
    bestFor: 'Class 11, 12 & Repeaters',
    desc: 'Full-length daily coaching for serious entrance exam aspirants.',
  },
];

export default function OfflineClassesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.3),transparent_60%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <MapPin className="w-4 h-4 text-emerald-300" />
                In-Person · Tamil Nadu
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                Offline Classes
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 max-w-2xl">
                For students who learn best in a classroom. Small batches, expert teachers, structured daily sessions, and a distraction-free environment — all at our centre.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl">
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/admissions" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10">
                  Admission Process
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Why Offline Classes?</h2>
            <p className="section-subtitle text-center mb-12">The classroom experience, enhanced.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="card-hover p-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-gray-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Batch formats */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Batch Formats</h2>
            <p className="section-subtitle text-center mb-12">Choose the schedule that works for you.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {formats.map((f, i) => (
                <div key={i} className="card p-6">
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-1">{f.label}</h3>
                  <p className="text-brand-600 font-semibold text-sm mb-1">{f.timing}</p>
                  <p className="text-xs text-gray-500 mb-3">Best for: {f.bestFor}</p>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-600">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Interested in Joining?
            </h2>
            <p className="text-blue-100/80 mb-8 max-w-lg mx-auto">
              Seats are limited per batch. Contact us to check availability and schedule a free counselling session.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 shadow-xl">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/admissions" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10">
                View Admissions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
