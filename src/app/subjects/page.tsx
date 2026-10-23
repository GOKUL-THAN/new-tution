import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Subjects',
  description:
    'Browse all subjects offered at Global Minds Academy — Mathematics, Physics, Chemistry, Biology, English, Tamil, Social Science, and more.',
};

const subjects = [
  { name: 'Mathematics', slug: 'mathematics', icon: '∑', color: 'from-blue-500 to-indigo-600', desc: 'Algebra, geometry, calculus & more' },
  { name: 'Physics', slug: 'physics', icon: '⚛', color: 'from-violet-500 to-purple-600', desc: 'Mechanics, thermodynamics & optics' },
  { name: 'Chemistry', slug: 'chemistry', icon: '🧪', color: 'from-emerald-500 to-teal-600', desc: 'Organic, inorganic & physical' },
  { name: 'Biology', slug: 'biology', icon: '🔬', color: 'from-green-500 to-emerald-600', desc: 'Botany, zoology & human physiology' },
  { name: 'English', slug: 'english', icon: 'Aa', color: 'from-sky-500 to-blue-600', desc: 'Language, literature & communication' },
  { name: 'Tamil', slug: 'tamil', icon: 'த', color: 'from-orange-500 to-amber-600', desc: 'Language, literature & grammar' },
  { name: 'Social Science', slug: 'social-science', icon: '🌍', color: 'from-rose-500 to-pink-600', desc: 'History, geography & civics' },
  { name: 'Computer Science', slug: 'computer-science', icon: '💻', color: 'from-indigo-500 to-violet-600', desc: 'Programming, algorithms & IT' },
  { name: 'Accountancy', slug: 'accountancy', icon: '📊', color: 'from-amber-500 to-orange-600', desc: 'Financial accounting & analysis' },
  { name: 'Economics', slug: 'economics', icon: '📈', color: 'from-teal-500 to-cyan-600', desc: 'Micro & macroeconomics' },
  { name: 'Business Studies', slug: 'business-studies', icon: '🏢', color: 'from-blue-500 to-cyan-600', desc: 'Business management & commerce' },
  { name: 'Environmental Science', slug: 'environmental-science', icon: '🌿', color: 'from-lime-500 to-green-600', desc: 'Ecology, environment & sustainability' },
  { name: 'History', slug: 'history', icon: '📜', color: 'from-yellow-600 to-amber-700', desc: 'Ancient, medieval & modern history' },
  { name: 'Geography', slug: 'geography', icon: '🗺', color: 'from-cyan-500 to-blue-600', desc: 'Physical & human geography' },
  { name: 'Physical Education', slug: 'physical-education', icon: '🏃', color: 'from-red-500 to-rose-600', desc: 'Sports science & health education' },
];

export default function SubjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-hero-pattern pt-32 pb-20">
          <div className="container-wide text-center">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
              Subjects
            </h1>
            <p className="text-lg text-blue-100/80 max-w-xl mx-auto">
              Deep-dive into any subject with expert-crafted content, practice problems, and live support.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {subjects.map((subject) => (
                <Link
                  key={subject.slug}
                  href={`/subjects/${subject.slug}`}
                  className="card-hover group overflow-hidden"
                >
                  <div className={`h-24 bg-gradient-to-br ${subject.color} flex items-center justify-center relative`}>
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-gray-900 group-hover:text-brand-600 transition-colors text-sm mb-1">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-gray-500">{subject.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
