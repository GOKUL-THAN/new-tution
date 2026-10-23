import Link from 'next/link';
import {
  GraduationCap, Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Youtube, Linkedin,
} from 'lucide-react';

const footerLinks = {
  'Programmes': [
    { label: 'School Tuition', href: '/school-tuition' },
    { label: 'JEE Preparation', href: '/jee' },
    { label: 'NEET Preparation', href: '/neet' },
    { label: 'Entrance Exams', href: '/entrance-exams' },
    { label: 'Olympiads', href: '/olympiads' },
    { label: 'All Courses', href: '/courses' },
  ],
  'Curriculum': [
    { label: 'CBSE', href: '/boards/cbse' },
    { label: 'ICSE', href: '/boards/icse' },
    { label: 'Tamil Nadu State Board', href: '/boards/tn-state-board' },
    { label: 'Classes 1–12', href: '/classes' },
    { label: 'Free Resources', href: '/free-resources' },
    { label: 'Study Planner', href: '/study-planner' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Our Faculty', href: '/teachers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'FAQ', href: '/faq' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Content Licensing', href: '/content-licensing' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-tight">Global Minds</span>
                <span className="text-[10px] uppercase tracking-widest text-brand-400 font-medium">Academy</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
              Comprehensive education platform for Indian students — school tuition,
              competitive exam preparation, and personalised learning.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Tamil Nadu, India</span>
              </div>
              <a href="mailto:info@globalmindsacademy.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>info@globalmindsacademy.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Contact via enquiry form</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4 text-sm">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
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

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Global Minds Academy. All rights reserved.
            This is an independent educational platform.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <button
                key={i}
                className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-600 hover:text-white transition-all"
                aria-label={`Social media link ${i + 1}`}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
