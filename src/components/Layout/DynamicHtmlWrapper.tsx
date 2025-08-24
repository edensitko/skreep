'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DynamicHtmlWrapper({ children }: { children: React.ReactNode }) {
  let language = 'he'; // default fallback
  
  try {
    const context = useLanguage();
    language = context.language;
  } catch (error) {
    // Fallback for when LanguageProvider is not available (e.g., during build)
    console.warn('LanguageProvider not available, using default language');
  }

  useEffect(() => {
    // Update HTML attributes when language changes
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  return <>{children}</>;
}
