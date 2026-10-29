import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Global Minds Academy — how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          <div className="card p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h1 className="text-3xl font-display font-black text-slate-900 mb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">1. Introduction</h2>
              <p>Global Minds Academy (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting the privacy of our users, including students, parents, teachers, and administrators. This policy explains how we collect, use, store, and protect personal data.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">2. Data We Collect</h2>
              <p>We collect information you provide during registration (name, email, phone, role), profile information (board, class, school), learning data (course progress, test results, assignments), and usage data (pages visited, features used).</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">3. How We Use Data</h2>
              <p>We use your data to provide educational services, track learning progress, communicate important updates, enable parent-child access, improve our platform, and comply with legal obligations.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">4. Children&apos;s Privacy</h2>
              <p>We take special care with data from users under 18. We collect only necessary information, require parent/guardian consent where legally required, restrict student-to-student communication, and never publicly expose student records.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">5. Data Protection</h2>
              <p>We use role-based access controls, encrypted data transmission, secure password hashing, and session management to protect your information. We follow data protection practices in accordance with applicable Indian law, including the Digital Personal Data Protection Act.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">6. Your Rights</h2>
              <p>You may access, correct, or request deletion of your personal data. Contact us at the email address provided on our Contact page to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">7. Contact</h2>
              <p>For privacy-related questions, contact our team through the enquiry form on our Contact page or email us at info@globalmindsacademy.com.</p>
            </section>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl text-amber-800 text-xs">
              <strong>Note:</strong> This privacy policy is a template and must be reviewed by qualified legal counsel before publication, especially regarding child data protection under Indian law.
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
