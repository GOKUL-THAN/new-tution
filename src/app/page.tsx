import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import BoardsSection from '@/components/home/BoardsSection';
import ClassesSection from '@/components/home/ClassesSection';
import ExamPrepSection from '@/components/home/ExamPrepSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CoursesSection from '@/components/home/CoursesSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import FAQSection from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: {
    absolute: 'Global Minds Academy — Premier Education for Classes 1–12, JEE & NEET',
  },
  description:
    'Comprehensive education platform for Indian students — CBSE, ICSE, Tamil Nadu State Board, JEE Main, JEE Advanced, NEET UG preparation with expert faculty, live classes, and personalised learning.',
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Global Minds Academy',
  url: BASE_URL,
  description:
    'Comprehensive education platform for Indian students — CBSE, ICSE, Tamil Nadu State Board, JEE Main, JEE Advanced, NEET UG preparation.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Tamil Nadu',
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
        <HeroSection />
        <BoardsSection />
        <ClassesSection />
        <ExamPrepSection />
        <CoursesSection />
        <FeaturesSection />
        <WhyUsSection />
        <StatsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
