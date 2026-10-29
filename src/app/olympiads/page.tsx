import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, Trophy, Star, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Olympiad Preparation — IMO, NSO, IEO & HBCSE',
  description:
    'Prepare for national and international Olympiads — IMO, NSO, IEO, HBCSE Olympiads, and more. Build problem-solving skills beyond the classroom.',
};

const olympiads = [
  {
    name: 'IMO',
    fullName: 'International Mathematics Olympiad',
    org: 'SOF',
    desc: 'The most popular school-level Maths Olympiad. Conducted by Science Olympiad Foundation across 60,000+ schools.',
    classes: 'Classes 6–12',
    color: 'from-blue-500 to-indigo-600',
    subjects: ['Mathematics'],
  },
  {
    name: 'NSO',
    fullName: 'National Science Olympiad',
    org: 'SOF',
    desc: 'Encourages scientific thinking and concept application in Physics, Chemistry, and Biology.',
    classes: 'Classes 6–12',
    color: 'from-emerald-500 to-teal-600',
    subjects: ['Science'],
  },
  {
    name: 'IEO',
    fullName: 'International English Olympiad',
    org: 'SOF',
    desc: 'Builds English language proficiency and communication skills at the school level.',
    classes: 'Classes 6–12',
    color: 'from-sky-500 to-blue-600',
    subjects: ['English'],
  },
  {
    name: 'HBCSE Olympiads',
    fullName: 'Homi Bhabha Centre for Science Education',
    org: 'HBCSE / DAE',
    desc: 'India\'s national Olympiad programme covering Mathematics, Physics, Chemistry, Biology, Astronomy, and Junior Science. Qualifying students represent India internationally.',
    classes: 'Classes 9–12',
    color: 'from-violet-500 to-purple-600',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Astronomy', 'Junior Science'],
  },
  {
    name: 'NTSE',
    fullName: 'National Talent Search Examination',
    org: 'NCERT',
    desc: 'Scholarship examination for Class 10 students identifying high academic talent across India.',
    classes: 'Class 10',
    color: 'from-amber-500 to-orange-600',
    subjects: ['Mental Ability', 'Scholastic Aptitude'],
  },
  {
    name: 'KVPY',
    fullName: 'Kishore Vaigyanik Protsahan Yojana',
    org: 'DST / IISc',
    desc: 'Fellowship programme for students interested in research careers in basic sciences.',
    classes: 'Classes 11–12 & First-year UG',
    color: 'from-rose-500 to-pink-600',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  },
];

const features = [
  { icon: Star, title: 'Concept Depth', desc: 'Go beyond textbooks with advanced problem sets and worked examples.' },
  { icon: Trophy, title: 'Mock Olympiad Tests', desc: 'Timed practice tests mirroring the actual Olympiad format.' },
  { icon: BookOpen, title: 'Curated Study Material', desc: 'Topic-wise notes, formula sheets, and previous year questions.' },
  { icon: CheckCircle2, title: 'Weakness Analysis', desc: 'Identify gaps and focus on the topics that need the most attention.' },
];

export default function OlympiadsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.2),transparent_50%)]" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
                <Trophy className="w-4 h-4 text-amber-300" />
                National &amp; International Olympiads
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                Olympiad Preparation
              </h1>
              <p className="text-lg text-blue-100/80 mb-8 max-w-2xl">
                Build deep problem-solving skills that go beyond the school curriculum.
                Prepare for IMO, NSO, IEO, HBCSE, NTSE, KVPY and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl">
                  Start Preparation <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/courses" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10">
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Our Olympiad Offering</h2>
            <p className="section-subtitle text-center mb-12">From Foundation to National Level.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div key={i} className="card-hover p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <f.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Olympiads */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Olympiads We Cover</h2>
            <p className="section-subtitle text-center mb-12">Information sourced from official organising bodies.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {olympiads.map((o) => (
                <div key={o.name} className="card p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${o.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-1">{o.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{o.fullName}</p>
                  <p className="text-xs text-brand-600 font-medium mb-3">{o.org} · {o.classes}</p>
                  <p className="text-sm text-gray-600 mb-4">{o.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {o.subjects.map((s) => (
                      <span key={s} className="badge bg-gray-100 text-gray-600 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 text-sm mb-1">Disclaimer</h3>
                <p className="text-xs text-amber-700 leading-relaxed">
                  Global Minds Academy is an independent education platform and is not affiliated with, endorsed by, or
                  associated with SOF, HBCSE, NCERT, DST, IISc, or any Olympiad organising body. Dates, eligibility,
                  and formats are provided for informational purposes only. Always verify the latest details from the
                  official organiser&apos;s website.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
