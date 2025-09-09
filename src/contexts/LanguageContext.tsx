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

// Function to safely get language from localStorage
const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'he'; // Default to Hebrew on server
  const savedLanguage = localStorage.getItem('language') as Language;
  return (savedLanguage && (savedLanguage === 'he' || savedLanguage === 'en')) 
    ? savedLanguage 
    : 'he';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');
  const [isMounted, setIsMounted] = useState(false);

  // Set initial language after mount to avoid hydration mismatch
  useEffect(() => {
    setLanguage(getStoredLanguage());
    setIsMounted(true);
  }, []);

  // Update document and localStorage when language changes
  useEffect(() => {
    if (!isMounted) return;
    
    // Update localStorage
    localStorage.setItem('language', language);
    
    // Update document properties
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  // Handle language change with page reload
  const handleLanguageChange = (lang: Language) => {
    if (lang !== language) {
      setLanguage(lang);
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  };

  // Translation function
  const t = (key: string): string => {
    if (!isMounted) return key; // Return key during SSR/SSG
    
    const keys = key.split('.');
    let value: unknown = messages[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Translation key not found: ${key}`);
        }
        return key; // Return the key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
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
