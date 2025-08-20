'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const InnovationSection = () => {
  const { language } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress from when section enters until it completely exits
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      
      // Animation starts when section enters viewport and continues until it completely exits
      if (sectionBottom > 0 && sectionTop < windowHeight) {
        // Mobile-optimized scroll calculation
        if (isMobile) {
          // For mobile: simpler, more responsive calculation
          const viewportCenter = windowHeight / 2;
          const sectionCenter = sectionTop + sectionHeight / 2;
          const distanceFromCenter = viewportCenter - sectionCenter;
          const maxDistance = (windowHeight + sectionHeight) / 2;
          const progress = Math.max(0, Math.min(1, 0.5 + (distanceFromCenter / maxDistance) * 0.5));
          setScrollProgress(progress);
        } else {
          // Desktop: original calculation
          const totalAnimationRange = windowHeight * 0.8 + sectionHeight * 0.6;
          const currentScroll = windowHeight - sectionTop;
          const progress = Math.max(0, Math.min(1, currentScroll / totalAnimationRange));
          setScrollProgress(progress);
        }
      } else if (sectionTop >= windowHeight) {
        setScrollProgress(0);
      } else if (sectionBottom <= 0) {
        setScrollProgress(1);
      }
    };

    // Initial setup
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-black relative overflow-hidden border-t border-b border-white/50"
    >
      <div className="w-[100%]  mx-auto ">
        <div className="relative z-10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10 animate-pulse"></div>
        
       

        {/* Large blur effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-5 relative z-10">
        <div className="text-center">
          {/* Main Text with Stunning Effects */}
          <div className="relative">
            {/* Background glow effect */}
            <div 
              className="absolute inset-0 blur-2xl opacity-20"
              style={{
                transform: `translateX(${(scrollProgress - 0.5) * 400}px) scale(${1 + scrollProgress * 0.5})`
              }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent">
                {language === 'he' ? 'חדשנות דרך אינטואיציה' : 'INNOVATION THROUGH INTUITIVE'}
              </h1>
            </div>

            {/* Main text with controlled scroll animation */}
            <h1 
              className="relative text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-transparent"
              style={{
                transform: `translateX(${language === 'he' ? (0.5 - scrollProgress) * (isMobile ? 120 : 400) : (scrollProgress - 0.5) * (isMobile ? 120 : 400)}px)`,
                WebkitTextStroke: isMobile ? '0.5px white' : '1px white',
                transition: isMobile ? 'transform 0.1s ease-out' : 'transform 0.15s ease-out'
              }}
            >
              {language === 'he' ? 'חדשנות דרך אינטואיציה' : 'INNOVATION THROUGH INTUITIVE'}
            </h1>

            {/* Duplicate text with opposite direction */}
            <h1 
              className="relative mt-2 sm:mt-4 text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-black opacity-30 text-transparent"
              style={{
                transform: `translateX(${language === 'he' ? (scrollProgress - 0.5) * (isMobile ? 100 : 350) : (0.5 - scrollProgress) * (isMobile ? 100 : 350)}px)`,
                WebkitTextStroke: isMobile ? '0.5px cyan' : '1px cyan',
                transition: isMobile ? 'transform 0.1s ease-out' : 'transform 0.15s ease-out'
              }}
            >
              {language === 'he' ? 'חדשנות דרך אינטואיציה' : 'INNOVATION THROUGH INTUITIVE'}
            </h1>
          </div>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default InnovationSection;
