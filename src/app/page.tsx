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

export default function HomePage() {
  return (
    <>
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
