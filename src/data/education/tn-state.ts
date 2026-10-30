import { ClassCurriculum } from './types';

export const TN_STATE_CLASSES_CURRICULUM: ClassCurriculum[] = [
  // ==========================================
  // TN STATE BOARD CLASS 6
  // ==========================================
  {
    boardSlug: 'tn-state-board',
    classNumber: 6,
    classSlug: 'class-6',
    title: 'Tamil Nadu State Board Class 6',
    academicStage: 'Middle School (6–8)',
    overview:
      'Tamil Nadu State Board (Samacheer Kalvi / சீரான கல்வி முறை) Class 6 provides a balanced, child-centric, bilingual curriculum. Structured across three terms under TN SCERT guidelines, it instills classical Tamil literary appreciation, foundational arithmetic and algebra, practical scientific inquiry, and regional Tamil historical heritage.',
    keyFocusAreas: [
      'Classical and modern Tamil literature: Bharathidasan, Silappathikaram, Thirukkural, and fundamental grammar (இலக்கணம்)',
      'Numbers up to crores, estimation, fundamental algebra, ratio, geometry, and information processing (தகவல் செயலாக்கம்)',
      'Science: Measurements (அளவீடுகள்), Forces and Motion (விசையும் இயக்கமும்), Matter, Living World of Plants & Animals',
      'Ancient Tamilagam heritage, Sangam age civilization, planetary systems, and democratic equality',
    ],
    subjects: [
      {
        id: 'tn-6-tamil',
        slug: 'tamil',
        name: 'Tamil (தமிழ்)',
        code: '001',
        boardSlug: 'tn-state-board',
        classNumber: 6,
        icon: 'BookOpen',
        color: 'from-amber-500 to-orange-600',
        description: {
          overview:
            'வகுப்பு 6 தமிழ் பாடத்திட்டம் மாணவர்களுக்கு செம்மொழியான தமிழ் மொழியின் இனிமை, தொன்மை, இலக்கிய வளம் மற்றும் இலக்கண அடிப்படைகளை அறிமுகப்படுத்துகிறது. செய்யுள், உரைநடை, துணைப்பாடம் மற்றும் இலக்கணம் ஆகிய பகுதிகள் வழியாக மாணவர்களின் வாசிப்பு, எழுத்து மற்றும் படைப்பாற்றலை வளர்க்கிறது.',
          whatStudentsLearn: [
            'இன்பத்தமிழ் (பாரதிதாசன்) மற்றும் தமிழ்க்கும்மி (பெருஞ்சித்திரனார்) கவிதைகள்',
            'சிலப்பதிகாரம் (இளங்கோவடிகள்) மற்றும் காணி நிலம் (பாரதியார்) பாடல் நயங்கள்',
            'திருக்குறள் வாழ்வியல் விழுமியங்கள் மற்றும் உலகப் பொதுமறை கருத்துக்கள்',
            'வளர்தமிழ், சிறகின் ஓசை, கிழவனும் கடலும் போன்ற உரைநடை மற்றும் சிறுகதைகள்',
            'இலக்கணம்: தமிழ் எழுத்துகளின் வகை, தொகை (உயிர், மெய், உயிர்மெய், ஆய்தம்), மாத்திரை அளவு',
            'மொழித்திறன் பயிற்சிகள்: கட்டுரை எழுதுதல், கடிதம் வரைதல், சொற்றொடர் அமைத்தல்',
          ],
          importantTopicsCovered: [
            'பாரதிதாசனின் தமிழ் பற்று மற்றும் செய்யுள் சொற்பொருள்',
            'இளங்கோவடிகள் அருளிய இயற்கை போற்றுதல் (திங்களைப் போற்றுதும், ஞாயிறு போற்றுதும்)',
            'பறவைகள் வலசை போதல் மற்றும் சுற்றுச்சூழல் பாதுகாப்பு',
            'எழுத்துகளின் மாத்திரை அளவு கணக்கிடுதல் (குறில் 1 மாத்திரை, நெடில் 2 மாத்திரை, மெய்/ஆய்தம் ½ மாத்திரை)',
            'திருக்குறள் மனப்பாடப் பகுதிகள் மற்றும் பொருள் விளக்கம்',
          ],
          learningObjectives: [
            'தமிழ் செய்யுள்களை சரியான ஓசை நயத்துடன் பிழையின்றி வாசித்துப் பொருள் உணர்தல்',
            'தமிழ் எழுத்துகளின் வகைகளையும் அவற்றின் மாத்திரை அளவுகளையும் சரியாகக் கணக்கிடுதல்',
            'அன்றாட வாழ்வில் தாய்மொழியை பிழையின்றி பேசவும் எழுதவும் ஆற்றல் பெறுதல்',
          ],
          practicalApplications: [
            'தாய்மொழியில் கவிதைகள், உரைகள் மற்றும் கட்டுரைகளை சுயமாகப் படைத்தல்',
            'பள்ளியிலும் சமூகத்திலும் தமிழ் இலக்கிய மன்றப் போட்டிகளில் பங்கேற்று வெற்றி பெறுதல்',
          ],
          skillsDeveloped: [
            'செம்மொழித் தமிழ் வாசிப்பு மற்றும் உச்சரிப்புத் திறன்',
            'செய்யுள் நயங்களை ரசித்து எழுதும் படைப்புத் திறன்',
            'இலக்கணப் பிழையின்றி எழுதும் சொல்வளம்',
          ],
          academicProgression:
            'வகுப்பு 7 முதல் 10 வரை உள்ள சங்க இலக்கியங்கள், காப்பியங்கள் மற்றும் பத்தாம் வகுப்பு பொதுத்தேர்வுக்கான (SSLC) அடித்தளத்தை அமைக்கிறது.',
        },
        prescribedTextbooks: [
          { title: 'தமிழ் — பருவம் 1, 2, 3 (வகுப்பு 6)', publisher: 'தமிழ்நாடு அரசு பாடநூல் மற்றும் கல்வியியல் பணிகள் கழகம் (TN SCERT)' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2.5,
          breakdown: ['எழுத்துத் தேர்வு: 80 மதிப்பெண்கள்', 'வகுப்பறை செயல்பாடுகள் & நோட்டுப் புத்தகம்: 10 மதிப்பெண்கள்', 'வாசிப்பு & வாய்மொழித் திறன்: 10 மதிப்பெண்கள்'],
        },
        chapters: [
          {
            id: 'tn-6-tam-ch1',
            number: 1,
            slug: 'inba-tamil',
            title: 'மொழி — இன்பத்தமிழ் & தமிழ்க்கும்மி',
            description: 'பாரதிதாசனின் இன்பத்தமிழ் கவிதை, பெருஞ்சித்திரனாரின் தமிழ்க்கும்மி, தமிழ் எழுத்துகளின் வகை மற்றும் மாத்திரை அளவு.',
            hours: 8,
            weightageMarks: 10,
            learningObjectives: ['இன்பத்தமிழ் பாடலை மனப்பாடம் செய்து சந்த நயத்துடன் பாடுதல்', 'எழுத்துகளின் மாத்திரை அளவைக் கண்டறிந்து கணக்கிடுதல்'],
            importantTopics: ['பாரதிதாசன் கவிதை நயங்கள்', 'பெருஞ்சித்திரனார் கணிச்சாறு பாடல்கள்', 'உயிர், மெய், உயிர்மெய் எழுத்துக்கள்', 'மாத்திரை அளவு (குறில், நெடில், ஒற்றெழுத்து)'],
            materials: [
              {
                id: 'm-tn-6-tam-1',
                title: 'இன்பத்தமிழ் முழுமையான பாடக் குறிப்புகள் & வினா-விடைகள்',
                type: 'notes',
                description: 'முழுமையான செய்யுள் விளக்கம், சொல்லும் பொருளும், பாடநூல் வினாக்கள் மற்றும் கூடுதல் வினா-விடைகள்.',
                fileSize: '1.2 MB',
              },
            ],
            assignments: [
              {
                id: 'as-tn-6-tam-1',
                title: 'இலக்கணப் பயிற்சி — மாத்திரை அளவு கணக்கிடுதல்',
                level: 'Level 1 - Foundational',
                estimatedTime: '25 mins',
                questions: [
                  {
                    id: 'q-tn-t-1',
                    question: "'கபிலர்' என்னும் சொல்லின் மாத்திரை அளவைக் கணக்கிடுக.",
                    explanation: "க (குறில்) = 1, பி (குறில்) = 1, ல (குறில்) = 1, ர் (மெய்) = ½. ஆக மொத்தம் 1 + 1 + 1 + ½ = 3½ மாத்திரை.",
                    marks: 2,
                  },
                ],
              },
            ],
            notesSummary: 'தமிழ் மொழியின் இனிமையைப் போற்றும் பாரதிதாசன், தமிழை உயிருக்கு இணையானது என்கிறார். தமிழ் எழுத்துகள் ஒலிக்கும் கால அளவே மாத்திரை எனப்படும்.',
            keyFormulasOrTerms: ['குறில் ஒலிக்கும் கால அளவு = 1 மாத்திரை', 'நெடில் ஒலிக்கும் கால அளவு = 2 மாத்திரை', 'மெய் எழுத்து & ஆய்த எழுத்து = ½ மாத்திரை'],
          },
        ],
      },
      {
        id: 'tn-6-maths',
        slug: 'mathematics',
        name: 'Mathematics (கணிதம்)',
        boardSlug: 'tn-state-board',
        classNumber: 6,
        icon: 'Calculator',
        color: 'from-blue-500 to-indigo-600',
        description: {
          overview:
            'Tamil Nadu State Board Class 6 Mathematics develops fundamental numeracy, spatial concepts, and logical thinking. Covered across three terms in both Tamil and English mediums, topics include Numbers, Introduction to Algebra, Ratio and Proportion, Geometry, Mensuration, Statistics, and Information Processing.',
          whatStudentsLearn: [
            'Numbers: large numbers up to 8 digits, place value, Indian and International system, estimation, order of operations (BIDMAS), whole numbers',
            'Introduction to Algebra: patterns, variables, algebraic expressions, linear equations with one variable',
            'Ratio and Proportion: definition, equivalent ratios, comparison, unitary method and real-life pricing',
            'Geometry: lines, line segments, rays, angles (acute, obtuse, right, straight, reflex), measuring angles using protractor',
            'Statistics: data collection, tally marks, frequency table, pictographs, and bar graphs',
            'Information Processing: systematic listing, magic squares, Sudoku puzzles, and step-by-step problem flowcharts',
            'Mensuration: perimeter of polygons and area of rectangles, squares, and right triangles',
          ],
          importantTopicsCovered: [
            'BIDMAS Rule for nested bracket arithmetic evaluation',
            'Unitary Method: finding cost of 1 unit and multiplying for required quantity',
            'Angles classification and protractor measurement',
            'Area and Perimeter of rectilinear figures: Area of rectangle = l × b, Square = a²',
            'Systematic counting and tree diagrams in information processing',
          ],
          learningObjectives: [
            'Compare and compute large numbers across Indian and International systems',
            'Formulate simple linear algebraic expressions for word problems',
            'Measure and construct angles accurately using standard geometry instruments',
            'Calculate fencing perimeters and flooring areas for everyday architectural shapes',
          ],
          practicalApplications: [
            'Supermarket unit cost calculation using ratio, proportion, and unitary method',
            'Calculating wall paint area and floor tiling requirements in construction',
            'Interpreting meteorological rainfall charts and cricket run rates using bar graphs',
          ],
          skillsDeveloped: [
            'Numerical fluency and order of operations execution',
            'Geometric instrument handling and angle classification',
            'Proportional reasoning and commercial calculation',
          ],
          academicProgression:
            'Lays the foundation for Class 7 rational numbers, triangle congruence, and Class 10 SSLC public exam mathematics.',
        },
        prescribedTextbooks: [
          { title: 'Mathematics — Term 1, 2, 3 Class 6', publisher: 'Tamil Nadu Textbook and Educational Services Corporation (TN SCERT)' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2.5,
          breakdown: ['Written Term Examination: 80 Marks', 'FA-a (Formative assessment - activities): 10 Marks', 'FA-b (Formative assessment - slip tests): 10 Marks'],
        },
        chapters: [
          {
            id: 'tn-6-m-ch1',
            number: 1,
            slug: 'numbers',
            title: 'Numbers (எண்கள்)',
            description: 'Comparison of large numbers, place value chart, Indian and International systems, use of brackets, BIDMAS rule, and estimation.',
            hours: 8,
            weightageMarks: 10,
            learningObjectives: ['Compare numbers up to 8 digits using > and < symbols', 'Evaluate complex arithmetic expressions using the BIDMAS rule'],
            importantTopics: ['Successor and Predecessor', 'Place Value in Indian and International Systems', 'BIDMAS (Brackets, Indices, Division, Multiplication, Addition, Subtraction)', 'Estimation and Rounding off to nearest Tens, Hundreds, Thousands'],
            materials: [
              {
                id: 'm-tn-6-m-1',
                title: 'Numbers Study Guide & Samacheer Solved Exercises',
                type: 'notes',
                description: 'Complete bilingual notes (Tamil & English) with place value tables, BIDMAS examples, and textbook exercise solutions.',
                fileSize: '1.4 MB',
              },
            ],
            assignments: [
              {
                id: 'as-tn-6-m-1',
                title: 'BIDMAS Order of Operations Worksheet',
                level: 'Level 1 - Foundational',
                estimatedTime: '30 mins',
                questions: [
                  {
                    id: 'q-tn-6-m1',
                    question: 'Simplify using BIDMAS: 20 + [8 × 2 + {6 × 3 - (10 ÷ 5)}].',
                    explanation: 'Step 1: Innermost parentheses: 10 ÷ 5 = 2. Step 2: Curly braces: 6 × 3 - 2 = 18 - 2 = 16. Step 3: Square bracket: 8 × 2 + 16 = 16 + 16 = 32. Step 4: Final addition: 20 + 32 = 52.',
                    marks: 3,
                  },
                ],
              },
            ],
            notesSummary: 'The BIDMAS rule dictates the exact sequential precedence of operations to ensure unique and error-free arithmetic evaluation.',
            keyFormulasOrTerms: ['BIDMAS: Brackets, Indices, Division, Multiplication, Addition, Subtraction', '1 Crore = 100 Lakhs = 10 Millions', 'Estimation: Round up if digit >= 5, else round down'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // TN STATE BOARD CLASS 10 (SSLC Public Examination)
  // ==========================================
  {
    boardSlug: 'tn-state-board',
    classNumber: 10,
    classSlug: 'class-10',
    title: 'Tamil Nadu State Board Class 10',
    academicStage: 'Secondary School (9–10)',
    overview:
      'Tamil Nadu Class 10 culminates in the state-wide Secondary School Leaving Certificate (SSLC) Public Examination conducted by the Directorate of Government Examinations (DGE). Renowned for its rigorous syllabus, the curriculum tests students on Relations & Functions, Coordinate Geometry, Trigonometry, Science, Social Sciences, English, and Tamil literature.',
    keyFocusAreas: [
      'Comprehensive SSLC public examination blueprint: 1-mark objective, 2-mark short, 5-mark structured, and 8-mark geometry/graph questions',
      'Mathematics: Relations and Functions, AP and GP sequences, Algebra (Matrices, Quadratics), Geometry, Mensuration, Statistics and Probability',
      'Science: Laws of Motion, Optics, Thermal Physics, Electricity, Acoustics, Nuclear Physics, Periodic Table, Genetics, Reproduction, Biotechnology',
      'Social Science: Tamil Nadu freedom struggle, social reform movements, physical and human geography of Tamil Nadu, Indian Constitution',
      'Tamil Language: Classical Sangam poetry, Silappathikaram, Kamba Ramayanam, Thirukkural, and advanced grammatical structures',
    ],
    subjects: [
      {
        id: 'tn-10-maths',
        slug: 'mathematics',
        name: 'Mathematics (கணிதம்)',
        code: '003',
        boardSlug: 'tn-state-board',
        classNumber: 10,
        icon: 'Calculator',
        color: 'from-blue-500 to-indigo-600',
        description: {
          overview:
            'Tamil Nadu Class 10 Mathematics is the cornerstone subject of the SSLC Public Examination. Mapped strictly to the TN SCERT textbook, it encompasses Relations and Functions, Numbers and Sequences (AP, GP), Algebra (Simultaneous equations, Matrices, Quadratic roots), Geometry (Thales, Pythagoras, Tangent theorems), Coordinate Geometry, Trigonometry, Mensuration, and Statistics/Probability.',
          whatStudentsLearn: [
            'Relations and Functions: Cartesian product, relations, functions, representation of functions, types of functions, composition of functions (fog, gof)',
            'Numbers and Sequences: Euclid Division Lemma, Fundamental Theorem of Arithmetic, Modular Arithmetic, Arithmetic Progression (AP), Geometric Progression (GP), and sum of special series (Σn, Σn², Σn³)',
            'Algebra: simultaneous linear equations in three variables, GCD and LCM of polynomials, rational expressions, square root of polynomials, quadratic equations, nature of roots, relations between roots and coefficients, and Matrices (types, addition, multiplication, transpose)',
            'Geometry: Thales Theorem (Basic Proportionality Theorem), Angle Bisector Theorem, Pythagoras Theorem, Circles and Tangents, Alternate Segment Theorem, Practical Geometry (construction of triangles, tangents to a circle)',
            'Coordinate Geometry: area of a triangle, area of a quadrilateral, inclination and slope of a straight line, equations of straight lines (various forms: slope-intercept, point-slope, two-point, intercept form)',
            'Trigonometry: trigonometric identities, heights and distances (angle of elevation, angle of depression, multi-ship/tower survey problems)',
            'Mensuration: surface area and volume of Cylinder, Hollow Cylinder, Cone, Sphere, Hemisphere, Frustum of a cone, volume of combined solids, and conversion of solids',
            'Statistics and Probability: measures of dispersion (Range, Standard Deviation σ, Coefficient of Variation CV), Probability of events, and Addition Theorem of Probability P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
          ],
          importantTopicsCovered: [
            'Composition of Functions: verifying associative property f o (g o h) = (f o g) o h',
            'Sum of n terms of Geometric Progression: S_n = a(r^n - 1) / (r - 1) and sum of special series',
            'Square root of polynomials by division method (frequently tested in 5-mark questions)',
            'Formal proofs of Thales Theorem, Angle Bisector Theorem, and Pythagoras Theorem',
            'Area of Quadrilateral using coordinate vertices formula',
            'Heights and Distances multi-step numericals using tan 30°, tan 45°, tan 60°',
            'Volume and Surface Area of combined solids (e.g. cylinder surmounted by cone/hemisphere)',
            'Standard Deviation calculation (Assumed Mean and Step Deviation methods)',
            'Practical Geometry (8 Marks): Tangents to a circle from an external point and Triangles',
            'Graph (8 Marks): Quadratic graphs y = ax² + bx + c and nature of solutions',
          ],
          learningObjectives: [
            'Solve systems of linear equations in three variables and perform matrix operations',
            'Prove geometric theorems rigorously and construct tangents to circles to millimeter precision',
            'Calculate statistical standard deviation and evaluate data consistency using coefficient of variation',
            'Apply addition theorems of probability to solve multi-event random experiment problems',
          ],
          practicalApplications: [
            'Civil construction surveying for tall transmission towers using trigonometric elevation angles',
            'Quality control consistency testing in textile and manufacturing industries using coefficient of variation',
            'Packaging industry volumetric optimization using combination of cylinder, cone, and spherical solids',
          ],
          skillsDeveloped: [
            'Systematic algorithmic algebraic calculation',
            'Geometric proof deduction and technical drafting',
            'Statistical dispersion and reliability analysis',
            'Matrix modeling and transformation algebra',
          ],
          academicProgression:
            'Essential prerequisite for Class 11 & 12 Higher Secondary Mathematics (Calculus, Analytical Geometry, Probability) and engineering entrance exams.',
        },
        prescribedTextbooks: [
          { title: 'Mathematics — Class 10 (கணிதம் — பத்தாம் வகுப்பு)', publisher: 'Tamil Nadu Textbook and Educational Services Corporation (TN SCERT)', officialCode: '10-Math-TN' },
        ],
        evaluationScheme: {
          theoryMarks: 100,
          practicalOrInternalMarks: 0,
          totalMarks: 100,
          durationHours: 3,
          breakdown: [
            'Part I (14 Questions × 1 Mark = 14 Marks): Multiple Choice Questions',
            'Part II (10 Questions out of 14 × 2 Marks = 20 Marks): Short Answer Questions (Q.28 compulsory)',
            'Part III (10 Questions out of 14 × 5 Marks = 50 Marks): Detailed Problem Solving (Q.42 compulsory)',
            'Part IV (2 Questions × 8 Marks = 16 Marks): Practical Geometry & Graph (Internal choice)',
          ],
        },
        chapters: [
          {
            id: 'tn-10-m-ch1',
            number: 1,
            slug: 'relations-and-functions',
            title: 'Relations and Functions (உறவுகளும் சார்புகளும்)',
            description: 'Ordered pairs, Cartesian product, relations, representation of relations, functions, vertical line test, types of functions (one-one, onto, bijection), and composition of functions.',
            hours: 12,
            weightageMarks: 12,
            learningObjectives: ['Find the Cartesian product of two and three sets', 'Determine domain, co-domain, and range of relations', 'Verify whether a given relation is a function using vertical line test', 'Evaluate composite functions fog and gof and prove associative law'],
            importantTopics: ['Cartesian Product: A × B', 'Definition of a Relation and Arrow Diagrams', 'Functions as Special Relations and Vertical Line Test', 'Types of Functions: One-to-One (Injective), Onto (Surjective), Bijective, Identity, Constant', 'Composition of Functions: f(g(x)) and Associative Property f o (g o h) = (f o g) o h'],
            materials: [
              {
                id: 'm-tn-10-m-1',
                title: 'Relations & Functions Complete SSLC Public Exam Guide',
                type: 'notes',
                description: 'Full chapter notes with arrow diagrams, function classification charts, and solved 5-mark public exam problems.',
                fileSize: '2.1 MB',
                downloadFilename: 'TN_Class10_Maths_Ch1_RelationsFunctions.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-tn-10-m-1',
                title: 'SSLC 5-Mark Problem Set — Composition of Functions',
                level: 'Level 3 - Exemplar / HOTS',
                estimatedTime: '45 mins',
                questions: [
                  {
                    id: 'q-tn-10-m1',
                    question: 'If f(x) = 2x + 3, g(x) = 1 - 2x, and h(x) = 3x, prove that f o (g o h) = (f o g) o h.',
                    explanation: 'LHS: (g o h)(x) = g(h(x)) = g(3x) = 1 - 2(3x) = 1 - 6x. f o (g o h)(x) = f(1 - 6x) = 2(1 - 6x) + 3 = 2 - 12x + 3 = 5 - 12x. RHS: (f o g)(x) = f(g(x)) = f(1 - 2x) = 2(1 - 2x) + 3 = 2 - 4x + 3 = 5 - 4x. ((f o g) o h)(x) = (f o g)(h(x)) = (f o g)(3x) = 5 - 4(3x) = 5 - 12x. LHS = RHS = 5 - 12x. Hence proved.',
                    marks: 5,
                  },
                ],
              },
            ],
            notesSummary: 'A function is a relation where each element of the domain has a unique image in the co-domain. Function composition is associative but generally not commutative.',
            keyFormulasOrTerms: ['n(A × B) = n(A) × n(B)', 'f o g ≠ g o f (Generally not commutative)', 'f o (g o h) = (f o g) o h (Always associative)', 'Vertical Line Test: A curve is a function if any vertical line intersects it at most once'],
          },
        ],
        previousYearPapers: [
          {
            id: 'tn-10-m-pyq-2024',
            year: 2024,
            session: 'DGE Tamil Nadu SSLC Public Examination',
            title: 'Tamil Nadu Class 10 Mathematics Official Public Exam Question Paper',
            totalMarks: 100,
            duration: '3 hours',
            solutionsAvailable: true,
            highlights: ['Official Government DGE Key with step-by-step mark breakdown', 'Solutions for 8-mark Geometry and Quadratic Graph', 'Centum scoring guide for 100/100'],
          },
        ],
      },
      {
        id: 'tn-10-science',
        slug: 'science',
        name: 'Science (அறிவியல்)',
        code: '004',
        boardSlug: 'tn-state-board',
        classNumber: 10,
        icon: 'Atom',
        color: 'from-emerald-500 to-teal-600',
        description: {
          overview:
            'Tamil Nadu Class 10 Science is an integrated physical, chemical, and biological science curriculum. It provides comprehensive training for the SSLC public examination, covering Newton laws of motion, optics, acoustics, nuclear physics, periodic classification, solutions, chemical reactions, plant anatomy, human physiology, genetics, and environmental biotechnology.',
          whatStudentsLearn: [
            'Physics: Laws of Motion, Optics (refraction, lenses, human eye), Thermal Physics, Electricity, Acoustics, Nuclear Physics (radioactivity, nuclear fission, fusion)',
            'Chemistry: Atoms and Molecules (Avogadro law, mole concept), Periodic Classification of Elements, Solutions, Types of Chemical Reactions, Carbon and its Compounds',
            'Biology: Plant Anatomy and Plant Physiology, Structural Organisation of Animals (Leech & Rabbit), Transportation in Plants and Animals, Nervous System, Plant and Animal Hormones, Reproduction in Plants and Animals, Heredity and Evolution, Breeding and Biotechnology, Environmental Management',
          ],
          importantTopicsCovered: [
            'Newton Second Law and momentum derivation: F = ma',
            'Snell Law and Convex/Concave lens ray diagrams and Lens formula',
            'Joule Heating Law: H = I²Rt and domestic electric circuits',
            'Doppler Effect in sound and conditions where Doppler shift is zero',
            'Nuclear Fission vs Nuclear Fusion and Atom bomb vs Hydrogen bomb mechanisms',
            'Modern Periodic Law and periodic trends across periods and groups',
            'Dicot root vs Monocot root internal anatomy and vascular bundle differences',
            'Human four-chambered heart structure, double circulation, and cardiac cycle',
            'Endocrine glands: Pituitary, Thyroid, Pancreas (Insulin/Glucagon), Adrenal glands',
            'Mendel Monohybrid cross and DNA double helix model of Watson and Crick',
          ],
          learningObjectives: [
            'Derive physical laws of mechanics and optics and solve numerical problems on electric power and refractive index',
            'Balance chemical reactions, classify ionic/covalent compounds, and calculate relative molecular masses',
            'Diagram biological organ systems (human heart, brain, nephron, flower) with accurate anatomical labels',
            'Explain genetic inheritance and biotechnological applications like recombinant DNA technology',
          ],
          practicalApplications: [
            'Calculating domestic electricity bills and identifying power ratings of household appliances',
            'Selecting corrective lenses for eye vision defects (myopia and hypermetropia)',
            'Conserving regional Tamil Nadu water bodies using rainwater harvesting structures',
          ],
          skillsDeveloped: [
            'Empirical scientific observation and experimental documentation',
            'Biological anatomical diagramming and specimen identification',
            'Chemical stoichiometric calculation and reaction equation balancing',
          ],
          academicProgression:
            'Prerequisite for Higher Secondary (HSC) Class 11 & 12 Physics, Chemistry, Biology, and competitive exams (NEET UG, JEE Main).',
        },
        prescribedTextbooks: [
          { title: 'Science — Class 10 (அறிவியல் — பத்தாம் வகுப்பு)', publisher: 'Tamil Nadu Textbook and Educational Services Corporation (TN SCERT)', officialCode: '10-Sci-TN' },
        ],
        evaluationScheme: {
          theoryMarks: 75,
          practicalOrInternalMarks: 25,
          totalMarks: 100,
          durationHours: 2.5,
          breakdown: [
            'Part I (12 Questions × 1 Mark = 12 Marks): Multiple Choice Questions',
            'Part II (7 Questions out of 10 × 2 Marks = 14 Marks): Short Answer Questions (Q.22 compulsory)',
            'Part III (7 Questions out of 10 × 4 Marks = 28 Marks): Detailed Questions (Q.32 compulsory)',
            'Part IV (3 Questions × 7 Marks = 21 Marks): Essay type questions with internal choice',
            'Science Practical Examination: 25 Marks (Experiments, Observation, Record)',
          ],
        },
        chapters: [
          {
            id: 'tn-10-sci-ch1',
            number: 1,
            slug: 'laws-of-motion',
            title: 'Laws of Motion (இயக்க விதிகள்)',
            description: 'Force and motion, inertia, linear momentum, Newton three laws of motion, force units, impulse, principle of conservation of linear momentum, and rocket propulsion.',
            hours: 10,
            weightageMarks: 8,
            learningObjectives: ['Define inertia and classify its types (rest, motion, direction)', 'State Newton second law and derive F = ma', 'Apply the principle of conservation of linear momentum to rocket propulsion'],
            importantTopics: ['Inertia: Rest, Motion, Direction with real-life examples', 'Newton First, Second, and Third Laws of Motion', 'Derivation of F = ma from rate of change of momentum', 'Impulse (J = F × Δt = Δp) and Shock Absorbers', 'Principle of Conservation of Linear Momentum Proof', 'Rocket Propulsion Mechanics (Action-Reaction and Momentum Conservation)', 'Apparent Weight and Weightlessness in Elevators'],
            materials: [
              {
                id: 'm-tn-10-s-1',
                title: 'Laws of Motion Complete SSLC Revision Notes',
                type: 'notes',
                description: 'Full chapter notes with textbook book-back solutions, creative questions, and rocket propulsion diagrams.',
                fileSize: '1.8 MB',
                downloadFilename: 'TN_Class10_Science_Ch1_LawsOfMotion.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-tn-10-s-1',
                title: 'SSLC Public Exam Problems — Laws of Motion',
                level: 'Level 2 - Application',
                estimatedTime: '35 mins',
                questions: [
                  {
                    id: 'q-tn-10-s1',
                    question: 'State Newton second law of motion and derive the formula F = ma.',
                    explanation: 'Newton second law states that the force acting on a body is directly proportional to the rate of change of linear momentum and acts in the direction of force. Let mass be m, initial velocity u, final velocity v, in time t. Initial momentum p₁ = mu, Final momentum p₂ = mv. Change in momentum Δp = mv - mu = m(v - u). Rate of change of momentum = m(v - u) / t = ma (since a = (v - u)/t). By Newton second law: F ∝ ma => F = kma. In SI units k = 1, hence F = ma.',
                    marks: 4,
                  },
                ],
              },
            ],
            notesSummary: 'Force is an external agency that alters the state of rest or uniform motion. Linear momentum is conserved in any isolated system without external forces.',
            keyFormulasOrTerms: ['Momentum p = m × v', 'Force F = m × a', 'Impulse J = F × t = mv - mu', 'Weightlessness: Apparent weight R = 0 when acceleration a = g'],
          },
        ],
        previousYearPapers: [
          {
            id: 'tn-10-sci-pyq-2024',
            year: 2024,
            session: 'DGE Tamil Nadu SSLC Public Examination',
            title: 'Tamil Nadu Class 10 Science Official Public Exam Question Paper',
            totalMarks: 75,
            duration: '2.5 hours',
            solutionsAvailable: true,
            highlights: ['Official Government DGE key with step-by-step marking rubrics', 'Model question paper with diagram marking keys', 'Centum preparation guide'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // TN STATE BOARD CLASS 12 (HSC +2 Public Examination)
  // ==========================================
  {
    boardSlug: 'tn-state-board',
    classNumber: 12,
    classSlug: 'class-12',
    title: 'Tamil Nadu State Board Class 12',
    academicStage: 'Senior Secondary (11–12)',
    overview:
      'Tamil Nadu Higher Secondary Second Year (Class 12 / +2) culminates in the state-wide Higher Secondary Certificate (HSC) Public Examination. The syllabus provides intensive preparation for university engineering admissions (TNEA cut-off), medical entrance (NEET UG), and arts & science degrees.',
    keyFocusAreas: [
      'Comprehensive HSC public examination pattern: 1-mark objective questions, 2-mark short questions, 3-mark analytical questions, and 5-mark structured essay questions',
      'Physics: Electrostatics, Current Electricity, Magnetism, AC Circuits, Optics, Dual Nature, Nuclear Physics, Semiconductor Devices',
      'Chemistry: Metallurgy, Coordination Compounds, Solid State, Chemical Kinetics, Hydroxy Compounds, Carbonyls, Biomolecules',
      'Mathematics: Matrices, Complex Numbers, Analytical Geometry, Differential and Integral Calculus, Differential Equations, Discrete Mathematics',
      'Biology: Bio-Botany & Bio-Zoology with extensive practical laboratory training',
    ],
    subjects: [
      {
        id: 'tn-12-physics',
        slug: 'physics',
        name: 'Physics (இயற்பியல்)',
        code: '055',
        boardSlug: 'tn-state-board',
        classNumber: 12,
        stream: 'Science',
        icon: 'Zap',
        color: 'from-violet-500 to-purple-600',
        description: {
          overview:
            'Tamil Nadu Class 12 Physics covers electrostatics, current electricity, magnetic effects of current, electromagnetic induction, alternating currents, electromagnetic waves, ray and wave optics, dual nature of radiation, atomic and nuclear physics, and semiconductor electronics.',
          whatStudentsLearn: [
            'Electrostatics: Coulomb law, electric dipole, Gauss law and applications, electrostatic potential, parallel plate capacitor, Van de Graaff generator',
            'Current Electricity: Ohm law, microscopic model of current, drift velocity, Kirchhoff rules, Wheatstone bridge, Meter Bridge, Potentiometer, Seebeck effect, Peltier effect, Thomson effect',
            'Magnetism and Magnetic Effects of Electric Current: Biot-Savart law, tangent galvanometer, Ampere circuital law, solenoid, toroid, Lorentz force, cyclotron, moving coil galvanometer, magnetic materials',
            'Electromagnetic Induction and Alternating Current: Faraday laws, Lenz law, self and mutual induction, eddy currents, AC generator, series LCR circuit, resonance, Q-factor, transformers',
            'Optics: reflection, spherical mirrors, refraction, total internal reflection, lens maker formula, prism, optical instruments, Huygens principle, wave optics, interference, diffraction, polarisation',
            'Dual Nature of Radiation and Matter: photoelectric effect, Hertz/Hallwachs observations, Einstein photoelectric equation, de Broglie matter waves, electron microscope',
            'Atomic and Nuclear Physics: electric discharge in gases, J.J. Thomson e/m ratio, Millikan oil drop experiment, Rutherford and Bohr atom models, hydrogen spectrum, radioactivity, nuclear fission, fusion',
            'Semiconductor Electronics: energy bands, intrinsic and extrinsic semiconductors, p-n junction diode, rectifiers, Zener diode, LEDs, solar cells, transistors, logic gates, De Morgan theorems',
          ],
          importantTopicsCovered: [
            'Electric field on axial and equatorial lines of an electric dipole (5-mark question)',
            'Gauss Law applications: Electric field due to an infinitely long charged wire and plane sheet',
            'Wheatstone Bridge condition derivation using Kirchhoff rules: P / Q = R / S',
            'Cyclotron construction and working, resonance frequency derivation: f = qB / (2πm)',
            'Series LCR Circuit impedance derivation using phasor diagram: Z = √[R² + (X_L - X_C)²]',
            'Lens Maker formula derivation: 1/f = (n - 1)[(1/R₁) - (1/R₂)]',
            'Young Double Slit Experiment fringe width expression: β = λD / d',
            'Einstein Photoelectric Equation: hν = hν₀ + ½mv² and verification of photoelectric laws',
            'Bohr model radius and energy derivation for hydrogen atom: r_n = 0.529 n² Å, E_n = -13.6/n² eV',
            'Half-wave and Full-wave rectifiers with circuit diagrams and efficiency calculation',
          ],
          learningObjectives: [
            'Derive fundamental electrodynamic and optical equations using vector analysis and calculus',
            'Solve complex multi-loop circuit numerical problems using Kirchhoff rules and Wheatstone bridge theorems',
            'Analyze AC reactive resonance circuits and calculate power factor and quality factor',
            'Explain atomic quantum energy levels and write balanced nuclear decay equations',
          ],
          practicalApplications: [
            'High-voltage electric charge generation using Van de Graaff generators for particle accelerators',
            'Electrical grid power transmission using high-efficiency step-up and step-down AC transformers',
            'Fiber-optic high-speed internet data transmission using total internal reflection',
          ],
          skillsDeveloped: [
            'Formal mathematical derivation of physical laws',
            'Laboratory electrical circuit wiring and meter bridge measurement',
            'Optical spectrometer and lens bench alignment',
          ],
          academicProgression:
            'Critical score for TNEA engineering admission cut-off (200 marks scale) and medical entrance exams (NEET UG).',
        },
        prescribedTextbooks: [
          { title: 'Physics Volume 1 & 2 — Class 12 (இயற்பியல் மேல்நிலை இரண்டாம் ஆண்டு)', publisher: 'Tamil Nadu Textbook and Educational Services Corporation (TN SCERT)', officialCode: '12-Phy-TN' },
        ],
        evaluationScheme: {
          theoryMarks: 70,
          practicalOrInternalMarks: 30,
          totalMarks: 100,
          durationHours: 3,
          breakdown: [
            'Part I (15 Questions × 1 Mark = 15 Marks): Multiple Choice Questions',
            'Part II (6 Questions out of 9 × 2 Marks = 12 Marks): Short Answer (Q.24 compulsory numerical)',
            'Part III (6 Questions out of 9 × 3 Marks = 18 Marks): Brief Explanations (Q.33 compulsory numerical)',
            'Part IV (5 Questions × 5 Marks = 25 Marks): Detailed Derivations & Long Questions (Internal choice)',
            'Physics Practical Examination: 20 Marks + Internal Continuous Assessment: 10 Marks',
          ],
        },
        chapters: [
          {
            id: 'tn-12-phy-ch1',
            number: 1,
            slug: 'electrostatics',
            title: 'Electrostatics (நிலைமின்னியல்)',
            description: 'Historical background, Coulomb law, electric field, electric dipole, Gauss law and its applications, electrostatic potential, capacitors, and Van de Graaff generator.',
            hours: 14,
            weightageMarks: 10,
            learningObjectives: ['Calculate electric fields due to continuous charge distributions using Gauss law', 'Derive expressions for electric potential and capacitance of a parallel plate capacitor', 'Explain the principle, construction, and working of a Van de Graaff generator'],
            importantTopics: ['Coulomb Law in Vector Form and Principle of Superposition', 'Electric Field due to an Electric Dipole on its Axial and Equatorial Lines', 'Torque on a Dipole in a Uniform Electric Field', 'Gauss Law Statement and Applications (Infinitely long straight wire, Infinite plane sheet)', 'Electric Potential due to a Point Charge and Electric Dipole', 'Capacitors in Series and Parallel and Energy Stored: U = ½ CV²', 'Dielectrics and Polarisation', 'Van de Graaff Generator Principle, Construction, and Working'],
            materials: [
              {
                id: 'm-tn-12-p-1',
                title: 'Electrostatics Complete HSC Public Exam Study Guide',
                type: 'notes',
                description: 'Full chapter notes with all 5-mark derivations, Van de Graaff generator illustration, and 10-year public exam question bank.',
                fileSize: '2.5 MB',
                downloadFilename: 'TN_Class12_Physics_Ch1_Electrostatics.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-tn-12-p-1',
                title: 'HSC 5-Mark Public Exam Derivations',
                level: 'Level 3 - Exemplar / HOTS',
                estimatedTime: '45 mins',
                questions: [
                  {
                    id: 'q-tn-12-p1',
                    question: 'Derive an expression for the electric field due to an electric dipole at a point on its axial line.',
                    explanation: 'Consider an electric dipole of charges -q and +q separated by 2a. Let P be a point on axial line at distance r from center O. Electric field due to +q: E₊ = (1/4πε₀) [q / (r - a)²] along OP. Electric field due to -q: E₋ = (1/4πε₀) [q / (r + a)²] along PO. Net field E = E₊ - E₋ = (q/4πε₀) [1/(r - a)² - 1/(r + a)²] = (q/4πε₀) [(4ar) / (r² - a²)²]. Since p = q(2a), E = (1/4πε₀) [2pr / (r² - a²)²]. For r >> a, E ≈ (1/4πε₀) (2p / r³) along the direction of dipole moment p.',
                    marks: 5,
                  },
                ],
              },
            ],
            notesSummary: 'Electrostatics deals with static electric charges, electric fields, potentials, and capacitor energy storage governed by Coulomb law and Gauss theorem.',
            keyFormulasOrTerms: ['Coulomb law: F = (1/4πε₀) (q₁q₂/r²)', 'Dipole moment: p = 2qa', 'Axial field: E = (2kp)/r³', 'Equatorial field: E = (kp)/r³', 'Gauss theorem: ∮ E · dA = q/ε₀', 'Van de Graaff generator produces potential differences of millions of volts'],
          },
        ],
        previousYearPapers: [
          {
            id: 'tn-12-phy-pyq-2024',
            year: 2024,
            session: 'DGE Tamil Nadu HSC Public Examination',
            title: 'Tamil Nadu Class 12 Physics Official HSC Public Exam Question Paper',
            totalMarks: 70,
            duration: '3 hours',
            solutionsAvailable: true,
            highlights: ['Official DGE answer key with step-by-step mark breakdown', 'Solved compulsory numericals', 'Centum scoring strategy guide'],
          },
        ],
      },
    ],
  },
];

