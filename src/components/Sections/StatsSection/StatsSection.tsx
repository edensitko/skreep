'use client';

import React, { memo, useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import StatCard from './StatCard';
import StatsInfo from './StatsInfo';

// Custom hook for animated counter
const useAnimatedCounter = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, start, duration]);

  return { count, countRef };
};

// Animated Stat Card Component
const AnimatedStatCard = ({ stat, index, language }: { 
  stat: { number: string; suffix: string; label: string }, 
  index: number,
  language: string 
}) => {
  const targetNumber = parseInt(stat.number);
  const { count, countRef } = useAnimatedCounter(targetNumber, 2000 + (index * 300)); // Stagger animations

  return (
    <div 
      key={`${stat.number}-${stat.label}-${index}`}
      className="group relative"
      ref={countRef}
    >
      {/* Glass Card */}
      <div className="bg-gradient-to-br from-black/40 via-black/20 to-black/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 text-center hover:border-cyan-400/50 transition-all duration-300 hover:backdrop-blur-2xl hover:bg-gradient-to-br hover:from-black/30 hover:via-black/10 hover:to-white/5 relative overflow-hidden group-hover:scale-105 transform h-32 md:h-36 flex flex-col justify-center">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        
        {/* Number */}
        <div className="relative z-10 mb-3">
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white transition-all duration-300">
            {count}
          </span>
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-white transition-colors duration-300">
            {stat.suffix}
          </span>
        </div>
        
        {/* Divider */}
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent mx-auto mb-3 group-hover:via-cyan-300 transition-colors duration-300"></div>
        
        {/* Label */}
        <p className="text-white/80 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300" dir={language === 'he' ? 'rtl' : 'ltr'}>
          {stat.label}
        </p>
        
      </div>
    </div>
  );
};

/**
 * Statistics section with performance metrics and company info
 * Features responsive grid layout and interactive cards with animated counters
 */
function StatsSection() {
  const { language, t } = useLanguage();
  const statsData = t('stats.data');

  // Fallback data if translation fails
  const defaultStats = [
    { number: "5", suffix: "+", label: language === 'he' ? "שנות ניסיון" : "Years Experience" },
    { number: "50", suffix: "+", label: language === 'he' ? "פרויקטים מוצלחים" : "Projects Done" },
    { number: "100", suffix: "%", label: language === 'he' ? "שביעות רצון לקוחות" : "Client Satisfaction" },
    { number: "24", suffix: "/7", label: language === 'he' ? "תמיכה זמינה" : "Support Available" }
  ];

  const displayStats = Array.isArray(statsData) && statsData.length > 0 ? statsData : defaultStats;

  return (
    <section className="w-full bg-black ">
      <div className="w-[100%] my-6 lg:my-12 mx-auto  ">
        <div className="container mx-auto px-4 relative z-10 ">
          {/* Title Section */}
          <div className="text-center mb-8" >
            <p className="text-white/60 text-xs md:text-sm mb-4 font-light">
              {language === 'he' 
                ? 'מוגדרים על ידי דינמיות דיגיטלית, סוכנות השיווק הדיגיטלית שלנו מתבלטת של ד ויכולת אסטרטגית'
                : 'Defined by digital dynamics, our digital marketing agency stands out with strategic capability'
              }
            </p>
            <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t('stats.description') || (language === 'he' 
                ? 'אנחנו גאים בהישגים שלנו ובשביעות הרצון של הלקוחות שלנו' 
                : 'We are proud of our achievements and the satisfaction of our clients')}
            </p>
          </div>

          {/* Statistics Grid - Desktop / Carousel - Mobile */}
          <div className="relative">
            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              {/* Shadow overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none"></div>
              
              {/* Scrollable container */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
                {displayStats.map((stat, index) => (
                  <div key={`mobile-${stat.number}-${stat.label}-${index}`} className="flex-shrink-0 w-36" style={{ scrollSnapAlign: 'start' }}>
                    <AnimatedStatCard 
                      stat={stat}
                      index={index}
                      language={language}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
              {displayStats.map((stat, index) => (
                <AnimatedStatCard 
                  key={`desktop-${stat.number}-${stat.label}-${index}`}
                  stat={stat}
                  index={index}
                  language={language}
                />
              ))}
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(StatsSection);
