

import React from 'react';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import HeroGrid from '@/components/Hero/HeroGrid';
import PartnersSection from '@/components/Sections/PartnersSection';
import AboutSection from '@/components/Sections/AboutSection';
import OurProjectsSection from '@/components/Sections/OurProjectsSection';
import ServicesSection from '@/components/Sections/InteractiveShowcaseSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import InnovationSection2 from '@/components/Sections/InnovationSection/InnovationSection2';
import { LanguageProvider } from '@/contexts/LanguageContext';
import StructuredData from '@/components/SEO/StructuredData';

const AIConsultantCTASection = dynamic(() => import('@/components/Sections/AIConsultantCTASection'), { loading: () => <div className="h-64 bg-black/20 animate-pulse" /> });
const StatsSection           = dynamic(() => import('@/components/Sections/StatsSection/StatsSection'), { loading: () => <div className="h-48 bg-black/20 animate-pulse" /> });
const FAQSection             = dynamic(() => import('@/components/Sections/FAQSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const TestimonialsSection    = dynamic(() => import('@/components/Sections/TestimonialsSection'), { loading: () => <div className="h-64 bg-black/20 animate-pulse" /> });
const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const ContactFormSection     = dynamic(() => import('@/components/Sections/ContactFormSection/ContactFormSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const ChatSection            = dynamic(() => import('@/components/Sections/ChatSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const BlogSection            = dynamic(() => import('@/components/Sections/BlogSection/BlogSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });

export const metadata: Metadata = {
  title: "Skreep - פתרונות בינה מלאכותית מתקדמים | AI Solutions Israel",
  description: "Skreep מפתחת פתרונות AI חדשניים לעסקים: צ'אטבוטים חכמים, אוטומציה עסקית, בניית אתרים ומערכות AI מותאמות אישית. הצטרפו למהפכת הבינה המלאכותית בישראל.",
  keywords: [
    "בינה מלאכותית",
    "AI solutions",
    "צ'אטבוטים",
    "chatbots",
    "אוטומציה עסקית",
    "business automation", 
    "בניית אתרים",
    "web development",
    "Skreep",
    "ישראל",
    "Israel",
    "פתרונות דיגיטליים",
    "digital solutions",
    "חדשנות טכנולוגית",
    "technology innovation",
    "מערכות AI",
    "AI systems",
    "שירותי AI",
    "AI services"
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
  openGraph: {
    title: "Skreep - פתרונות בינה מלאכותית מתקדמים",
    description: "פתרונות AI חדשניים לעסקים: צ'אטבוטים, אוטומציה ובניית אתרים. הצטרפו למהפכת הבינה המלאכותית עם Skreep.",
    url: 'https://skreep.com',
    siteName: 'Skreep',
    images: [
      {
        url: 'https://skreep.com/assets/images/logo-1.png',
        width: 1200,
        height: 630,
        alt: 'Skreep - פתרונות בינה מלאכותית',
      },
    ],
    locale: 'he_IL',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Skreep - פתרונות בינה מלאכותית מתקדמים",
    description: "פתרונות AI חדשניים לעסקים: צ'אטבוטים, אוטומציה ובניית אתרים. הצטרפו למהפכת הבינה המלאכותית.",
    site: '@skreep',
    creator: '@skreep',
    images: ['https://skreep.com/assets/images/logo-1.png'],
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
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  category: 'technology',
  classification: 'AI Solutions, Technology Services'
};

export default function RootPage() {
  // Structured data for better SEO and rich snippets
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Skreep",
      "url": "https://skreep.com",
      "logo": "https://skreep.com/assets/images/logo.svg",
      "description": "פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
      "foundingDate": "2023",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+972-50-000-0000",
        "email": "hello@skreep.com",
        "contactType": "customer service",
        "areaServed": "IL",
        "availableLanguage": ["Hebrew", "English"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IL",
        "addressRegion": "Israel"
      },
      "sameAs": [
        "https://www.linkedin.com/company/skreep",
        "https://twitter.com/skreep"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Skreep",
      "url": "https://skreep.com",
      "description": "פתרונות בינה מלאכותית מתקדמים לעסקים",
      "inLanguage": ["he-IL", "en-US"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://skreep.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "פתרונות בינה מלאכותית",
      "serviceType": "AI Solutions",
      "provider": {
        "@type": "Organization",
        "name": "Skreep"
      },
      "areaServed": "Worldwide",
      "description": "פתרונות AI מותאמים אישית לעסקים: צ'אטבוטים, אוטומציה ובניית אתרים",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "צ'אטבוטים חכמים",
            "description": "פיתוח צ'אטבוטים מתקדמים לשירות לקוחות"
          },
          {
            "@type": "Offer", 
            "name": "אוטומציה עסקית",
            "description": "מערכות אוטומציה לייעול תהליכים עסקיים"
          },
          {
            "@type": "Offer",
            "name": "בניית אתרים",
            "description": "פיתוח אתרים מתקדמים עם טכנולוגיות AI"
          }
        ]
      }
    }
  ];

  return (
    <LanguageProvider>
      <StructuredData data={structuredData} />
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
    </LanguageProvider>
  );
}
