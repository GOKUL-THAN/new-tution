import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Paths — Engineering, Medicine, Commerce, Arts & More',
  description:
    'Explore career pathways from Class 12 — Engineering (IIT/NIT via JEE), Medicine (MBBS via NEET), Commerce, Science, Arts, Law, and Defence. Official exam links and guidance.',
};

const streams = [
  {
    stream: 'Engineering',
    icon: '⚙️',
    color: 'from-violet-700 to-violet-500',
    bg: 'bg-violet-50 border-violet-200',
    subjects: 'Physics + Chemistry + Mathematics',
    topExam: 'JEE Main → JEE Advanced',
    paths: [
      {
        title: 'IIT Route (JEE Advanced)',
        steps: ['Class 11–12 PCM strong foundation', 'JEE Main — qualify top ~2.5L', 'JEE Advanced — appear and qualify', 'JoSAA counselling for IIT seat', 'B.Tech (4 years) at IIT'],
        outcome: 'B.Tech from IIT → Research, IIM, FAANG, startups, PSU',
        examUrl: 'https://jeeadv.ac.in/',
        counsellingUrl: 'https://josaa.admissions.nic.in/',
      },
      {
        title: 'NIT / IIIT Route (JEE Main)',
        steps: ['Class 11–12 PCM with board focus', 'JEE Main — rank below 1L preferred', 'JoSAA counselling for NIT/IIIT seat', 'B.Tech (4 years) at NIT/IIIT'],
        outcome: 'B.Tech from NIT → Core engineering, IT, PSU, higher education',
        examUrl: 'https://jeemain.nta.nic.in/',
        counsellingUrl: 'https://josaa.admissions.nic.in/',
      },
      {
        title: 'Private Universities (VITEEE / SRMJEEE)',
        steps: ['Class 12 PCM', 'VITEEE or SRMJEEE', 'Direct admission to VIT / SRM', 'B.Tech (4 years)'],
        outcome: 'B.Tech from private university → IT, Product, Core engineering',
        examUrl: 'https://viteee.vit.ac.in/',
        counsellingUrl: 'https://www.srmist.edu.in/admissions/',
      },
      {
        title: 'TN Engineering (TNEA)',
        steps: ['Class 12 PCM minimum 45%', 'No separate entrance exam (marks-based)', 'TNEA web counselling', 'B.E./B.Tech at TN colleges'],
        outcome: 'B.E./B.Tech from TN college → Core engineering, IT, government sector',
        examUrl: 'https://www.tneaonline.org/',
        counsellingUrl: 'https://www.tneaonline.org/',
      },
    ],
  },
  {
    stream: 'Medicine & Allied Health',
    icon: '🩺',
    color: 'from-emerald-700 to-emerald-500',
    bg: 'bg-emerald-50 border-emerald-200',
    subjects: 'Physics + Chemistry + Biology',
    topExam: 'NEET UG',
    paths: [
      {
        title: 'MBBS Route (NEET UG)',
        steps: ['Class 11–12 PCB — strong Biology focus', 'NEET UG — national level exam', 'MCC counselling (AIQ) or TN Medical Selection', 'MBBS (5.5 years including internship)'],
        outcome: 'MBBS → MD/MS specialisation, General Practice, Research, UPSC Medical services',
        examUrl: 'https://neet.nta.nic.in/',
        counsellingUrl: 'https://mcc.nic.in/',
      },
      {
        title: 'BDS — Dental Surgery',
        steps: ['Class 11–12 PCB', 'NEET UG qualification', 'MCC / State counselling for BDS seats', 'BDS (5 years including internship)'],
        outcome: 'BDS → MDS specialisation, Private practice, Research',
        examUrl: 'https://neet.nta.nic.in/',
        counsellingUrl: 'https://mcc.nic.in/',
      },
      {
        title: 'Allied Health Sciences',
        steps: ['Class 11–12 PCB (or PCM for Pharmacy)', 'NEET UG or state-level exam', 'B.Pharm, B.Sc Nursing, BPT, BASLP, etc.', '3–4 year undergraduate programme'],
        outcome: 'Allied health professional → Hospital, Research, Industry, Government',
        examUrl: 'https://neet.nta.nic.in/',
        counsellingUrl: 'https://mcc.nic.in/',
      },
      {
        title: 'AYUSH (Ayurveda / Homoeopathy)',
        steps: ['Class 11–12 PCB', 'NEET UG qualification', 'AYUSH counselling', 'BAMS / BHMS / BUMS (5.5 years)'],
        outcome: 'AYUSH practitioner → Clinical practice, Wellness sector, Government service',
        examUrl: 'https://neet.nta.nic.in/',
        counsellingUrl: 'https://aaccc.gov.in/',
      },
    ],
  },
  {
    stream: 'Commerce & Management',
    icon: '💼',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 border-amber-200',
    subjects: 'Accountancy + Business Studies + Economics + Maths',
    topExam: 'CUET UG / CA Foundation',
    paths: [
      {
        title: 'Chartered Accountancy (CA)',
        steps: ['Class 12 Commerce with Accountancy', 'CA Foundation exam (ICAI)', 'CA Intermediate → CA Final', '3-year articleship (practical training)', 'CA Qualified'],
        outcome: 'CA → Big 4 firms, CFO roles, Entrepreneurship, Tax, Audit',
        examUrl: 'https://www.icai.org/',
        counsellingUrl: 'https://www.icai.org/',
      },
      {
        title: 'B.Com / BBA → MBA',
        steps: ['Class 12 Commerce', 'CUET UG for central universities or TNEA equivalent', 'B.Com or BBA (3 years)', 'MBA entrance — CAT/XAT/SNAP', 'MBA from IIM or top B-school'],
        outcome: 'MBA → Management, Consulting, Finance, Marketing, Entrepreneurship',
        examUrl: 'https://cuet.samarth.ac.in/',
        counsellingUrl: 'https://cuet.samarth.ac.in/',
      },
    ],
  },
  {
    stream: 'Science (Non-Engineering)',
    icon: '🔬',
    color: 'from-blue-700 to-blue-500',
    bg: 'bg-blue-50 border-blue-200',
    subjects: 'Physics + Chemistry + Mathematics / Biology',
    topExam: 'CUET UG / IISER IAT / NEST',
    paths: [
      {
        title: 'IISER Route (Pure Science Research)',
        steps: ['Class 12 PCM with 60%+', 'IISER Aptitude Test (IAT) or JEE Main merit', 'BS-MS Dual Degree at IISER (5 years)', 'Research internships throughout'],
        outcome: 'BS-MS from IISER → PhD abroad/India, Research scientist, Academics',
        examUrl: 'https://iiseradmission.in/',
        counsellingUrl: 'https://iiseradmission.in/',
      },
      {
        title: 'B.Sc → M.Sc Route',
        steps: ['Class 12 PCM or PCB', 'CUET UG for central universities', 'B.Sc (3 years)', 'IIT JAM / CUET PG for M.Sc', 'M.Sc at IIT or central university'],
        outcome: 'M.Sc → PhD, Research, Data Science, Government research labs (ISRO, DRDO, BARC)',
        examUrl: 'https://cuet.samarth.ac.in/',
        counsellingUrl: 'https://cuet.samarth.ac.in/',
      },
    ],
  },
  {
    stream: 'Law',
    icon: '⚖️',
    color: 'from-slate-700 to-slate-500',
    bg: 'bg-slate-50 border-slate-200',
    subjects: 'Any stream — English proficiency important',
    topExam: 'CLAT',
    paths: [
      {
        title: '5-Year Integrated Law (BA LLB / BBA LLB)',
        steps: ['Class 12 any stream (minimum 45% marks)', 'CLAT — Common Law Admission Test', 'National Law University (NLU) admission', 'BA LLB or BBA LLB (5 years)'],
        outcome: 'LLB → Litigation, Corporate Law, Government Legal Services, Judiciary',
        examUrl: 'https://consortiumofnlus.ac.in/',
        counsellingUrl: 'https://consortiumofnlus.ac.in/',
      },
    ],
  },
  {
    stream: 'Defence',
    icon: '🎖️',
    color: 'from-green-800 to-green-600',
    bg: 'bg-green-50 border-green-200',
    subjects: 'Mathematics + Physics (for NDA)',
    topExam: 'NDA / CDS',
    paths: [
      {
        title: 'NDA Route (After Class 12)',
        steps: ['Class 12 PCM (for Army / Air Force / Navy)', 'NDA written exam — UPSC', 'SSB Interview', 'NDA training (3 years at Pune)', 'Commissioned as Officer in Indian Armed Forces'],
        outcome: 'Army / Navy / Air Force Officer → Full career, PG options, Admin services',
        examUrl: 'https://www.upsc.gov.in/',
        counsellingUrl: 'https://www.upsc.gov.in/',
      },
    ],
  },
];

