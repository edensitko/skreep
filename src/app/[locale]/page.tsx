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
import NoCodeBenefitsSection from '@/components/Sections/NoCodeBenefitsSection';

const AIConsultantCTASection = dynamic(() => import('@/components/Sections/AIConsultantCTASection/AIConsultantCTASection'), { loading: () => <div className="h-64 bg-black/20 animate-pulse" /> });
const StatsSection           = dynamic(() => import('@/components/Sections/StatsSection/StatsSection'), { loading: () => <div className="h-48 bg-black/20 animate-pulse" /> });
const FAQSection             = dynamic(() => import('@/components/Sections/FAQSection/FAQSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const TestimonialsSection    = dynamic(() => import('@/components/Sections/TestimonialsSection/TestimonialsSection'), { loading: () => <div className="h-64 bg-black/20 animate-pulse" /> });
const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection/ComparisonTableSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const ContactFormSection     = dynamic(() => import('@/components/Sections/ContactFormSection/ContactFormSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const ChatSection            = dynamic(() => import('@/components/Sections/ChatSection/ChatSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });
const BlogSection            = dynamic(() => import('@/components/Sections/BlogSection/BlogSection'), { loading: () => <div className="h-96 bg-black/20 animate-pulse" /> });

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  if (locale === 'en') {
    return {
      title: "Skreep - Advanced AI Solutions for Business | AI Consulting ",
      description: "Skreep develops innovative AI solutions for businesses: smart chatbots, business automation, web development and custom AI systems. Join the artificial intelligence revolution in Israel.",
      keywords: [
        'Skreep',
        'AI solutions',
        'artificial intelligence',
        'chatbots',
        'business automation',
        'web development',
        'digital solutions',
        'technology innovation',
        'AI systems',
        'AI services',
        'AI',
        'AI consulting'
      ],
      authors: [{ name: 'Skreep', url: 'https://skreep.com' }],
      creator: 'Skreep',
      publisher: 'Skreep',
      metadataBase: new URL('https://skreep.com'),
      alternates: {
        canonical: 'https://skreep.com/en',
        languages: {
          'he-IL': 'https://skreep.com',
          'en-US': 'https://skreep.com/en',
          'x-default': 'https://skreep.com',
        },
      },
      openGraph: {
        title: "Skreep - Advanced AI Solutions for Business",
        description: "Innovative AI solutions for businesses: chatbots, automation and web development. Join the artificial intelligence revolution with Skreep.",
        url: 'https://skreep.com/en',
        siteName: 'Skreep',
        images: [
          {
            url: 'https://skreep.com/assets/images/logo-2.png',
            width: 1200,
            height: 630,
            alt: 'Skreep - Advanced AI Solutions',
          },
        ],
        locale: 'en_US',
        alternateLocale: 'he_IL',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: "Skreep - Advanced AI Solutions for Business",
        description: "Innovative AI solutions for businesses: chatbots, automation and web development. Join the artificial intelligence revolution.",
        site: '@skreep',
        creator: '@skreep',
        images: ['https://skreep.com/assets/images/logo-2.png'],
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
  }

  // Default Hebrew metadata
  return {
    title: "סקריפ - פתרונות בינה מלאכותית מתקדמים | Skreep AI Solutions",
    description: "סקריפ מפתחת פתרונות AI חדשניים לעסקים: צ'אטבוטים חכמים, אוטומציה עסקית, בניית אתרים ומערכות AI מותאמות אישית. הצטרפו למהפכת הבינה המלאכותית בישראל.",
    keywords: [
      'סקריפ',
      "בינה מלאכותית",
      "צ'אטבוטים",
      "אוטומציה עסקית",
      "בניית אתרים",
      "פתרונות דיגיטליים",
      "חדשנות טכנולוגית",
      "מערכות AI",
      "שירותי AI",
      "AI ישראל",
      "ייעוץ AI"
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
      title: "סקריפ - פתרונות בינה מלאכותית מתקדמים",
      description: "פתרונות AI חדשניים לעסקים: צ'אטבוטים, אוטומציה ובניית אתרים. הצטרפו למהפכת הבינה המלאכותית עם סקריפ.",
      url: 'https://skreep.com',
      siteName: 'סקריפ | Skreep',
      images: [
        {
          url: 'https://skreep.com/assets/images/logo-2.png',
          width: 1200,
          height: 630,
          alt: 'סקריפ - פתרונות בינה מלאכותית',
        },
      ],
      locale: 'he_IL',
      alternateLocale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "סקריפ - פתרונות בינה מלאכותית מתקדמים",
      description: "פתרונות AI חדשניים לעסקים: צ'אטבוטים, אוטומציה ובניית אתרים. הצטרפו למהפכת הבינה המלאכותית.",
      site: '@skreep',
      creator: '@skreep',
      images: ['https://skreep.com/assets/images/logo-2.png'],
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
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  
  // Structured data based on locale
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": locale === 'en' ? "Skreep" : "סקריפ",
      "url": locale === 'en' ? "https://skreep.com/en" : "https://skreep.com",
      "logo": "https://skreep.com/assets/images/logo-2.png",
      "description": locale === 'en' 
        ? "Advanced AI solutions for businesses"
        : "פתרונות בינה מלאכותית מתקדמים לעסקים",
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
      "name": locale === 'en' ? "Skreep" : "סקריפ",
      "url": locale === 'en' ? "https://skreep.com/en" : "https://skreep.com",
      "description": locale === 'en'
        ? "Advanced AI solutions for businesses"
        : "פתרונות בינה מלאכותית מתקדמים לעסקים",
      "inLanguage": locale === 'en' ? "en-US" : "he-IL",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `https://skreep.com${locale === 'en' ? '/en' : ''}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <LanguageProvider>
      <StructuredData data={structuredData} />
      <main className="flex min-h-screen flex-col">
        <Header />
        <HeroGrid />
        <PartnersSection />
        <AboutSection />
        <StatsSection />
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
    </LanguageProvider>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'he' }
  ];
}
