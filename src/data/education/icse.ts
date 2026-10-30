import { ClassCurriculum } from './types';

export const ICSE_CLASSES_CURRICULUM: ClassCurriculum[] = [
  // ==========================================
  // ICSE CLASS 6
  // ==========================================
  {
    boardSlug: 'icse',
    classNumber: 6,
    classSlug: 'class-6',
    title: 'ICSE Class 6',
    academicStage: 'Middle School (6–8)',
    overview:
      'Under the CISCE curriculum guidelines, Class 6 transitions students into rigorous application-oriented learning with distinct segregation of science into Physics, Chemistry, and Biology, comprehensive English language and literature, commercial mathematics foundations, and hands-on computer algorithms.',
    keyFocusAreas: [
      'Segregated Science: foundational Physics, Chemistry, and Biology taught as distinct investigative disciplines',
      'Advanced Mathematics: number concepts, sets, unitary method, fundamental algebra, and geometrical construction',
      'Comprehensive English: descriptive and narrative composition, applied grammar, and classic literature study',
      'Historical civilisations (Mesopotamian, Indus, Egyptian) and physical geographical mapping',
    ],
    subjects: [
      {
        id: 'icse-6-maths',
        slug: 'mathematics',
        name: 'Mathematics',
        boardSlug: 'icse',
        classNumber: 6,
        icon: 'Calculator',
        color: 'from-emerald-500 to-teal-600',
        description: {
          overview:
            'ICSE Class 6 Mathematics emphasizes strong conceptual foundations and commercial arithmetic. Students cover number operations, set theory, unitary method, ratio, percentage, fundamental algebra, lines, angles, triangles, circles, and perimeter/area.',
          whatStudentsLearn: [
            'Number System: place value, operations, BODMAS, prime factorisation, HCF, LCM, and negative integers',
            'Sets: introduction to sets, roster and set-builder forms, finite, infinite, empty, and universal sets',
            'Fractions and Decimals: operations, conversions, recurring decimals, and practical word problems',
            'Commercial Mathematics: ratio and proportion, unitary method, percentages, speed, distance, and time',
            'Algebra: variables, constants, terms, coefficients, addition and subtraction of algebraic expressions, linear equations',
            'Geometry: angles, parallel lines, properties of triangles, quadrilaterals, circles, and construction using compass',
            'Mensuration: perimeter and area of squares, rectangles, and composite 2D shapes',
            'Data Handling: tally charts, bar graphs, and introductory mean calculation',
          ],
          importantTopicsCovered: [
            'Set Theory fundamentals: elements (∈), subsets (⊆), and Venn diagrams',
            'Unitary Method and direct proportion in real-world pricing and measurement',
            'BODMAS rule in complex nested bracket evaluation',
            'Formulation and solution of linear equations in one variable',
            'Geometric angle properties: adjacent, complementary, supplementary, and vertically opposite angles',
            'Area and perimeter calculations for real estate and construction',
          ],
          learningObjectives: [
            'Represent and classify collections of objects using formal set notation',
            'Solve multi-step commercial arithmetic problems involving speed, unit rates, and percentages',
            'Construct angles and parallel lines using geometrical instruments with high precision',
            'Translate verbal statements into algebraic linear equations and solve them accurately',
          ],
          practicalApplications: [
            'Calculating journey durations and average vehicular speeds using speed-distance-time formulas',
            'Budgeting household expenditure and computing percentage discounts on consumer items',
            'Designing simple architectural floor layouts using perimeter and area principles',
          ],
          skillsDeveloped: [
            'Formal mathematical logic and set-theoretic thinking',
            'Commercial numeracy and proportional reasoning',
            'Geometric precision and technical drawing drafting',
          ],
          academicProgression:
            'Prepares students directly for ICSE Class 7–8 commercial mathematics (profit/loss, simple interest) and advanced algebra.',
        },
        prescribedTextbooks: [
          { title: 'Essential ICSE Mathematics Class 6', publisher: 'Bharti Bhawan / Selina Publishers' },
          { title: 'Understanding ICSE Mathematics Class 6', publisher: 'M.L. Aggarwal (Avichal Publishing Company)' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2.5,
          breakdown: [
            'Section A (Compulsory short-answer questions): 40 Marks',
            'Section B (Choice of 4 out of 7 structured questions): 40 Marks',
            'Internal Continuous Assessment & Project Work: 20 Marks',
          ],
        },
        chapters: [
          {
            id: 'icse-6-m-ch1',
            number: 1,
            slug: 'number-system-and-sets',
            title: 'Numbers and Set Theory',
            description: 'Exploration of large numbers, BODMAS, prime numbers, HCF, LCM, and foundational set theory (roster form, set-builder notation, types of sets).',
            hours: 9,
            weightageMarks: 8,
            learningObjectives: ['Define sets and write sets in roster and set-builder notations', 'Distinguish finite, infinite, empty, and singleton sets', 'Apply BODMAS rule to complex numerical operations'],
            importantTopics: ['Definition of a Set and Element Notation (∈, ∉)', 'Roster (Tabular) and Rule (Set-Builder) Forms', 'Types of Sets: Empty, Singleton, Finite, Infinite, Universal', 'BODMAS Hierarchy of Operations', 'HCF and LCM by Prime Factorisation'],
            materials: [
              {
                id: 'm-icse-6-m-1',
                title: 'Set Theory & Number Systems Comprehensive Notes',
                type: 'notes',
                description: 'Full chapter notes with set notation tables, Venn diagram examples, and solved ICSE textbook exercises.',
                fileSize: '1.3 MB',
              },
            ],
            assignments: [
              {
                id: 'as-icse-6-m-1',
                title: 'Set Theory and BODMAS Assignment',
                level: 'Level 1 - Foundational',
                estimatedTime: '35 mins',
                questions: [
                  {
                    id: 'q-icse-6-1',
                    question: 'Write the set of all prime numbers less than 20 in roster form and determine its cardinal number n(A).',
                    explanation: 'A = {2, 3, 5, 7, 11, 13, 17, 19}. The cardinal number n(A) = 8 because there are 8 elements.',
                    marks: 2,
                  },
                ],
              },
            ],
            notesSummary: 'A set is a well-defined collection of distinct objects. The number of elements in a finite set is its cardinal number.',
            keyFormulasOrTerms: ['Roster form: {a, b, c}', 'Set-builder: {x : x is a prime number, x < 20}', 'Null/Empty set: ∅ or {}', 'Cardinal number: n(A)'],
          },
        ],
      },
      {
        id: 'icse-6-physics',
        slug: 'physics',
        name: 'Physics',
        boardSlug: 'icse',
        classNumber: 6,
        icon: 'Zap',
        color: 'from-blue-600 to-cyan-600',
        description: {
          overview:
            'ICSE Class 6 Physics introduces fundamental physical laws and quantitative measurement. Students study matter, measurement of physical quantities, force, simple machines (levers, pulleys, inclined planes), energy forms, light propagation, and magnetism.',
          whatStudentsLearn: [
            'Matter: states of matter, kinetic theory explanation of solids, liquids, and gases',
            'Physical Quantities and Measurement: length, mass, time, area, temperature, and standard SI units',
            'Force: definition, effects of force, contact and non-contact forces, friction as a contact force',
            'Simple Machines: principle of a machine, mechanical advantage, velocity ratio, efficiency, levers (Class I, II, III), pulleys, and inclined plane',
            'Light: sources of light, rectilinear propagation, transparent, translucent, opaque media, shadows, and eclipses (solar and lunar)',
            'Magnetism: natural and artificial magnets, magnetic poles, magnetic field, Earth as a magnet, magnetic compass, care of magnets',
          ],
          importantTopicsCovered: [
            'Kinetic Theory of Matter: intermolecular space, intermolecular force of attraction, Brownian motion',
            'Measurement of irregular area using graph paper and volume using measuring cylinders',
            'Types of Simple Machines and Lever classification based on positions of Fulcrum, Load, and Effort (FLE)',
            'Formulas: Mechanical Advantage (MA = Load / Effort), Velocity Ratio (VR), Efficiency (η = MA / VR × 100%)',
            'Umbra and Penumbra shadow formation and mechanisms of Solar and Lunar eclipses',
            'Properties of Magnetic field lines and demagnetisation methods',
          ],
          learningObjectives: [
            'Measure lengths, volumes, and masses using scientific measuring apparatus',
            'Classify everyday tools (scissors, wheelbarrow, tongs) into Class I, II, and III levers',
            'Explain eclipse phenomena using the rectilinear propagation of light rays',
            'Demonstrate the magnetic field of bar magnets using iron filings and compass needles',
          ],
          practicalApplications: [
            'Using levers and crowbars to amplify manual effort in construction and household chores',
            'Measuring irregular land and leaf surface areas using millimeter graph grids',
            'Navigating geographical directions on sea voyages and trekking trails using a magnetic compass',
          ],
          skillsDeveloped: [
            'Precision scientific measurement',
            'Mechanical advantage calculation',
            'Ray diagram construction for shadow umbra and penumbra',
          ],
          academicProgression:
            'Forms the foundational prerequisite for ICSE Class 7–8 mechanics, heat, sound, electricity, and Class 10 ICSE Physics.',
        },
        prescribedTextbooks: [
          { title: 'Concise Physics Middle School Class 6', publisher: 'Selina Publishers' },
          { title: 'Living Science Physics Class 6', publisher: 'Ratna Sagar' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2,
          breakdown: ['Section A (Compulsory objective/short): 40 Marks', 'Section B (Structured questions): 40 Marks', 'Internal Practical Assessment: 20 Marks'],
        },
        chapters: [
          {
            id: 'icse-6-phy-ch1',
            number: 1,
            slug: 'matter',
            title: 'Matter and Kinetic Theory',
            description: 'States of matter, molecular arrangement, intermolecular forces and spaces, kinetic molecular theory, and change of state.',
            hours: 7,
            weightageMarks: 6,
            learningObjectives: ['Describe states of matter on the basis of kinetic theory', 'Explain the differences in compressibility, shape, and volume between solids, liquids, and gases'],
            importantTopics: ['Definition of Matter', 'Three States of Matter and their Properties', 'Kinetic Molecular Theory Assumptions', 'Intermolecular Force vs Intermolecular Space', 'Interconversion of States of Matter (Melting, Freezing, Vaporisation, Condensation, Sublimation)'],
            materials: [
              {
                id: 'm-icse-6-p-1',
                title: 'Matter & Kinetic Theory Study Notes',
                type: 'notes',
                description: 'Full notes with molecular model diagrams, phase transition chart, and solved textbook questions.',
                fileSize: '1.2 MB',
              },
            ],
            assignments: [
              {
                id: 'as-icse-6-p-1',
                title: 'Kinetic Theory of Matter Worksheet',
                level: 'Level 1 - Foundational',
                estimatedTime: '25 mins',
                questions: [
                  {
                    id: 'q-icse-p-1',
                    question: 'Why do gases diffuse rapidly compared to liquids and solids?',
                    explanation: 'In gases, intermolecular spaces are very large and intermolecular forces are negligible. Gas molecules possess high kinetic energy and move randomly at high speeds, causing rapid diffusion.',
                    marks: 2,
                  },
                ],
              },
            ],
            notesSummary: 'Matter occupies space and has mass. The kinetic theory explains that all matter consists of tiny particles in continuous motion held by intermolecular forces.',
            keyFormulasOrTerms: ['Intermolecular space: Distance between molecules', 'Intermolecular force: Force of attraction between molecules', 'Sublimation: Solid to gas without liquid phase', 'Brownian motion: Random zigzag motion of particles'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // ICSE CLASS 8
  // ==========================================
  {
    boardSlug: 'icse',
    classNumber: 8,
    classSlug: 'class-8',
    title: 'ICSE Class 8',
    academicStage: 'Middle School (6–8)',
    overview:
      'ICSE Class 8 is the preparatory bridge to the Class 9 & 10 Board curriculum. It features advanced algebra, geometry proofs, chemical language (valency, balancing, acids/bases/salts), Newtonian mechanics, optics, electricity, and human physiology.',
    keyFocusAreas: [
      'Algebraic factorisation, simultaneous linear equations, coordinate graphs, and commercial compounding',
      'Physics: matter, physical quantities and density, force and pressure, energy, light, heat, sound, electricity',
      'Chemistry: language of chemistry, chemical reactions, atomic structure, periodic table, carbon and its allotropes',
      'Biology: transportation in plants, human nervous, circulatory, and endocrine systems, reproduction, ecosystems',
    ],
    subjects: [
      {
        id: 'icse-8-physics',
        slug: 'physics',
        name: 'Physics',
        boardSlug: 'icse',
        classNumber: 8,
        icon: 'Zap',
        color: 'from-blue-600 to-cyan-600',
        description: {
          overview:
            'ICSE Class 8 Physics builds the quantitative and analytical foundation for Class 10 Board Physics. Topics include density, force and pressure, work, power and energy, light refraction, spherical mirrors, heat transfer, sound acoustics, and static/current electricity.',
          whatStudentsLearn: [
            'Matter: kinetic theory of matter, boiling, evaporation, thermal expansion, change of state graphs',
            'Physical Quantities and Measurement: density of irregular solids and liquids using density bottle and Eureka can, relative density',
            'Force and Pressure: turning effect of force, moment of force (torque), pressure in fluids, atmospheric pressure, barometer, manometers',
            'Energy: kinetic energy (½mv²), potential energy (mgh), law of conservation of energy, renewable and non-renewable energy sources',
            'Light: curved spherical mirrors (concave and convex), focus, focal length, ray diagrams, mirror formula, refraction of light, laws of refraction, refractive index, dispersion of light, rainbow formation',
            'Heat: heat capacity, specific heat capacity, thermal expansion in solids, liquids, gases, greenhouse effect, and global warming',
            'Sound: production, propagation, speed of sound in mediums, pitch, loudness, quality (timbre), audible range, ultrasound, and noise pollution',
            'Electricity: static electricity, charging by friction, conduction, induction, lightning conductor, simple electric circuits, Ohm law, series and parallel resistors, household electrical safety',
          ],
          importantTopicsCovered: [
            'Measurement of Relative Density using Density Bottle: RD = Mass of substance / Mass of equal volume of water',
            'Moment of a Force: Torque = Force × Perpendicular distance and Principle of Moments',
            'Fluid pressure laws: P = hρg and Hydraulic press principle (Pascal Law)',
            'Ray diagrams for Concave and Convex spherical mirrors with image characteristics',
            'Laws of refraction of light and refractive index formula: μ = sin i / sin r = c / v',
            'Loudness (proportional to amplitude squared) vs Pitch (proportional to frequency)',
            'Electric current, potential difference, Ohm law (V = IR), and domestic circuit safety',
          ],
          learningObjectives: [
            'Calculate density and relative density of liquids and irregular solids using Archimedes principles',
            'Apply the Principle of Moments to solve lever balance problems',
            'Construct precise ray diagrams for image formation by concave and convex mirrors',
            'Derive and calculate equivalent resistance for series and parallel electrical circuits',
          ],
          practicalApplications: [
            'Designing hydraulic vehicle lifts and car braking systems using Pascal law',
            'Selecting appropriate focal length concave mirrors for shaving and solar concentrators',
            'Measuring atmospheric pressure drops with barometers to predict cyclonic weather changes',
          ],
          skillsDeveloped: [
            'Laboratory density measurement and displacement techniques',
            'Curved mirror optical ray tracing',
            'Mechanical moment vector calculations',
            'Electrical circuit diagramming and resistance analysis',
          ],
          academicProgression:
            'Directly prepares students for ICSE Class 9 & 10 Physics (Force, Work/Energy/Power, Light, Sound, Electricity).',
        },
        prescribedTextbooks: [
          { title: 'Concise Physics Middle School Class 8', publisher: 'Selina Publishers' },
          { title: 'Living Science Physics Class 8', publisher: 'Ratna Sagar' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2,
          breakdown: ['Section A (Compulsory 40 Marks): Objective & Short answer', 'Section B (40 Marks): 4 out of 6 structured questions', 'Internal Assessment / Laboratory Record: 20 Marks'],
        },
        chapters: [
          {
            id: 'icse-8-phy-ch1',
            number: 1,
            slug: 'matter-and-density',
            title: 'Matter and Measurement of Density',
            description: 'Kinetic theory of matter, density of regular and irregular solids, density bottle, relative density, floatation, and Archimedes principle introduction.',
            hours: 8,
            weightageMarks: 8,
            learningObjectives: ['Determine density of an irregular solid using a measuring cylinder', 'Calculate relative density using a relative density bottle', 'State the relationship between density in SI units (kg/m³) and CGS units (g/cm³)'],
            importantTopics: ['Definition of Density: d = M / V', 'SI and CGS Units of Density (1 g/cm³ = 1000 kg/m³)', 'Measurement of Density of Irregular Solids by Displacement Method', 'Relative Density Definition and Formulas', 'Relative Density Bottle Construction and Method', 'Principle of Floatation and Sinking'],
            materials: [
              {
                id: 'm-icse-8-p-1',
                title: 'Density & Measurement Comprehensive Study Guide',
                type: 'notes',
                description: 'Full notes with density bottle laboratory experiment procedure, conversion formulas, and solved numerical problems.',
                fileSize: '1.4 MB',
              },
            ],
            assignments: [
              {
                id: 'as-icse-8-p-1',
                title: 'Density & Relative Density Problem Set',
                level: 'Level 2 - Application',
                estimatedTime: '35 mins',
                questions: [
                  {
                    id: 'q-icse-8-1',
                    question: 'A relative density bottle weighs 25.4 g when empty, 48.6 g when filled with water, and 44.2 g when filled with a liquid. Calculate the relative density of the liquid.',
                    explanation: 'Mass of water = 48.6 - 25.4 = 23.2 g. Mass of liquid = 44.2 - 25.4 = 18.8 g. Relative Density = Mass of liquid / Mass of equal volume of water = 18.8 / 23.2 = 0.81.',
                    marks: 3,
                  },
                ],
              },
            ],
            notesSummary: 'Density is mass per unit volume. Relative density is the ratio of the mass of a substance to the mass of an equal volume of water at 4°C, and has no units.',
            keyFormulasOrTerms: ['Density = Mass / Volume (kg/m³)', 'Relative Density = Density of substance / Density of water at 4°C', '1 g/cm³ = 1000 kg/m³', 'A body floats if its density is less than the density of the liquid'],
          },
        ],
      },
      {
        id: 'icse-8-chemistry',
        slug: 'chemistry',
        name: 'Chemistry',
        boardSlug: 'icse',
        classNumber: 8,
        icon: 'FlaskConical',
        color: 'from-emerald-500 to-teal-600',
        description: {
          overview:
            'ICSE Class 8 Chemistry develops the formal symbolic language of chemistry. Students master chemical symbols, valencies, radical ions, chemical equations balancing, atomic structure, periodic table classification, hydrogen, water, and carbon chemistry.',
          whatStudentsLearn: [
            'Matter: kinetic theory of matter, states, heating curves, and laws of conservation of mass',
            'Physical and Chemical Changes: characteristics, energy changes (exothermic vs endothermic), and reversible vs irreversible changes',
            'Elements, Compounds, and Mixtures: types of elements (metals, non-metals, metalloids, noble gases), mixtures vs compounds, separation techniques',
            'Atomic Structure: subatomic particles (protons, neutrons, electrons), atomic number (Z), mass number (A), Bohr-Bury electronic configurations, and valence electrons',
            'Language of Chemistry: symbols of elements, radicals (monovalent, divalent, trivalent, tetravalent), writing chemical formulas using criss-cross method, balancing chemical equations, and law of conservation of mass',
            'Chemical Reactions: combination, decomposition, displacement, double decomposition, neutralization, and precipitate formation reactions',
            'Hydrogen: discovery, lab preparation, industrial preparation (Bosch process), physical and chemical properties, oxidation and reduction',
            'Water: water as a universal solvent, solutions, solubility, solubility curves, hard and soft water, causes of hardness, removal of temporary and permanent hardness',
            'Carbon and Its Compounds: allotropes of carbon (crystalline: diamond, graphite, fullerenes; amorphous: coal, coke, charcoal), carbon monoxide, carbon dioxide preparation and properties, greenhouse effect',
          ],
          importantTopicsCovered: [
            'Valencies of elements and common polyatomic radicals (Sulphate, Carbonate, Nitrate, Ammonium, Phosphate)',
            'Balancing chemical equations by systematic inspection method',
            'Rutherford alpha-scattering experiment and Bohr atomic planetary model',
            'Electronic configurations of first 20 elements (Hydrogen to Calcium)',
            'Lab preparation of Hydrogen gas by reaction of zinc with dilute hydrochloric acid',
            'Differences between diamond and graphite based on carbon hybridization and structural bonding',
            'Hard water vs Soft water chemistry: Bicarbonates (temporary) vs Chlorides/Sulphates of Ca/Mg (permanent)',
          ],
          learningObjectives: [
            'Derive chemical formulas of ionic and covalent compounds using radical valency charts',
            'Balance complex chemical equations verifying the law of conservation of mass',
            'Draw atomic orbital diagrams showing electron distributions for elements Z = 1 to 20',
            'Explain methods of removing temporary (boiling, Clark process) and permanent water hardness (washing soda, ion exchange)',
          ],
          practicalApplications: [
            'Industrial water softening for thermal power station boiler feed water to prevent boiler scale',
            'Synthesizing synthetic diamonds for industrial cutting tools and graphite for nuclear reactor moderators',
            'Safe laboratory handling and collection of hydrogen gas over water by downward displacement',
          ],
          skillsDeveloped: [
            'Systematic chemical formula writing and nomenclature',
            'Chemical equation balancing and mass balance calculations',
            'Atomic orbital diagramming and electron configuration',
          ],
          academicProgression:
            'Essential prerequisite for ICSE Class 9 & 10 Chemistry (Periodic Properties, Chemical Bonding, Mole Concept, and Metallurgy).',
        },
        prescribedTextbooks: [
          { title: 'Concise Chemistry Middle School Class 8', publisher: 'Selina Publishers' },
          { title: 'Living Science Chemistry Class 8', publisher: 'Ratna Sagar' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2,
          breakdown: ['Section A (Compulsory): 40 Marks', 'Section B (4 of 6 questions): 40 Marks', 'Internal Practical & Viva: 20 Marks'],
        },
        chapters: [
          {
            id: 'icse-8-chem-ch1',
            number: 1,
            slug: 'language-of-chemistry',
            title: 'The Language of Chemistry',
            description: 'Chemical symbols, valency of elements and radicals, writing chemical formulas of compounds using the criss-cross method, and balancing chemical equations.',
            hours: 9,
            weightageMarks: 10,
            learningObjectives: ['Write chemical formulas of compounds given the names', 'Balance chemical equations and state the information conveyed by a chemical equation'],
            importantTopics: ['Symbols of Elements and Latin Names (e.g., Fe, Cu, Na, Pb, Au)', 'Definition of Valency and Variable Valency', 'Radicals: Basic (Cations) and Acidic (Anions)', 'Criss-Cross Method of Writing Chemical Formulae', 'Balancing Chemical Equations with State Symbols', 'Law of Conservation of Mass in Chemical Reactions'],
            materials: [
              {
                id: 'm-icse-8-c-1',
                title: 'Language of Chemistry Master Table & Equation Bank',
                type: 'notes',
                description: 'Full valency table for all elements and radicals, step-by-step formula derivation guide, and 60 balancing practice equations.',
                fileSize: '1.6 MB',
              },
            ],
            assignments: [
              {
                id: 'as-icse-8-c-1',
                title: 'Chemical Formulas & Equation Balancing Worksheet',
                level: 'Level 2 - Application',
                estimatedTime: '40 mins',
                questions: [
                  {
                    id: 'q-icse-c-1',
                    question: 'Write the chemical formula and balance the reaction: Aluminium + Sulphuric acid -> Aluminium sulphate + Hydrogen.',
                    explanation: 'Aluminium valency is 3; Sulphate radical SO₄ has valency 2. Formula of Aluminium sulphate is Al₂(SO₄)₃. Balanced equation: 2Al + 3H₂SO₄ -> Al₂(SO₄)₃ + 3H₂.',
                    marks: 3,
                  },
                ],
              },
            ],
            notesSummary: 'The language of chemistry uses symbols for elements, formulas for compounds, and equations for chemical transformations under conservation of mass.',
            keyFormulasOrTerms: ['Radicals: Polyatomic charged groups behaving as a single unit', 'Criss-cross: Swap valency numbers to determine subscripts', 'Reactants: Left-hand side substances', 'Products: Right-hand side substances'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // ICSE CLASS 10 (Secondary Board Exam)
  // ==========================================
  {
    boardSlug: 'icse',
    classNumber: 10,
    classSlug: 'class-10',
    title: 'ICSE Class 10',
    academicStage: 'Secondary School (9–10)',
    overview:
      'ICSE Class 10 culminates in the national Indian Certificate of Secondary Education examination administered by CISCE. The curriculum is renowned for its depth, application-based questioning, segregated science papers (Physics, Chemistry, Biology), commercial arithmetic, Shakespearean literature, and topographical map analysis.',
    keyFocusAreas: [
      'Commercial mathematics (GST, Banking), Algebra (Matrices, AP, Inequations), Coordinate geometry, Circle theorems, Trigonometry, Statistics',
      'Physics: Force, work/energy, machines, light refraction, sound resonance, calorimetry, household electricity, radioactivity',
      'Chemistry: Periodic properties, chemical bonding, acids/bases, mole concept, electrolysis, metallurgy, organic chemistry',
      'Biology: Genetics, plant physiology, human circulation, excretion, nervous system, endocrine glands, reproduction',
      'English: Julius Caesar drama, Treasure Chest prose/poetry, composition, functional grammar, and letter/notice/email writing',
    ],
    subjects: [
      {
        id: 'icse-10-physics',
        slug: 'physics',
        name: 'Physics (Science Paper 1)',
        code: '52',
        boardSlug: 'icse',
        classNumber: 10,
        icon: 'Zap',
        color: 'from-blue-600 to-cyan-600',
        description: {
          overview:
            'ICSE Class 10 Physics (Science Paper 1) evaluates rigorous conceptual and numerical understanding across mechanics, simple machines, light refraction, sound resonance, current electricity, calorimetry, and nuclear physics.',
          whatStudentsLearn: [
            'Force, Work, Power, and Energy: moment of a force, center of gravity, uniform circular motion, work, kinetic and potential energy, work-energy theorem, power, and simple machines (pulleys, levers, inclined plane, mechanical advantage, velocity ratio, efficiency)',
            'Light: refraction of light at plane surfaces, total internal reflection (critical angle, prisms), refraction through lenses (convex and concave), lens formula, magnification, power, spectrum, dispersion, and electromagnetic radiation',
            'Sound: reflection of sound waves, echoes, uses of echoes, vibrations (free, damped, forced), and acoustic resonance',
            'Electricity and Magnetism: current electricity, Ohm law, electromotive force (emf), internal resistance, terminal voltage, series and parallel resistor circuits, electrical power and energy, household circuits (ring system, switches, fuses, earthing), magnetic effect of current, and electromagnetic induction',
            'Heat (Calorimetry): heat capacity, specific heat capacity (principle of method of mixtures), latent heat, specific latent heat of fusion of ice, and natural thermal phenomena',
            'Modern Physics: radioactivity, nuclear structure, emission of alpha, beta, and gamma radiation, nuclear fission and fusion, safety precautions against radioactive hazards',
          ],
          importantTopicsCovered: [
            'Principle of Moments: Sum of clockwise moments = Sum of anticlockwise moments',
            'Block and Tackle Pulley Systems: MA = n (number of pulleys) for an ideal system',
            'Total Internal Reflection in 45°-45°-90° and 60°-60°-60° glass prisms for turning rays by 90° and 180°',
            'Echo distance formula: d = (v × t) / 2 and conditions for hearing a distinct echo (min distance 17 m)',
            'Series-Parallel combined circuits with internal resistance: I = E / (R_ext + r)',
            'Household Ring System of wiring with three-pin plugs, dual pole switches, and fuse placement in live wire',
            'Principle of Calorimetry: Heat lost by hot body = Heat gained by cold body (mcΔT = mcΔT + mL)',
            'Properties of Alpha (α), Beta (β), and Gamma (γ) radiations and nuclear decay equations',
          ],
          learningObjectives: [
            'Calculate mechanical advantage, velocity ratio, and efficiency of multi-pulley block and tackle systems',
            'Trace light rays through triangular prisms demonstrating deviation and total internal reflection',
            'Solve complex multi-loop circuit numerical problems involving emf, internal resistance, and terminal voltage',
            'Compute specific heat capacities and latent heat of fusion using calorimetric heat balance equations',
            'Write balanced nuclear transformation equations for alpha and beta radioactive decays',
          ],
          practicalApplications: [
            'Civil construction cranes utilizing block and tackle pulleys to multiply hoisting effort',
            'Submarine periscopes and SLR camera pentaprisms utilizing totally reflecting right-angled prisms',
            'SONAR ocean bathymetry and medical ultrasound diagnostics using acoustic echo timing',
            'Safe domestic household electrical distribution with dedicated earthing and fuse overcurrent protection',
          ],
          skillsDeveloped: [
            'Ray optics technical tracing and prism deviation calculation',
            'Calorimetric thermal balance equation formulation',
            'Electrical circuit analysis and troubleshooting',
            'Nuclear reaction balancing and radiation safety assessment',
          ],
          academicProgression:
            'Critical foundation for ISC Class 11 & 12 Physics, JEE Main/Advanced, NEET UG, and engineering disciplines.',
        },
        prescribedTextbooks: [
          { title: 'Concise Physics Class 10 (ICSE)', publisher: 'Selina Publishers', officialCode: 'ICSE-Phy-10' },
          { title: 'A New Approach to ICSE Physics Class 10', publisher: 'Goyal Brothers Prakashan' },
        ],
        evaluationScheme: {
          theoryMarks: 80,
          practicalOrInternalMarks: 20,
          totalMarks: 100,
          durationHours: 2,
          breakdown: [
            'Section I (Compulsory 40 Marks): Short-answer conceptual and numerical questions',
            'Section II (40 Marks): 4 out of 6 structured long questions with ray diagrams & derivations',
            'Internal Assessment (Practical laboratory experiments, records, and viva): 20 Marks',
          ],
        },
        chapters: [
          {
            id: 'icse-10-phy-ch1',
            number: 1,
            slug: 'force-work-power-energy',
            title: 'Force, Work, Power, and Energy',
            description: 'Turning effect of force, torque, couple, equilibrium of bodies, center of gravity, uniform circular motion, work-energy theorem, and simple machines (pulleys, levers).',
            hours: 12,
            weightageMarks: 12,
            learningObjectives: ['Calculate torque and apply the principle of moments in equilibrium systems', 'Determine mechanical advantage and efficiency of block and tackle pulley systems', 'Calculate kinetic and potential energy and prove conservation of mechanical energy for a freely falling body'],
            importantTopics: ['Moment of a Force and Couple: τ = F × d', 'Principle of Moments and Center of Gravity of Regular Solids', 'Uniform Circular Motion vs Linear Motion (Centripetal vs Centrifugal Force)', 'Work done by a force: W = Fs cosθ', 'Kinetic Energy (½mv²) and Gravitational Potential Energy (mgh)', 'Conservation of Mechanical Energy in Free Fall Proof', 'Machines: MA, VR, and Efficiency relationship: η = MA / VR', 'Block and Tackle Pulley System: MA = n and derivation of VR'],
            materials: [
              {
                id: 'm-icse-10-p-1',
                title: 'Force, Work & Machines Complete Board Revision Guide',
                type: 'notes',
                description: 'Full chapter notes with all pulley diagrams, free-fall mechanical energy conservation proof, and previous 10-year board questions.',
                fileSize: '2.2 MB',
                downloadFilename: 'ICSE_Class10_Physics_Ch1_ForceMachines.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-icse-10-p-1',
                title: 'ICSE Board Questions — Force and Machines',
                level: 'Level 3 - Exemplar / HOTS',
                estimatedTime: '45 mins',
                questions: [
                  {
                    id: 'q-icse-10-p-1',
                    question: 'A block and tackle system has 5 pulleys. If an effort of 1000 N is needed to raise a load of 4500 N, calculate: (i) Mechanical Advantage, (ii) Velocity Ratio, (iii) Efficiency of the system.',
                    explanation: '(i) MA = Load / Effort = 4500 / 1000 = 4.5. (ii) For a system of 5 pulleys, Velocity Ratio VR = n = 5. (iii) Efficiency η = (MA / VR) × 100% = (4.5 / 5) × 100% = 90%.',
                    marks: 3,
                  },
                ],
              },
            ],
            notesSummary: 'The turning effect of a force depends on magnitude and perpendicular distance from the pivot. In any machine, efficiency is always less than 100% due to friction and pulley string weight.',
            keyFormulasOrTerms: ['Torque τ = Force × Perpendicular distance', 'Work = F × s × cosθ', 'Kinetic Energy = ½ mv²', 'MA = Load / Effort', 'VR = Distance moved by effort / Distance moved by load', 'Efficiency η = MA / VR'],
          },
        ],
        previousYearPapers: [
          {
            id: 'icse-10-phy-pyq-2024',
            year: 2024,
            session: 'ICSE Board Examination',
            title: 'ICSE Class 10 Physics (Science Paper 1) Official Board Question Paper',
            totalMarks: 80,
            duration: '2 hours',
            solutionsAvailable: true,
            highlights: ['Official CISCE Council specimen solutions', 'Ray diagrams with exact arrow markings', 'Step-by-step numerical calculation rubrics'],
          },
        ],
      },
    ],
  },

  // ==========================================
  // ICSE CLASS 12 (ISC Senior Secondary Exam)
  // ==========================================
  {
    boardSlug: 'icse',
    classNumber: 12,
    classSlug: 'class-12',
    title: 'ISC Class 12',
    academicStage: 'Senior Secondary (11–12)',
    overview:
      'ISC Class 12 is the senior secondary qualifying examination administered by CISCE. The curriculum is celebrated worldwide for its academic depth, demanding university-preparatory rigor in advanced calculus, electromagnetism, organic synthesis, and computational data structures.',
    keyFocusAreas: [
      'Electrostatics, current electricity, magnetic effects, electromagnetic induction, alternating currents, optics, modern physics',
      'Solid state, solutions, electrochemistry, chemical kinetics, coordination chemistry, haloalkanes, aldehydes/ketones, biomolecules',
      'Relations, inverse trigonometry, matrices, differential & integral calculus, differential equations, probability distributions',
      'Object-Oriented Programming in Java: recursion, linked lists, binary trees, stacks, queues, and complexity analysis',
    ],
    subjects: [
      {
        id: 'isc-12-physics',
        slug: 'physics',
        name: 'Physics',
        code: '861',
        boardSlug: 'icse',
        classNumber: 12,
        stream: 'Science',
        icon: 'Zap',
        color: 'from-blue-600 to-cyan-600',
        description: {
          overview:
            'ISC Class 12 Physics provides advanced, calculus-supported analysis of electrostatics, current electricity, magnetic fields, electromagnetic induction, AC circuits, optics, dual nature of radiation, nuclear physics, and semiconductor electronics.',
          whatStudentsLearn: [
            'Electrostatics: Coulomb law in vector form, electric field and dipole, Gauss theorem and applications, electrostatic potential, capacitance of parallel plate capacitor with dielectric, capacitors in series/parallel, energy stored',
            'Current Electricity: drift velocity, mobility, Ohm law, resistivity, temperature dependence, Kirchhoff laws, Wheatstone bridge, potentiometer (comparison of emfs and internal resistance)',
            'Magnetic Effects of Current and Magnetism: Biot-Savart law, Ampere circuital law, magnetic field of circular coil and solenoid, Lorentz force, cyclotron, moving coil galvanometer, Earth magnetism, diamagnetic, paramagnetic, ferromagnetic materials',
            'Electromagnetic Induction and AC: Faraday laws, Lenz law, self and mutual inductance, AC generator, series LCR circuits, phasor diagrams, resonance, power factor, transformers',
            'Electromagnetic Waves: displacement current, electromagnetic spectrum properties and applications',
            'Optics: reflection, refraction, total internal reflection, lens maker formula, compound microscope, astronomical telescope, Huygens wave theory, interference (YDSE), diffraction at a single slit, Brewster law of polarisation',
            'Dual Nature of Radiation and Matter: photoelectric effect, Einstein photoelectric equation, de Broglie wavelength',
            'Atoms and Nuclei: Rutherford and Bohr models, hydrogen spectrum, mass defect, binding energy per nucleon, nuclear fission, fusion',
            'Semiconductor Devices: energy bands, intrinsic/extrinsic semiconductors, p-n junction diode V-I characteristics, half-wave and full-wave rectifiers, Zener diode as voltage regulator, logic gates',
          ],
          importantTopicsCovered: [
            'Gauss Theorem and derivations for line, sheet, and spherical shell charge distributions',
            'Capacitor energy density formula: u = ½ ε₀E²',
            'Kirchhoff Voltage and Current laws applied to bridge and mesh networks',
            'Potentiometer sensitivity and principle for measuring tiny potential differences',
            'Biot-Savart Law and axial magnetic field of a circular current loop: B = (μ₀ I R²) / [2(R² + x²)^(3/2)]',
            'Series LCR circuit impedance, resonance condition, and sharpness Q-factor',
            'Lens Maker formula: 1/f = (μ - 1)[(1/R₁) - (1/R₂)]',
            'Young Double Slit Experiment fringe width derivation: β = λD / d',
            'Einstein photoelectric equation: hν = hν₀ + ½mv²_max and stopping potential graphs',
            'Zener diode voltage stabilization mechanism and breakdown characteristics',
          ],
          learningObjectives: [
            'Derive and calculate electromagnetic fields and potentials using differential and integral techniques',
            'Analyze reactive AC circuits using phasor representations and determine power factors',
            'Design optical lens combinations for compound microscopes and telescopes with optimal magnification',
            'Formulate semiconductor circuit designs for rectification and voltage regulation',
          ],
          practicalApplications: [
            'Optical telecommunication repeater design utilizing fiber optic total internal reflection',
            'Power transmission grid impedance matching and transformer step-up operations',
            'Precision lab potentiometer measurements in analytical electrochemical voltage determination',
          ],
          skillsDeveloped: [
            'Rigorous mathematical derivation of electromagnetic laws',
            'Precision optical bench and spectrometer measurement',
            'Electrical AC circuit phasor diagramming',
          ],
          academicProgression:
            'Prepares students for premier engineering (IIT-JEE), medical (NEET-UG), and international university undergraduate programs.',
        },
        prescribedTextbooks: [
          { title: 'Nootan ISC Physics Class 12', publisher: 'Nageen Prakashan' },
          { title: 'S. Chand ISC Physics for Class XII', publisher: 'S. Chand Publishing' },
        ],
        evaluationScheme: {
          theoryMarks: 70,
          practicalOrInternalMarks: 30,
          totalMarks: 100,
          durationHours: 3,
          breakdown: [
            'Theory Paper (Compulsory Section A + Section B & C choices): 70 Marks',
            'Practical Examination (Optics, Electricity experiments): 15 Marks',
            'Project Work: 10 Marks',
            'Practical File & Viva: 5 Marks',
          ],
        },
        chapters: [
          {
            id: 'isc-12-phy-ch1',
            number: 1,
            slug: 'electrostatics',
            title: 'Electrostatics',
            description: 'Coulomb law, electric field, electric dipole, Gauss theorem, electric potential, capacitors, dielectric polarization, and energy stored in electric fields.',
            hours: 14,
            weightageMarks: 10,
            learningObjectives: ['Apply Gauss theorem to calculate electric field intensities', 'Derive capacitance of a parallel plate capacitor with dielectric slab', 'Calculate electrostatic potential energy of multi-charge systems'],
            importantTopics: ['Coulomb Law in Vector Notation', 'Electric Dipole Moment and Field on Axial and Equatorial Points', 'Gauss Theorem Statement and Applications', 'Electric Potential due to a Point Charge and Dipole', 'Capacitance of Parallel Plate Capacitor: C = ε₀A/d', 'Effect of Dielectric Slab on Capacitance', 'Energy Stored in a Capacitor: U = ½ CV² = ½ Q²/C'],
            materials: [
              {
                id: 'm-isc-12-p-1',
                title: 'Electrostatics Master Notes & Derivation Compendium',
                type: 'notes',
                description: 'Full chapter notes with all formal proofs, Gauss theorem derivations, and 10-year ISC board examination questions.',
                fileSize: '2.4 MB',
                downloadFilename: 'ISC_Class12_Physics_Ch1_Electrostatics.pdf',
              },
            ],
            assignments: [
              {
                id: 'as-isc-12-p-1',
                title: 'ISC Board Derivations — Electrostatics',
                level: 'Level 3 - Exemplar / HOTS',
                estimatedTime: '50 mins',
                questions: [
                  {
                    id: 'q-isc-12-p-1',
                    question: 'A parallel plate capacitor is charged by a battery. The battery is then disconnected and a dielectric slab of dielectric constant K is inserted between the plates. What happens to: (i) Charge, (ii) Capacitance, (iii) Potential Difference, (iv) Electric Field, (v) Stored Energy?',
                    explanation: '(i) Charge remains constant Q because battery is disconnected. (ii) Capacitance increases by factor K: C = K C₀. (iii) Potential difference decreases: V = V₀ / K. (iv) Electric field decreases: E = E₀ / K. (v) Stored energy decreases: U = Q² / (2C) = U₀ / K.',
                    marks: 4,
                  },
                ],
              },
            ],
            notesSummary: 'Electrostatics governs stationary charges. Gauss law links enclosed charge to surface flux. Inserting a dielectric always increases capacitance by factor K.',
            keyFormulasOrTerms: ['Gauss law: ∮ E · dA = q/ε₀', 'Capacitance: C = Q/V', 'Capacitance with dielectric: C = K ε₀A / d', 'Energy density: u = ½ ε₀E²'],
          },
        ],
        previousYearPapers: [
          {
            id: 'isc-12-phy-pyq-2024',
            year: 2024,
            session: 'ISC Board Examination',
            title: 'ISC Class 12 Physics Official Board Examination Question Paper',
            totalMarks: 70,
            duration: '3 hours',
            solutionsAvailable: true,
            highlights: ['Official CISCE Council specimen paper solutions', 'Detailed numerical step marking', 'Examiner comments on common student errors'],
          },
        ],
      },
    ],
  },
];

