'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const { language, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Trigger page reload to load analytics
    window.location.reload();
    onAccept?.();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    onDecline?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-t border-white/10 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${language === 'he' ? 'text-right' : 'text-left'}`}>
          <div className="flex-1" dir={language === 'he' ? 'rtl' : 'ltr'}>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              {language === 'he' 
                ? 'אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך ולנתח את התנועה באתר. האם אתה מסכים לשימוש בעוגיות?'
                : 'We use cookies to improve your browsing experience and analyze site traffic. Do you agree to the use of cookies?'
              }
            </p>
          </div>
          <div className={`flex gap-3 ${language === 'he' ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 text-sm font-medium"
            >
              {language === 'he' ? 'אני מסכים' : 'Accept'}
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm font-medium"
            >
              {language === 'he' ? 'דחה' : 'Decline'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
