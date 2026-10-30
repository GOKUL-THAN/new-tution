import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const footerLinks = {
  Programmes: [
    { label: 'School Tuition (6–12)', href: '/school-tuition' },
    { label: 'JEE Preparation',       href: '/jee' },
    { label: 'JEE Main',              href: '/jee-main' },
    { label: 'JEE Advanced',          href: '/jee-advanced' },
    { label: 'NEET Preparation',      href: '/neet' },
    { label: 'Entrance Exams',        href: '/entrance-exams' },
    { label: 'Olympiads',             href: '/olympiads' },
    { label: 'Scholarships',          href: '/scholarships' },
    { label: 'Batches',               href: '/batches' },
    { label: 'All Courses',           href: '/courses' },
  ],
  Curriculum: [
    { label: 'CBSE',                  href: '/boards/cbse' },
    { label: 'ICSE',                  href: '/boards/icse' },
    { label: 'TN State Board',        href: '/boards/tn-state-board' },
    { label: 'Classes 6–12',          href: '/classes' },
    { label: 'Curriculum Overview',   href: '/curriculum' },
    { label: 'Online Learning',       href: '/online-learning' },
    { label: 'Offline Classes',       href: '/offline-classes' },
    { label: 'Study Planner',         href: '/study-planner' },
  ],
  Resources: [
    { label: 'Free Resources',        href: '/free-resources' },
    { label: 'NCERT Solutions',       href: '/ncert-solutions' },
    { label: 'Previous Year Papers',  href: '/previous-year-papers' },
    { label: 'Official Resources',    href: '/official-resources' },
    { label: 'Exam Calendar',         href: '/exam-calendar' },
    { label: 'Practice Hub',          href: '/practice' },
    { label: 'Diagnostic Test',       href: '/diagnostic-test' },
    { label: 'College Guide',         href: '/college-guide' },
    { label: 'Career Paths',          href: '/career-paths' },
  ],
  Company: [
    { label: 'About Us',              href: '/about' },
    { label: 'Contact',               href: '/contact' },
    { label: 'Admissions',            href: '/admissions' },
    { label: 'FAQ',                   href: '/faq' },
  ],
  Legal: [
    { label: 'Privacy Policy',        href: '/privacy' },
    { label: 'Terms of Service',      href: '/terms' },
    { label: 'Refund Policy',         href: '/refund-policy' },
    { label: 'Cookie Policy',         href: '/cookie-policy' },
    { label: 'Content Licensing',     href: '/content-licensing' },
    { label: 'Accessibility',         href: '/accessibility' },
  ],
};

const socials = [
  { Icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/globalmindsacademy' },
  { Icon: Twitter,   label: 'Twitter',   href: 'https://twitter.com/globalmindsacad' },
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/globalmindsacademy' },
  { Icon: Youtube,   label: 'YouTube',   href: 'https://www.youtube.com/@globalmindsacademy' },
  { Icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/company/globalmindsacademy' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/90 text-slate-700">

      {/* ── Main Footer ─────────────────────────────────────────── */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image
                src="/logo.svg"
                alt="Global Minds Academy"
                width={52}
                height={52}
                className="transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-lg text-slate-900 uppercase tracking-wide">
                  GLOBAL MINDS
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600">
                  BUILD SKILLS | OWN THE FUTURE
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 mb-6 max-w-xs leading-relaxed font-normal">
              Comprehensive education platform for Indian students — school tuition,
              competitive exam preparation, and personalised learning.
              Serving students across Tamil Nadu and India.
            </p>

            {/* Contact details (from globalmindsacademy.in) */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3 text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Perumbakkam, Chennai, Tamil Nadu, India</span>
              </div>
              <a
                href="mailto:info@globalmindsacademy.in"
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>info@globalmindsacademy.in</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-slate-900 mb-4 text-sm tracking-wide">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="border-t border-slate-200">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Global Minds Academy · Perumbakkam, Chennai, Tamil Nadu.
            Independent educational platform. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
