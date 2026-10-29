export type BoardSlug =
  | 'cbse'
  | 'icse'
  | 'isc'
  | 'tn-state-board'
  | 'tn-matriculation';

export type SubjectSlug =
  | 'mathematics'
  | 'science'
  | 'social-science'
  | 'english'
  | 'hindi'
  | 'computer-science'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history-geography'
  | 'history'
  | 'geography'
  | 'environmental-science'
  | 'physical-education'
  | 'japanese'
  | 'german'
  | 'tamil'
  | 'accountancy'
  | 'economics'
  | 'business-studies';

export interface BoardCurriculum {
  slug: BoardSlug;
  name: string;
  shortName: string;
  classes: Record<number, SubjectSlug[]>;
}

export const SUBJECT_LABELS: Record<SubjectSlug, string> = {
  mathematics: 'Mathematics',
  science: 'Science',
  'social-science': 'Social Science',
  english: 'English',
  hindi: 'Hindi',
  'computer-science': 'Computer Science',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  'history-geography': 'History & Geography',
  history: 'History',
  geography: 'Geography',
  'environmental-science': 'Environmental Science',
  'physical-education': 'Physical Education',
  japanese: 'Japanese',
  german: 'German',
  tamil: 'Tamil',
  accountancy: 'Accountancy',
  economics: 'Economics',
  'business-studies': 'Business Studies',
};

export const BOARD_CURRICULA: BoardCurriculum[] = [
  {
    slug: 'cbse',
    name: 'CBSE',
    shortName: 'CBSE',
    classes: {
      6: ['mathematics', 'science', 'social-science', 'english', 'hindi', 'computer-science', 'environmental-science', 'history', 'geography', 'japanese', 'german'],
      7: ['mathematics', 'science', 'social-science', 'english', 'hindi', 'computer-science', 'environmental-science', 'history', 'geography', 'japanese', 'german'],
      8: ['mathematics', 'science', 'social-science', 'english', 'hindi', 'computer-science', 'environmental-science', 'history', 'geography', 'japanese', 'german'],
      9: ['mathematics', 'science', 'social-science', 'english', 'hindi', 'computer-science', 'physical-education', 'history', 'geography', 'japanese', 'german'],
      10: ['mathematics', 'science', 'social-science', 'english', 'hindi', 'computer-science', 'physical-education', 'history', 'geography', 'japanese', 'german'],
      11: ['mathematics', 'physics', 'chemistry', 'biology', 'english', 'computer-science', 'accountancy', 'economics', 'business-studies', 'physical-education', 'history', 'geography', 'japanese', 'german'],
      12: ['mathematics', 'physics', 'chemistry', 'biology', 'english', 'computer-science', 'accountancy', 'economics', 'business-studies', 'physical-education', 'history', 'geography', 'japanese', 'german'],
    },
  },
  {
    slug: 'icse',
    name: 'ICSE',
    shortName: 'ICSE',
    classes: {
      6: ['mathematics', 'science', 'english', 'history-geography', 'japanese', 'german'],
      7: ['mathematics', 'science', 'english', 'history-geography', 'japanese', 'german'],
      8: ['mathematics', 'science', 'english', 'history-geography', 'japanese', 'german'],
      9: ['mathematics', 'physics', 'chemistry', 'biology', 'english', 'history-geography', 'japanese', 'german'],
      10: ['mathematics', 'physics', 'chemistry', 'biology', 'english', 'history-geography', 'japanese', 'german'],
    },
  },
  {
    slug: 'isc',
    name: 'ISC',
    shortName: 'ISC',
    classes: {
      11: ['physics', 'chemistry', 'mathematics', 'biology', 'computer-science', 'accountancy', 'economics', 'business-studies', 'english'],
      12: ['physics', 'chemistry', 'mathematics', 'biology', 'computer-science', 'accountancy', 'economics', 'business-studies', 'english'],
    },
  },
  {
    slug: 'tn-state-board',
    name: 'Tamil Nadu State Board',
    shortName: 'TN State Board',
    classes: {
      6: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science', 'environmental-science', 'history', 'geography'],
      7: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science', 'environmental-science', 'history', 'geography'],
      8: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science', 'environmental-science', 'history', 'geography'],
      9: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science', 'physical-education', 'history', 'geography'],
      10: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science', 'physical-education', 'history', 'geography'],
      11: ['mathematics', 'physics', 'chemistry', 'biology', 'tamil', 'english', 'computer-science', 'accountancy', 'economics', 'business-studies', 'physical-education', 'history', 'geography'],
      12: ['mathematics', 'physics', 'chemistry', 'biology', 'tamil', 'english', 'computer-science', 'accountancy', 'economics', 'business-studies', 'physical-education', 'history', 'geography'],
    },
  },
  {
    slug: 'tn-matriculation',
    name: 'TN Matriculation',
    shortName: 'TN Matriculation',
    classes: {
      6: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science'],
      7: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science'],
      8: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science'],
      9: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science'],
      10: ['mathematics', 'science', 'social-science', 'tamil', 'english', 'computer-science'],
      11: ['mathematics', 'physics', 'chemistry', 'biology', 'tamil', 'english', 'computer-science', 'accountancy', 'economics', 'business-studies'],
      12: ['mathematics', 'physics', 'chemistry', 'biology', 'tamil', 'english', 'computer-science', 'accountancy', 'economics', 'business-studies'],
    },
  },
];

export function getBoardCurriculum(boardSlug?: string): BoardCurriculum | undefined {
  return BOARD_CURRICULA.find((board) => board.slug === boardSlug);
}

export function getBoardClasses(boardSlug: string): number[] {
  const curriculum = getBoardCurriculum(boardSlug);
  return curriculum ? Object.keys(curriculum.classes).map(Number) : [];
}

export function getSubjectsForBoardClass(boardSlug: string, classNumber: number): SubjectSlug[] {
  return getBoardCurriculum(boardSlug)?.classes[classNumber] ?? [];
}

export function getSubjectsForClass(classNumber: number): SubjectSlug[] {
  return Array.from(new Set(BOARD_CURRICULA.flatMap((board) => board.classes[classNumber] ?? [])));
}

export function getBoardSubjects(boardSlug: string): SubjectSlug[] {
  const curriculum = getBoardCurriculum(boardSlug);
  return curriculum ? Array.from(new Set(Object.values(curriculum.classes).flat())) : [];
}

export function getSubjectLabel(subjectSlug: string): string {
  return SUBJECT_LABELS[subjectSlug as SubjectSlug] ?? subjectSlug.replace(/-/g, ' ');
}

export function getCourseSubjectSlug(subjectSlug: string): string {
  return subjectSlug === 'environmental-science' ? 'environmental-studies' : subjectSlug;
}

export function getBoardsOfferingSubject(subjectSlug: string): BoardCurriculum[] {
  return BOARD_CURRICULA.filter((board) =>
    Object.values(board.classes).some((subjects) => subjects.some((subject) => subject === subjectSlug)),
  );
}

export function getClassesForSubject(subjectSlug: string, boardSlug?: string): number[] {
  const curricula = boardSlug
    ? [getBoardCurriculum(boardSlug)].filter((board): board is BoardCurriculum => Boolean(board))
    : BOARD_CURRICULA;

  return Array.from(new Set(
    curricula.flatMap((board) =>
      Object.entries(board.classes)
        .filter(([, subjects]) => subjects.some((subject) => subject === subjectSlug))
        .map(([classNumber]) => Number(classNumber)),
    ),
  )).sort((a, b) => a - b);
}
