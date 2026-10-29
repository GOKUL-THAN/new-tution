import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement — Global Minds Academy',
  description: 'Global Minds Academy is committed to making our platform accessible to all students, including those with disabilities.',
};

const implemented = [
  'Semantic HTML5 elements (nav, main, header, footer, section, article)',
  'All interactive elements are keyboard-navigable',
  'Visible focus indicators on all interactive elements',
  'Every form input has an associated label',
  'Error messages are associated with form fields via aria-describedby',
  'Colour contrast meets WCAG 2.2 AA requirements across the design system',
  'Status badges use text labels — information is not conveyed by colour alone',
  'Navigation dropdowns use aria-expanded, aria-haspopup, and aria-label',
  'Test-taking countdown timer uses role="timer" and aria-live="polite"',
  'All data tables have horizontal scroll on small screens — no data is hidden',
  'Modal dialogs include focus trap, aria-modal, and aria-labelledby',
  'All CSS animations are disabled when prefers-reduced-motion is set',
  'Images require alt text — enforced in component props',
  'Progress bars include role="progressbar" and aria-valuenow/min/max',
];

const limitations = [
  { item: 'Third-party video player accessibility', detail: 'Accessibility of embedded video players depends on the provider. We recommend providers with accessible players and caption support.' },
  { item: 'Complex mathematical notation', detail: 'Mathematical formulae in question text are currently presented as plain text or images. MathML or MathJax rendering for improved screen-reader support is planned.' },
  { item: 'PDF resources', detail: 'Downloaded PDFs may not be fully accessible. We are working to provide accessible alternatives for all downloadable materials.' },
  { item: 'Live class interface', detail: 'Accessibility of live class meetings depends on the meeting provider configured by the academy.' },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Accessibility</span>
          </nav>

          <div className="card p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h1 className="text-3xl font-display font-black text-slate-900 mb-2">Accessibility Statement</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Global Minds Academy is committed to making our education platform accessible to all students and users, including those with disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            This statement describes the current accessibility status of our platform, known limitations, and how to contact us if you encounter accessibility barriers.
          </p>

          {/* Conformance status */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 mb-8">
            <h2 className="font-display font-bold text-gray-900 mb-2">Conformance Status</h2>
            <p className="text-sm text-gray-600">
              We <strong>partially conform</strong> to WCAG 2.2 Level AA. Partial conformance means that some parts of the content do not fully conform. We are actively working to address known gaps. Full conformance requires manual testing with assistive technologies, which is planned before production launch.
            </p>
          </div>

          {/* What we've implemented */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Accessibility Features Implemented</h2>
            <ul className="space-y-2">
              {implemented.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Known limitations */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Known Limitations</h2>
            <div className="space-y-3">
              {limitations.map((l) => (
                <div key={l.item} className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{l.item}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{l.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical info */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-3">Technical Specification</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Global Minds Academy relies on the following technologies for conformance with WCAG 2.2: HTML5, CSS, JavaScript (React/Next.js), and WAI-ARIA. The platform is tested primarily with keyboard navigation and automated accessibility linting. Manual testing with NVDA (Windows), VoiceOver (macOS/iOS), and TalkBack (Android) is planned before full production deployment.
            </p>
          </section>

          {/* Feedback */}
          <section className="bg-gray-50 rounded-xl p-5">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-3">Feedback and Contact</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We welcome feedback on the accessibility of Global Minds Academy. If you experience accessibility barriers that prevent you from accessing content or using features, please contact us. We aim to respond within 5 business days.
            </p>
            <Link href="/contact" className="btn-primary btn-sm inline-flex items-center gap-2">
              Contact Us About Accessibility
            </Link>
          </section>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
