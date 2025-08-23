import React from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import HeroGrid from '@/components/Hero/HeroGrid';
import PartnersSection from '@/components/Sections/PartnersSection';
import AboutSection from '@/components/Sections/AboutSection';
import OurProjectsSection from '@/components/Sections/OurProjectsSection';
import ServicesSection from '@/components/Sections/InteractiveShowcaseSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import InnovationSection2 from '@/components/Sections/InnovationSection/InnovationSection2';

const AIConsultantCTASection = dynamic(() => import('@/components/Sections/AIConsultantCTASection'), { loading: () => <div className="h-64 bg-black/20 animate-pulse" /> });
const StatsSection           = dynamic(() => import('@/components/Sections/StatsSection/StatsSection'), { loading: () => <div className="h-48 bg-black/20 animate-pulse" /> });
const FAQSection             = dynamic(() => import('@/components/Sections/FAQSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const TestimonialsSection    = dynamic(() => import('@/components/Sections/TestimonialsSection'), { loading: () => <div className="h-64 bg-black/20 animate-pulse" /> });
const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const ContactFormSection     = dynamic(() => import('@/components/Sections/ContactFormSection/ContactFormSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const ChatSection            = dynamic(() => import('@/components/Sections/ChatSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const BlogSection            = dynamic(() => import('@/components/Sections/BlogSection/BlogSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });

export default function HomeView({ locale }: { locale: 'he' | 'en' }) {
  return (
    <main className="flex min-h-screen flex-col bg-black">
      <Header />
      <HeroGrid />
      <PartnersSection />
      <AboutSection />
      <StatsSection />
      <ChatSection />
      <InnovationSection />
      <ServicesSection />
      <OurProjectsSection />
      <FAQSection />
      <AIConsultantCTASection />
      <TestimonialsSection />
      <ComparisonTableSection />
      <BlogSection />
      <InnovationSection2 />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
