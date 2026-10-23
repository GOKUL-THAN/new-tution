import { PrismaClient, UserRole, AccountStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ---------------------------------------------------------------
  // BOARDS
  // ---------------------------------------------------------------
  const boardData = [
    { name: 'CBSE', shortName: 'cbse', description: 'Central Board of Secondary Education', sortOrder: 1 },
    { name: 'ICSE', shortName: 'icse', description: 'Indian Certificate of Secondary Education (Classes 9–10)', sortOrder: 2 },
    { name: 'ISC', shortName: 'isc', description: 'Indian School Certificate (Classes 11–12)', sortOrder: 3 },
    { name: 'TN State Board', shortName: 'tn-state-board', description: 'Tamil Nadu State Board / Samacheer Kalvi', sortOrder: 4 },
    { name: 'TN Matriculation', shortName: 'tn-matriculation', description: 'Tamil Nadu Matriculation Board', sortOrder: 5 },
  ];

  const boards: Record<string, string> = {};
  for (const b of boardData) {
    const board = await prisma.board.upsert({
      where: { shortName: b.shortName },
      update: {},
      create: { name: b.name, shortName: b.shortName, description: b.description, sortOrder: b.sortOrder },
    });
    boards[b.shortName] = board.id;
    console.log(`  Board: ${b.name}`);
  }

  // ---------------------------------------------------------------
  // CLASSES
  // ---------------------------------------------------------------
  const classes: Record<number, string> = {};
  for (let i = 1; i <= 12; i++) {
    const cls = await prisma.class.upsert({
      where: { number: i },
      update: {},
      create: { name: `Class ${i}`, number: i, sortOrder: i },
    });
    classes[i] = cls.id;
    console.log(`  Class: Class ${i}`);
  }

  // ---------------------------------------------------------------
  // SUBJECTS
  // ---------------------------------------------------------------
  const subjectData = [
    { name: 'Mathematics', slug: 'mathematics', iconName: 'calculator', color: '#2563eb', sortOrder: 1 },
    { name: 'Physics', slug: 'physics', iconName: 'zap', color: '#7c3aed', sortOrder: 2 },
    { name: 'Chemistry', slug: 'chemistry', iconName: 'flask-conical', color: '#059669', sortOrder: 3 },
    { name: 'Biology', slug: 'biology', iconName: 'leaf', color: '#16a34a', sortOrder: 4 },
    { name: 'English', slug: 'english', iconName: 'book-open', color: '#d97706', sortOrder: 5 },
    { name: 'Tamil', slug: 'tamil', iconName: 'languages', color: '#dc2626', sortOrder: 6 },
    { name: 'Social Science', slug: 'social-science', iconName: 'globe', color: '#0891b2', sortOrder: 7 },
    { name: 'History', slug: 'history', iconName: 'landmark', color: '#92400e', sortOrder: 8 },
    { name: 'Geography', slug: 'geography', iconName: 'map', color: '#065f46', sortOrder: 9 },
    { name: 'Computer Science', slug: 'computer-science', iconName: 'monitor', color: '#1d4ed8', sortOrder: 10 },
    { name: 'Accountancy', slug: 'accountancy', iconName: 'bar-chart', color: '#7e22ce', sortOrder: 11 },
    { name: 'Economics', slug: 'economics', iconName: 'trending-up', color: '#0f766e', sortOrder: 12 },
    { name: 'Business Studies', slug: 'business-studies', iconName: 'briefcase', color: '#b45309', sortOrder: 13 },
    { name: 'Environmental Science', slug: 'environmental-science', iconName: 'tree-pine', color: '#15803d', sortOrder: 14 },
    { name: 'Physical Education', slug: 'physical-education', iconName: 'activity', color: '#e11d48', sortOrder: 15 },
  ];

  const subjects: Record<string, string> = {};
  for (const s of subjectData) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        name: s.name,
        slug: s.slug,
        iconName: s.iconName,
        color: s.color,
        sortOrder: s.sortOrder,
      },
    });
    subjects[s.slug] = subject.id;
    console.log(`  Subject: ${s.name}`);
  }

  // ---------------------------------------------------------------
  // BOARD–CLASS JOINS (all boards → all applicable classes)
  // ---------------------------------------------------------------
  // CBSE, ICSE, ISC: Classes 1–12 (ISC is technically 11–12 but we allow broader for simplicity)
  // TN State Board and TN Matriculation: Classes 1–12
  const allBoardSlugs = ['cbse', 'icse', 'isc', 'tn-state-board', 'tn-matriculation'];
  for (const boardSlug of allBoardSlugs) {
    const boardId = boards[boardSlug];
    for (let i = 1; i <= 12; i++) {
      const classId = classes[i];
      await prisma.boardClass.upsert({
        where: { boardId_classId: { boardId, classId } },
        update: {},
        create: { boardId, classId },
      });
    }
  }
  console.log('  Board–Class joins created');

  // ---------------------------------------------------------------
  // DEMO USERS
  // ---------------------------------------------------------------
  const passwordHash = await bcrypt.hash('Demo@1234', 12);

  // Student user
  const student = await prisma.user.upsert({
    where: { email: 'student@demo.com' },
    update: {},
    create: {
      email: 'student@demo.com',
      passwordHash,
      firstName: 'Priya',
      lastName: 'Rajan',
      phone: '9876543210',
      role: UserRole.STUDENT,
      status: AccountStatus.ACTIVE,
      emailVerified: true,
    },
  });
  console.log(`  User: ${student.email}`);

  // Teacher user
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@demo.com' },
    update: {},
    create: {
      email: 'teacher@demo.com',
      passwordHash,
      firstName: 'Arjun',
      lastName: 'Krishnamurthy',
      phone: '9876543211',
      role: UserRole.TEACHER,
      status: AccountStatus.ACTIVE,
      emailVerified: true,
    },
  });
  console.log(`  User: ${teacher.email}`);

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      phone: '9876543212',
      role: UserRole.SUPER_ADMIN,
      status: AccountStatus.ACTIVE,
      emailVerified: true,
    },
  });
  console.log(`  User: ${admin.email}`);

  // ---------------------------------------------------------------
  // PROFILES
  // ---------------------------------------------------------------
  // Teacher profile
  await prisma.teacherProfile.upsert({
    where: { userId: teacher.id },
    update: {},
    create: {
      userId: teacher.id,
      qualification: 'M.Sc. Mathematics, B.Ed.',
      specializations: ['Mathematics', 'Physics'],
      experience: '8 years',
      subjects: ['Mathematics', 'Physics'],
      isVerified: true,
      showOnWebsite: true,
    },
  });
  console.log('  TeacherProfile created');

  // Student profile
  await prisma.studentProfile.upsert({
    where: { userId: student.id },
    update: {},
    create: {
      userId: student.id,
      boardId: boards['cbse'],
      classId: classes[10],
      state: 'Tamil Nadu',
      school: 'Demo High School',
      city: 'Chennai',
    },
  });
  console.log('  StudentProfile created');

  // ---------------------------------------------------------------
  // COURSES (4 published, featured)
  // ---------------------------------------------------------------
  const courseData = [
    {
      title: 'Class 10 CBSE — Complete Mathematics',
      slug: 'cbse-class-10-mathematics',
      description: 'A comprehensive course covering all chapters of CBSE Class 10 Mathematics including Algebra, Geometry, Trigonometry, Statistics, and Probability. Aligned with the latest CBSE syllabus.',
      shortDescription: 'Complete CBSE Class 10 Maths — all chapters, worked examples, practice questions.',
      boardSlug: 'cbse',
      classNum: 10,
      subjectSlug: 'mathematics',
      price: 149900, // ₹1,499
      isFeatured: true,
      isFree: false,
      duration: '60+ hours',
    },
    {
      title: 'Class 12 TN Board — Physics',
      slug: 'tn-board-class-12-physics',
      description: 'Full-length course for Tamil Nadu State Board Class 12 Physics covering all volumes of the Samacheer Kalvi textbook. Includes detailed derivations, solved numericals, and chapter-wise practice.',
      shortDescription: 'Complete TN Board Class 12 Physics — Samacheer Kalvi aligned.',
      boardSlug: 'tn-state-board',
      classNum: 12,
      subjectSlug: 'physics',
      price: 149900,
      isFeatured: true,
      isFree: false,
      duration: '55+ hours',
    },
    {
      title: 'NEET UG — Complete Biology',
      slug: 'neet-ug-biology',
      description: 'Comprehensive NEET UG Biology preparation covering Botany and Zoology as per the NTA syllabus. Original question bank, detailed explanations, and full-length mock tests.',
      shortDescription: 'End-to-end NEET UG Biology — Botany & Zoology, original question bank.',
      boardSlug: 'cbse',
      classNum: 12,
      subjectSlug: 'biology',
      price: 199900,
      isFeatured: true,
      isFree: false,
      examCategory: 'NEET',
      duration: '80+ hours',
    },
    {
      title: 'JEE Main — Chemistry Crash Course',
      slug: 'jee-main-chemistry',
      description: 'Focused JEE Main Chemistry preparation covering Physical, Organic, and Inorganic Chemistry. Includes concept revision, formula sheets, and previous-year pattern questions.',
      shortDescription: 'JEE Main Chemistry — Physical, Organic, Inorganic — crash course.',
      boardSlug: 'cbse',
      classNum: 12,
      subjectSlug: 'chemistry',
      price: 179900,
      isFeatured: true,
      isFree: false,
      examCategory: 'JEE',
      duration: '45+ hours',
    },
  ];

  for (const c of courseData) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title,
        slug: c.slug,
        description: c.description,
        shortDescription: c.shortDescription,
        boardId: boards[c.boardSlug],
        classId: classes[c.classNum],
        subjectId: subjects[c.subjectSlug],
        examCategory: c.examCategory,
        price: c.price,
        isFeatured: c.isFeatured,
        isFree: c.isFree,
        status: 'PUBLISHED',
        creatorId: admin.id,
        duration: c.duration,
        publishedAt: new Date(),
      },
    });
    console.log(`  Course: ${c.title}`);
  }

  // ---------------------------------------------------------------
  // EXAM CATALOGUE (5+ entries)
  // ---------------------------------------------------------------
  const examData = [
    {
      name: 'JEE Main',
      shortName: 'JEE-MAIN',
      slug: 'jee-main',
      category: 'ENGINEERING',
      conductingAuth: 'National Testing Agency (NTA)',
      officialWebsite: 'https://jeemain.nta.ac.in',
      description: 'Joint Entrance Examination (Main) is the qualifying exam for admission to NITs, IIITs, and other centrally-funded technical institutions in India. It is also the screening test for JEE Advanced.',
      eligibility: 'Students who have passed or are appearing in Class 12 (or equivalent) with Physics, Chemistry, and Mathematics. Age limit: must be born on or after October 1 of the relevant year (check official notification).',
      examPattern: 'Two sessions per year (January and April). Paper 1 (B.E./B.Tech): 90 questions — MCQ and Numerical, 3 hours. Paper 2A (B.Arch): 77 questions, 3 hours. Paper 2B (B.Planning): 100 questions, 3 hours.',
      feeInfo: 'Refer to official NTA notification for current fee structure. Fee varies by category and gender.',
      sortOrder: 1,
    },
    {
      name: 'JEE Advanced',
      shortName: 'JEE-ADV',
      slug: 'jee-advanced',
      category: 'ENGINEERING',
      conductingAuth: 'IIT (rotates annually)',
      officialWebsite: 'https://jeeadv.ac.in',
      description: 'JEE Advanced is the entrance examination for admission to the Indian Institutes of Technology (IITs). Eligibility is restricted to top performers in JEE Main.',
      eligibility: 'Must be in top 2.5 lakh qualifiers in JEE Main Paper 1. Appearing or passed Class 12 in the current academic year. Maximum two attempts in consecutive years.',
      examPattern: 'Two papers (Paper 1 and Paper 2) of 3 hours each. Multiple question types: MCQ, multiple correct, numerical, matching. Negative marking varies by question type.',
      feeInfo: 'Refer to the official JEE Advanced website for current fee details.',
      sortOrder: 2,
    },
    {
      name: 'NEET UG',
      shortName: 'NEET-UG',
      slug: 'neet-ug',
      category: 'MEDICAL',
      conductingAuth: 'National Testing Agency (NTA)',
      officialWebsite: 'https://neet.nta.ac.in',
      description: 'National Eligibility cum Entrance Test (Undergraduate) is the single national entrance exam for admission to MBBS, BDS, BAMS, BSMS, BUMS, and BHMS courses in India.',
      eligibility: 'Students who have passed or are appearing in Class 12 with Physics, Chemistry, and Biology. Minimum 50% aggregate (general); check official notification for category-wise relaxation.',
      examPattern: '180 MCQ questions — Physics (45), Chemistry (45), Biology (90). Duration: 3 hours 20 minutes. Marking: +4 for correct, -1 for wrong.',
      feeInfo: 'Refer to official NTA notification for current fee structure.',
      sortOrder: 3,
    },
    {
      name: 'BITSAT',
      shortName: 'BITSAT',
      slug: 'bitsat',
      category: 'ENGINEERING',
      conductingAuth: 'Birla Institute of Technology and Science (BITS Pilani)',
      officialWebsite: 'https://www.bitsadmission.com',
      description: 'BITS Admission Test (BITSAT) is an online computer-based test for admission to integrated first-degree programmes at BITS campuses (Pilani, Goa, Hyderabad).',
      eligibility: 'Class 12 with Physics, Chemistry, Mathematics. Minimum 75% aggregate in PCM and 60% in each subject (check official notification for current requirements).',
      examPattern: '130 questions: Physics (40), Chemistry (40), Mathematics (45), English Proficiency (10), Logical Reasoning (10). Duration: 3 hours. Negative marking: -1 per wrong answer.',
      feeInfo: 'Refer to the official BITS Admissions website for current fee structure.',
      sortOrder: 4,
    },
    {
      name: 'CUET UG',
      shortName: 'CUET-UG',
      slug: 'cuet-ug',
      category: 'UNIVERSITY',
      conductingAuth: 'National Testing Agency (NTA)',
      officialWebsite: 'https://cuet.samarth.ac.in',
      description: 'Common University Entrance Test (Undergraduate) is the central entrance exam for admission to undergraduate programmes at central universities and many state universities across India.',
      eligibility: 'Students appearing in or having passed Class 12. Subject combinations vary by university and programme.',
      examPattern: 'Section IA/IB: Languages (MCQ, 45 min per language). Section II: Domain-specific subjects (50 MCQ out of 60, 45 min each). Section III: General Test (75 out of 75 MCQ, 1 hour).',
      feeInfo: 'Refer to official NTA notification for current fee structure.',
      sortOrder: 5,
    },
  ];

  for (const e of examData) {
    await prisma.examCatalogue.upsert({
      where: { slug: e.slug },
      update: {},
      create: {
        name: e.name,
        shortName: e.shortName,
        slug: e.slug,
        category: e.category,
        conductingAuth: e.conductingAuth,
        officialWebsite: e.officialWebsite,
        description: e.description,
        eligibility: e.eligibility,
        examPattern: e.examPattern,
        feeInfo: e.feeInfo,
        sortOrder: e.sortOrder,
        lastVerified: new Date(),
        sourceLinks: [e.officialWebsite],
      },
    });
    console.log(`  ExamCatalogue: ${e.name}`);
  }

  // ---------------------------------------------------------------
  // ENQUIRIES (3 sample records)
  // ---------------------------------------------------------------
  const enquiryData = [
    {
      name: 'Kavitha Sundaram',
      email: 'kavitha@example.com',
      phone: '9876501234',
      studentClass: 'Class 10',
      board: 'CBSE',
      interest: 'Board Exam Prep',
      message: 'My daughter is in Class 10 CBSE. Looking for Mathematics and Science tuition.',
      consentGiven: true,
    },
    {
      name: 'Vijay Kannan',
      email: '',
      phone: '9876502345',
      studentClass: 'Class 11',
      board: 'TN State Board',
      interest: 'NEET Preparation',
      message: 'Interested in NEET Biology and Chemistry coaching.',
      consentGiven: true,
    },
    {
      name: 'Meena Subramaniam',
      email: 'meena@example.com',
      phone: '9876503456',
      studentClass: 'Class 12',
      board: 'CBSE',
      interest: 'JEE Preparation',
      message: 'Looking for JEE Main and Advanced coaching. Son in Class 12.',
      consentGiven: true,
    },
  ];

  for (const eq of enquiryData) {
    const existing = await prisma.enquiry.findFirst({
      where: { phone: eq.phone },
    });
    if (!existing) {
      await prisma.enquiry.create({
        data: {
          name: eq.name,
          email: eq.email || null,
          phone: eq.phone,
          studentClass: eq.studentClass,
          board: eq.board,
          interest: eq.interest,
          message: eq.message,
          consentGiven: eq.consentGiven,
          status: 'NEW',
        },
      });
      console.log(`  Enquiry: ${eq.name}`);
    } else {
      console.log(`  Enquiry already exists: ${eq.name}`);
    }
  }

  // ---------------------------------------------------------------
  // QUESTIONS (2 sample MCQ questions)
  // ---------------------------------------------------------------
  const q1 = await prisma.question.findFirst({
    where: { text: 'What is the chemical symbol for Gold?' },
  });

  if (!q1) {
    const question1 = await prisma.question.create({
      data: {
        text: 'What is the chemical symbol for Gold?',
        type: 'SINGLE_MCQ',
        subjectId: subjects['chemistry'],
        difficulty: 'EASY',
        marks: 1,
        negativeMarks: 0.25,
        explanation: 'Gold\'s chemical symbol Au comes from the Latin word "Aurum".',
        authorId: admin.id,
        isPublished: true,
        isReviewed: true,
        tags: ['Chemistry', 'Periodic Table', 'Symbols'],
      },
    });

    await prisma.questionOption.createMany({
      data: [
        { questionId: question1.id, text: 'Au', isCorrect: true, sortOrder: 1 },
        { questionId: question1.id, text: 'Ag', isCorrect: false, sortOrder: 2 },
        { questionId: question1.id, text: 'Go', isCorrect: false, sortOrder: 3 },
        { questionId: question1.id, text: 'Gd', isCorrect: false, sortOrder: 4 },
      ],
    });
    console.log('  Question 1 created');
  }

  const q2 = await prisma.question.findFirst({
    where: { text: 'Which of the following is the derivative of sin(x)?' },
  });

  if (!q2) {
    const question2 = await prisma.question.create({
      data: {
        text: 'Which of the following is the derivative of sin(x)?',
        type: 'SINGLE_MCQ',
        subjectId: subjects['mathematics'],
        difficulty: 'EASY',
        marks: 1,
        negativeMarks: 0.25,
        explanation: 'The derivative of sin(x) is cos(x). This is a standard result in differential calculus.',
        authorId: admin.id,
        isPublished: true,
        isReviewed: true,
        tags: ['Mathematics', 'Calculus', 'Derivatives', 'Trigonometry'],
      },
    });

    await prisma.questionOption.createMany({
      data: [
        { questionId: question2.id, text: '-cos(x)', isCorrect: false, sortOrder: 1 },
        { questionId: question2.id, text: 'cos(x)', isCorrect: true, sortOrder: 2 },
        { questionId: question2.id, text: 'tan(x)', isCorrect: false, sortOrder: 3 },
        { questionId: question2.id, text: '-sin(x)', isCorrect: false, sortOrder: 4 },
      ],
    });
    console.log('  Question 2 created');
  }

  console.log('\n✅ Seed complete!');
  console.log('\n📧 Demo credentials:');
  console.log('   student@demo.com  / Demo@1234  (role: STUDENT)');
  console.log('   teacher@demo.com  / Demo@1234  (role: TEACHER)');
  console.log('   admin@demo.com    / Demo@1234  (role: SUPER_ADMIN)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
