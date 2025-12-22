'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';
import AboutImage from './AboutImage';
import AboutContent from './AboutContent';
import { ABOUT_IMAGE } from './constants';

/**
 * About section with animated content and responsive layout
 * Features intersection observer for smooth animations
 */
function AboutSection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { userType } = useUserType();
  const { language, t } = useLanguage();

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Intersection observer for title animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  return (
    <section className="w-full bg-black">
    <div 
      className="home-one-about-wrapper w-[85%] mt-8 lg:mt-20 mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 before:pointer-events-none after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 after:pointer-events-none relative overflow-hidden transition-all duration-700 ease-out"
      role="region"
      aria-label={t('about.sectionAriaLabel')}
    >
      <div className="mx-auto theme-container container px-4 py-6 lg:py-16 relative z-10">
        {/* Unified Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-16 items-center">
          {/* Image Section */}
          <AboutImage 
            src={ABOUT_IMAGE.src}
            alt={t('about.imageAlt')}
            width={ABOUT_IMAGE.width}
            height={ABOUT_IMAGE.height}
          />
          
          {/* Content Section */}
          <div ref={titleRef} dir={language === 'he' ? 'rtl' : 'ltr'}>
            <AboutContent 
              title={t('about.title')}
              heading={t('about.heading')}
              description={t('about.description')}
              buttonText={t('about.buttonText')}
              isVisible={isVisible}
              language={language}
            />
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default memo(AboutSection);
