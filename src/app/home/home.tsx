import React from 'react';
import dynamic from 'next/dynamic';
import HeroGrid from '@/components/Hero/HeroGrid';

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'he' },
    { locale: 'en' }
  ];
}
import PartnersSection from '@/components/Sections/PartnersSection';
import AboutSection from '@/components/Sections/AboutSection';
import OurProjectsSection from '@/components/Sections/OurProjectsSection';
import ServicesSection from '@/components/Sections/InteractiveShowcaseSection';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import InnovationSection2 from '@/components/Sections/InnovationSection/InnovationSection2';

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

// const PricingSection = dynamic(() => import('@/components/Sections/PricingSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });

const PricingCarouselSection = dynamic(() => import('@/components/Sections/PricingCarouselSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const TestimonialsSection = dynamic(() => import('@/components/Sections/TestimonialsSection'), {
  loading: () => <div className="h-64 bg-black/20 animate-pulse" />
});


const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});


const ContactFormSection = dynamic(() => import('@/components/Sections/ContactFormSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});


const ChatSection = dynamic(() => import('@/components/Sections/ChatSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

const BlogSection = dynamic(() => import('@/components/Sections/BlogSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

export default function Home({ params: _ }: { params: Promise<{ locale: string }> }) {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Header/>
      <HeroGrid />
      <PartnersSection />
      <AboutSection />
      <StatsSection />
      <ChatSection />
      <InnovationSection />
      <ServicesSection />
      {/* <NoCodeBenefitsSection /> */}
      <OurProjectsSection />
      <FAQSection />
      <AIConsultantCTASection />
      <TestimonialsSection />
      <ComparisonTableSection />
      <PricingCarouselSection />
      <BlogSection />
      <InnovationSection2 />
      <ContactFormSection />
      <Footer/>
    </main>
    
  );
}


