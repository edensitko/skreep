'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import ComparisonRow from './ComparisonRow';
import { COMPARISON_DATA } from './constants';

/**
 * Comparison table section showing advantages of Skreep over competitors
 * Features responsive grid layout and enhanced Skreep column highlighting
 */
function ComparisonTableSection() {
  return (
    <section 
      className="home-one-comparison-wrapper w-[95%] mt-15 lg:mt-20 mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-4xl before:absolute before:inset-0 before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-4xl after:bg-gradient-to-tl after:from-white/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 active:backdrop-blur-[80px] group cursor-pointer"
      role="region"
      aria-label="השוואת שירותים"
    >
      <div className="mx-auto container px-2 py-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="w-full font-bold text-center bg-gradient-to-r from-white/90 via-white-50 to-white/10 bg-clip-text text-transparent text-3xl md:text-3xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out opacity-100 translate-y-0">
            למה לבחור ב<span className="bg-gradient-to-r from-white/30 to-white/10 bg-clip-text text-transparent font-extrabold">סקריפ</span>?
          </h1>
        </div>
        
        {/* Comparison Table */}
        <div 
          className="rounded-3xl overflow-hidden" 
          dir="ltr"
          role="table"
          aria-label="טבלת השוואה בין ספקי שירות"
        >
          {/* Header Row */}
          <div className="grid grid-cols-4" role="row">
            <div 
              className="py-2 px-1 mt-8 text-center border border-white/10"
              role="columnheader"
            >
              <h3 className="font-light text-red-300 text-sm" dir="rtl">
                פרילנסרים
              </h3>
            </div>
            <div 
              className="py-2 px-1 mt-8 text-center border border-white/10"
              role="columnheader"
            >
              <h3 className="font-light text-red-300 text-sm" dir="rtl">
                מתחרים
              </h3>
            </div>
            <div 
              className="col-span-2 rounded-tl-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 py-2 px-4 text-center"
              role="columnheader"
            >
              <div className="flex items-center justify-center gap-3">
                <div>
                  <p className="text-white text-md" dir="rtl">
                    מוצר מבית
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
            {COMPARISON_DATA.map((row, index) => (
              <ComparisonRow key={index} row={row} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black/40 backdrop-blur-xl mt-10 p-6 md:p-8 text-center rounded-2xl">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              מוכנים להתחיל?
            </span>
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed">
            בואו נדבר על הפרויקט שלכם ונראה איך סקריפ יכול לעזור לכם להגשים אותו
          </p>
          
          <button 
            className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-8 py-3 md:px-16 md:py-4 lg:px-24 lg:py-5 rounded-full font-semibold hover:bg-cyan-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg lg:text-xl mx-auto w-fit"
            aria-label="פתח דיאלוג ליצירת קשר"
          >
            בואו נדבר
          </button>
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
