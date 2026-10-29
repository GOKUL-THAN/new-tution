import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone, Mail, GraduationCap, ClipboardList, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions — Enrol at Global Minds Academy',
  description:
    'Find out how to enrol at Global Minds Academy. Step-by-step admission process for Classes 6–12, JEE, NEET, and all board programmes.',
};

const steps = [
  {
    icon: ClipboardList,
    title: 'Submit an Enquiry',
    desc: 'Fill in our online enquiry form or call us. Our counsellor will get in touch within 24 hours.',
  },
  {
    icon: Users,
    title: 'Free Counselling Session',
    desc: 'Discuss your child\'s current level, goals, and the best programme. No obligation.',
  },
  {
    icon: GraduationCap,
    title: 'Choose Your Programme',
    desc: 'Select board, class, subjects, and learning format (online / offline / hybrid).',
  },
  {
    icon: CheckCircle2,
    title: 'Complete Enrolment',
    desc: 'Pay fees, get login credentials, and access learning materials immediately.',
  },
];

const programmes = [
  { name: 'CBSE School Tuition', classes: 'Classes 6–12', format: 'Online & Offline' },
  { name: 'ICSE / ISC Tuition', classes: 'Classes 6–12', format: 'Online & Offline' },
  { name: 'TN State Board / Samacheer', classes: 'Classes 6–12', format: 'Online & Offline' },
  { name: 'TN Matriculation', classes: 'Classes 6–10', format: 'Online & Offline' },
  { name: 'JEE Main & Advanced', classes: 'Classes 11–12 & Repeaters', format: 'Online' },
  { name: 'NEET UG Preparation', classes: 'Classes 11–12 & Repeaters', format: 'Online' },
  { name: 'Olympiad Preparation', classes: 'Classes 6–12', format: 'Online' },
  { name: 'Diagnostic & Foundation', classes: 'Classes 6–10', format: 'Online' },
];

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              Admissions
            </h1>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto">
              Simple, transparent, and student-first. Enrol in the programme that fits your needs.
            </p>
          </div>
        </section>

        {/* Enrolment Steps */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">How to Enrol</h2>
            <p className="section-subtitle text-center mb-12">Our admission process is quick and straightforward.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {steps.map((step, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <div className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">Step {i + 1}</div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programmes */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-3">Programmes Available</h2>
            <p className="section-subtitle text-center mb-12">A programme for every class, board, and goal.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {programmes.map((prog, i) => (
                <div key={i} className="card p-5">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{prog.name}</h3>
                  <div className="flex flex-col gap-1">
                    <span className="badge bg-brand-50 text-brand-700 text-xs w-fit">{prog.classes}</span>
                    <span className="badge bg-gray-100 text-gray-600 text-xs w-fit">{prog.format}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="section-title mb-3">Have Questions?</h2>
              <p className="section-subtitle mb-8">
                Our admissions team is happy to help. Reach out by phone, email, or the contact form.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <a href="tel:+919999999999" className="card p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 mb-0.5">Phone / WhatsApp</div>
                    <div className="font-semibold text-gray-900 text-sm">+91 99999 99999</div>
                  </div>
                </a>
                <a href="mailto:admissions@globalmindsacademy.in" className="card p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500 mb-0.5">Email</div>
                    <div className="font-semibold text-gray-900 text-sm">admissions@globalmindsacademy.in</div>
                  </div>
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-primary">
                  Send an Enquiry <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/register" className="btn-secondary">
                  Register Online
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
