/**
 * Global Minds Academy — Database Seed Script
 * Idempotent: safe to run multiple times (uses upsert throughout).
 * Never overwrites production data — all demo records are clearly labelled.
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 12;

async function hash(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

async function main() {
  console.log('🌱  Starting seed...');

  // ──────────────────────────────────────────────────────────────────────────
  // 1. BOARDS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Boards');

  const boardData = [
    { name: 'CBSE', shortName: 'CBSE', description: 'Central Board of Secondary Education', sortOrder: 1 },
    { name: 'ICSE', shortName: 'ICSE', description: 'Indian Certificate of Secondary Education (Classes 1–10)', sortOrder: 2 },
    { name: 'ISC', shortName: 'ISC', description: 'Indian School Certificate (Classes 11–12)', sortOrder: 3 },
    { name: 'Tamil Nadu State Board', shortName: 'TN State Board', description: 'Tamil Nadu State Board / Samacheer Kalvi', sortOrder: 4 },
    { name: 'Tamil Nadu Matriculation', shortName: 'TN Matriculation', description: 'Tamil Nadu Matriculation Board', sortOrder: 5 },
  ];

  const boards: Record<string, { id: string }> = {};
  for (const b of boardData) {
    const board = await prisma.board.upsert({
      where: { shortName: b.shortName },
      create: { ...b, isActive: true },
      update: { name: b.name, description: b.description, sortOrder: b.sortOrder },
    });
    boards[b.shortName] = board;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. CLASSES (1–12)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Classes');

  const classes: Record<number, { id: string }> = {};
  for (let num = 1; num <= 12; num++) {
    const cls = await prisma.class.upsert({
      where: { number: num },
      create: { name: `Class ${num}`, number: num, isActive: true, sortOrder: num },
      update: { name: `Class ${num}`, isActive: true, sortOrder: num },
    });
    classes[num] = cls;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 3. SUBJECTS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Subjects');

  const subjectData = [
    { name: 'Mathematics', slug: 'mathematics', iconName: 'calculator', color: '#2563eb', sortOrder: 1 },
    { name: 'Physics', slug: 'physics', iconName: 'atom', color: '#7c3aed', sortOrder: 2 },
    { name: 'Chemistry', slug: 'chemistry', iconName: 'flask', color: '#059669', sortOrder: 3 },
    { name: 'Biology', slug: 'biology', iconName: 'leaf', color: '#16a34a', sortOrder: 4 },
    { name: 'English', slug: 'english', iconName: 'book-open', color: '#dc2626', sortOrder: 5 },
    { name: 'Tamil', slug: 'tamil', iconName: 'languages', color: '#ea580c', sortOrder: 6 },
    { name: 'Hindi', slug: 'hindi', iconName: 'languages', color: '#d97706', sortOrder: 7 },
    { name: 'Computer Science', slug: 'computer-science', iconName: 'code', color: '#0891b2', sortOrder: 8 },
    { name: 'Informatics Practices', slug: 'informatics-practices', iconName: 'monitor', color: '#0e7490', sortOrder: 9 },
    { name: 'Science', slug: 'science', iconName: 'microscope', color: '#65a30d', sortOrder: 10 },
    { name: 'Social Science', slug: 'social-science', iconName: 'globe', color: '#b45309', sortOrder: 11 },
    { name: 'History', slug: 'history', iconName: 'landmark', color: '#92400e', sortOrder: 12 },
    { name: 'Geography', slug: 'geography', iconName: 'map', color: '#15803d', sortOrder: 13 },
    { name: 'Economics', slug: 'economics', iconName: 'trending-up', color: '#1d4ed8', sortOrder: 14 },
    { name: 'Accountancy', slug: 'accountancy', iconName: 'file-text', color: '#6d28d9', sortOrder: 15 },
    { name: 'Business Studies', slug: 'business-studies', iconName: 'briefcase', color: '#0f766e', sortOrder: 16 },
    { name: 'Statistics', slug: 'statistics', iconName: 'bar-chart', color: '#7c3aed', sortOrder: 17 },
    { name: 'Environmental Studies', slug: 'environmental-studies', iconName: 'leaf', color: '#4d7c0f', sortOrder: 18 },
  ];

  const subjects: Record<string, { id: string }> = {};
  for (const s of subjectData) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      create: { ...s, isActive: true },
      update: { name: s.name, color: s.color, sortOrder: s.sortOrder },
    });
    subjects[s.slug] = subject;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 4. BOARD–CLASS MAPPINGS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Board–Class mappings');

  const boardClassMappings: { boardShort: string; classNums: number[] }[] = [
    { boardShort: 'CBSE', classNums: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { boardShort: 'ICSE', classNums: [1,2,3,4,5,6,7,8,9,10] },
    { boardShort: 'ISC', classNums: [11,12] },
    { boardShort: 'TN State Board', classNums: [1,2,3,4,5,6,7,8,9,10,11,12] },
    { boardShort: 'TN Matriculation', classNums: [1,2,3,4,5,6,7,8,9,10] },
  ];

  for (const { boardShort, classNums } of boardClassMappings) {
    const board = boards[boardShort];
    if (!board) continue;
    for (const num of classNums) {
      const cls = classes[num];
      if (!cls) continue;
      await prisma.boardClass.upsert({
        where: { boardId_classId: { boardId: board.id, classId: cls.id } },
        create: { boardId: board.id, classId: cls.id },
        update: {},
      });
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 5. BOARD–SUBJECT MAPPINGS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Board–Subject mappings');

  const commonSubjects = ['mathematics', 'physics', 'chemistry', 'biology', 'english', 'computer-science'];
  const allBoardSlugs = Object.keys(boards);

  for (const boardShort of allBoardSlugs) {
    const board = boards[boardShort];
    for (const slug of commonSubjects) {
      const subject = subjects[slug];
      if (!subject) continue;
      await prisma.boardSubject.upsert({
        where: { boardId_subjectId: { boardId: board.id, subjectId: subject.id } },
        create: { boardId: board.id, subjectId: subject.id },
        update: {},
      }).catch(() => {});
    }
  }

  // Tamil for TN boards
  for (const boardShort of ['TN State Board', 'TN Matriculation']) {
    const board = boards[boardShort];
    if (!board) continue;
    const tamil = subjects['tamil'];
    if (tamil) {
      await prisma.boardSubject.upsert({
        where: { boardId_subjectId: { boardId: board.id, subjectId: tamil.id } },
        create: { boardId: board.id, subjectId: tamil.id },
        update: {},
      }).catch(() => {});
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 6. CLASS–SUBJECT MAPPINGS (representative — not exhaustive)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Class–Subject mappings');

  // Lower classes (1-5): English, Mathematics, Science, Social Studies, EVS
  const lowerClassSubjects = ['mathematics', 'english', 'science', 'social-science', 'environmental-studies'];
  for (let num = 1; num <= 5; num++) {
    for (const slug of lowerClassSubjects) {
      const subject = subjects[slug];
      const cls = classes[num];
      if (!subject || !cls) continue;
      await prisma.classSubject.upsert({
        where: { classId_subjectId: { classId: cls.id, subjectId: subject.id } },
        create: { classId: cls.id, subjectId: subject.id },
        update: {},
      }).catch(() => {});
    }
  }

  // Middle classes (6-10): Maths, Science, Social Science, English, Hindi/Tamil
  const middleClassSubjects = ['mathematics', 'science', 'social-science', 'english', 'hindi', 'tamil'];
  for (let num = 6; num <= 10; num++) {
    for (const slug of middleClassSubjects) {
      const subject = subjects[slug];
      const cls = classes[num];
      if (!subject || !cls) continue;
      await prisma.classSubject.upsert({
        where: { classId_subjectId: { classId: cls.id, subjectId: subject.id } },
        create: { classId: cls.id, subjectId: subject.id },
        update: {},
      }).catch(() => {});
    }
  }

  // Senior classes (11-12): Physics, Chemistry, Biology, Maths, CS, Economics, Accountancy
  const seniorClassSubjects = ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science', 'economics', 'accountancy', 'business-studies', 'statistics'];
  for (let num = 11; num <= 12; num++) {
    for (const slug of seniorClassSubjects) {
      const subject = subjects[slug];
      const cls = classes[num];
      if (!subject || !cls) continue;
      await prisma.classSubject.upsert({
        where: { classId_subjectId: { classId: cls.id, subjectId: subject.id } },
        create: { classId: cls.id, subjectId: subject.id },
        update: {},
      }).catch(() => {});
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 7. CHAPTERS (sample data for key subjects)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Chapters');

  const chapterData: { subjectSlug: string; chapters: { name: string; number: number }[] }[] = [
    {
      subjectSlug: 'physics',
      chapters: [
        { name: 'Units and Measurements', number: 1 },
        { name: 'Motion in a Straight Line', number: 2 },
        { name: 'Motion in a Plane', number: 3 },
        { name: 'Laws of Motion', number: 4 },
        { name: 'Work, Energy and Power', number: 5 },
        { name: 'System of Particles and Rotational Motion', number: 6 },
        { name: 'Gravitation', number: 7 },
        { name: 'Mechanical Properties of Solids', number: 8 },
        { name: 'Thermal Properties of Matter', number: 9 },
        { name: 'Thermodynamics', number: 10 },
      ],
    },
    {
      subjectSlug: 'chemistry',
      chapters: [
        { name: 'Some Basic Concepts of Chemistry', number: 1 },
        { name: 'Structure of Atom', number: 2 },
        { name: 'Classification of Elements and Periodicity', number: 3 },
        { name: 'Chemical Bonding and Molecular Structure', number: 4 },
        { name: 'States of Matter', number: 5 },
        { name: 'Thermodynamics', number: 6 },
        { name: 'Equilibrium', number: 7 },
        { name: 'Redox Reactions', number: 8 },
        { name: 'Hydrogen', number: 9 },
        { name: 'The s-Block Elements', number: 10 },
      ],
    },
    {
      subjectSlug: 'mathematics',
      chapters: [
        { name: 'Sets', number: 1 },
        { name: 'Relations and Functions', number: 2 },
        { name: 'Trigonometric Functions', number: 3 },
        { name: 'Complex Numbers and Quadratic Equations', number: 4 },
        { name: 'Linear Inequalities', number: 5 },
        { name: 'Permutations and Combinations', number: 6 },
        { name: 'Binomial Theorem', number: 7 },
        { name: 'Sequences and Series', number: 8 },
        { name: 'Straight Lines', number: 9 },
        { name: 'Conic Sections', number: 10 },
      ],
    },
    {
      subjectSlug: 'biology',
      chapters: [
        { name: 'The Living World', number: 1 },
        { name: 'Biological Classification', number: 2 },
        { name: 'Plant Kingdom', number: 3 },
        { name: 'Animal Kingdom', number: 4 },
        { name: 'Morphology of Flowering Plants', number: 5 },
        { name: 'Anatomy of Flowering Plants', number: 6 },
        { name: 'Structural Organisation in Animals', number: 7 },
        { name: 'Cell: The Unit of Life', number: 8 },
        { name: 'Biomolecules', number: 9 },
        { name: 'Cell Cycle and Cell Division', number: 10 },
      ],
    },
  ];

  for (const { subjectSlug, chapters } of chapterData) {
    const subject = subjects[subjectSlug];
    if (!subject) continue;
    for (const ch of chapters) {
      const slug = `${ch.number}-${ch.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
      await prisma.chapter.upsert({
        where: { subjectId_slug: { subjectId: subject.id, slug } },
        create: { subjectId: subject.id, name: ch.name, slug, number: ch.number, isActive: true },
        update: { name: ch.name, number: ch.number },
      });
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 8. DEMO USERS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Demo users');

  const demoPassword = await hash('Demo@1234');

  // Student
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@demo.com' },
    create: {
      email: 'student@demo.com',
      passwordHash: demoPassword,
      firstName: 'Arjun',
      lastName: 'Sharma',
      role: 'STUDENT',
      status: 'ACTIVE',
      emailVerified: true,
      preferredLang: 'en',
      timezone: 'Asia/Kolkata',
    },
    update: { status: 'ACTIVE', emailVerified: true },
  });

  await prisma.studentProfile.upsert({
    where: { userId: studentUser.id },
    create: {
      userId: studentUser.id,
      boardId: boards['CBSE'].id,
      classId: classes[11].id,
      stream: 'Science',
      city: 'Chennai',
      state: 'Tamil Nadu',
      academicYear: '2025-26',
    },
    update: { boardId: boards['CBSE'].id, classId: classes[11].id },
  });

  // Teacher
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@demo.com' },
    create: {
      email: 'teacher@demo.com',
      passwordHash: demoPassword,
      firstName: 'Priya',
      lastName: 'Menon',
      role: 'TEACHER',
      status: 'ACTIVE',
      emailVerified: true,
      preferredLang: 'en',
      timezone: 'Asia/Kolkata',
    },
    update: { status: 'ACTIVE', emailVerified: true },
  });

  await prisma.teacherProfile.upsert({
    where: { userId: teacherUser.id },
    create: {
      userId: teacherUser.id,
      qualification: 'M.Sc. Physics, B.Ed.',
      experience: '8 years — JEE/NEET Physics coaching',
      specializations: ['Mechanics', 'Electromagnetism', 'Optics'],
      subjects: ['Physics', 'Mathematics'],
      isVerified: true,
      showOnWebsite: true,
      displayOrder: 1,
    },
    update: { isVerified: true, showOnWebsite: true },
  });

  // Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    create: {
      email: 'admin@demo.com',
      passwordHash: demoPassword,
      firstName: 'Admin',
      lastName: 'Demo',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      preferredLang: 'en',
      timezone: 'Asia/Kolkata',
    },
    update: { status: 'ACTIVE', emailVerified: true, role: 'SUPER_ADMIN' },
  });

  // Parent
  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@demo.com' },
    create: {
      email: 'parent@demo.com',
      passwordHash: demoPassword,
      firstName: 'Ravi',
      lastName: 'Sharma',
      role: 'PARENT',
      status: 'ACTIVE',
      emailVerified: true,
      preferredLang: 'en',
      timezone: 'Asia/Kolkata',
    },
    update: { status: 'ACTIVE', emailVerified: true },
  });

  const parentProfile = await prisma.parentProfile.upsert({
    where: { userId: parentUser.id },
    create: { userId: parentUser.id },
    update: {},
  });

  // Link parent to student
  const studentProfile = await prisma.studentProfile.findUnique({ where: { userId: studentUser.id } });
  if (studentProfile) {
    await prisma.parentStudent.upsert({
      where: { parentId_studentId: { parentId: parentProfile.id, studentId: studentProfile.id } },
      create: { parentId: parentProfile.id, studentId: studentProfile.id, verified: true },
      update: { verified: true },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 9. SAMPLE COURSES
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Courses');

  const teacherProfile = await prisma.teacherProfile.findUnique({ where: { userId: teacherUser.id } });

  const courseData = [
    {
      title: 'JEE Main Physics — Complete Course',
      slug: 'jee-main-physics-complete',
      description: 'Comprehensive Physics preparation for JEE Main covering all NCERT topics with practice problems, mock tests, and concept videos.',
      shortDescription: 'Complete JEE Main Physics from basics to advanced level.',
      boardId: boards['CBSE'].id,
      classId: classes[12].id,
      subjectId: subjects['physics'].id,
      examCategory: 'JEE_MAIN',
      price: 299900,
      isFree: false,
      status: 'PUBLISHED' as const,
      publishedAt: new Date(),
    },
    {
      title: 'NEET Biology — Cell Biology & Genetics',
      slug: 'neet-biology-cell-genetics',
      description: 'Deep dive into Cell Biology, Genetics, and Molecular Biology for NEET UG aspirants.',
      shortDescription: 'Cell Biology, Genetics, and Molecular Biology for NEET.',
      boardId: boards['CBSE'].id,
      classId: classes[12].id,
      subjectId: subjects['biology'].id,
      examCategory: 'NEET',
      price: 249900,
      isFree: false,
      status: 'PUBLISHED' as const,
      publishedAt: new Date(),
    },
    {
      title: 'Class 10 Mathematics — Full Syllabus',
      slug: 'class-10-mathematics-full',
      description: 'Complete Class 10 Mathematics covering all chapters with solved examples, practice exercises, and previous year questions.',
      shortDescription: 'Full Class 10 Maths syllabus with practice and tests.',
      boardId: boards['CBSE'].id,
      classId: classes[10].id,
      subjectId: subjects['mathematics'].id,
      examCategory: null,
      price: 149900,
      isFree: false,
      status: 'PUBLISHED' as const,
      publishedAt: new Date(),
    },
    {
      title: 'Free Chemistry Basics — Classes 9–10',
      slug: 'free-chemistry-basics-9-10',
      description: 'Introduction to Chemistry for Class 9 and 10 students. Covers atomic structure, chemical reactions, and periodic table basics. Free access.',
      shortDescription: 'Free introduction to Chemistry for Classes 9–10.',
      boardId: boards['CBSE'].id,
      classId: classes[9].id,
      subjectId: subjects['chemistry'].id,
      examCategory: null,
      price: 0,
      isFree: true,
      status: 'PUBLISHED' as const,
      publishedAt: new Date(),
    },
    {
      title: 'Tamil Nadu Class 12 Physics',
      slug: 'tn-class-12-physics',
      description: 'Samacheer Kalvi Class 12 Physics — aligned to the Tamil Nadu State Board syllabus with all chapters and volume-wise practice.',
      shortDescription: 'TN State Board Class 12 Physics — Samacheer Kalvi.',
      boardId: boards['TN State Board'].id,
      classId: classes[12].id,
      subjectId: subjects['physics'].id,
      examCategory: null,
      price: 199900,
      isFree: false,
      status: 'DRAFT' as const,
      publishedAt: null,
    },
  ];

  for (const course of courseData) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      create: {
        ...course,
        level: 'ALL_LEVELS',
        language: 'English',
        isFeatured: course.status === 'PUBLISHED',
        instructorId: teacherProfile?.id ?? null,
        creatorId: adminUser.id,
      },
      update: {
        title: course.title,
        status: course.status,
        price: course.price,
        isFree: course.isFree,
      },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 10. EXAM CATALOGUE
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Exam catalogue');

  const examData = [
    {
      name: 'JEE Main',
      shortName: 'JEE Main',
      slug: 'jee-main',
      category: 'ENGINEERING',
      conductingAuth: 'National Testing Agency (NTA)',
      officialWebsite: 'https://jeemain.nta.nic.in/',
      description: 'Joint Entrance Examination (Main) — gateway to NITs, IIITs, and other CFTIs. Also eligibility test for JEE Advanced.',
      eligibility: 'Passed or appearing in Class 12 with Physics and Mathematics. Verify current eligibility from NTA notification.',
      examPattern: 'Paper 1: 90 questions (Physics, Chemistry, Maths) — 75 to be attempted. 300 marks. 3 hours. MCQ + Numerical types.',
      status: 'UPCOMING',
      sortOrder: 1,
    },
    {
      name: 'JEE Advanced',
      shortName: 'JEE Advanced',
      slug: 'jee-advanced',
      category: 'ENGINEERING',
      conductingAuth: 'One of the IITs (rotational basis)',
      officialWebsite: 'https://jeeadv.ac.in/',
      description: 'The qualifying examination for admission to IITs. Only top ~2.5 lakh JEE Main qualifiers are eligible.',
      eligibility: 'Must qualify JEE Main. Additional criteria apply — verify from official JEE Advanced brochure.',
      examPattern: 'Two papers (Paper 1 and Paper 2), each 3 hours. Physics, Chemistry, Mathematics. Mixed question types. Pattern varies each year.',
      status: 'UPCOMING',
      sortOrder: 2,
    },
    {
      name: 'NEET UG',
      shortName: 'NEET UG',
      slug: 'neet-ug',
      category: 'MEDICAL',
      conductingAuth: 'National Testing Agency (NTA)',
      officialWebsite: 'https://neet.nta.nic.in/',
      description: 'National Eligibility cum Entrance Test (Undergraduate) — single entrance for MBBS, BDS, AYUSH, Nursing, and Veterinary courses.',
      eligibility: 'Passed or appearing in Class 12 with Physics, Chemistry, and Biology. Verify current eligibility from official NTA notification.',
      examPattern: '180 questions. Physics (45), Chemistry (45), Biology (90). 720 marks. 3 hours 20 minutes. +4 for correct, –1 for wrong.',
      status: 'UPCOMING',
      sortOrder: 3,
    },
    {
      name: 'BITSAT',
      shortName: 'BITSAT',
      slug: 'bitsat',
      category: 'ENGINEERING',
      conductingAuth: 'Birla Institute of Technology and Science (BITS)',
      officialWebsite: 'https://www.bitsadmission.com/',
      description: 'BITS Admission Test for admission to BITS Pilani, Goa, and Hyderabad campuses.',
      eligibility: 'Minimum 75% in PCM in Class 12 (or equivalent). Verify from official notification.',
      examPattern: '130 questions. Physics (30), Chemistry (30), Mathematics (40), English (15), Logical Reasoning (15). 390 marks. 3 hours. Computer-based.',
      status: 'UPCOMING',
      sortOrder: 4,
    },
    {
      name: 'VITEEE',
      shortName: 'VITEEE',
      slug: 'viteee',
      category: 'ENGINEERING',
      conductingAuth: 'VIT University',
      officialWebsite: 'https://viteee.vit.ac.in/',
      description: 'VIT Engineering Entrance Exam for admission to VIT campuses across India.',
      eligibility: 'Minimum 60% aggregate in Physics, Chemistry, and Mathematics/Biology in Class 12. Verify from official VIT notification.',
      examPattern: '125 questions. Physics (35), Chemistry (35), Mathematics or Biology (40), English & Aptitude (15). Computer-based. 2.5 hours.',
      status: 'UPCOMING',
      sortOrder: 5,
    },
    {
      name: 'CUET UG',
      shortName: 'CUET UG',
      slug: 'cuet-ug',
      category: 'UNIVERSITY',
      conductingAuth: 'National Testing Agency (NTA)',
      officialWebsite: 'https://cuet.samarth.ac.in/',
      description: 'Common University Entrance Test for undergraduate admissions to central universities and participating institutions.',
      eligibility: 'Class 12 pass or appearing. Eligibility varies by university and programme.',
      examPattern: 'Section IA/IB (Languages), Section II (Domain subjects), Section III (General Test). Computer-based.',
      status: 'UPCOMING',
      sortOrder: 6,
    },
    {
      name: 'NDA',
      shortName: 'NDA',
      slug: 'nda',
      category: 'PROFESSIONAL',
      conductingAuth: 'Union Public Service Commission (UPSC)',
      officialWebsite: 'https://www.upsc.gov.in/',
      description: 'National Defence Academy and Naval Academy Examination for admission to the Army, Navy, and Air Force wings of NDA.',
      eligibility: 'Males and females who are unmarried, aged 16.5–19.5 years. Class 12 pass or appearing. Verify from official UPSC notification.',
      examPattern: 'Mathematics (120 questions, 300 marks) and General Ability Test (150 questions, 600 marks). 2.5 hours each paper.',
      status: 'UPCOMING',
      sortOrder: 7,
    },
  ];

  for (const exam of examData) {
    await prisma.examCatalogue.upsert({
      where: { slug: exam.slug },
      create: {
        ...exam,
        lastVerified: new Date(),
        isActive: true,
        notificationLink: exam.officialWebsite,
      },
      update: {
        name: exam.name,
        conductingAuth: exam.conductingAuth,
        officialWebsite: exam.officialWebsite,
        status: exam.status,
      },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 11. SAMPLE ENQUIRIES
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Sample enquiries');

  const enquiryData = [
    {
      referenceNo: 'ENQ-DEMO-001',
      name: 'Kavitha Ramesh',
      email: 'kavitha.demo@example.com',
      phone: '9876500001',
      studentClass: 'Class 11',
      board: 'CBSE',
      interest: 'JEE Main & Advanced',
      learningFormat: 'Online',
      message: 'My son is in Class 11 CBSE PCM. Looking for JEE coaching with online classes.',
      status: 'NEW',
      consentGiven: true,
    },
    {
      referenceNo: 'ENQ-DEMO-002',
      name: 'Suresh Kumar',
      email: 'suresh.demo@example.com',
      phone: '9876500002',
      studentClass: 'Class 10',
      board: 'TN State Board',
      interest: 'School Tuition — Maths & Science',
      learningFormat: 'Offline',
      message: 'My daughter needs tuition for Class 10 Maths and Science for board exams.',
      status: 'CONTACTED',
      consentGiven: true,
    },
    {
      referenceNo: 'ENQ-DEMO-003',
      name: 'Deepa Nair',
      email: 'deepa.demo@example.com',
      phone: '9876500003',
      studentClass: 'Class 12',
      board: 'CBSE',
      interest: 'NEET UG Preparation',
      learningFormat: 'Hybrid',
      message: 'Looking for NEET Biology and Chemistry coaching for Class 12.',
      status: 'ENROLLED',
      consentGiven: true,
    },
  ];

  for (const enq of enquiryData) {
    await prisma.enquiry.upsert({
      where: { referenceNo: enq.referenceNo },
      create: enq,
      update: { status: enq.status },
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 12. SAMPLE QUESTIONS (question bank)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Sample questions');

  const physicsSubject = subjects['physics'];
  const mathsSubject = subjects['mathematics'];

  if (physicsSubject) {
    const q1 = await prisma.question.upsert({
      where: { id: 'demo-q-physics-001' },
      create: {
        id: 'demo-q-physics-001',
        text: 'A body is thrown vertically upward with a velocity of 20 m/s. What is the maximum height reached? (Take g = 10 m/s²)',
        type: 'SINGLE_MCQ',
        subjectId: physicsSubject.id,
        difficulty: 'MEDIUM',
        marks: 4,
        negativeMarks: 1,
        explanation: 'Using v² = u² – 2gh. At maximum height v = 0. So h = u²/2g = (20)²/(2×10) = 400/20 = 20 m.',
        authorId: adminUser.id,
        isPublished: true,
        isReviewed: true,
        tags: ['kinematics', 'projectile'],
      },
      update: { isPublished: true },
    });

    await prisma.questionOption.deleteMany({ where: { questionId: q1.id } });
    await prisma.questionOption.createMany({
      data: [
        { questionId: q1.id, text: '10 m', isCorrect: false, sortOrder: 0 },
        { questionId: q1.id, text: '20 m', isCorrect: true, sortOrder: 1 },
        { questionId: q1.id, text: '40 m', isCorrect: false, sortOrder: 2 },
        { questionId: q1.id, text: '80 m', isCorrect: false, sortOrder: 3 },
      ],
    });
  }

  if (mathsSubject) {
    const q2 = await prisma.question.upsert({
      where: { id: 'demo-q-maths-001' },
      create: {
        id: 'demo-q-maths-001',
        text: 'If A = {1, 2, 3} and B = {2, 3, 4}, find n(A ∪ B).',
        type: 'SINGLE_MCQ',
        subjectId: mathsSubject.id,
        difficulty: 'EASY',
        marks: 2,
        negativeMarks: 0.5,
        explanation: 'A ∪ B = {1, 2, 3, 4}. So n(A ∪ B) = 4. Using formula: n(A∪B) = n(A) + n(B) – n(A∩B) = 3 + 3 – 2 = 4.',
        authorId: adminUser.id,
        isPublished: true,
        isReviewed: true,
        tags: ['sets', 'union'],
      },
      update: { isPublished: true },
    });

    await prisma.questionOption.deleteMany({ where: { questionId: q2.id } });
    await prisma.questionOption.createMany({
      data: [
        { questionId: q2.id, text: '3', isCorrect: false, sortOrder: 0 },
        { questionId: q2.id, text: '4', isCorrect: true, sortOrder: 1 },
        { questionId: q2.id, text: '5', isCorrect: false, sortOrder: 2 },
        { questionId: q2.id, text: '6', isCorrect: false, sortOrder: 3 },
      ],
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 13. DEMO ENROLMENT (student in free course)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Demo enrolment');

  const freeCourse = await prisma.course.findUnique({ where: { slug: 'free-chemistry-basics-9-10' } });
  if (freeCourse) {
    await prisma.enrolment.upsert({
      where: { userId_courseId: { userId: studentUser.id, courseId: freeCourse.id } },
      create: { userId: studentUser.id, courseId: freeCourse.id, status: 'ACTIVE', progress: 15 },
      update: {},
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 14. DEMO TESTS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('  → Demo tests & sections');

  const q1 = await prisma.question.findUnique({ where: { id: 'demo-q-physics-001' } });
  const q2 = await prisma.question.findUnique({ where: { id: 'demo-q-maths-001' } });

  const existingTest1 = await prisma.test.findUnique({ where: { slug: 'jee-main-physics-mock-test-1' } });
  if (!existingTest1 && q1) {
    const t1 = await prisma.test.create({
      data: {
        id: 'demo-test-jee-physics-001',
        title: 'JEE Main Physics Mock Test 1',
        slug: 'jee-main-physics-mock-test-1',
        description: 'Comprehensive 1-hour practice test covering Kinematics, Dynamics, and Mechanics.',
        testType: 'MOCK_TEST',
        durationMinutes: 60,
        totalMarks: 100,
        passingMarks: 40,
        negativeMarking: true,
        maxAttempts: 10,
        isPublished: true,
        showResults: 'AFTER_SUBMIT',
      },
    });

    const sec1 = await prisma.testSection.create({
      data: {
        testId: t1.id,
        title: 'Section A - Mechanics',
        number: 1,
      },
    });

    await prisma.testQuestion.create({
      data: {
        testId: t1.id,
        sectionId: sec1.id,
        questionId: q1.id,
        number: 1,
        marks: 4,
        negMarks: 1,
      },
    });
  }

  const existingTest2 = await prisma.test.findUnique({ where: { slug: 'class-10-maths-chapter-drill' } });
  if (!existingTest2 && q2) {
    const t2 = await prisma.test.create({
      data: {
        id: 'demo-test-maths-002',
        title: 'Class 10 Mathematics Chapter Drill',
        slug: 'class-10-maths-chapter-drill',
        description: 'Sets, Number Systems & Algebra drill for Class 10.',
        testType: 'CHAPTER_TEST',
        durationMinutes: 30,
        totalMarks: 50,
        passingMarks: 20,
        negativeMarking: false,
        maxAttempts: 10,
        isPublished: true,
        showResults: 'AFTER_SUBMIT',
      },
    });

    const sec2 = await prisma.testSection.create({
      data: {
        testId: t2.id,
        title: 'Section A - Foundation',
        number: 1,
      },
    });

    await prisma.testQuestion.create({
      data: {
        testId: t2.id,
        sectionId: sec2.id,
        questionId: q2.id,
        number: 1,
        marks: 2,
        negMarks: 0,
      },
    });
  }

  console.log('✅  Seed complete.');
  console.log('');
  console.log('Demo accounts (password: Demo@1234):');
  console.log('  student@demo.com  →  STUDENT');
  console.log('  teacher@demo.com  →  TEACHER');
  console.log('  parent@demo.com   →  PARENT');
  console.log('  admin@demo.com    →  SUPER_ADMIN');
  console.log('');
  console.log('⚠  Remove or change demo accounts before production deployment.');
}

main()
  .catch((e) => {
    console.error('❌  Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
