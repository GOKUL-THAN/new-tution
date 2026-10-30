import { BoardInfo, BoardSlug, ClassCurriculum, SubjectCurriculum, ChapterInfo } from './types';
import { EDUCATION_BOARDS, BOARD_ALIASES, getEducationBoard } from './boards';
import { CBSE_CLASSES_CURRICULUM } from './cbse';
import { ICSE_CLASSES_CURRICULUM } from './icse';
import { TN_STATE_CLASSES_CURRICULUM } from './tn-state';
import { TN_MATRIC_CLASSES_CURRICULUM } from './tn-matric';

export * from './types';
export * from './boards';

// Aggregate all class curricula
export const ALL_CURRICULA: ClassCurriculum[] = [
  ...CBSE_CLASSES_CURRICULUM,
  ...ICSE_CLASSES_CURRICULUM,
  ...TN_STATE_CLASSES_CURRICULUM,
  ...TN_MATRIC_CLASSES_CURRICULUM,
];

export function getAllEducationBoards(): BoardInfo[] {
  return EDUCATION_BOARDS;
}

export function getBoardBySlug(slug: string): BoardInfo | undefined {
  return getEducationBoard(slug);
}

export function normalizeBoardSlug(slug: string): BoardSlug {
  const resolved = BOARD_ALIASES[slug] || slug;
  if (resolved === 'cbse' || resolved === 'icse' || resolved === 'tn-state-board' || resolved === 'tn-matriculation') {
    return resolved as BoardSlug;
  }
  return 'cbse';
}

export function getClassesForBoard(boardSlug: string): number[] {
  const board = getBoardBySlug(boardSlug);
  return board ? board.classes : [6, 7, 8, 9, 10, 11, 12];
}

export function getClassCurriculum(boardSlug: string, classNumber: number): ClassCurriculum | undefined {
  const normSlug = normalizeBoardSlug(boardSlug);
  return ALL_CURRICULA.find((c) => c.boardSlug === normSlug && c.classNumber === classNumber);
}

export function getSubjectsForClass(boardSlug: string, classNumber: number): SubjectCurriculum[] {
  const classCurr = getClassCurriculum(boardSlug, classNumber);
  return classCurr ? classCurr.subjects : [];
}

export function getSubjectCurriculum(
  boardSlug: string,
  classNumber: number,
  subjectSlug: string
): SubjectCurriculum | undefined {
  const subjects = getSubjectsForClass(boardSlug, classNumber);
  return subjects.find((s) => s.slug === subjectSlug);
}

export function getChapter(
  boardSlug: string,
  classNumber: number,
  subjectSlug: string,
  chapterSlug: string
): { subject: SubjectCurriculum; chapter: ChapterInfo } | undefined {
  const subject = getSubjectCurriculum(boardSlug, classNumber, subjectSlug);
  if (!subject) return undefined;
  const chapter = subject.chapters.find((ch) => ch.slug === chapterSlug);
  if (!chapter) return undefined;
  return { subject, chapter };
}

export function parseClassSlug(slug: string): number | null {
  const match = slug.match(/^class-(\d+)$/i);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num < 6 || num > 12) return null;
  return num;
}

