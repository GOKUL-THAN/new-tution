import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import {
  getBoardCurriculum,
  getBoardsOfferingSubject,
  getClassesForSubject,
  getSubjectLabel,
} from '@/lib/curriculum';

interface PageProps {
  params: Promise<{ subjectSlug: string }>;
  searchParams: Promise<{ board?: string; class?: string }>;
}

const SUBJECTS: Record<
  string,
  { name: string; icon: string; color: string; desc: string }
> = {
  mathematics: {
    name: 'Mathematics',
    icon: '∑',
    color: 'from-blue-500 to-indigo-600',
    desc: 'From basic arithmetic to advanced calculus — master Mathematics at every level.',
  },
  physics: {
    name: 'Physics',
    icon: '⚛',
    color: 'from-violet-500 to-purple-600',
    desc: 'Understand the laws governing the physical world from mechanics to modern physics.',
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    color: 'from-emerald-500 to-cyan-600',
    desc: 'Explore matter, reactions, and the chemical foundations of science.',
  },
  biology: {
    name: 'Biology',
    icon: '🔬',
    color: 'from-green-500 to-emerald-600',
    desc: 'Study life sciences from cell biology to ecosystems and human physiology.',
  },
  english: {
    name: 'English',
    icon: 'Aa',
    color: 'from-sky-500 to-blue-600',
    desc: 'Build language proficiency, comprehension, and writing skills.',
  },
  science: {
    name: 'Science',
    icon: '🔭',
    color: 'from-emerald-500 to-lime-600',
    desc: 'Build a strong foundation in Physics, Chemistry, and Biology through scientific concepts, practical applications, and problem-solving.',
  },
  hindi: {
    name: 'Hindi',
    icon: 'हिं',
    color: 'from-red-500 to-orange-600',
    desc: 'Develop Hindi reading, writing, grammar, comprehension, and communication skills through structured lessons and practice.',
  },
  tamil: {
    name: 'Tamil',
    icon: 'த',
    color: 'from-orange-500 to-amber-600',
    desc: 'Learn Tamil language, literature, and grammar with structured lessons.',
  },
  'social-science': {
    name: 'Social Science',
    icon: '🌍',
    color: 'from-rose-500 to-pink-600',
    desc: 'Understand history, geography, political science, and economics.',
  },
  'history-geography': {
    name: 'History & Geography',
    icon: '🌍',
    color: 'from-rose-500 to-pink-600',
    desc: 'Study historical events, places, physical landscapes, and human geography through connected concepts and map-based learning.',
  },
  'computer-science': {
    name: 'Computer Science',
    icon: '💻',
    color: 'from-indigo-500 to-violet-600',
    desc: 'Learn programming, data structures, and information technology.',
  },
  accountancy: {
    name: 'Accountancy',
    icon: '📊',
    color: 'from-amber-500 to-orange-600',
    desc: 'Master financial accounting, ledgers, and balance sheets.',
  },
  economics: {
    name: 'Economics',
    icon: '📈',
    color: 'from-sky-500 to-blue-600',
    desc: 'Explore micro and macroeconomic concepts, theory, and applications.',
  },
  'business-studies': {
    name: 'Business Studies',
    icon: '🏢',
    color: 'from-blue-500 to-cyan-600',
    desc: 'Understand business management, marketing, and commerce.',
  },
  'environmental-science': {
    name: 'Environmental Science',
    icon: '🌿',
    color: 'from-lime-500 to-green-600',
    desc: 'Learn about ecology, environment, and sustainable development.',
  },
  history: {
    name: 'History',
    icon: '📜',
    color: 'from-amber-500 to-orange-500',
    desc: 'Study world and Indian history from ancient civilisations to modern times.',
  },
  geography: {
    name: 'Geography',
    icon: '🗺',
    color: 'from-cyan-500 to-blue-600',
    desc: 'Explore physical and human geography with maps, concepts, and case studies.',
  },
  'physical-education': {
    name: 'Physical Education',
    icon: '🏃',
    color: 'from-red-500 to-rose-600',
    desc: 'Sports science, health, fitness, and physical wellness education.',
  },
  japanese: {
    name: 'Japanese',
    icon: '日',
    color: 'from-pink-500 to-fuchsia-600',
    desc: 'Learn Japanese language — hiragana, katakana, kanji, grammar, and conversational skills.',
  },
  german: {
    name: 'German',
    icon: 'De',
    color: 'from-stone-500 to-zinc-700',
    desc: 'Master German language — grammar, vocabulary, comprehension, and writing skills.',
  },
};

