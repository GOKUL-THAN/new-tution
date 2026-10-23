'use client';

import { Search } from 'lucide-react';

export interface CourseFilterState {
  board: string;
  cls: string;
  subject: string;
  search: string;
}

interface CourseFiltersProps {
  filters: CourseFilterState;
  onChange: (filters: CourseFilterState) => void;
}

const BOARDS = ['', 'CBSE', 'ICSE', 'ISC', 'TN State Board', 'TN Matriculation', 'JEE', 'NEET'];
const CLASSES = ['', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];
const SUBJECTS = [
  '',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Tamil',
  'Social Science',
  'Computer Science',
  'Accountancy',
  'Economics',
];

export default function CourseFilters({ filters, onChange }: CourseFiltersProps) {
  const update = (partial: Partial<CourseFilterState>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Search courses..."
          aria-label="Search courses"
          className="input-field pl-9 py-2 text-sm"
        />
      </div>

      {/* Board filter */}
      <div>
        <label htmlFor="filter-board" className="sr-only">Filter by board</label>
        <select
          id="filter-board"
          value={filters.board}
          onChange={(e) => update({ board: e.target.value })}
          className="input-field py-2 text-sm"
        >
          <option value="">All Boards</option>
          {BOARDS.filter(Boolean).map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Class filter */}
      <div>
        <label htmlFor="filter-class" className="sr-only">Filter by class</label>
        <select
          id="filter-class"
          value={filters.cls}
          onChange={(e) => update({ cls: e.target.value })}
          className="input-field py-2 text-sm"
        >
          <option value="">All Classes</option>
          {CLASSES.filter(Boolean).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Subject filter */}
      <div>
        <label htmlFor="filter-subject" className="sr-only">Filter by subject</label>
        <select
          id="filter-subject"
          value={filters.subject}
          onChange={(e) => update({ subject: e.target.value })}
          className="input-field py-2 text-sm"
        >
          <option value="">All Subjects</option>
          {SUBJECTS.filter(Boolean).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Reset */}
      {(filters.board || filters.cls || filters.subject || filters.search) && (
        <button
          onClick={() => onChange({ board: '', cls: '', subject: '', search: '' })}
          className="text-sm text-brand-600 hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
