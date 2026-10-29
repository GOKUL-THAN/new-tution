import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ExternalLink, GraduationCap, AlertCircle, ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'College Guide — IITs, NITs, AIIMS, Medical Colleges in Tamil Nadu',
  description:
    'Discover IITs, NITs, AIIMS, and top engineering & medical colleges in India and Tamil Nadu. Official links, entrance exam requirements, and JoSAA counselling guide.',
};

const engineeringColleges = [
  {
    name: 'IIT Madras',
    location: 'Chennai, Tamil Nadu',
    type: 'IIT',
    entrance: 'JEE Advanced',
    website: 'https://www.iitm.ac.in/',
    counselling: 'https://josaa.admissions.nic.in/',
    highlight: 'Nearest IIT to Chennai. Ranked #1 in NIRF Engineering 2024.',
    courses: ['B.Tech', 'B.Tech + M.Tech Dual', 'BS', 'MA'],
    color: 'bg-[#1A6B5A]',
  },
  {
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    type: 'IIT',
    entrance: 'JEE Advanced',
    website: 'https://www.iitb.ac.in/',
    counselling: 'https://josaa.admissions.nic.in/',
    highlight: 'Top choice for Computer Science and Electronics engineering.',
    courses: ['B.Tech', 'B.Tech + M.Tech Dual', 'BS', 'M.Sc'],
    color: 'bg-blue-700',
  },
  {
    name: 'IIT Delhi',
    location: 'New Delhi',
    type: 'IIT',
    entrance: 'JEE Advanced',
    website: 'https://home.iitd.ac.in/',
    counselling: 'https://josaa.admissions.nic.in/',
    highlight: 'Strong research ecosystem and industry connections in North India.',
    courses: ['B.Tech', 'B.Tech + M.Tech Dual', 'B.Des'],
    color: 'bg-indigo-700',
  },
  {
    name: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    type: 'NIT',
    entrance: 'JEE Main',
    website: 'https://www.nitt.edu/',
    counselling: 'https://josaa.admissions.nic.in/',
    highlight: 'Premier NIT in Tamil Nadu. Consistently ranked among top 10 NITs.',
    courses: ['B.Tech', 'M.Tech', 'M.Sc', 'MBA'],
    color: 'bg-violet-700',
  },
  {
    name: 'NIT Surathkal',
    location: 'Mangalore, Karnataka',
    type: 'NIT',
    entrance: 'JEE Main',
    website: 'https://www.nitk.ac.in/',
    counselling: 'https://josaa.admissions.nic.in/',
    highlight: 'Strong CS and ECE departments. Good placement record.',
    courses: ['B.Tech', 'M.Tech', 'M.Sc'],
    color: 'bg-purple-700',
  },
  {
    name: 'VIT Vellore',
    location: 'Vellore, Tamil Nadu',
    type: 'Deemed University',
    entrance: 'VITEEE',
    website: 'https://vit.ac.in/',
    counselling: 'https://viteee.vit.ac.in/',
    highlight: 'Tamil Nadu\'s largest private engineering university. Strong industry tie-ups.',
    courses: ['B.Tech', 'M.Tech', 'MBA', 'B.Des'],
    color: 'bg-orange-600',
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Kattankulathur, Tamil Nadu',
    type: 'Deemed University',
    entrance: 'SRMJEEE',
    website: 'https://www.srmist.edu.in/',
    counselling: 'https://www.srmist.edu.in/admissions/',
    highlight: 'One of India\'s largest private universities. Strong research output.',
    courses: ['B.Tech', 'M.Tech', 'MBA', 'MBBS', 'M.Sc'],
    color: 'bg-rose-600',
  },
  {
    name: 'Anna University (CEG)',
    location: 'Chennai, Tamil Nadu',
    type: 'State University',
    entrance: 'TNEA (State Counselling)',
    website: 'https://www.annauniv.edu/',
    counselling: 'https://www.tneaonline.org/',
    highlight: 'Premier state university in Tamil Nadu. TNEA-based admission for TN students.',
    courses: ['B.E./B.Tech', 'M.E./M.Tech', 'MBA', 'M.C.A'],
    color: 'bg-teal-700',
  },
];

