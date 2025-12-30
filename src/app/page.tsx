

import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PartnersSection from '@/components/Sections/PartnersSection';
import AboutSection from '@/components/Sections/AboutSection';
import SecondHeroSection from '@/components/Sections/SecondHeroSection';

// Lazy load heavy components with intersection observer
const OurProjectsSection = dynamic(() => import('@/components/Sections/OurProjectsSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
const ServicesSection = dynamic(() => import('@/components/Sections/InteractiveShowcaseSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
const InnovationSection = dynamic(() => import('@/components/Sections/InnovationSection/InnovationSection'), {
  loading: () => <div className="h-64 bg-black/20 animate-pulse" />
});
const InnovationSection2 = dynamic(() => import('@/components/Sections/InnovationSection/InnovationSection2'), { 
  loading: () => <div className="h-32 bg-black/20 animate-pulse" />
});
const NoCodeBenefitsSection = dynamic(() => import('@/components/Sections/NoCodeBenefitsSection'), {
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});

// Heavy animation sections - load only when needed
const AIConsultantCTASection = dynamic(() => import('@/components/Sections/AIConsultantCTASection/AIConsultantCTASection'), { 
  loading: () => <div className="h-64 bg-black/20 animate-pulse" />
});
const StatsSection = dynamic(() => import('@/components/Sections/StatsSection/StatsSection'), { 
  loading: () => <div className="h-48 bg-black/20 animate-pulse" />
});
const FAQSection = dynamic(() => import('@/components/Sections/FAQSection/FAQSection'), { 
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
const TestimonialsSection = dynamic(() => import('@/components/Sections/TestimonialsSection/TestimonialsSection'), { 
  loading: () => <div className="h-64 bg-black/20 animate-pulse" />
});
const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection/ComparisonTableSection'), { 
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
const ContactFormSection = dynamic(() => import('@/components/Sections/ContactFormSection/ContactFormSection'), { 
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
const ChatSection = dynamic(() => import('@/components/Sections/ChatSection/ChatSection'), { 
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
const BlogSection = dynamic(() => import('@/components/Sections/BlogSection/BlogSection'), { 
  loading: () => <div className="h-96 bg-black/20 animate-pulse" />
});
export const metadata: Metadata = {
  title: "Skreep - Advanced AI Solutions & Business Automation | Israel",
  description: "Leading AI solutions company in Israel. We provide advanced artificial intelligence, business automation, web development, mobile apps, and cloud solutions. Transform your business with cutting-edge technology.",
  keywords: [
    'Skreep',
    'artificial intelligence Israel',
    'AI solutions',
    'business automation',
    'web development',
    'mobile apps',
    'cloud solutions',
    'chatbots',
    'data analytics',
    'SaaS development',
    'technology consulting',
    'digital transformation',
    'AI company Israel',
    'סקריפ',
    'בינה מלאכותית ישראל',
    'פתרונות AI',
    'אוטומציה עסקית',
    'פיתוח אתרים',
    'אפליקציות מובייל',
    'פתרונות ענן',
    'צ\'אטבוטים',
    'ניתוח נתונים',
    'פיתוח SaaS',
    'ייעוץ טכנולוגי',
    'טרנספורמציה דיגיטלית',
    'חברת AI ישראל'
  ],
  authors: [{ name: 'Skreep', url: 'https://skreep.com' }],
  creator: 'Skreep',
  publisher: 'Skreep',
  metadataBase: new URL('https://skreep.com'),
  alternates: {
    canonical: 'https://skreep.com',
    languages: {
      'he-IL': 'https://skreep.com',
      'en-US': 'https://skreep.com/en',
      'x-default': 'https://skreep.com',
    },
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  openGraph: {
    title: "Skreep - Advanced AI Solutions & Business Automation",
    description: "Leading AI solutions company in Israel. We provide advanced artificial intelligence, business automation, web development, mobile apps, and cloud solutions.",
    url: 'https://skreep.com',
    siteName: 'Skreep | סקריפ',
    images: [
      {
        url: 'https://skreep.com/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skreep - Advanced AI Solutions',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['he_IL'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Skreep - Advanced AI Solutions & Business Automation",
    description: "Leading AI solutions company in Israel. Transform your business with cutting-edge AI technology.",
    site: '@skreep',
    creator: '@skreep',
    images: ['https://skreep.com/assets/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/logo-full.webp', sizes: '180x180' }],
  },
  category: 'technology',
  classification: 'AI Solutions, Technology Services, Business Automation'
};

export default function RootPage() {
  return (
    <main className="flex bg-black min-h-screen flex-col">
      <Header />
      <SecondHeroSection />

      {/* Load immediately visible sections */}
      <PartnersSection />
      <AboutSection />
      <StatsSection />
      
      {/* Lazy load below-the-fold sections */}
      <ChatSection />
      <InnovationSection />
      <ServicesSection />
      <NoCodeBenefitsSection />
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
