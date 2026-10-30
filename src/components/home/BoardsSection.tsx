import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';
import { getAllEducationBoards } from '@/data/education';

export default function BoardsSection() {
  const boards = getAllEducationBoards();

  return (
    <section className="section-padding bg-slate-50/60" id="boards">
      <div className="container-wide">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
            Four Independent Boards · Classes 6 to 12
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">
            Learn with Your <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 bg-clip-text text-transparent">Board&apos;s Curriculum</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Strictly segregated courses, syllabus, and study materials for CBSE, ICSE, Tamil Nadu State Board, and Tamil Nadu Matriculation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boards.map((board) => (
            <div
              key={board.slug}
              className="card p-6 rounded-3xl border-2 border-slate-200 hover:border-brand-500 transition-all shadow-sm flex flex-col justify-between bg-white group"
            >
              <div>
                {/* Board badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${board.color.gradient} flex items-center justify-center shadow-sm text-white font-display font-black text-xs`}
                  >
                    {board.name.substring(0, 4)}
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                    Classes 6–12
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">
                  {board.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3 font-medium line-clamp-1">{board.fullName}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {board.description}
                </p>

                {/* Class Quick Selection */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Select Class:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {board.classes.map((cls) => (
                      <Link
                        key={cls}
                        href={`/boards/${board.slug}/class-${cls}`}
                        className="w-7 h-7 rounded-lg text-xs font-bold bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors border border-slate-200"
                        title={`${board.name} Class ${cls}`}
                      >
                        {cls}
                      </Link>
                    ))}
                  </div>
                </div>

                <ul className="space-y-1.5 mb-5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  {board.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 line-clamp-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={`/boards/${board.slug}`}
                  className="flex items-center justify-between text-xs font-bold text-brand-600 group-hover:text-brand-700"
                >
                  <span>Explore Board</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
