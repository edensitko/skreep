import React from 'react';
import dynamic from 'next/dynamic';
import HeroGrid from '@/components/Hero/HeroGrid';
import PartnersSection from '@/components/Sections/PartnersSection';
import AboutSection from '@/components/Sections/AboutSection';
import OurProjectsSection from '@/components/Sections/OurProjectsSection';
import ServicesSection from '@/components/Sections/InteractiveShowcaseSection';
import HeroFour from '@/components/Hero/HeroFour';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import { PageSEO, AEO, LocalSEO } from '@/components/SEO';

// Lazy load heavy components to reduce initial memory usage

const AIConsultantCTASection = dynamic(() => import('@/components/Sections/AIConsultantCTASection'), {
  loading: () => <div className="h-64 bg-black/20 animate-pulse" />
});

const StatsSection = dynamic(() => import('@/components/Sections/StatsSection'), {
  loading: () => <div className="h-48 bg-black/20 animate-pulse" />
});

const FAQSection = dynamic(() => import('@/components/Sections/FAQSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const TestimonialsSection = dynamic(() => import('@/components/Sections/TestimonialsSection'), {
  loading: () => <div className="h-64 bg-black/20 animate-pulse" />
});

const NoCodeBenefitsSection = dynamic(() => import('@/components/Sections/NoCodeBenefitsSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const ContactFormSection = dynamic(() => import('@/components/Sections/ContactFormSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const InteractiveShowcaseSection = dynamic(() => import('@/components/Sections/InteractiveShowcaseSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const ChatSection = dynamic(() => import('@/components/Sections/ChatSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

export default function Home() {
  // Hebrew FAQ data for AEO
  const hebrewFAQs = [
    {
      question: "מה זה בינה מלאכותית?",
      answer: "בינה מלאכותית היא טכנולוגיה המאפשרת למחשבים לבצע משימות הדורשות אינטליגנציה אנושית, כמו למידה, הבנה ופתרון בעיות.",
      category: "פתרונות בינה מלאכותית"
    },
    {
      question: "איך בינה מלאכותית יכולה לעזור לעסק שלי?",
      answer: "בינה מלאכותית יכולה לאוטמט תהליכים, לשפר יעילות, לחסוך עלויות ולספק תובנות עסקיות חשובות לקבלת החלטות מושכלות.",
      category: "פתרונות עסקיים"
    },
    {
      question: "כמה עולים שירותי בינה מלאכותית?",
      answer: "עלות השירותים משתנה בהתאם לצרכים הספציפיים של העסק. אנחנו מציעים פתרונות מותאמים אישית לכל תקציב.",
      category: "תמחור"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col bg-black">
      {/* SEO Components */}
      <PageSEO 
        pageType="home"
        title="פתרונות בינה מלאכותית מתקדמים"
        description="סקריפ מספקת פתרונות בינה מלאכותית חדשניים לעסקים. חסכו עלויות והגדילו יעילות עם הטכנולוגיה המתקדמת ביותר."
      />
      <AEO 
        language="he"
        questions={hebrewFAQs}
      />
      <LocalSEO showMap={false} />
      
      <Header/>
      <HeroGrid />
      <PartnersSection />
      <AboutSection />
      <StatsSection />
      <ChatSection />
      <InteractiveShowcaseSection />
      <NoCodeBenefitsSection />
      <OurProjectsSection />
      <FAQSection />
      
      {/* <PricingSection /> */}
      {/* <PricingCarouselSection /> */}
      <AIConsultantCTASection />
      <TestimonialsSection />
      <ComparisonTableSection />
      <ContactFormSection />
      <Footer/>
    </main>
  );
}
