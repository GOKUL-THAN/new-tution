import { BoardInfo } from './types';

export const EDUCATION_BOARDS: BoardInfo[] = [
  {
    id: 'board-cbse',
    slug: 'cbse',
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    authority: 'Ministry of Education, Government of India',
    officialWebsite: 'https://www.cbse.gov.in',
    tagline: 'National Benchmark Curriculum aligned with NCERT & NEP 2020',
    description:
      "India's premier national board governing secondary and senior secondary education across 28,000+ schools. CBSE focuses on experiential learning, competency-based education, and systematic preparation for nationwide competitive entrance tests such as JEE Main, JEE Advanced, and NEET UG.",
    badge: 'National Board · NCERT Aligned',
    color: {
      primary: '#0E3B43',
      gradient: 'from-blue-600 via-sky-600 to-indigo-700',
      accent: '#2563EB',
      light: '#EFF6FF',
      border: 'border-blue-200',
    },
    classes: [6, 7, 8, 9, 10, 11, 12],
    examPattern: 'Competency-based questions (50%), Objective MCQs (20%), Constructed response questions (30%) with 20-mark internal continuous assessment.',
    markingScheme: '80 Marks Theory / Board Exam + 20 Marks Internal Assessment (Pen-Paper tests, Multiple assessments, Portfolio, Subject enrichment).',
    features: [
      'Strictly mapped to NCERT and CBSE Academic Curriculum 2024–2026',
      'Official Competency-Based Assessment Framework (CBAF)',
      'Direct conceptual alignment with JEE, NEET, and CUET-UG entrance examinations',
      'Chapter-wise Exemplar problems and Higher Order Thinking Skills (HOTS)',
      'Previous 10 years verified Board Question Papers with official marking schemes',
    ],
  },
  {
    id: 'board-icse',
    slug: 'icse',
    name: 'ICSE',
    fullName: 'Indian Certificate of Secondary Education',
    authority: 'Council for the Indian School Certificate Examinations (CISCE)',
    officialWebsite: 'https://cisce.org',
    tagline: 'Comprehensive, Application-Oriented CISCE Curriculum for Classes 6–12',
    description:
      'Governed by the CISCE council, ICSE (Classes 6–10) and ISC (Classes 11–12) are renowned worldwide for an expansive, rigorous academic syllabus with strong language proficiency, segregated scientific disciplines (Physics, Chemistry, Biology taught separately from middle school), practical laboratory work, and balanced continuous internal evaluations.',
    badge: 'CISCE Council · Application Focused',
    color: {
      primary: '#0F4C5C',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      accent: '#059669',
      light: '#ECFDF5',
      border: 'border-emerald-200',
    },
    classes: [6, 7, 8, 9, 10, 11, 12],
    examPattern: 'Section A (Compulsory objective & short answer questions - 40 Marks) + Section B (Structured conceptual & analytical questions - 40 Marks) + 20 Marks Project / Practical work.',
    markingScheme: '80 Marks Board Theory + 20 Marks Internal Evaluation / Project / Laboratory Journal (70 Theory + 30 Practical for Senior Secondary Science).',
    features: [
      'Complete CISCE Regulations and Curriculum for Middle, Secondary & ISC stages',
      'Dedicated segregation of Physics, Chemistry, and Biology from Class 6 onwards',
      'Extensive English Language and Literature focus emphasizing synthesis, grammar, and Shakespearean drama',
      'Mandatory practical laboratory records, project files, and application-based problem solving',
      'Council Specimen Papers and 10-year ICSE / ISC board examination papers with examiner comments',
    ],
  },
  {
    id: 'board-tn-state-board',
    slug: 'tn-state-board',
    name: 'Tamil Nadu State Board',
    fullName: 'Tamil Nadu State Council of Educational Research and Training (Samacheer Kalvi)',
    authority: 'Directorate of Government Examinations (DGE) & SCERT Tamil Nadu',
    officialWebsite: 'https://dge.tn.gov.in',
    tagline: 'Samacheer Kalvi Uniform System with Bilingual (Tamil & English) Excellence',
    description:
      'The equitable education system of Tamil Nadu (Samacheer Kalvi) designed by TN SCERT. Provides deeply grounded regional context, rich Tamil literature and culture, rigorous Mathematics, Science, and Social Sciences with complete bilingual curriculum resources for Tamil Medium and English Medium students facing the prestigious SSLC and HSC Public Examinations.',
    badge: 'Samacheer Kalvi · Tamil & English Medium',
    color: {
      primary: '#0E3B43',
      gradient: 'from-amber-600 via-orange-600 to-red-600',
      accent: '#D97706',
      light: '#FFFBEB',
      border: 'border-amber-200',
    },
    classes: [6, 7, 8, 9, 10, 11, 12],
    examPattern: 'Term-wise assessments (FA-a, FA-b, SA) for Classes 6–9; Centralized Public Examinations with 1-mark objective questions, 2-mark brief questions, 5-mark detailed questions, and 8-mark geometry/graph questions for SSLC/HSC.',
    markingScheme: '100 Marks Public Exam pattern (SSLC) / 70 Theory + 20 Practical + 10 Internal (HSC Science streams).',
    features: [
      'Comprehensive TN SCERT Textbooks curriculum with QR-code interactive learning alignment',
      'Full bilingual materials: English medium and Tamil medium (தமிழ் வழிக் கல்வி)',
      'Government Model Question Papers (PTA - Parent Teacher Association) and DGE Public Exam papers',
      'Step-by-step problem solving for Samacheer Kalvi Book-Back questions and Creative (Interior) questions',
      'Special focus on 100/100 centum preparation with targeted revision blueprints',
    ],
  },
  {
    id: 'board-tn-matriculation',
    slug: 'tn-matriculation',
    name: 'Tamil Nadu Matriculation Board',
    fullName: 'Tamil Nadu Directorate of Matriculation Schools',
    authority: 'Directorate of Matriculation Schools, Department of School Education, Tamil Nadu',
    officialWebsite: 'https://www.innovations.tnschools.gov.in',
    tagline: 'English-Medium Oriented Matriculation System with Advanced Entrance Readiness',
    description:
      'Governed under the Directorate of Matriculation Schools in Tamil Nadu, this academic framework provides English-medium focused instruction with advanced analytical depth in Mathematics, Science, and English. Designed to prepare students for top performance in board examinations and competitive medical/engineering entrance exams while honoring state curricular standards.',
    badge: 'Matriculation Directorate · English Medium Focus',
    color: {
      primary: '#0E3B43',
      gradient: 'from-purple-600 via-violet-600 to-indigo-700',
      accent: '#7C3AED',
      light: '#FAF5FF',
      border: 'border-purple-200',
    },
    classes: [6, 7, 8, 9, 10, 11, 12],
    examPattern: 'Quarterly, Half-Yearly, and Annual Board Pattern with Unit Tests, Slip Tests, Creative HOTS questions, and Practical Record assessments.',
    markingScheme: '100 Marks Examination Format with 1-mark MCQs/Fill-ups, 2-mark Short Answers, 5-mark Structured Essays, and Practical Laboratory evaluations.',
    features: [
      'Matriculation school curriculum standard with enhanced English communicative and grammar focus',
      'In-depth numerical problem solving in Mathematics and Physical Sciences',
      'Structured Matriculation lab manual experiments and practical record training',
      'Comprehensive question banks with Revision Test Series (RTS) and Revision Model Papers',
      'Dual pathway preparing students for 100% board centum and parallel NEET/JEE foundation',
    ],
  },
];

// Alias mapping for ISC backwards compatibility
export const BOARD_ALIASES: Record<string, string> = {
  isc: 'icse',
};

export function getEducationBoard(slug: string): BoardInfo | undefined {
  const normalized = BOARD_ALIASES[slug] || slug;
  return EDUCATION_BOARDS.find((b) => b.slug === normalized);
}

