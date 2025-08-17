'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-black/40 border border-cyan-100/10 rounded-full px-3 py-2">
      <button
        onClick={() => setLanguage('he')}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
          language === 'he' 
            ? 'bg-cyan-400/20 text-cyan-400 font-bold' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        עב
      </button>
      <div className="w-px h-4 bg-white/20"></div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
          language === 'en' 
            ? 'bg-cyan-400/20 text-cyan-400 font-bold' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
