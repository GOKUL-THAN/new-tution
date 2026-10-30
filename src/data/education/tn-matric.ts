import { ClassCurriculum } from './types';

export const TN_MATRIC_CLASSES_CURRICULUM: ClassCurriculum[] = [
  // ==========================================
  // TN MATRICULATION CLASS 6
  // ==========================================
  {
    boardSlug: 'tn-matriculation',
    classNumber: 6,
    classSlug: 'class-6',
    title: 'Tamil Nadu Matriculation Class 6',
    academicStage: 'Middle School (6–8)',
    overview:
      'The Tamil Nadu Matriculation Board curriculum for Class 6 is administered under the Directorate of Matriculation Schools. With an English-medium immersion framework, it provides intensive training in Mathematics, integrated physical and biological sciences, structured English language and literature, Tamil as a second language, and early computer coding.',
    keyFocusAreas: [
      'English-medium foundational mastery: phonetics, reading fluency, functional grammar, and expressive writing',
      'Advanced Mathematics: place value, arithmetic properties, prime factorisation, fractions, algebra, and plane geometry',
      'Science: observational and experimental method in physics, chemistry, botany, and zoology',
      'Tamil / Second language literary appreciation and basic grammar',
      'Hands-on Computer Science: computer architecture, Windows/Linux environments, and Scratch block programming',
    ],
    subjects: [
      {
        id: 'tn-matric-6-english',
        slug: 'english',
        name: 'English (Language & Literature)',
        boardSlug: 'tn-matriculation',
        classNumber: 6,
        icon: 'BookOpen',
        color: 'from-sky-500 to-blue-600',
        description: {
          overview:
            'Matriculation Class 6 English develops high proficiency in written and spoken English. Combining classic literary selections, modern prose, poetry appreciation, and intensive applied grammar, it equips students with the vocabulary, comprehension, and analytical skills needed for secondary academic excellence.',
          whatStudentsLearn: [
            'Prose: Sea Turtles, When the Trees Walked, The Visitor that Never Leaves, A Childhood in Malabar',
            'Poetry: The Crocodile (Lewis Carroll), Trees (Joyce Kilmer), I Dream of Spices, Teamwork',
            'Supplementary Readers: The Apple Tree and the Farmer, Gulliver in Lilliput, Brought to Life',
            'Grammar: Nouns, Pronouns, Adjectives, Adverbs, Prepositions, Conjunctions, Tenses (Simple and Continuous)',
            'Vocabulary: prefixes, suffixes, compound words, homophones, synonyms, antonyms, idioms',
            'Writing Skills: descriptive paragraphs, informal letter writing, notice writing, story completion',
          ],
          importantTopicsCovered: [
            'Reading Comprehension: finding main ideas, inference, and vocabulary in context',
            'Subject-Verb Agreement and Concord rules',
            'Correct usage of Prepositions of time, place, and movement',
            'Informal letter format: Address, Date, Salutation, Body paragraphs, Subscription',
            'Poetic devices: rhyme scheme, alliteration, metaphor, and personification',
          ],
          learningObjectives: [
            'Read literary passages fluently with correct pronunciation and intonation',
            'Apply grammatical rules accurately in spoken and written communications',
            'Draft structured paragraphs and informal letters expressing coherent thoughts',
            'Analyze poetic devices and infer moral themes from literature',
          ],
          practicalApplications: [
            'Writing personal correspondence and school event invitation letters',
            'Delivering public speeches and participating in school debating competitions',
            'Creating descriptive stories and contributing to school annual magazines',
          ],
          skillsDeveloped: [
            'Advanced English communicative fluency',
            'Literary critique and thematic comprehension',
            'Creative and technical writing composition',
          ],
          academicProgression:
            'Builds the linguistic and communicative competency required for secondary Matriculation Board examinations and competitive public speaking.',
        },
        prescribedTextbooks: [
          { title: 'Matriculation English Reader & Workbook Class 6', publisher: 'Department of School Education, Tamil Nadu' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2.5,
          breakdown: [
            'Section A (Reading Comprehension): 15 Marks',
            'Section B (Grammar & Vocabulary): 25 Marks',
            'Section C (Literature — Prose & Poetry): 25 Marks',
            'Section D (Writing Skills): 15 Marks',
            'Internal Assessment (Listening & Speaking Skills): 20 Marks',
          ],
        },
        chapters: [
          {
            id: 'tn-m-6-eng-ch1',
            number: 1,
            slug: 'sea-turtles-and-grammar',
            title: 'Sea Turtles & Parts of Speech',
            description: 'Study of marine olive ridley sea turtles, conservation efforts, reading comprehension, and comprehensive review of parts of speech.',
            hours: 8,
            weightageMarks: 10,
            learningObjectives: ['Understand the breeding habits and ecological threats faced by Olive Ridley turtles', 'Identify all eight parts of speech in context and use them accurately'],
            importantTopics: ['Nesting habits of Olive Ridley turtles on the coast of Odisha and Chennai', 'Arribada mass nesting phenomenon', 'Eight Parts of Speech definition and identification', 'Subject-Verb Agreement fundamentals'],
            materials: [
              {
                id: 'm-tn-m-6-e-1',
                title: 'Sea Turtles & Grammar Complete Study Guide',
                type: 'notes',
                description: 'Full chapter notes with vocabulary meanings, comprehension questions, and parts of speech exercises.',
                fileSize: '1.2 MB',
              },
            ],
            assignments: [
              {
                id: 'as-tn-m-6-e-1',
                title: 'Parts of Speech & Comprehension Worksheet',
                level: 'Level 1 - Foundational',
                estimatedTime: '30 mins',
                questions: [
                  {
                    id: 'q-mat-6-e1',
                    question: "Identify the parts of speech of the underlined words: 'The brave turtle swam *swiftly* across the *vast* ocean.'",
                    explanation: "'swiftly' is an Adverb (modifying the verb swam). 'vast' is an Adjective (describing the noun ocean).",
                    marks: 2,
                  },
                ],
              },
            ],
            notesSummary: 'Olive Ridley sea turtles travel thousands of miles to nest on sandy beaches. Mastery of parts of speech is essential for precise English communication.',
            keyFormulasOrTerms: ['Arribada: Mass nesting of sea turtles', 'Noun: Name of person, place, thing', 'Verb: Action or state', 'Adverb: Modifies a verb, adjective, or other adverb'],
          },
        ],
      },
      {
        id: 'tn-matric-6-maths',
        slug: 'mathematics',
        name: 'Mathematics',
        boardSlug: 'tn-matriculation',
        classNumber: 6,
        icon: 'Calculator',
        color: 'from-purple-600 to-indigo-600',
        description: {
          overview:
            'Matriculation Class 6 Mathematics provides an intensive problem-solving curriculum. Emphasizing mental arithmetic speed, rigorous geometric drawing, commercial calculations, and introductory algebra, it lays the groundwork for high school academic competition.',
          whatStudentsLearn: [
            'Numbers: Place value systems, comparison, Roman numerals, estimation, whole numbers, divisibility tests, HCF and LCM',
            'Integers: Negative numbers, number line operations, absolute value, and integer word problems',
            'Fractions and Decimals: Types, conversions, arithmetic operations, and real-life measurement applications',
            'Commercial Mathematics: Ratio, proportion, unitary method, percentage, and introductory simple interest',
            'Algebra: Variable notation, algebraic expressions, linear equations in one variable',
            'Geometry: Points, lines, angles, triangles, quadrilaterals, circles, symmetry, and geometric constructions',
            'Mensuration: Perimeter and area of rectangles, squares, and right triangles',
            'Data Handling: Pictographs, bar graphs, and systematic data tabulations',
          ],
          importantTopicsCovered: [
            'Divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10, 11',
            'Prime factorisation and division methods for HCF and LCM',
            'Solving linear equations using transposition method',
            'Area and Perimeter word problems involving tiling and fencing costs',
            'Unitary method applied to currency and distance computations',
          ],
          learningObjectives: [
            'Perform multi-digit arithmetic operations with speed and precision',
            'Construct geometric figures using compass, ruler, and protractor with high accuracy',
            'Formulate algebraic equations from verbal statements and find unknowns',
          ],
          practicalApplications: [
            'Calculating consumer shopping discounts and calculating cost per kilogram using unitary method',
            'Measuring school playground perimeters and planning boundary fencing',
          ],
          skillsDeveloped: [
            'Mental arithmetic speed and accuracy',
            'Technical geometric instrument precision',
            'Proportional reasoning and commercial calculation',
          ],
          academicProgression:
            'Prepares students for Class 7–8 Matriculation mathematics and competitive scholarship examinations (NMMS, Olympiads).',
        },
        prescribedTextbooks: [
          { title: 'Matriculation Mathematics Class 6', publisher: 'Department of School Education, Tamil Nadu' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2.5,
          breakdown: ['Written Examination: 80 Marks', 'Slip Tests & Class Work: 10 Marks', 'Maths Lab Activities: 10 Marks'],
        },
        chapters: [
          {
            id: 'tn-m-6-m-ch1',
            number: 1,
            slug: 'knowing-numbers-hcf-lcm',
            title: 'Numbers, Factors, and Multiples',
            description: 'Large numbers, divisibility rules, prime numbers, factor tree, HCF and LCM word problems, and integer arithmetic.',
            hours: 8,
            weightageMarks: 10,
            learningObjectives: ['Find HCF and LCM using prime factorisation', 'Solve synchronised interval problems using LCM'],
            importantTopics: ['Divisibility Rules for 2 through 11', 'Prime Factorisation using Factor Trees', 'HCF and LCM Calculation', 'Real-world Word Problems on HCF and LCM'],
            materials: [
              {
                id: 'm-tn-m-6-m-1',
                title: 'Numbers & Factorisation Study Guide',
                type: 'notes',
                description: 'Full notes with divisibility cheat sheet, factor tree examples, and solved word problems.',
                fileSize: '1.3 MB',
              },
            ],
            assignments: [
              {
                id: 'as-tn-m-6-m-1',
                title: 'HCF and LCM Problem Set',
                level: 'Level 2 - Application',
                estimatedTime: '35 mins',
                questions: [
                  {
                    id: 'q-mat-6-m1',
                    question: 'Find the greatest number which divides 285 and 1249 leaving remainders 9 and 7 respectively.',
                    explanation: 'Required number is HCF of (285 - 9 = 276) and (1249 - 7 = 1242). Prime factors: 276 = 2² × 3 × 23; 1242 = 2 × 3³ × 23. Common factors: 2 × 3 × 23 = 138. The required greatest number is 138.',
                    marks: 3,
                  },
                ],
              },
            ],
            notesSummary: 'HCF finds the greatest common divisor for grouping without remainder. LCM determines the earliest common recurring interval.',
            keyFormulasOrTerms: ['Product of two numbers = HCF × LCM', 'Prime numbers have exactly two distinct factors: 1 and itself', 'Co-prime numbers have an HCF of 1'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // TN MATRICULATION CLASS 10 (SSLC Public Examination)
  // ==========================================
  {
    boardSlug: 'tn-matriculation',
    classNumber: 10,
    classSlug: 'class-10',
    title: 'Tamil Nadu Matriculation Class 10',
    academicStage: 'Secondary School (9–10)',
    overview:
      'Tamil Nadu Matriculation Class 10 is designed for academic centum achievement in the state-wide SSLC Public Examinations. Combining high-level analytical problem solving in Mathematics, intensive science laboratory practicals, advanced English language composition, and integrated social sciences, it prepares students for top academic honors and entrance exam foundation.',
    keyFocusAreas: [
      'SSLC Public Examination Centum Strategy: comprehensive mastery of 1-mark, 2-mark, 5-mark, and 8-mark questions',
      'Advanced Mathematics: Relations and Functions, AP/GP, Matrices, Quadratic equations, Coordinate Geometry, Trigonometry, Mensuration, Statistics and Probability',
      'Science: Laws of Motion, Optics, Thermal Physics, Electricity, Acoustics, Nuclear Physics, Periodic Classification, Solutions, Chemical Reactions, Carbon, Genetics, Biotechnology',
      'English: Intensive reading comprehension, formal reporting, technical communication, and poetic analysis',
      'Social Science: Tamil Nadu history, Indian national movement, regional geography, and industrial clusters',
    ],
    subjects: [
      {
        id: 'tn-matric-10-maths',
        slug: 'mathematics',
        name: 'Mathematics',
        code: '003',
        boardSlug: 'tn-matriculation',
        classNumber: 10,
        icon: 'Calculator',
        color: 'from-purple-600 to-indigo-600',
        description: {
          overview:
            'Matriculation Class 10 Mathematics is the cornerstone subject of the secondary curriculum. Oriented towards 100/100 centum performance, it covers Relations and Functions, Numbers and Sequences, Polynomial Algebra, Matrices, Geometry Theorems, Coordinate Geometry, Trigonometry, Mensuration, and Statistics/Probability.',
          whatStudentsLearn: [
            'Relations and Functions: Cartesian product, relations, functions, vertical and horizontal line tests, composite functions (f o g, g o f), linear, quadratic, and reciprocal functions',
            'Numbers and Sequences: Euclid Division Lemma, Fundamental Theorem of Arithmetic, Modular Arithmetic, Arithmetic Progression (AP), Geometric Progression (GP), and sum of special series',
            'Algebra: Linear equations in three variables, polynomial GCD/LCM, rational expressions, square root of polynomials by division method, quadratic equations, discriminant, nature of roots, and Matrices (operations, multiplication, transpose)',
            'Geometry: Thales Theorem (BPT), Angle Bisector Theorem, Pythagoras Theorem, Circles and Tangents, Alternate Segment Theorem, Practical Geometry (Tangents from external point, Triangles)',
            'Coordinate Geometry: Area of triangle and quadrilateral, slope of a line, equations of straight lines (various forms), parallel and perpendicular lines conditions',
            'Trigonometry: Trigonometric identities, heights and distances (angles of elevation and depression, multi-vessel nautical problems)',
            'Mensuration: Surface area and volume of Cylinder, Cone, Sphere, Hemisphere, Frustum, and conversion of solids',
            'Statistics and Probability: Measures of dispersion (Standard Deviation, Coefficient of Variation), Probability rules, and Addition Theorem of Probability',
          ],
          importantTopicsCovered: [
            'Composite Functions associative property proof: f o (g o h) = (f o g) o h',
            'Sum of special series: Σn = n(n+1)/2, Σn² = n(n+1)(2n+1)/6, Σn³ = [n(n+1)/2]²',
            'Square root of polynomials by long division method for centum 5-mark questions',
            'Thales Theorem, Angle Bisector Theorem, and Pythagoras Theorem formal proofs',
            'Area of Quadrilateral using vertex coordinate determinant formula',
            'Heights and distances survey problems involving two observing stations',
            'Surface area and volume of combined solids (toy, tent, capsule, conical flask)',
            'Standard Deviation calculation by Assumed Mean and Step Deviation methods',
            'Practical Geometry (8 Marks): Construction of pair of tangents to a circle',
            'Graph (8 Marks): Solving quadratic equations graphically and finding nature of roots',
          ],
          learningObjectives: [
            'Solve complex systems of linear equations in three variables and execute matrix multiplications',
            'Prove geometric theorems rigorously and construct tangent lines to millimeter precision',
            'Calculate statistical standard deviation and compare consistency of datasets using coefficient of variation',
            'Apply addition theorem of probability to solve multi-event industrial and genetics problems',
          ],
          practicalApplications: [
            'Civil construction surveying for tall antennas and buildings using trigonometric heights and distances',
            'Industrial quality control testing evaluating consistency of machine-produced components using coefficient of variation',
            'Volumetric optimization of industrial storage tanks combining cylinders and hemispherical ends',
          ],
          skillsDeveloped: [
            'High-speed algebraic problem solving',
            'Rigorous geometric deductive proof formulation',
            'Statistical dispersion and reliability analysis',
            'Technical geometric drafting and quadratic graphing',
          ],
          academicProgression:
            'Critical foundation for Class 11 & 12 Higher Secondary Mathematics, JEE Main, and engineering university admissions.',
        },
        prescribedTextbooks: [
          { title: 'Matriculation Mathematics Class 10', publisher: 'Department of School Education, Tamil Nadu' },
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
            id: 'tn-m-10-m-ch1',
            number: 1,
            slug: 'relations-and-functions',
            title: 'Relations and Functions',
            description: 'Cartesian product, relations, functions, types of functions (one-to-one, onto, bijection), vertical line test, and composition of functions.',
            hours: 12,
            weightageMarks: 12,
            learningObjectives: ['Find Cartesian product of multiple sets', 'Classify functions into injective, surjective, and bijective mappings', 'Evaluate composite functions and verify associative law'],
            importantTopics: ['Cartesian Product and Ordered Pairs', 'Relations: Domain, Co-domain, Range', 'Functions as Special Relations and Vertical Line Test', 'Types of Functions: One-to-One, Onto, Many-to-One, Identity', 'Composition of Functions and Associative Property Proof'],
            materials: [
              {
                id: 'm-tn-m-10-m-1',
                title: 'Relations & Functions Complete Centum Guide',
                type: 'notes',
                description: 'Full chapter notes with arrow diagrams, function classification charts, and solved 5-mark public exam problems.',
                fileSize: '2.1 MB',
                downloadFilename: 'TN_Matric_Class10_Maths_Ch1_RelationsFunctions.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-tn-m-10-m-1',
                title: 'Centum Problem Set — Relations & Functions',
                level: 'Level 3 - Exemplar / HOTS',
                estimatedTime: '45 mins',
                questions: [
                  {
                    id: 'q-mat-10-m1',
                    question: 'Let A = {1, 2, 3, 4} and B = {2, 5, 8, 11, 14} be two sets. Let f: A -> B be a function given by f(x) = 3x - 1. (i) Represent this function as an arrow diagram, (ii) in a table form, (iii) as a set of ordered pairs, (iv) in a graphical form.',
                    explanation: 'f(1) = 3(1) - 1 = 2; f(2) = 3(2) - 1 = 5; f(3) = 3(3) - 1 = 8; f(4) = 3(4) - 1 = 11. (i) Arrow diagram: arrows from 1->2, 2->5, 3->8, 4->11. (ii) Table: x: [1, 2, 3, 4], f(x): [2, 5, 8, 11]. (iii) Ordered pairs: f = {(1, 2), (2, 5), (3, 8), (4, 11)}. (iv) Graphical form: points (1, 2), (2, 5), (3, 8), (4, 11) plotted on coordinate axes.',
                    marks: 5,
                  },
                ],
              },
            ],
            notesSummary: 'Functions map domain elements to unique co-domain images. Mastery of composite functions (fog, gof) is fundamental for secondary algebra.',
            keyFormulasOrTerms: ['Cartesian product: A × B = {(a, b) : a ∈ A, b ∈ B}', 'Bijection: Both one-to-one and onto', 'f o (g o h) = (f o g) o h (Associative property)'],
          },
        ],
        previousYearPapers: [
          {
            id: 'tn-m-10-m-pyq-2024',
            year: 2024,
            session: 'Matriculation SSLC Public Examination',
            title: 'Tamil Nadu Matriculation Class 10 Mathematics Official Public Paper',
            totalMarks: 100,
            duration: '3 hours',
            solutionsAvailable: true,
            highlights: ['Official Government DGE key with step-by-step marking rubrics', 'Solutions for 8-mark Geometry and Quadratic Graph', 'Centum preparation guide for 100/100'],
          },
        ],
      },
      {
        id: 'tn-matric-10-science',
        slug: 'science',
        name: 'Science (Physical & Biological)',
        code: '004',
        boardSlug: 'tn-matriculation',
        classNumber: 10,
        icon: 'Atom',
        color: 'from-emerald-500 to-teal-600',
        description: {
          overview:
            'Matriculation Class 10 Science offers rigorous training in Physics, Chemistry, and Biology. Aligned with the state board SSLC curriculum but enhanced with English-medium scientific communication and hands-on laboratory experiments, it prepares students for both centum board scores and competitive entrance exam foundations.',
          whatStudentsLearn: [
            'Physics: Laws of Motion, Optics, Thermal Physics, Electricity, Acoustics, Nuclear Physics',
            'Chemistry: Atoms and Molecules, Periodic Classification of Elements, Solutions, Types of Chemical Reactions, Carbon and its Compounds',
            'Biology: Plant Anatomy and Physiology, Structural Organisation of Animals, Transportation in Plants and Circulation in Animals, Nervous System, Hormones, Reproduction, Genetics, Biotechnology, Environmental Management',
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
          { title: 'Matriculation Science Class 10', publisher: 'Department of School Education, Tamil Nadu' },
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
            id: 'tn-m-10-sci-ch1',
            number: 1,
            slug: 'laws-of-motion',
            title: 'Laws of Motion',
            description: 'Force and motion, inertia, linear momentum, Newton three laws of motion, force units, impulse, principle of conservation of linear momentum, and rocket propulsion.',
            hours: 10,
            weightageMarks: 8,
            learningObjectives: ['Define inertia and classify its types (rest, motion, direction)', 'State Newton second law and derive F = ma', 'Apply the principle of conservation of linear momentum to rocket propulsion'],
            importantTopics: ['Inertia: Rest, Motion, Direction with real-life examples', 'Newton First, Second, and Third Laws of Motion', 'Derivation of F = ma from rate of change of momentum', 'Impulse (J = F × Δt = Δp) and Shock Absorbers', 'Principle of Conservation of Linear Momentum Proof', 'Rocket Propulsion Mechanics (Action-Reaction and Momentum Conservation)', 'Apparent Weight and Weightlessness in Elevators'],
            materials: [
              {
                id: 'm-tn-m-10-s-1',
                title: 'Laws of Motion Complete Centum Study Guide',
                type: 'notes',
                description: 'Full chapter notes with textbook book-back solutions, creative questions, and rocket propulsion diagrams.',
                fileSize: '1.8 MB',
                downloadFilename: 'TN_Matric_Class10_Science_Ch1_LawsOfMotion.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-tn-m-10-s-1',
                title: 'Centum Problem Set — Laws of Motion',
                level: 'Level 2 - Application',
                estimatedTime: '35 mins',
                questions: [
                  {
                    id: 'q-mat-10-s1',
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
            id: 'tn-m-10-sci-pyq-2024',
            year: 2024,
            session: 'Matriculation SSLC Public Examination',
            title: 'Tamil Nadu Matriculation Class 10 Science Official Public Paper',
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
  // TN MATRICULATION CLASS 12 (Higher Secondary Exam)
  // ==========================================
  {
    boardSlug: 'tn-matriculation',
    classNumber: 12,
    classSlug: 'class-12',
    title: 'Tamil Nadu Matriculation Class 12',
    academicStage: 'Senior Secondary (11–12)',
    overview:
      'Tamil Nadu Matriculation Class 12 provides advanced English-medium training for the Higher Secondary Certificate (HSC) Public Examination and competitive entrance exams. Covering higher physics, coordination chemistry, organic reaction synthesis, vector algebra, calculus, and computer programming, it enables students to excel in board examinations and gain admission into top engineering and medical institutions.',
    keyFocusAreas: [
      'Comprehensive HSC examination preparation with focus on 100% centum scores',
      'Physics: Electrostatics, Current Electricity, Magnetism, AC Circuits, Optics, Dual Nature, Nuclear Physics, Semiconductor Devices',
      'Chemistry: Metallurgy, Coordination Compounds, Solid State, Chemical Kinetics, Hydroxy Compounds, Carbonyls, Biomolecules',
      'Mathematics: Matrices, Complex Numbers, Analytical Geometry, Differential and Integral Calculus, Differential Equations, Discrete Mathematics',
      'Biology: Bio-Botany & Bio-Zoology with extensive practical laboratory training',
    ],
    subjects: [
      {
        id: 'tn-matric-12-physics',
        slug: 'physics',
        name: 'Physics',
        code: '055',
        boardSlug: 'tn-matriculation',
        classNumber: 12,
        stream: 'Science',
        icon: 'Zap',
        color: 'from-purple-600 to-indigo-600',
        description: {
          overview:
            'Matriculation Class 12 Physics provides advanced, English-medium scientific instruction across electrostatics, current electricity, magnetic effects of current, electromagnetic induction, alternating currents, electromagnetic waves, ray and wave optics, dual nature of radiation, atomic and nuclear physics, and semiconductor electronics.',
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
          { title: 'Matriculation Physics Class 12', publisher: 'Department of School Education, Tamil Nadu' },
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
            id: 'tn-m-12-phy-ch1',
            number: 1,
            slug: 'electrostatics',
            title: 'Electrostatics',
            description: 'Historical background, Coulomb law, electric field, electric dipole, Gauss law and its applications, electrostatic potential, capacitors, and Van de Graaff generator.',
            hours: 14,
            weightageMarks: 10,
            learningObjectives: ['Calculate electric fields due to continuous charge distributions using Gauss law', 'Derive expressions for electric potential and capacitance of a parallel plate capacitor', 'Explain the principle, construction, and working of a Van de Graaff generator'],
            importantTopics: ['Coulomb Law in Vector Form and Principle of Superposition', 'Electric Field due to an Electric Dipole on its Axial and Equatorial Lines', 'Torque on a Dipole in a Uniform Electric Field', 'Gauss Law Statement and Applications (Infinitely long straight wire, Infinite plane sheet)', 'Electric Potential due to a Point Charge and Electric Dipole', 'Capacitors in Series and Parallel and Energy Stored: U = ½ CV²', 'Dielectrics and Polarisation', 'Van de Graaff Generator Principle, Construction, and Working'],
            materials: [
              {
                id: 'm-tn-m-12-p-1',
                title: 'Electrostatics Complete Centum Public Exam Guide',
                type: 'notes',
                description: 'Full chapter notes with all 5-mark derivations, Van de Graaff generator illustration, and 10-year public exam question bank.',
                fileSize: '2.5 MB',
                downloadFilename: 'TN_Matric_Class12_Physics_Ch1_Electrostatics.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-tn-m-12-p-1',
                title: 'HSC Centum Derivations — Electrostatics',
                level: 'Level 3 - Exemplar / HOTS',
                estimatedTime: '45 mins',
                questions: [
                  {
                    id: 'q-mat-12-p1',
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
            id: 'tn-m-12-phy-pyq-2024',
            year: 2024,
            session: 'Matriculation HSC Public Examination',
            title: 'Tamil Nadu Matriculation Class 12 Physics Official HSC Public Exam Paper',
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