const medicalColleges = [
  {
    name: 'AIIMS New Delhi',
    location: 'New Delhi',
    type: 'AIIMS',
    entrance: 'NEET UG',
    website: 'https://www.aiims.edu/',
    counselling: 'https://mcc.nic.in/',
    highlight: 'India\'s premier medical institution. MBBS admission via NEET + MCC counselling.',
    courses: ['MBBS', 'B.Sc Nursing', 'B.Sc (Paramedical)'],
    color: 'bg-emerald-700',
  },
  {
    name: 'JIPMER Puducherry',
    location: 'Puducherry (near Tamil Nadu)',
    type: 'Deemed University',
    entrance: 'NEET UG',
    website: 'https://www.jipmer.edu.in/',
    counselling: 'https://mcc.nic.in/',
    highlight: 'Top medical institution in South India. Closest AIIMS-equivalent to Tamil Nadu.',
    courses: ['MBBS', 'B.Sc Nursing', 'M.D.', 'M.S.'],
    color: 'bg-green-700',
  },
  {
    name: 'Madras Medical College',
    location: 'Chennai, Tamil Nadu',
    type: 'Government Medical College',
    entrance: 'NEET UG',
    website: 'https://mmc.tn.gov.in/',
    counselling: 'https://tnmedicalselection.net/',
    highlight: 'One of India\'s oldest medical colleges. TN state counselling via TNMC.',
    courses: ['MBBS', 'M.D.', 'M.S.', 'B.Sc Allied Health'],
    color: 'bg-cyan-700',
  },
  {
    name: 'Stanley Medical College',
    location: 'Chennai, Tamil Nadu',
    type: 'Government Medical College',
    entrance: 'NEET UG',
    website: 'https://www.stanleymedicalcollege.ac.in/',
    counselling: 'https://tnmedicalselection.net/',
    highlight: 'Major government medical college in Chennai with 1,400+ bed hospital.',
    courses: ['MBBS', 'M.D.', 'M.S.'],
    color: 'bg-teal-600',
  },
  {
    name: 'Sri Ramachandra Institute',
    location: 'Chennai, Tamil Nadu',
    type: 'Deemed University',
    entrance: 'NEET UG',
    website: 'https://www.sriramachandra.edu.in/',
    counselling: 'https://mcc.nic.in/',
    highlight: 'Comprehensive health sciences university in Chennai.',
    courses: ['MBBS', 'BDS', 'B.Pharm', 'B.Sc Nursing', 'Allied Health'],
    color: 'bg-blue-700',
  },
];

const counsellingProcesses = [
  {
    title: 'JoSAA — For IITs & NITs',
    steps: [
      'Qualify JEE Advanced (for IITs) or JEE Main (for NITs/IIITs)',
      'Register on JoSAA portal (josaa.admissions.nic.in)',
      'Fill choices of colleges and branches',
      'Participate in multiple rounds of seat allotment',
      'Accept seat, pay fees, and report to institution',
    ],
    url: 'https://josaa.admissions.nic.in/',
    color: 'bg-[#1A6B5A]',
  },
  {
    title: 'MCC — For MBBS/BDS (AIQ)',
    steps: [
      'Qualify NEET UG with sufficient score',
      'Register on MCC portal (mcc.nic.in)',
      'Fill choices from AIIMS, JIPMER, and AIQ seats in govt colleges',
      'Multiple counselling rounds for seat allotment',
      'Accept allotted college and complete admission formalities',
    ],
    url: 'https://mcc.nic.in/',
    color: 'bg-emerald-700',
  },
  {
    title: 'TNEA — Tamil Nadu Engineering',
    steps: [
      'Qualify Class 12 with PCM minimum 45% marks',
      'Register on TNEA portal (tneaonline.org)',
      'Upload Class 12 marks and certificate',
      'Participate in web-based counselling',
      'Seat allotted based on marks — no separate entrance exam for most seats',
    ],
    url: 'https://www.tneaonline.org/',
    color: 'bg-[#D4A017]',
  },
  {
    title: 'TN Medical Counselling',
    steps: [
      'Qualify NEET UG',
      'Register on TN Medical Selection portal',
      'Fill college preferences for TN state quota seats',
      'Multiple rounds of counselling',
      'Document verification and admission at allotted college',
    ],
    url: 'https://tnmedicalselection.net/',
    color: 'bg-blue-700',
  },
];

