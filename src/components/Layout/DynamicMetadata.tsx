'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Component that dynamically updates document metadata based on current language
 */
export default function DynamicMetadata() {
  let language = 'he';
  let t = (key: string) => key; // fallback function
  
  try {
    const context = useLanguage();
    language = context.language;
    t = context.t;
  } catch (error) {
    // Fallback for when LanguageProvider is not available (e.g., during build)
    // Only log in development mode to avoid console spam
    if (process.env.NODE_ENV === 'development') {
      console.debug('DynamicMetadata: Using fallback language context');
    }
  }

  useEffect(() => {
    // Update document title
    document.title = t('metadata.title');
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('metadata.description'));
    } else {
      // Create meta description if it doesn't exist
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = t('metadata.description');
      document.head.appendChild(newMetaDescription);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t('metadata.keywords'));
    } else {
      // Create meta keywords if it doesn't exist
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = t('metadata.keywords');
      document.head.appendChild(newMetaKeywords);
    }

    // Update Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t('metadata.title'));
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = t('metadata.title');
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', t('metadata.description'));
    } else {
      const newOgDescription = document.createElement('meta');
      newOgDescription.setAttribute('property', 'og:description');
      newOgDescription.content = t('metadata.description');
      document.head.appendChild(newOgDescription);
    }

    // Update Twitter Card meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', t('metadata.title'));
    } else {
      const newTwitterTitle = document.createElement('meta');
      newTwitterTitle.name = 'twitter:title';
      newTwitterTitle.content = t('metadata.title');
      document.head.appendChild(newTwitterTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', t('metadata.description'));
    } else {
      const newTwitterDescription = document.createElement('meta');
      newTwitterDescription.name = 'twitter:description';
      newTwitterDescription.content = t('metadata.description');
      document.head.appendChild(newTwitterDescription);
    }

    // Update html lang attribute
    document.documentElement.lang = language;
    
  }, [language, t]);

  return null; // This component doesn't render anything
}
