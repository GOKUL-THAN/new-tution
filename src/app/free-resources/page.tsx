import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FileText, Download, BookOpen, Sigma, FlaskConical, LayoutGrid } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'Free Resources — Notes, Worksheets & Formula Sheets',
  description:
    'Download free study materials — class notes, worksheets, formula sheets, and practice sets for CBSE, ICSE, and Tamil Nadu State Board students.',
};

const categories = [
  {
    icon: FileText,
    label: 'Notes',
    type: 'NOTES',
    color: 'bg-blue-100 text-blue-700',
    desc: 'Chapter-wise notes for quick revision and concept clarity.',
  },
  {
    icon: LayoutGrid,
    label: 'Worksheets',
    type: 'WORKSHEET',
    color: 'bg-emerald-100 text-emerald-700',
    desc: 'Practice worksheets with graded difficulty for each topic.',
  },
  {
    icon: Sigma,
    label: 'Formula Sheets',
    type: 'FORMULA_SHEET',
    color: 'bg-violet-100 text-violet-700',
    desc: 'Concise formula cards for Mathematics, Physics, and Chemistry.',
  },
  {
    icon: FlaskConical,
    label: 'Practice Sets',
    type: 'DOCUMENT',
    color: 'bg-amber-100 text-amber-700',
    desc: 'Topic-wise question sets with answers for self-assessment.',
  },
];

interface Resource {
  id: string;
  title: string;
  type: string;
  description: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  board: { name: string; shortName: string } | null;
  class: { name: string; number: number } | null;
  subject: { name: string; slug: string } | null;
}

async function getResources(): Promise<Resource[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/resources`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function FreeResourcesPage() {
  const resources = await getResources();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              Free Learning Resources
            </h1>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto">
              Download notes, worksheets, formula sheets, and practice sets — completely free for all students.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-10">Resource Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div key={cat.type} className="card-hover p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center mx-auto mb-4`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{cat.label}</h3>
                  <p className="text-sm text-gray-500">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources list */}
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="section-title mb-8">Available Resources</h2>
            {resources.length === 0 ? (
              <EmptyState
                icon={BookOpen}
                title="Resources Coming Soon"
                description="Our team is preparing high-quality study materials. Check back soon or register to get notified."
                actionLabel="Register for Updates"
                actionHref="/register"
              />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {resources.map((resource) => (
                  <div key={resource.id} className="card p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-brand-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{resource.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {resource.board && (
                            <span className="badge bg-gray-100 text-gray-600 text-xs">{resource.board.shortName}</span>
                          )}
                          {resource.class && (
                            <span className="badge bg-gray-100 text-gray-600 text-xs">{resource.class.name}</span>
                          )}
                          {resource.subject && (
                            <span className="badge bg-gray-100 text-gray-600 text-xs">{resource.subject.name}</span>
                          )}
                        </div>
                        {(resource.fileUrl || resource.externalUrl) && (
                          <a
                            href={resource.fileUrl || resource.externalUrl || '#'}
                            target={resource.externalUrl ? '_blank' : undefined}
                            rel={resource.externalUrl ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-1.5 text-sm text-brand-600 font-medium hover:text-brand-700"
                          >
                            <Download className="w-4 h-4" /> Download
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-brand-50">
          <div className="container-wide text-center">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Want Access to All Premium Resources?
            </h2>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Enrol in a course to unlock chapter-wise notes, video lessons, and unlimited practice tests.
            </p>
            <Link href="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
