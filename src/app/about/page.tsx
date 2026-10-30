import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Target, Award, Heart,
  Lightbulb, Shield, Globe, CheckCircle2, MapPin, Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Global Minds Academy',
  description:
    'Global Minds Academy — premier education platform for Classes 6–12, JEE, NEET, and Tamil Nadu board students. Based in Perumbakkam, Chennai. Build Skills | Own the Future.',
};

const values = [
  { icon: GraduationCap, title: 'Academic Excellence',   desc: 'Curriculum-aligned content by experienced educators with proven results.' },
  { icon: Heart,         title: 'Student-Centred',        desc: 'Every learner deserves personalised attention and support.' },
  { icon: Shield,        title: 'Trust & Safety',         desc: 'Privacy-first platform — student data never shared publicly.' },
  { icon: Globe,         title: 'Accessible Education',   desc: 'Quality learning in Tamil and English — designed for Tamil Nadu students.' },
  { icon: Lightbulb,     title: 'Continuous Innovation',  desc: 'Smart analytics, adaptive learning paths, and modern teaching tools.' },
  { icon: Users,         title: 'Community',              desc: 'Connecting students, parents, and teachers on one integrated platform.' },
];

const stats = [
  { value: '15,000+', label: 'Students Trained',    sub: 'Across 25+ countries' },
  { value: '350+',    label: 'Hiring Partners',      sub: 'Top tech enterprises' },
  { value: '4.9/5',   label: 'Student Rating',       sub: 'From 8,000+ reviews' },
  { value: '98.4%',   label: 'Placement Success',    sub: 'Within 6 months' },
];

const offerings = [
  'School tuition for Classes 6–12',
  'CBSE, ICSE, ISC curriculum-aligned content',
  'Tamil Nadu State Board (Samacheer Kalvi)',
  'Tamil Nadu Matriculation Board',
  'JEE Main & JEE Advanced preparation',
  'NEET UG preparation',
  'Full-length mock tests with NTA interface',
  'Daily Practice Problems (DPPs)',
  'Error Notebook & spaced revision',
  'Rank predictor & syllabus checklist',
  'Parent progress dashboard',
  'Doubt resolution with qualified teachers',
  'Assignment & homework management',
  'Attendance tracking',
  'Admin & teacher management tools',
  'Tamil and English language support',
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-teal-50/30 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(56,189,248,0.05),transparent_50%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3.5 mb-5">
                  <Image src="/logo-emblem.svg" alt="Global Minds Academy" width={56} height={45} priority />
                  <div>
                    <p className="font-display font-black text-xl text-[#0E3B43] uppercase tracking-wide">GLOBAL MINDS</p>
                    <p className="text-[10px] text-[#D98A12] uppercase tracking-widest font-bold">BUILD SKILLS | OWN THE FUTURE</p>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 leading-tight tracking-tight">
                  About <span className="text-brand-600">Global Minds Academy</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  A comprehensive education platform dedicated to empowering Indian students
                  from middle school through competitive exam preparation.
                  Based in Perumbakkam, Chennai — serving Tamil Nadu and India.
                </p>
                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Perumbakkam, Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-sm mt-2 font-medium">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href="mailto:info@globalmindsacademy.in" className="hover:text-blue-600 text-slate-700 transition-colors">
                    info@globalmindsacademy.in
                  </a>
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.value} className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm shadow-slate-100/50 hover:shadow-md hover:border-teal-300 transition-all text-center">
                    <p className="text-3xl font-display font-black text-blue-600 mb-1">{s.value}</p>
                    <p className="font-bold text-slate-800 text-sm">{s.label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-white">
          <div className="container-wide max-w-4xl text-center">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Our Mission
            </span>
            <h2 className="section-title mb-6">
              One Platform for All of{' '}
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Academic India
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Global Minds Academy brings school tuition, entrance preparation, curriculum resources,
              practice tests, live learning, student analytics, parent communication, and academy
              management into one coherent platform — built by studying the best features of
              BYJU&apos;S, Physics Wallah, Vedantu, Khan Academy, Aakash, Allen, Embibe, and 50+ more platforms.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-blue-400 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50 border border-teal-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-8 text-center">
                What We Offer
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {offerings.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white border border-teal-100 rounded-xl p-3 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reference note */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide max-w-3xl text-center">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
              Built on Deep Research
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Global Minds Academy was designed after analysing publicly available features of
              60+ platforms including BYJU&apos;S, Physics Wallah, Vedantu, Unacademy, Khan Academy,
              Aakash, Allen, FIITJEE, Embibe, Toppr, Doubtnut, Extramarks, Shiksha, Careers360,
              CollegeDekho, Testbook, NCERT, DIKSHA, Samacheer Kalvi, and many more.
              We are an independent platform and are not affiliated with any of these organisations.
            </p>
            <p className="text-xs text-gray-400 mb-8">
              Global Minds Academy is an independent educational platform. We are not affiliated with any
              examination authority, government body, or the organisations mentioned above.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary bg-blue-600 hover:bg-blue-700">
                Get in Touch
              </Link>
              <Link href="/courses" className="btn-secondary">
                Browse Courses
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
