'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DynamicHtmlWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update HTML attributes when language changes
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  return <>{children}</>;
}
