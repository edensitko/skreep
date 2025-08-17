'use client';

import React, { memo, useMemo } from 'react';
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
  
  return (
    <section 
      className="home-one-comparison-wrapper w-[95%] mt-15 lg:mt-20 mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-4xl before:absolute before:inset-0 before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-4xl after:bg-gradient-to-tl after:from-white/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 active:backdrop-blur-[80px] group cursor-pointer"
      role="region"
      aria-label={t('comparisonTable.sectionAriaLabel')}
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto container px-2 py-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 
            className="w-full font-bold text-center bg-gradient-to-r from-white/90 via-white-50 to-white/10 bg-clip-text text-transparent text-3xl md:text-3xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out opacity-100 translate-y-0"
            dir='ltr'
          >
            {t('comparisonTable.title')} <span className="bg-gradient-to-r from-white/30 to-white/10 bg-clip-text text-transparent font-extrabold">{t('comparisonTable.titleHighlight')}</span>?
          </h1>
        </div>
        
        {/* Comparison Table */}
        <div 
          className="rounded-3xl overflow-hidden" 
          dir={language === 'he' ? 'ltr' : 'ltr'}
          role="table"
          aria-label={t('comparisonTable.tableAriaLabel')}
        >
          {/* Header Row */}
          <div className="grid grid-cols-4" role="row">
            <div 
              className="py-2 px-1 mt-8 text-center border border-white/10"
              role="columnheader"
            >
              <h3 className="font-light text-red-300 text-sm" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {t('comparisonTable.headers.freelancers')}
              </h3>
            </div>
            <div 
              className="py-2 px-1 mt-8 text-center border border-white/10"
              role="columnheader"
            >
              <h3 className="font-light text-red-300 text-sm" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {t('comparisonTable.headers.competitors')}
              </h3>
            </div>
            <div 
              className="col-span-2 rounded-tl-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 py-2 px-4 text-center"
              role="columnheader"
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <p className="text-white text-md" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {t('comparisonTable.headers.skreepProduct')}
                  </p>
                  <Image 
                    src="/assets/images/logo-1.png" 
                    alt="Skreep Logo" 
                    width={110} 
                    height={110} 
                    className="object-contain" 
                  />
                </div>
              </div>
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
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default memo(ComparisonTableSection);
