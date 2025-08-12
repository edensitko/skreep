'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroGridSecond from './HeroGridSecond';
import { useUserType } from '@/hooks/useGlobalUserType';

// Custom hook for responsive grid size
const useGridSize = () => {
  const [gridSize, setGridSize] = useState(100); // Default: 10x10
  
  useEffect(() => {
    const updateGridSize = () => {
      if (window.innerWidth <= 480) {
        setGridSize(64); // 8x8 for mobile
      } else if (window.innerWidth <= 768) {
        setGridSize(36); // 6x6 for tablet
      } else {
        setGridSize(100); // 10x10 for desktop
      }
    };
    
    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    
    return () => window.removeEventListener('resize', updateGridSize);
  }, []);
  
  return gridSize;
};

// Tab constants
const TAB_BUSINESS = 'עסקים' as const;
const TAB_ENTREPRENEURS = 'יזמים' as const;

// Union type for tabs
type TabType = 'עסקים' | 'יזמים';

export default function HeroGrid() {
  const { userType, setUserType } = useUserType();
  const gridSize = useGridSize();
  
  // Map global user type to local tab type
  const activeTab = userType === 'entrepreneurs' ? TAB_ENTREPRENEURS : TAB_BUSINESS;
  
  // Add interactive effect to grid cells on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const gridCells = document.querySelectorAll('.win-btn');
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      gridCells.forEach((cell: Element) => {
        const rect = cell.getBoundingClientRect();
        const cellCenterX = rect.left + rect.width / 2;
        const cellCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - cellCenterX, 2) + 
          Math.pow(mouseY - cellCenterY, 2)
        );
        
        const maxDistance = 300;
        if (distance < maxDistance) {
          const intensity = 1 - distance / maxDistance;
          (cell as HTMLElement).style.backgroundColor = `rgba(74, 207, 255, ${intensity * 0.1})`;
          (cell as HTMLElement).style.borderColor = `rgba(74, 207, 255, ${intensity * 0.3})`;
        } else {
          (cell as HTMLElement).style.backgroundColor = '';
          (cell as HTMLElement).style.borderColor = 'rgba(100, 100, 100, 0.2)';
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleTab = () => {
    setUserType(userType === 'business' ? 'entrepreneurs' : 'business');
  };

  // If the active tab is 'יזמים', show the second hero
  if (activeTab === TAB_ENTREPRENEURS) {
    return (
      <>
        {/* Absolute Position Toggle */}
        <div className="absolute top-32 right-4 md:top-42 md:right-24 z-50 animate-in" style={{ animationName: 'slide-in-right', animationDuration: '0.6s', animationDelay: '0.3s', animationFillMode: 'both' }}>
          <button 
            type="button" 
            className="bg-black/40 border border-cyan-100/10 rounded-full shadow-style-one px-3 py-2 md:px-5 md:py-3 relative overflow-hidden"
            onClick={toggleTab}
          >
            <div className="flex items-center gap-2 md:gap-4 relative z-10">
              <span className={`text-sm transition-all duration-300 ${
                userType === 'business' ? 'text-cyan-400 font-bold' : 'text-white'
              }`}>
                {TAB_BUSINESS}
              </span>
              <div className="relative w-10 h-5 bg-gray-600 rounded-full" dir="ltr">
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  userType === 'entrepreneurs' ? 'left-0.5 translate-x-0' : 'left-0.5 translate-x-5'
                }`}></div>
              </div>
              <span className={`text-sm transition-all duration-300 ${
                userType === 'entrepreneurs' ? 'text-cyan-400 font-bold' : 'text-white'
              }`}>
                {TAB_ENTREPRENEURS}
              </span>
            </div>
          </button>
        </div>
        <HeroGridSecond />
      </>
    );
  }

  return (
    <>
      {/* Absolute Position Toggle */}
      <div className="absolute top-32 right-4 md:top-42 md:right-24 z-50 animate-in" style={{ animationName: 'slide-in-right', animationDuration: '0.6s', animationDelay: '0.3s', animationFillMode: 'both' }}>
        <button 
          type="button" 
          className="bg-black/40 border border-cyan-100/10 rounded-full shadow-style-one px-3 py-2 md:px-5 md:py-3 relative overflow-hidden"
          onClick={toggleTab}
        >
          <div className="flex items-center gap-2 md:gap-4 relative z-10">
            <span className={`text-sm transition-all duration-300 ${
              userType === 'business' ? 'text-cyan-400 font-bold' : 'text-white'
            }`}>
              {TAB_BUSINESS}
            </span>
            <div className="relative w-10 h-5 bg-gray-600 rounded-full" dir="rtl">
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                userType === 'entrepreneurs' ? 'left-0.5 translate-x-0' : 'left-0.5 translate-x-5'
              }`}></div>
            </div>
            <span className={`text-sm transition-all duration-300 ${
              userType === 'entrepreneurs' ? 'text-cyan-400 font-bold' : 'text-white'
            }`}>
              {TAB_ENTREPRENEURS}
            </span>
          </div>
        </button>
      </div>
      
      <section className="relative w-full min-h-screen overflow-hidden bg-gray-1000" dir="rtl">
        {/* Background Pattern */}
       

        {/* Grid Background */}
        <div className="absolute top-0 left-0 w-full h-full win-grid win-grid-two" id="win-grid" style={{ zIndex: 2 }}>
          {Array.from({ length: gridSize }).map((_, index) => (
            <div 
              key={index} 
              className="win-btn" 
              id={`${index}`} 
              style={{ border: '1px solid rgba(29, 130, 130, 0.11)' }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 mt-16">
            {/* Left Side - Image */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 -mt-20 lg:mt-0">
              <div className="relative">
                <div className="relative w-full h-[500px] flex items-center justify-center">
                  <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-3xl"></div>
                  <Image
                    src="/assets/images/hero/hero1.png"
                    alt="Hero Laptop"
                    width={600}
                    height={400}
                    className="w-full h-auto relative z-10 lg:mt-30"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 text-right order-1 lg:order-2">

            
              {/* Heading */}
              
              <h2 className="text-4xl md:text-5xl xl:text-55 text-white/70 font-semibold mb-[35px] pointer-events-auto xl:ml-5 mx-auto">
                <span>פיתוח מוצר</span><span className="relative inline-block px-3 font-bold text-white uppercase" dir="ltr">
                  <span className="relative z-10">מנצח</span>
                  <span className="absolute top-0 left-0 block w-full h-full bg-gradient-to-r from-cyan-400"></span>
                </span>
                <br />
                <span className="italic">מחיר וזמן</span>
              </h2>

            

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 animate-in" style={{ animationName: 'fade-up', animationDuration: '0.8s', animationDelay: '0.6s', animationFillMode: 'both' }}>
              <p className="text-white/60 bg-white/10 pr-5 ml-20 mb-10 border-r-[3px] border-cyan-400 p-3 rounded  rounded-l-2xl text-xs " dir="rtl">
              מוגדרים על ידי דינמיות דיגיטלית, סוכנות השיווק הדיגיטלית שלנו מתבלטת של ד ויכולת אסטרטגית.
            </p>
                <Link href="/services" className="flex items-center gap-2 bg-transparent border border-cyan-400/30 text-white px-8 py-4 rounded-full hover:bg-cyan-400/10 transition-all">
                  <span>שירותים</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L15 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 border-white/10 border-l-[2px] border-t-[2px] gradient-to-r from-cyan-400/40 to-cyan-400/40 bg-cyan-400/40 border-cyan-400/40 text-white px-8 py-4 rounded-full hover:bg-cyan-500/40 transition-all">
                  <span>בואו נדבר</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L15 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-3xl"></div>
        {/*blur effect in bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[100px] bg-gradient-to-t from-black via-black/70 to-transparent  z-50"></div>
      </section>
    </>
  );
}
