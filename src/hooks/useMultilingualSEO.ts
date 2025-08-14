// ============================================================================
// MULTILINGUAL SEO HOOK
// ============================================================================

'use client';

import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { seoConfig } from '@/lib/seo/config';
import { generatePageMetadata } from '@/lib/seo/utils';
import type { PageSEOProps } from '@/lib/seo/utils';

/**
 * Hook for multilingual SEO management
 */
export function useMultilingualSEO() {
  const { language } = useContext(LanguageContext) || { language: 'he' };
  const currentLang = language as 'he' | 'en';
  const langConfig = seoConfig.multilingual[currentLang];

  /**
   * Generate page metadata with current language
   */
  const generateMetadata = (props: Omit<PageSEOProps, 'locale'> = {}) => {
    return generatePageMetadata({
      ...props,
      locale: currentLang === 'he' ? 'he_IL' : 'en_US',
      description: props.description || langConfig.description,
      keywords: props.keywords || langConfig.keywords,
    });
  };

  /**
   * Get localized content for AEO
   */
  const getAEOContent = () => ({
    language: currentLang,
    aiTopics: langConfig.aiTopics,
    conversationalQueries: langConfig.conversationalQueries,
    businessType: langConfig.businessType,
  });

  /**
   * Get localized FAQ content
   */
  const getLocalizedFAQs = (faqs: Array<{ questionKey: string; answerKey: string; translations: any }>) => {
    return faqs.map(faq => ({
      question: faq.translations[currentLang]?.question || faq.questionKey,
      answer: faq.translations[currentLang]?.answer || faq.answerKey,
      category: currentLang === 'he' ? 'פתרונות בינה מלאכותית' : 'AI Solutions'
    }));
  };

  /**
   * Get structured data with proper language
   */
  const getStructuredDataLanguage = () => ({
    inLanguage: currentLang,
    contentLanguage: currentLang,
    audience: currentLang === 'he' ? 'ישראלי' : 'Israeli',
  });

  return {
    language: currentLang,
    langConfig,
    generateMetadata,
    getAEOContent,
    getLocalizedFAQs,
    getStructuredDataLanguage,
    isRTL: currentLang === 'he',
  };
}
