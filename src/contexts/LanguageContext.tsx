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

// Function to safely get language from localStorage or browser preference
const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'; // Default to English on server
  
  // First check localStorage
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage && (savedLanguage === 'he' || savedLanguage === 'en')) {
    return savedLanguage;
  }
  
  // Default to English for new users
  // Only switch to Hebrew if explicitly requested
  return 'en';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en'); // Default to English
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
      // Update localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
      }
      setLanguage(lang);
      if (typeof window !== 'undefined') {
        // Small delay to ensure state is updated
        setTimeout(() => {
          window.location.reload();
        }, 100);
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
