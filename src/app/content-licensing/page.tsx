import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Content Licensing — Global Minds Academy',
  description: 'Content licensing policy for Global Minds Academy — how we use, attribute, and manage educational content.',
};

export default function ContentLicensingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container-wide max-w-3xl">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Content Licensing</span>
          </nav>

          <div className="card p-8 sm:p-10 border border-slate-200 shadow-sm">
            <h1 className="text-3xl font-display font-black text-slate-900 mb-2">Content Licensing Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

          <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">1. Original Content</h2>
              <p>Course notes, practice questions, worksheets, formula sheets, explanation texts, and other content created directly by Global Minds Academy and its authorised team are the intellectual property of Global Minds Academy. All rights reserved. This content may not be reproduced, redistributed, or used outside the platform without written permission.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">2. Official Government and Educational Resources</h2>
              <p className="mb-3">We link to official resources published by government bodies and educational authorities. We do not redistribute protected content without permission. Where we reference or link to official documents, we comply with the applicable terms of each source:</p>
              <ul className="space-y-2 ml-4">
                {[
                  { name: 'NCERT Textbooks and Resources', url: 'https://ncert.nic.in/', note: 'Linked to, not redistributed. NCERT permits non-commercial educational use under specified conditions.' },
                  { name: 'DIKSHA Platform Resources', url: 'https://diksha.gov.in/', note: 'Each resource carries its own licence. We use only resources licensed for reuse.' },
                  { name: 'CBSE Official Content', url: 'https://www.cbse.gov.in/', note: 'Linked to official CBSE resources. Not redistributed.' },
                  { name: 'NTA Official Notifications', url: 'https://www.nta.ac.in/', note: 'Exam information is sourced from official NTA notifications and linked to official sources.' },
                ].map((r) => (
                  <li key={r.name} className="border-l-2 border-gray-200 pl-4">
                    <p className="font-medium text-gray-900">{r.name}</p>
                    <p className="text-gray-500">{r.note}</p>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline text-xs">{r.url}</a>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">3. Third-Party Content</h2>
              <p className="mb-3">Where third-party content is used, we ensure:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Content is used only within the terms of its licence</li>
                <li>Attribution is provided as required by the licence</li>
                <li>The source URL, licence type, and access date are recorded in our content database</li>
                <li>We do not use paid or restricted content without appropriate authorisation</li>
                <li>We do not download and re-host copyrighted textbooks or commercial question banks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">4. Examination Questions</h2>
              <p>Previous-year examination questions may be subject to copyright held by the conducting authorities. We include such questions only where reproduction is permitted under applicable law or with appropriate authorisation. Questions in our question bank are clearly marked with their source, licence, and review status.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">5. User-Generated Content</h2>
              <p>Teachers and content editors who create content on the platform represent that they have the right to create and share that content and that it does not infringe third-party rights. Academy administrators are responsible for reviewing and approving content before publication.</p>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">6. Takedown Requests</h2>
              <p className="mb-3">If you believe content on Global Minds Academy infringes your copyright or other intellectual property rights, please contact us with:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>A description of the copyrighted work you claim has been infringed</li>
                <li>The URL or location of the allegedly infringing content on our platform</li>
                <li>Your contact information</li>
                <li>A statement that you have a good-faith belief that the use is not authorised</li>
              </ul>
              <p className="mt-3">We will respond promptly and remove content that is found to infringe rights.</p>
              <Link href="/contact" className="text-brand-600 hover:underline mt-2 inline-block">Submit a content concern</Link>
            </section>

            <section>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-3">7. Attribution</h2>
              <p>Where content licences require attribution, we display attribution alongside the content. Attribution typically includes the author name, source title, source URL, and licence name.</p>
            </section>

          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
