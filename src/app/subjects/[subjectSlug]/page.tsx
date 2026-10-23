import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';

interface PageProps {
  params: Promise<{ subjectSlug: string }>;
}

const SUBJECTS: Record<
  string,
  { name: string; icon: string; color: string; desc: string; boards: string[]; classes: string }
> = {
  mathematics: {
    name: 'Mathematics',
    icon: '∑',
    color: 'from-blue-500 to-indigo-600',
    desc: 'From basic arithmetic to advanced calculus — master Mathematics at every level.',
    boards: ['CBSE', 'ICSE', 'ISC', 'Tamil Nadu State Board', 'TN Matriculation'],
    classes: 'Classes 1–12',
  },
  physics: {
    name: 'Physics',
    icon: '⚛',
    color: 'from-violet-500 to-purple-600',
    desc: 'Understand the laws governing the physical world from mechanics to modern physics.',
    boards: ['CBSE', 'ICSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 8–12',
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    color: 'from-emerald-500 to-teal-600',
    desc: 'Explore matter, reactions, and the chemical foundations of science.',
    boards: ['CBSE', 'ICSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 8–12',
  },
  biology: {
    name: 'Biology',
    icon: '🔬',
    color: 'from-green-500 to-emerald-600',
    desc: 'Study life sciences from cell biology to ecosystems and human physiology.',
    boards: ['CBSE', 'ICSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 6–12',
  },
  english: {
    name: 'English',
    icon: 'Aa',
    color: 'from-sky-500 to-blue-600',
    desc: 'Build language proficiency, comprehension, and writing skills.',
    boards: ['CBSE', 'ICSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 1–12',
  },
  tamil: {
    name: 'Tamil',
    icon: 'த',
    color: 'from-orange-500 to-amber-600',
    desc: 'Learn Tamil language, literature, and grammar with structured lessons.',
    boards: ['Tamil Nadu State Board', 'TN Matriculation'],
    classes: 'Classes 1–12',
  },
  'social-science': {
    name: 'Social Science',
    icon: '🌍',
    color: 'from-rose-500 to-pink-600',
    desc: 'Understand history, geography, political science, and economics.',
    boards: ['CBSE', 'Tamil Nadu State Board'],
    classes: 'Classes 6–10',
  },
  'computer-science': {
    name: 'Computer Science',
    icon: '💻',
    color: 'from-indigo-500 to-violet-600',
    desc: 'Learn programming, data structures, and information technology.',
    boards: ['CBSE', 'ICSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 6–12',
  },
  accountancy: {
    name: 'Accountancy',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    desc: 'Master financial accounting, ledgers, and balance sheets.',
    boards: ['CBSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 11–12',
  },
  economics: {
    name: 'Economics',
    icon: '📈',
    color: 'from-teal-500 to-cyan-600',
    desc: 'Explore micro and macroeconomic concepts, theory, and applications.',
    boards: ['CBSE', 'ISC', 'Tamil Nadu State Board'],
    classes: 'Classes 11–12',
  },
  'business-studies': {
    name: 'Business Studies',
    icon: '🏢',
    color: 'from-blue-500 to-cyan-600',
    desc: 'Understand business management, marketing, and commerce.',
    boards: ['CBSE', 'ISC'],
    classes: 'Classes 11–12',
  },
  'environmental-science': {
    name: 'Environmental Science',
    icon: '🌿',
    color: 'from-lime-500 to-green-600',
    desc: 'Learn about ecology, environment, and sustainable development.',
    boards: ['CBSE', 'Tamil Nadu State Board'],
    classes: 'Classes 1–8',
  },
  history: {
    name: 'History',
    icon: '📜',
    color: 'from-yellow-600 to-amber-700',
    desc: 'Study world and Indian history from ancient civilisations to modern times.',
    boards: ['CBSE', 'ICSE', 'Tamil Nadu State Board'],
    classes: 'Classes 6–12',
  },
  geography: {
    name: 'Geography',
    icon: '🗺',
    color: 'from-cyan-500 to-blue-600',
    desc: 'Explore physical and human geography with maps, concepts, and case studies.',
    boards: ['CBSE', 'ICSE', 'Tamil Nadu State Board'],
    classes: 'Classes 6–12',
  },
  'physical-education': {
    name: 'Physical Education',
    icon: '🏃',
    color: 'from-red-500 to-rose-600',
    desc: 'Sports science, health, fitness, and physical wellness education.',
    boards: ['CBSE', 'Tamil Nadu State Board'],
    classes: 'Classes 9–12',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subjectSlug } = await params;
  const subject = SUBJECTS[subjectSlug];

  if (!subject) {
    return { title: 'Subject Not Found' };
  }

  return {
    title: `${subject.name} — ${subject.classes}`,
    description: `${subject.desc} Available for ${subject.boards.join(', ')} at Global Minds Academy.`,
  };
}

export default async function SubjectDetailPage({ params }: PageProps) {
  const { subjectSlug } = await params;
  const subject = SUBJECTS[subjectSlug];

  if (!subject) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen">
          <div className="container-wide">
            <EmptyState
              icon={BookOpen}
              title="Subject Not Found"
              description="The subject you are looking for is not available yet."
              actionLabel="Browse All Subjects"
              actionHref="/subjects"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className={`bg-gradient-to-br ${subject.color} pt-32 pb-20 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href="/subjects" className="inline-flex items-center gap-1 text-white/70 text-sm mb-6 hover:text-white">
                ← All Subjects
              </Link>
              <div className="text-6xl mb-4">{subject.icon}</div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
                {subject.name}
              </h1>
              <p className="text-lg text-white/75 mb-2">{subject.classes}</p>
              <p className="text-lg text-white/70 mb-8 max-w-2xl">{subject.desc}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/courses?subject=${subjectSlug}`}
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 shadow-xl"
                >
                  Browse {subject.name} Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Boards Offering {subject.name}
                </h2>
                <div className="space-y-3">
                  {subject.boards.map((board) => (
                    <Link
                      key={board}
                      href={`/boards/${board.toLowerCase().replace(/\s+/g, '-')}`}
                      className="card-hover p-4 flex items-center justify-between group"
                    >
                      <span className="font-medium text-gray-800 group-hover:text-brand-600">{board}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600" />
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Available For
                </h2>
                <div className="card p-6">
                  <p className="text-gray-700 text-sm mb-4">{subject.classes}</p>
                  <Link
                    href={`/courses?subject=${subjectSlug}`}
                    className="btn-primary w-full text-center"
                  >
                    View {subject.name} Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
