// ============================================================================
// ANSWER ENGINE OPTIMIZATION (AEO) COMPONENT
// ============================================================================

'use client';

import StructuredData from './StructuredData';
import { seoConfig } from '@/lib/seo/config';

interface AEOProps {
  questions?: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
  howTo?: {
    name: string;
    description: string;
    steps: Array<{
      name: string;
      text: string;
      image?: string;
    }>;
  };
  product?: {
    name: string;
    description: string;
    brand: string;
    offers: {
      price: string;
      currency: string;
      availability: string;
    };
  };
  language?: 'he' | 'en';
}

/**
 * Answer Engine Optimization component for AI search engines
 */
export default function AEO({ questions, howTo, product, language = 'he' }: AEOProps) {
  const structuredData: any[] = [];

  // FAQ Schema for AI answers
  if (questions && questions.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(q => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
        about: q.category || 'AI Solutions'
      }))
    });
  }

  // HowTo Schema for step-by-step guides
  if (howTo) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      step: howTo.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image ? {
          '@type': 'ImageObject',
          url: step.image
        } : undefined
      }))
    });
  }

  // Product Schema for services
  if (product) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      offers: {
        '@type': 'Offer',
        price: product.offers.price,
        priceCurrency: product.offers.currency,
        availability: `https://schema.org/${product.offers.availability}`
      }
    });
  }

  // Speakable content for voice search
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-content', 'h1', 'h2', '.main-description']
    }
  };

  structuredData.push(speakableSchema);

  return (
    <>
      <StructuredData data={structuredData} />
      
      {/* AEO Meta Tags for AI Crawlers */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* AI-friendly content indicators - Multilingual */}
      <meta name="ai-content-type" content={seoConfig.multilingual[language].businessType} />
      <meta name="ai-topic" content={seoConfig.multilingual[language].aiTopics} />
      <meta name="ai-audience" content={language === 'he' ? 'בעלי עסקים, יזמים, מקבלי החלטות טכנולוגיות' : 'business owners, entrepreneurs, technology decision makers'} />
      <meta name="ai-intent" content={language === 'he' ? 'מסחרי, מידע, ניווט' : 'commercial, informational, navigational'} />
      <meta name="content-language" content={language} />
      
      {/* Voice search optimization - Multilingual */}
      <meta name="voice-search-friendly" content="true" />
      <meta name="conversational-queries" content={seoConfig.multilingual[language].conversationalQueries} />
      
      {/* Hebrew-specific meta tags */}
      {language === 'he' && (
        <>
          <meta name="hebrew-content" content="true" />
          <meta name="rtl-content" content="true" />
          <meta name="local-market" content="Israel" />
          <meta name="target-region" content="IL" />
        </>
      )}
    </>
  );
}
