import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Global Minds Academy — rules and conditions for using our education platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          <div className="card p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h1 className="text-3xl font-display font-black text-slate-900 mb-2">Terms of Service</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using Global Minds Academy, you agree to these Terms of Service. If you are a minor, your parent or guardian must agree on your behalf.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">2. Account Registration</h2>
              <p>You must provide accurate information during registration. You are responsible for maintaining the security of your account credentials. Do not share your login with others.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">3. Use of Platform</h2>
              <p>Our platform is for educational purposes. You may not use it for unlawful activities, attempt to gain unauthorised access, distribute copyrighted content, or misrepresent your identity.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">4. Content</h2>
              <p>Course content, study material, and questions are the intellectual property of Global Minds Academy or their respective creators. Unauthorised reproduction is prohibited.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">5. Payments and Refunds</h2>
              <p>Paid courses require payment before access. Refund policies are available on our Refund Policy page. Payment processing is handled by our verified payment provider.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">6. Disclaimer</h2>
              <p>We are not affiliated with any examination authority, government body, or educational board. Exam dates, patterns, and eligibility information are provided for reference and must be verified from official sources. We do not guarantee admission, scores, or results.</p>
            </section>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl text-amber-800 text-xs">
              <strong>Note:</strong> These terms are a template and must be reviewed by qualified legal counsel before publication.
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
