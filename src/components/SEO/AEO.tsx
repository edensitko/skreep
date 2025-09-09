'use client';

import React, { useEffect, useMemo } from 'react';
import { AEOProps, StructuredDataItem } from './types';
import { seoConfig } from '@/lib/seo/config';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToData {
  name: string;
  description: string;
  steps: HowToStep[];
}

interface ProductData {
  name: string;
  description: string;
  brand: string;
  offers: {
    price: string;
    currency: string;
    availability: string;
  };
}

/**
 * Answer Engine Optimization component for AI search engines
 */
const AEO = ({
  questions = [],
  howTo,
  product,
  language = 'he',
  onStructuredData
}: AEOProps): React.JSX.Element => {
  const structuredData = useMemo<StructuredDataItem[]>(() => {
    const data: StructuredDataItem[] = [];

    // FAQ Schema for AI answers
    if (questions?.length > 0) {
      data.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (questions as FAQItem[]).map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
          about: q.category || 'AI Solutions',
        })),
      });
    }

    // HowTo Schema for step-by-step guides
    if (howTo) {
      const howToData = howTo as HowToData;
      data.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howToData.name,
        description: howToData.description,
        step: howToData.steps.map((step: HowToStep, index: number) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          ...(step.image && {
            image: step.image,
          }),
        })),
      });
    }

    // Product Schema for services
    if (product) {
      const productData = product as ProductData;
      data.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: productData.name,
        description: productData.description,
        brand: {
          '@type': 'Brand',
          name: productData.brand,
        },
        offers: {
          '@type': 'Offer',
          price: productData.offers.price,
          priceCurrency: productData.offers.currency,
          availability: `https://schema.org/${productData.offers.availability}`,
        },
      });
    }

    // Speakable content for voice search
    const speakableSchema: StructuredDataItem = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.speakable-content', 'h1', 'h2', '.main-description'],
      },
    };

    data.push(speakableSchema);
    return data;
  }, [questions, howTo, product, language]);

  // Pass structured data up to the root layout if callback is provided
  useEffect(() => {
    if (onStructuredData) {
      onStructuredData(structuredData);
    }
  }, [onStructuredData, structuredData]);

  // No need to render anything as we're using the onStructuredData callback
  // to pass data to the root layout
  return (
    <>
      {/* AEO Meta Tags for AI Crawlers */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* AI-friendly content indicators - Multilingual */}
      {seoConfig?.multilingual?.[language]?.businessType && (
        <meta name="ai-content-type" content={seoConfig.multilingual[language].businessType} />
      )}
      {seoConfig?.multilingual?.[language]?.aiTopics && (
        <meta name="ai-topic" content={seoConfig.multilingual[language].aiTopics} />
      )}
      <meta 
        name="ai-audience" 
        content={language === 'he' 
          ? 'בעלי עסקים, יזמים, מקבלי החלטות טכנולוגיות' 
          : 'business owners, entrepreneurs, technology decision makers'} 
      />
      <meta 
        name="ai-intent" 
        content={language === 'he' ? 'מסחרי, מידע, ניווט' : 'commercial, informational, navigational'} 
      />
      <meta name="content-language" content={language} />
      
      {/* Voice search optimization - Multilingual */}
      <meta name="voice-search-friendly" content="true" />
      {seoConfig?.multilingual?.[language]?.conversationalQueries && (
        <meta 
          name="conversational-queries" 
          content={seoConfig.multilingual[language].conversationalQueries} 
        />
      )}
      
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
};

export default AEO;
