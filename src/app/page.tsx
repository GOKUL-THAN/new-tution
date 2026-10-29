import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BoardsSection from '@/components/home/BoardsSection';
import ClassesSection from '@/components/home/ClassesSection';
import ExamPrepSection from '@/components/home/ExamPrepSection';
import CoursesSection from '@/components/home/CoursesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LearningPathSection from '@/components/home/LearningPathSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: {
    absolute: 'Global Minds Academy — Build Skills | Own the Future | Classes 6–12, JEE & NEET',
  },
  description:
    'Global Minds Academy, Perumbakkam Chennai — Comprehensive education for Classes 6–12, JEE Main, JEE Advanced, NEET UG. CBSE, ICSE, Tamil Nadu State Board. Live classes, DPPs, mock tests, and personalised learning. 15,000+ students trained, 4.9/5 rating.',
  keywords: [
    'Global Minds Academy', 'tuition Chennai', 'JEE coaching Tamil Nadu',
    'NEET preparation Chennai', 'CBSE tuition', 'ICSE coaching', 'Samacheer Kalvi',
    'Tamil Nadu State Board', 'online learning India', 'Classes 6-12', 'mock tests JEE NEET',
    'Perumbakkam tuition', 'entrance exam preparation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Global Minds Academy',
    title: 'Global Minds Academy — Build Skills | Own the Future',
    description: 'Expert education for Classes 6–12, JEE & NEET. Perumbakkam, Chennai, Tamil Nadu.',
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Global Minds Academy',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  description:
    'Comprehensive education platform — Classes 6–12, JEE, NEET, CBSE, ICSE, Tamil Nadu State Board. Live classes, DPPs, mock tests, and adaptive learning.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Perumbakkam',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://globalmindsacademy.in',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '8000',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <main>
        {/* 1. Hero — above the fold */}
        <HeroSection />
        {/* 3. Boards — curriculum discovery */}
        <BoardsSection />
        {/* 4. Classes 6–12 — grade-wise navigation */}
        <ClassesSection />
        {/* 5. Exam prep — JEE/NEET with DPP, mocks, rank predictor */}
        <ExamPrepSection />
        {/* 6. Featured courses — from DB */}
        <CoursesSection />
        {/* 7. Platform features — 18 features with illustrations */}
        <FeaturesSection />
        {/* 8. Adaptive learning path — Khan Academy style mastery */}
        <LearningPathSection />
        {/* 9. Why us — comparison table with BYJU's/PW/Aakash */}
        <WhyUsSection />
        {/* 10. Student testimonials */}
        <TestimonialsSection />
        {/* 12. CTA — with WhatsApp button and gold theme */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
