import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy — Global Minds Academy',
  description: 'How Global Minds Academy uses cookies and similar technologies.',
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: '1. What are Cookies?',
    content: `Cookies are small text files placed on your device when you visit a website. They allow the website to remember your actions and preferences over time, so you don't have to re-enter information each time you visit.`,
  },
  {
    title: '2. How We Use Cookies',
    content: `Global Minds Academy uses the following types of cookies:

**Strictly Necessary Cookies**
These are essential for the platform to function. They include the session authentication cookie (auth_token) that keeps you logged in while you use the student, teacher, or parent portal. Without these cookies the platform cannot work. No consent is required for strictly necessary cookies.

**Preference Cookies**
These remember your settings such as language preference, notification preferences, and display options. They improve your experience but are not essential.

**Analytics Cookies** (if configured)
If an analytics service is configured by the academy administrator, anonymised usage data may be collected to help us understand how students use the platform and where we can improve it. We do not use advertising cookies or track you across other websites.`,
  },
  {
    title: '3. The Authentication Cookie',
    content: `When you log in, we set a single httpOnly cookie named auth_token. This cookie:
- Is marked HttpOnly — it cannot be read by JavaScript running in the page
- Is marked SameSite=Lax — it is not sent on cross-site requests
- Is marked Secure in production — it is only sent over HTTPS
- Expires after 7 days or when you log out
- Contains a signed JSON Web Token that identifies your session

This cookie is strictly necessary and cannot be declined while you are using the authenticated portal.`,
  },
  {
    title: '4. Third-Party Cookies',
    content: `We do not embed third-party advertising or social-media tracking cookies. If we embed authorised video content from a third-party provider for lesson delivery, that provider may set their own cookies subject to their privacy policy. We identify any such providers in our Content Licensing documentation.`,
  },
  {
    title: '5. Managing Cookies',
    content: `You can control cookies through your browser settings. Most browsers allow you to:
- View the cookies stored for a website
- Delete specific cookies or all cookies
- Block cookies from specific websites
- Block all third-party cookies

Note that deleting or blocking the auth_token cookie will log you out of the platform. Instructions for managing cookies are available in your browser's help section. Disabling strictly necessary cookies will prevent the authenticated portal from working.`,
  },
  {
    title: '6. Changes to This Policy',
    content: `We may update this Cookie Policy when we add new features or services. The date at the bottom of this page shows when it was last updated. Continued use of the platform after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '7. Contact Us',
    content: `For questions about cookies or our privacy practices, contact us through the enquiry form on our Contact page.`,
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-wide max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Cookie Policy</span>
        </nav>

        <div className="card p-8 sm:p-10">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: October 2026</p>

          <p className="text-gray-600 leading-relaxed mb-8">
            This Cookie Policy explains how Global Minds Academy uses cookies and similar tracking technologies when you use our platform. Please read this policy alongside our{' '}
            <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
          </p>

          <div className="space-y-8">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-display font-bold text-gray-900 mb-3">{s.title}</h2>
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                  {s.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
