'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import translations
import heMessages from '../../messages/he.json';
import enMessages from '../../messages/en.json';

const messages = {
  he: heMessages,
  en: enMessages
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'he' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
    setIsInitialized(true);
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (!isInitialized) return; // Don't run on initial load
    
    const savedLanguage = localStorage.getItem('language');
    
    // Only refresh if language actually changed
    if (savedLanguage !== language) {
      localStorage.setItem('language', language);
      // Update document direction and lang
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      
      // Refresh the page to ensure all components reset properly
      window.location.reload();
    }
  }, [language, isInitialized]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