function formatClassList(classes: number[]): string {
  if (classes.length === 0) return 'No classes currently listed';

  const ranges: string[] = [];
  let start = classes[0];
  let previous = classes[0];

  for (const classNumber of classes.slice(1)) {
    if (classNumber === previous + 1) {
      previous = classNumber;
      continue;
    }

    ranges.push(start === previous ? String(start) : `${start}–${previous}`);
    start = classNumber;
    previous = classNumber;
  }

  ranges.push(start === previous ? String(start) : `${start}–${previous}`);
  return `Classes ${ranges.join(', ')}`;
}

function getCourseHref(subjectSlug: string, boardSlug?: string, classNumber?: number): string {
  const query = new URLSearchParams({ subject: subjectSlug });
  if (boardSlug) query.set('board', boardSlug);
  if (classNumber) query.set('class', String(classNumber));
  return `/courses?${query.toString()}`;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { subjectSlug } = await params;
  const { board, class: classQuery } = await searchParams;
  const subject = SUBJECTS[subjectSlug];

  if (!subject) {
    return { title: 'Subject Not Found' };
  }

  const selectedBoard = getBoardCurriculum(board);
  const classNumber = classQuery && /^\d+$/.test(classQuery) ? Number(classQuery) : undefined;
  const classLabel = classNumber ? `Class ${classNumber}` : '';

  return {
    title: `${subject.name}${classLabel ? ` — ${classLabel}` : ''}${selectedBoard ? ` | ${selectedBoard.name}` : ''}`,
    description: `${subject.desc} Available across ${getBoardsOfferingSubject(subjectSlug).map((item) => item.name).join(', ')} at Global Minds Academy.`,
  };
}

export default async function SubjectDetailPage({ params, searchParams }: PageProps) {
  const { subjectSlug } = await params;
  const { board, class: classQuery } = await searchParams;
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

  const selectedBoard = getBoardCurriculum(board);
  const requestedClass = classQuery && /^\d+$/.test(classQuery) ? Number(classQuery) : undefined;
  const subjectBoards = getBoardsOfferingSubject(subjectSlug);
  const availableClasses = getClassesForSubject(subjectSlug, selectedBoard?.slug);
  const selectedClass = requestedClass && availableClasses.includes(requestedClass) ? requestedClass : undefined;
  const classMismatch = Boolean(selectedBoard && requestedClass && !selectedClass);
  const courseHref = getCourseHref(subjectSlug, selectedBoard?.slug, selectedClass);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <Link href="/subjects" className="inline-flex items-center gap-1 text-slate-500 text-sm mb-6 hover:text-slate-900 font-medium transition-colors">
                ← All Subjects
              </Link>
              <div className="text-5xl mb-4">{subject.icon}</div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-2 tracking-tight">
                {subject.name} <span className="text-blue-600">Curriculum</span>
              </h1>
              <p className="text-sm font-semibold text-slate-500 mb-3">
                {selectedBoard
                  ? `${selectedBoard.name} · ${formatClassList(availableClasses)}`
                  : formatClassList(getClassesForSubject(subjectSlug))}
              </p>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">{subject.desc}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={courseHref}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-colors"
                >
                  Browse {subject.name} Courses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-700 px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 shadow-xs transition-colors"
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
                  {subjectBoards.map((curriculum) => {
                    const boardClasses = getClassesForSubject(subjectSlug, curriculum.slug);

                    return (
                      <div key={curriculum.slug} className="card p-4">
                        <div className="flex items-center justify-between gap-3">
                          <Link
                            href={`/boards/${curriculum.slug}`}
                            className="font-medium text-gray-800 hover:text-brand-600"
                          >
                            {curriculum.name}
                          </Link>
                          <span className="text-xs text-gray-500">{formatClassList(boardClasses)}</span>
                        </div>
                        <Link
                          href={`/classes?board=${curriculum.slug}&subject=${subjectSlug}`}
                          className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
                        >
                          Explore classes <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Curriculum Details
                </h2>
                <div className="card p-6">
                  {selectedBoard ? (
                    <>
                      <p className="text-gray-700 text-sm mb-2">
                        {subject.name} in {selectedBoard.name}: {formatClassList(availableClasses)}.
                      </p>
                      {classMismatch ? (
                        <p className="text-sm text-amber-700 mb-4">
                          {subject.name} is not listed for Class {requestedClass} in {selectedBoard.name}.
                        </p>
                      ) : selectedClass ? (
                        <p className="text-sm text-gray-600 mb-4">{getSubjectLabel(subjectSlug)} curriculum selected for Class {selectedClass}.</p>
                      ) : null}
                    </>
                  ) : (
                    <p className="text-gray-700 text-sm mb-4">
                      {subjectBoards.length
                        ? `Available across ${subjectBoards.length} supported boards. Select a board to see its class-level curriculum.`
                        : 'No board curriculum is currently listed for this subject.'}
                    </p>
                  )}
                  <Link
                    href={courseHref}
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
