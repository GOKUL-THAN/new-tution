import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';

interface CourseCardProps {
  title: string;
  slug: string;
  board?: string;
  subject?: string;
  cls?: string;
  lessons?: number;
  duration?: string;
  isFree?: boolean;
  color?: string; // Tailwind gradient classes, e.g. 'from-blue-500 to-indigo-600'
  level?: string;
}

export default function CourseCard({
  title,
  slug,
  board,
  subject,
  cls,
  lessons,
  duration,
  isFree = false,
  color = 'from-brand-600 to-accent-600',
  level,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`} className="card-hover group overflow-hidden block">
      {/* Thumbnail */}
      <div className={`h-44 bg-gradient-to-br ${color} relative p-6 flex flex-col justify-between`}>
        <div className="flex items-center gap-2 flex-wrap">
          {board && (
            <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium">
              {board}
            </span>
          )}
          {isFree && (
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-400 text-white font-medium">
              Free
            </span>
          )}
        </div>
        <div>
          {subject && <p className="text-white/70 text-sm">{subject}</p>}
        </div>
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-4 right-8 w-12 h-12 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-display font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {(lessons !== undefined || duration) && (
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {lessons !== undefined && (
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                {lessons} lessons
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {duration}
              </div>
            )}
          </div>
        )}

        {(cls || level) && (
          <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
            {cls && <span className="badge bg-gray-100 text-gray-600">{cls}</span>}
            {level && <span className="badge bg-gray-100 text-gray-600">{level}</span>}
          </div>
        )}
      </div>
    </Link>
  );
}
