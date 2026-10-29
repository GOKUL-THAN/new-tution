import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund and cancellation policy for Global Minds Academy — understand your rights and our procedures.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          <div className="card p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h1 className="text-3xl font-display font-black text-slate-900 mb-2">Refund Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-600">
            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">1. Overview</h2>
              <p>
                At Global Minds Academy, we want every student to have a positive learning experience. This Refund
                Policy describes the conditions under which refunds may be requested and processed for course
                enrolments and fee payments made on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">2. Free Courses and Free Resources</h2>
              <p>
                No payment is required for free courses or free resources. No refund is applicable.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">3. Paid Course Enrolments</h2>
              <p>
                Refund eligibility for paid course enrolments is as follows:
              </p>
              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>
                  <strong>Within 7 days of enrolment, with no more than 2 lessons accessed:</strong> Full refund,
                  less any payment gateway charges.
                </li>
                <li>
                  <strong>Within 14 days of enrolment:</strong> 50% refund, provided the student has accessed fewer
                  than 25% of the course content.
                </li>
                <li>
                  <strong>After 14 days or more than 25% content accessed:</strong> No refund is provided.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">4. Offline Classes and Batches</h2>
              <p>
                For offline batch programmes, the following applies:
              </p>
              <ul className="list-disc ml-5 mt-3 space-y-2">
                <li>Cancellation before the batch start date: Full refund of fees paid, less a ₹500 administrative charge.</li>
                <li>Cancellation within the first week of the batch: 75% refund.</li>
                <li>Cancellation after the first week: No refund. The student may request a transfer to a future batch,
                  subject to availability.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">5. How to Request a Refund</h2>
              <p>
                To request a refund, contact us via the enquiry form on our Contact page or email us at
                refunds@globalmindsacademy.in with the following information:
              </p>
              <ul className="list-disc ml-5 mt-3 space-y-1">
                <li>Your registered email address</li>
                <li>Order or enrolment reference number</li>
                <li>Reason for refund</li>
              </ul>
              <p className="mt-3">
                We aim to process valid refund requests within 7–10 business days. Approved refunds will be
                credited to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">6. Scholarships and Discounts</h2>
              <p>
                Refunds for enrolments made under scholarship or discount schemes are calculated on the actual
                amount paid, not the original course price.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">7. Technical Issues</h2>
              <p>
                If you experience a technical issue that prevents you from accessing paid content, contact our
                support team immediately. We will investigate and, if the issue is on our end, either resolve it or
                process a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">8. Changes to This Policy</h2>
              <p>
                Global Minds Academy reserves the right to modify this Refund Policy at any time. Changes will be
                communicated via the platform and take effect from the date of publication.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mt-8 mb-3">9. Contact</h2>
              <p>
                For refund-related questions, contact us at refunds@globalmindsacademy.in or through the Contact
                page on our website.
              </p>
            </section>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl text-amber-800 text-xs">
              <strong>Note:</strong> This refund policy is a template and must be reviewed by qualified legal
              counsel before publication. Specific amounts and timelines should be adjusted to reflect actual
              academy operations.
            </div>
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
