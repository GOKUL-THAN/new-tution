import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import {
  GraduationCap, BookOpen, Users, Target, Award, Heart,
  Lightbulb, Shield, Globe, CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Global Minds Academy — our mission, values, and commitment to quality education for Indian students across CBSE, ICSE, and Tamil Nadu State Board.',
};

const values = [
  { icon: GraduationCap, title: 'Academic Excellence', desc: 'Curriculum-aligned content designed by experienced educators.' },
  { icon: Heart, title: 'Student-Centred', desc: 'Every learner deserves personalised attention and support.' },
  { icon: Shield, title: 'Trust & Safety', desc: 'Privacy-first platform with safe learning environments.' },
  { icon: Globe, title: 'Accessible Education', desc: 'Quality learning resources available to students across India.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Modern tools and analytics to enhance the learning experience.' },
  { icon: Users, title: 'Community', desc: 'Connecting students, parents, and teachers on one platform.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              About Global Minds Academy
            </h1>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
              A comprehensive education platform dedicated to empowering Indian students
              from primary school through competitive exam preparation.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="section-title mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Global Minds Academy brings school tuition, entrance preparation, curriculum resources,
                practice tests, live learning, student analytics, parent communication, and academy
                management into one coherent platform. We serve students from Classes 1–12 across
                CBSE, ICSE, ISC, Tamil Nadu State Board, and Matriculation, along with dedicated
                preparation for JEE, NEET, and other competitive examinations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {values.map((v, i) => (
                <div key={i} className="card-hover p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* What We Offer */}
            <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 mb-16">
              <h2 className="section-title text-2xl mb-8 text-center">What We Offer</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'School tuition for Classes 1–12',
                  'CBSE, ICSE, ISC, TN State Board aligned curriculum',
                  'JEE Main & Advanced preparation',
                  'NEET UG preparation',
                  'Mock tests and question banks',
                  'Study planners and revision tools',
                  'Doubt resolution support',
                  'Parent progress reports',
                  'Assignment and homework management',
                  'Attendance tracking',
                  'Teacher dashboards and tools',
                  'Administrative management',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-6">
                Global Minds Academy is an independent educational platform.
                We are not affiliated with any examination authority or government body.
              </p>
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
