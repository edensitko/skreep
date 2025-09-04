'use client';

import React, { memo, useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import ComparisonRow from './ComparisonRow';
import { COMPARISON_DATA } from './constants';

/**
 * Comparison table section showing advantages of Skreep over competitors
 * Features responsive grid layout and enhanced Skreep column highlighting
 */
function ComparisonTableSection() {
  const { language, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Get comparison data from translations with language-aware fallback
  const comparisonData = useMemo(() => {
    try {
      const data = t('comparisonTable.data');
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      // Language-aware fallback
      return language === 'he' ? COMPARISON_DATA : [
        {
          category: "Quality",
          agencies: "Generally good quality",
          freelancers: "Varied levels",
          inHouse: "Varied levels",
          skreep: "Highest quality, no compromises"
        },
        {
          category: "Cost",
          agencies: "High costs",
          freelancers: "Varies by skill level",
          inHouse: "High costs for maintaining permanent team",
          skreep: "Relatively low investment cost thanks to efficient and innovative work model"
        },
        {
          category: "Development & Hiring Time",
          agencies: "Slow development pace",
          freelancers: "Slow development pace",
          inHouse: "Fast development pace",
          skreep: "Very fast development time thanks to using innovative technologies and platforms"
        },
        {
          category: "Resources",
          agencies: "Variable",
          freelancers: "Limited",
          inHouse: "Limited",
          skreep: "Variable and tailored to your needs"
        },
        {
          category: "Service & Availability",
          agencies: "Good customer service",
          freelancers: "Low availability - hard to coordinate schedules",
          inHouse: "Depends on resources",
          skreep: "Excellent customer service and fast response"
        }
      ];
    } catch {
      // Language-aware fallback for errors
      return language === 'he' ? COMPARISON_DATA : [
        {
          category: "Quality",
          agencies: "Generally good quality",
          freelancers: "Varied levels",
          inHouse: "Varied levels",
          skreep: "Highest quality, no compromises"
        },
        {
          category: "Cost",
          agencies: "High costs",
          freelancers: "Varies by skill level",
          inHouse: "High costs for maintaining permanent team",
          skreep: "Relatively low investment cost thanks to efficient and innovative work model"
        },
        {
          category: "Development & Hiring Time",
          agencies: "Slow development pace",
          freelancers: "Slow development pace",
          inHouse: "Fast development pace",
          skreep: "Very fast development time thanks to using innovative technologies and platforms"
        },
        {
          category: "Resources",
          agencies: "Variable",
          freelancers: "Limited",
          inHouse: "Limited",
          skreep: "Variable and tailored to your needs"
        },
        {
          category: "Service & Availability",
          agencies: "Good customer service",
          freelancers: "Low availability - hard to coordinate schedules",
          inHouse: "Depends on resources",
          skreep: "Excellent customer service and fast response"
        }
      ];
    }
  }, [t, language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSubtitleVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSubtitleRef = subtitleRef.current;
    if (currentSubtitleRef) {
      observer.observe(currentSubtitleRef);
    }

    return () => {
      if (currentSubtitleRef) {
        observer.unobserve(currentSubtitleRef);
      }
    };
  }, []);
  
  return (
    <div className="w-full">
      {/* Title Outside the Box */}
      <div className="text-center w-[85%] my-2 mt-20 mx-auto">
        <h1 
          ref={titleRef}
          className={`w-full font-bold text-center bg-gradient-to-r from-white/90 via-white-50 to-white/10 bg-clip-text text-transparent text-3xl md:text-3xl lg:text-5xl mb-2 leading-tight tracking-wide transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          dir='ltr'
        >
          {t('comparisonTable.title')} <span className="bg-gradient-to-r from-white/30 to-white/10 bg-clip-text text-transparent font-extrabold">{t('comparisonTable.titleHighlight')}</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className={`text-md font-light md:text-lg text-white/70 mx-auto transition-all duration-1000 delay-200 ${
            isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          dir={language === 'he' ? 'rtl' : 'ltr'}
          style={{ textAlign: 'center' }}
        >
          {t('comparisonTable.subtitle') || (language === 'he' ? 'השוואה מקיפה בין הפתרונות השונים בשוק' : 'Comprehensive comparison between different market solutions')}
        </p>
      </div>
      
      <section 
        className="w-full mx-auto"
        role="region"
        aria-label={t('comparisonTable.sectionAriaLabel')}
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        <div className="w-full px-4 py-6 relative">
        
        {/* Slide Gesture Indicator */}
        <div className="flex items-center justify-center mb-4 text-white/70 md:hidden">
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 text-xs">
            {language === 'he' ? (
              <>
                <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
                <span className="font-normal text-white/70">
                  החלק לצפייה
                </span>
                <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
                <span className="font-normal text-white/70">
                  Swipe to view
                </span>
                <svg className="w-3 h-3 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </>
            )}
          </div>
        </div>
        
        {/* Comparison Table Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div 
            className="min-w-[800px] w-full lg:w-[85%] lg:mx-auto" 
            dir={language === 'he' ? 'rtl' : 'ltr'}
            role="table"
            aria-label={t('comparisonTable.tableAriaLabel')}
          >
            {/* Header Row */}
            <div className="grid gap-0" style={{gridTemplateColumns: '0.8fr 2fr 1fr 1fr 1fr'}} role="row">
              <div 
                className=""
                role="columnheader"
              >
              
              </div>
              <div 
                className={`py-1 px-4 text-center bg-gradient-to-br from-cyan-500/30 to-purple-500/30 backdrop-blur-sm relative overflow-hidden ${language === 'he' ? 'rounded-tr-2xl' : 'rounded-tl-2xl'}`}
                role="columnheader"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse"></div>
                <div className="relative z-10">
                <div className="mt-2 text-white text-sm font-medium">
                    {language === 'he' ? 'מוצר מבית' : 'In-House Product'}
                  </div>
                  <Image 
                    src="/assets/images/logo-1.png" 
                    alt="Skreep Logo" 
                    width={100} 
                    height={100} 
                    className="object-contain mx-auto" 
                  />
                 
                </div>
              </div>
              <div 
                className=" py-6 px-3 text-center bg-gradient-to-br from-gray-600/20 to-gray-700/20 backdrop-blur-sm"
                role="columnheader"
              >
                <h3 className="font-semibold text-gray-300 text-xs leading-tight" >
                  {language === 'he' ? 'מתחרים' : 'Competitors'}
                </h3>
              </div>
              <div 
                className="py-6 px-3 text-center bg-gradient-to-br from-gray-600/20 to-gray-700/20 backdrop-blur-sm"
                role="columnheader"
              >
                <h3 className="font-semibold text-gray-300 text-xs leading-tight" >
                  {language === 'he' ? 'פריסלנסרים' : 'Freelancers'}
                </h3>
              </div>
              <div 
                className={`py-6 px-3 text-center bg-gradient-to-br from-gray-600/20 to-gray-700/20 backdrop-blur-sm ${language === 'he' ? 'rounded-tl-2xl' : 'rounded-tr-2xl'}`}
                role="columnheader"
              >
                <h3 className="font-semibold text-gray-300 text-xs leading-tight" >
                  {language === 'he' ? 'תוכנות פיתוח' : 'Development Software'}
                </h3>
              </div>
            </div>

            {/* Comparison Rows */}
            <div role="rowgroup">
              {comparisonData.map((row, index) => (
                <ComparisonRow key={index} row={row} index={index} language={language} />
              ))}
            </div>
          </div>
        </div>

        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

export default memo(ComparisonTableSection);