export default function CollegeGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0c2e28] via-[#1A6B5A] to-[#1A8A7A] pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,197,24,0.1),transparent_50%)]" />
          <div className="container-wide relative z-10">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">College Guide</span>
            </nav>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-5">
                <GraduationCap className="w-4 h-4 text-[#F5C518]" />
                IITs · NITs · AIIMS · TN Colleges
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-5">
                College Guide
              </h1>
              <p className="text-lg text-white/75 max-w-2xl leading-relaxed">
                Discover top engineering and medical colleges in India and Tamil Nadu.
                Understand entrance requirements, counselling processes, and official admission portals.
                All information sourced from official institutional websites.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border-b border-amber-200">
          <div className="container-wide py-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> College information is for guidance only. Cutoffs, fees, and seat numbers
                change every year. We do not publish cutoff ranks, placement figures, or salary data —
                such figures vary each year and must be verified from official sources.
                Global Minds Academy is not affiliated with any institution listed.
              </p>
            </div>
          </div>
        </section>

        {/* Engineering Colleges */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title mb-3">Top Engineering Colleges</h2>
            <p className="text-gray-500 mb-10">Admission via JEE Main, JEE Advanced, VITEEE, SRMJEEE, or TNEA. Always verify from official sources.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineeringColleges.map((col) => (
                <div key={col.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Header strip */}
                  <div className={`${col.color} px-5 py-4`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-white text-base">{col.name}</h3>
                        <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                          <MapPin className="w-3 h-3" />
                          {col.location}
                        </div>
                      </div>
                      <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
                        {col.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{col.highlight}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">Entrance:</span>
                      <span className="text-xs font-semibold text-[#1A6B5A] bg-[#1A6B5A]/10 px-2 py-0.5 rounded-full">{col.entrance}</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1.5">Programmes</p>
                      <div className="flex flex-wrap gap-1.5">
                        {col.courses.map((c) => (
                          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <a href={col.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[#1A6B5A] font-semibold hover:underline">
                        Official Site <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href={col.counselling} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1A6B5A] hover:underline">
                        Counselling <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Colleges */}
        <section className="section-padding bg-white">
          <div className="container-wide">
            <h2 className="section-title mb-3">Top Medical Colleges</h2>
            <p className="text-gray-500 mb-10">Admission via NEET UG. MCC handles All India Quota; TN Medical Selection handles state quota.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalColleges.map((col) => (
                <div key={col.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className={`${col.color} px-5 py-4`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-white text-base">{col.name}</h3>
                        <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                          <MapPin className="w-3 h-3" />
                          {col.location}
                        </div>
                      </div>
                      <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
                        {col.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{col.highlight}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">Entrance:</span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{col.entrance}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {col.courses.map((c) => (
                          <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <a href={col.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[#1A6B5A] font-semibold hover:underline">
                        Official Site <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href={col.counselling} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#1A6B5A] hover:underline">
                        Counselling <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Counselling Guide */}
        <section className="section-padding bg-gray-50">
          <div className="container-wide">
            <h2 className="section-title mb-3">Counselling Processes</h2>
            <p className="text-gray-500 mb-10">Step-by-step guide to each admission counselling process. Always refer to the official portal for exact procedures.</p>

            <div className="grid md:grid-cols-2 gap-6">
              {counsellingProcesses.map((proc) => (
                <div key={proc.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
                  <div className={`w-3 h-3 rounded-full ${proc.color} mb-4`} />
                  <h3 className="font-display font-bold text-gray-900 mb-4">{proc.title}</h3>
                  <ol className="space-y-2.5 mb-5">
                    {proc.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className={`w-5 h-5 rounded-full ${proc.color} text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5`}>
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <a href={proc.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A6B5A] hover:underline">
                    Official Portal <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-[#0D2B3E]">
          <div className="container-wide text-center">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
              Start Your JEE or NEET Preparation
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Practise with full-length mock tests, DPPs, and our rank predictor to estimate your target college.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jee" className="btn !bg-[#F5C518] !text-[#0D2B3E] font-bold px-8 py-3">JEE Preparation</Link>
              <Link href="/neet" className="btn border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3">NEET Preparation</Link>
              <Link href="/career-paths" className="btn border-2 border-white/20 text-white hover:bg-white/10 px-8 py-3">Career Paths <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
