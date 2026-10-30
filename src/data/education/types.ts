// TypeScript definitions for the comprehensive Board-Class-Subject Education System

export type BoardSlug = 'cbse' | 'icse' | 'tn-state-board' | 'tn-matriculation' | 'isc';

export interface BoardInfo {
  id: string;
  slug: BoardSlug;
  name: string;
  fullName: string;
  authority: string;
  officialWebsite: string;
  description: string;
  tagline: string;
  badge: string;
  color: {
    primary: string;
    gradient: string;
    accent: string;
    light: string;
    border: string;
  };
  classes: number[];
  examPattern: string;
  markingScheme: string;
  features: string[];
}

export interface QuestionItem {
  id: string;
  question: string;
  type?: 'mcq' | 'short' | 'numerical' | 'long';
  options?: string[];
  correctIndex?: number;
  answer?: string;
  explanation: string;
  marks?: number;
}

export interface AssignmentItem {
  id: string;
  title: string;
  level: 'Level 1 - Foundational' | 'Level 2 - Application' | 'Level 3 - Exemplar / HOTS';
  estimatedTime: string;
  questions: QuestionItem[];
}

export interface LearningMaterialItem {
  id: string;
  title: string;
  type: 'notes' | 'pdf' | 'formula-sheet' | 'concept-map' | 'practical-guide' | 'video';
  description: string;
  fileSize?: string;
  duration?: string;
  downloadFilename?: string;
  contentSnippet?: string;
}

export interface PreviousYearPaperItem {
  id: string;
  year: number;
  session: string;
  title: string;
  totalMarks: number;
  duration: string;
  downloadUrl?: string;
  solutionsAvailable: boolean;
  highlights: string[];
}

export interface AssessmentQuiz {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface ChapterInfo {
  id: string;
  number: number;
  slug: string;
  title: string;
  description: string;
  hours: number;
  weightageMarks: number;
  learningObjectives: string[];
  importantTopics: string[];
  materials: LearningMaterialItem[];
  assignments: AssignmentItem[];
  quiz?: AssessmentQuiz;
  notesSummary: string;
  keyFormulasOrTerms?: string[];
}

export interface SubjectDescription {
  overview: string;
  whatStudentsLearn: string[];
  importantTopicsCovered: string[];
  learningObjectives: string[];
  practicalApplications: string[];
  skillsDeveloped: string[];
  academicProgression: string;
}

export interface SubjectCurriculum {
  id: string;
  slug: string;
  name: string;
  code?: string;
  boardSlug: BoardSlug;
  classNumber: number;
  stream?: 'General' | 'Science' | 'Commerce' | 'Humanities';
  icon: string;
  color: string;
  description: SubjectDescription;
  prescribedTextbooks: {
    title: string;
    publisher: string;
    officialCode?: string;
  }[];
  evaluationScheme: {
    theoryMarks: number;
    practicalOrInternalMarks: number;
    totalMarks: number;
    durationHours: number;
    breakdown: string[];
  };
  chapters: ChapterInfo[];
  previousYearPapers?: PreviousYearPaperItem[];
}

export interface ClassCurriculum {
  boardSlug: BoardSlug;
  classNumber: number;
  classSlug: string;
  title: string;
  academicStage: 'Middle School (6–8)' | 'Secondary School (9–10)' | 'Senior Secondary (11–12)';
  overview: string;
  keyFocusAreas: string[];
  subjects: SubjectCurriculum[];
}

