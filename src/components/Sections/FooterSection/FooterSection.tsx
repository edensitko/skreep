'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollButton from './ScrollButton';
import WhatsAppButton from './WhatsAppButton';
import { WHATSAPP_URL, SCROLL_THRESHOLD } from './constants';
import { scrollToTop, shouldShowScrollButton } from './utils';

/**
 * Footer section with responsive layout, scroll-to-top functionality, and social buttons
 */
function FooterSection() {
  // ============================================================================
  // CONTEXT & STATE
  // ============================================================================
  
  const { language, t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Dynamic footer data based on language
  const footerLinks = [
    {
      href: "/privacy-policy",
      text: language === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy',
      ariaLabel: language === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'
    },
    {
      href: "/accessibility-statement",
      text: language === 'he' ? 'הצהרת נגישות' : 'Accessibility Statement',
      ariaLabel: language === 'he' ? 'הצהרת נגישות' : 'Accessibility Statement'
    }
  ];
  
  const copyrightText = t('footer.copyright');
  const textDirection = language === 'he' ? 'rtl' : 'ltr';

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleScroll = useCallback(() => {
    setShowScrollTop(shouldShowScrollButton(window.scrollY, SCROLL_THRESHOLD));
  }, []);

  const handleScrollToTop = useCallback(() => {
    scrollToTop();
  }, []);

  const handleDesktopScrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTop();
  }, []);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ============================================================================
  // COMPONENTS
  // ============================================================================
  
  const WhatsAppIcon = (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" 
        fill="white"
      />
    </svg>
  );

  return (
    <>
      {/* Main Footer */}
      <footer 
        className="w-full md:h-[65px] min-h-[60px] mt-4 md:mt-10 bg-black flex items-center justify-center"
        role="contentinfo"
        aria-label={t('footer.ariaLabels.footer')}
      >
        <div className="h-full mx-auto px-4 md:px-6 max-w-7xl flex items-center justify-center w-full">
          {/* Mobile Layout */}
          <div className="md:hidden py-2 space-y-2">
            {/* Navigation Links */}
            <nav 
              className={`flex justify-center items-center ${language === 'he' ? 'space-x-reverse space-x-4' : 'space-x-4'}`} 
              dir={textDirection} 
              aria-label={t('footer.ariaLabels.navigation')}
            >
              {footerLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a 
                    href={link.href} 
                    className="text-white text-sm hover:text-cyan-400 transition-colors"
                    aria-label={link.ariaLabel}
                  >
                    {link.text}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="text-white text-sm">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            
            {/* Copyright Text */}
            <div className="text-center" dir={textDirection}>
              <span className="text-white text-sm">
                2025 © כל הזכויות שמורות ל-סקריפ מערכות
              </span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center w-full h-full text-base space-x-6" dir={textDirection}>
            {/* Navigation Links */}
            <nav 
              className={`flex items-center ${language === 'he' ? 'space-x-reverse space-x-4' : 'space-x-4'}`} 
              dir={textDirection} 
              aria-label={t('footer.ariaLabels.navigation')}
            >
              {footerLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <a 
                    href={link.href} 
                    className="text-white hover:text-cyan-400 transition-colors"
                    aria-label={link.ariaLabel}
                  >
                    {link.text}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="text-white">|</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
            
            {/* Copyright Text */}
            <span className="text-white">
              2025 © כל הזכויות שמורות ל-סקריפ מערכות
            </span>

            {/* Scroll to Top Button */}
            <div className="relative">
              {showScrollTop && (
                <a 
                  href="#" 
                  onClick={handleDesktopScrollToTop}
                  aria-label={t('footer.ariaLabels.scrollToTop')}
                  className="w-[45px] h-[45px] rounded-full border-[3px] border-black flex justify-center items-center bg-cyan-400 absolute -top-[55px] hover:bg-cyan-300 transition-colors"
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M12 19V5M5 12L12 5L19 12" 
                      stroke="black" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Navigation Links */}
            <nav 
              className={`flex items-center ${language === 'he' ? 'space-x-reverse space-x-6' : 'space-x-6'}`} 
              dir={textDirection} 
              aria-label={t('footer.ariaLabels.navigation')}
            >
              {footerLinks.map((link, index) => (
                <React.Fragment key={link.text}>
                  {index > 0 && <span className="font-medium text-white">|</span>}
                  <a 
                    href={link.href} 
                    className="font-medium hover:text-white hover:underline transition-colors text-white"
                    aria-label={link.ariaLabel}
                  >
                    {link.text}
                  </a>
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>
      </footer>
      
      {/* Fixed Action Buttons */}
      <div className="fixed-buttons">
        {/* WhatsApp Button - Left Corner */}
        <WhatsAppButton
          href={WHATSAPP_URL}
          ariaLabel={t('footer.ariaLabels.whatsapp')}
          icon={WhatsAppIcon}
          className="fixed bottom-6 left-6"
        />
        
        {/* Scroll to Top Button - Right Corner */}
        <ScrollButton
          onClick={handleScrollToTop}
          ariaLabel={t('footer.ariaLabels.scrollToTop')}
          className="fixed bottom-6 right-6"
        />
      </div>
    </>
  );
}

export default memo(FooterSection);
