import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import prisma from '@/lib/db';

export const metadata: Metadata = {
  title: 'Curriculum — Global Minds Academy',
  description: 'Explore our curriculum across CBSE, ICSE, ISC, and Tamil Nadu State Board for Classes 6–12, plus JEE and NEET preparation.',
};

const hierarchy = [
  { level: 'Board', desc: 'CBSE · ICSE · ISC · TN State Board · TN Matriculation' },
  { level: 'Class', desc: 'Classes 1 through 12' },
  { level: 'Subject', desc: 'Mathematics, Physics, Chemistry, Biology, Languages, and more' },
  { level: 'Chapter', desc: 'Topic-by-topic chapter breakdown aligned with the board syllabus' },
  { level: 'Lesson', desc: 'Video, text, and interactive lessons per topic' },
  { level: 'Practice', desc: 'Chapter tests, mock exams, and adaptive practice sets' },
];

export default async function CurriculumPage() {
  let boards: { id: string; name: string; shortName: string; _count: { classes: number; subjects: number } }[] = [];
  let classCount = 0;
  let subjectCount = 0;

  try {
    [boards, classCount, subjectCount] = await Promise.all([
      prisma.board.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: { _count: { select: { classes: true, subjects: true } } },
      }),
      prisma.class.count({ where: { isActive: true } }),
      prisma.subject.count({ where: { isActive: true } }),
    ]);
  } catch { /* DB unavailable — show static content */ }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-600 text-white py-16">
        <div className="container-wide">
          <nav className="flex items-center gap-2 text-sm text-brand-200 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Curriculum</span>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">Our Curriculum</h1>
            <p className="text-xl text-brand-100 leading-relaxed">
              Structured learning across all major Indian school boards and competitive entrance exams. Each subject follows an official syllabus-aligned hierarchy from board to chapter.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      {(boards.length > 0 || classCount > 0 || subjectCount > 0) && (
        <section className="bg-white border-b border-gray-100">
          <div className="container-wide py-8">
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              {[
                { value: boards.length || '5', label: 'Boards' },
                { value: classCount || '12', label: 'Classes' },
                { value: subjectCount || '15+', label: 'Subjects' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-brand-600">{s.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hierarchy */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <h2 className="section-title mb-4">How It Is Organised</h2>
          <p className="text-gray-500 mb-8">Every piece of content is mapped to this hierarchy, making it easy to find exactly what you need.</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {hierarchy.map((h, idx) => (
              <div key={h.level} className="flex items-center gap-3">
                <div className="card p-4 min-w-[140px]">
                  <div className="w-8 h-8 rounded-lg bg-brand-600 text-white text-xs font-bold flex items-center justify-center mb-2">{idx + 1}</div>
                  <p className="font-display font-bold text-gray-900 text-sm">{h.level}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{h.desc}</p>
                </div>
                {idx < hierarchy.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-300 hidden sm:block flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-8">Supported Boards</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(boards.length > 0 ? boards : [
              { id: '1', name: 'CBSE', shortName: 'CBSE', _count: { classes: 12, subjects: 12 } },
              { id: '2', name: 'ICSE', shortName: 'ICSE', _count: { classes: 10, subjects: 10 } },
              { id: '3', name: 'ISC', shortName: 'ISC', _count: { classes: 2, subjects: 8 } },
              { id: '4', name: 'Tamil Nadu State Board', shortName: 'TN State Board', _count: { classes: 12, subjects: 12 } },
              { id: '5', name: 'Tamil Nadu Matriculation', shortName: 'TN Matriculation', _count: { classes: 10, subjects: 10 } },
            ]).map((board) => (
              <Link key={board.id} href={`/boards/${board.shortName.toLowerCase().replace(/\s+/g, '-')}`}
                className="card-hover p-6 group">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900 group-hover:text-brand-700">{board.name}</h3>
                    <p className="text-xs text-gray-500">{board.shortName}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{board._count.classes} classes</span>
                  <span>{board._count.subjects} subjects</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title mb-8">Curriculum Principles</h2>
          <div className="space-y-3">
            {[
              'Curriculum content is aligned to official board syllabuses. We clearly distinguish verified official coverage from academy-supplementary material.',
              'We do not redistribute protected textbooks. Official resources (NCERT, CBSE, DIKSHA) are linked to their official sources.',
              'Syllabus versions are tracked so content stays relevant when boards update their curriculum.',
              'All exam dates and eligibility criteria reference official sources and are kept current by administrators.',
              'Content is labelled with its source, licence, and last-verified date.',
            ].map((p) => (
              <div key={p} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <Link href="/courses" className="btn-primary">Browse Courses</Link>
            <Link href="/boards" className="btn-secondary">All Boards</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