export default function CareerPathsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero — Premium Light Theme */}
        <section className="bg-gradient-to-b from-slate-50 via-blue-50/25 to-white pt-32 pb-20 relative overflow-hidden border-b border-slate-200/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_60%)] pointer-events-none" />
          <div className="container-wide relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold mb-5 shadow-xs">
                <span>🎓</span>
                After Class 12 — Your Path Forward
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 mb-5 tracking-tight">
                Career <span className="text-blue-600">Pathways &amp; Guidance</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                From Engineering to Medicine, Commerce to Law — understand every pathway,
                the entrance exams required, and where each path can lead.
                All information from official institutional sources.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="container-wide py-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Career pathway information is for guidance only. Eligibility criteria, seat availability,
                and exam patterns change annually. Always verify from official institutional sources.
                Global Minds Academy does not guarantee admission or specific career outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Stream cards */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title text-center mb-12">Choose Your Stream</h2>

            <div className="space-y-10">
              {streams.map((stream) => (
                <div key={stream.stream} className={`rounded-3xl border p-6 sm:p-8 ${stream.bg}`}>
                  {/* Stream header */}
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-4xl">{stream.icon}</span>
                    <div>
                      <h3 className="font-display font-bold text-gray-900 text-2xl">{stream.stream}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Core subjects:</strong> {stream.subjects}
                      </p>
                      <p className="text-sm text-blue-600 font-semibold mt-0.5">
                        Main entrance: {stream.topExam}
                      </p>
                    </div>
                  </div>

                  {/* Paths grid */}
                  <div className="grid md:grid-cols-2 gap-5">
                    {stream.paths.map((path) => (
                      <div key={path.title} className="bg-white rounded-2xl p-5 border border-white hover:shadow-sm transition-shadow">
                        <div className={`bg-gradient-to-r ${stream.color} text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3`}>
                          {path.title}
                        </div>

                        <ol className="space-y-2 mb-4">
                          {path.steps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                              <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${stream.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                                {i + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>

                        <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-gray-700"><strong>Outcome:</strong> {path.outcome}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <a href={path.examUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
                            Exam Portal <ExternalLink className="w-3 h-3" />
                          </a>
                          {path.counsellingUrl !== path.examUrl && (
                            <a href={path.counsellingUrl} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 hover:underline">
                              Counselling <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preparation CTA */}
        <section className="section-padding bg-gradient-to-b from-blue-50/50 via-slate-50 to-white border-t border-blue-100">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4">
              Start Your Preparation Today
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto font-medium">
              Now that you know your path — begin with a free diagnostic test to understand your current level
              and get a personalised study plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/diagnostic-test" className="btn bg-blue-600 text-white hover:bg-blue-700 font-bold px-8 py-3 shadow-md shadow-blue-500/25">
                Take Free Diagnostic Test
              </Link>
              <Link href="/college-guide" className="btn bg-white border-2 border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm px-8 py-3">
                College Guide <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/batches" className="btn bg-white border-2 border-slate-300 text-slate-800 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 shadow-sm px-8 py-3">
                View Batches
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
