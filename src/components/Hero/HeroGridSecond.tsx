'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';


// Custom hook for responsive grid size
const useGridSize = () => {
  const [gridSize, setGridSize] = useState(100); // Default: 10x10
  
  useEffect(() => {
    const updateGridSize = () => {
      if (window.innerWidth <= 480) {
        setGridSize(90); // 6x15 for mobile (6 columns × 15 rows)
      } else if (window.innerWidth <= 768) {
        setGridSize(96); // 8x12 for tablet (8 columns × 12 rows)
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



export default function HeroGridSecond() {
  const gridSize = useGridSize();
  const { userType, setUserType } = useUserType();
  const { t, language } = useLanguage();
  
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
          (cell as HTMLElement).style.backgroundColor = `rgba(74, 207, 255, ${intensity * 0.02})`;
          (cell as HTMLElement).style.borderColor = `rgba(74, 207, 255, ${intensity * 0.1})`;
        } else {
          (cell as HTMLElement).style.backgroundColor = '';
          (cell as HTMLElement).style.borderColor = 'rgba(29, 130, 130, 0.12)';
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Language Switcher */}
      <div className="absolute top-4 left-4 z-50">

      </div>
     
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-gray-700 via-gray-900 to-black" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {/* Background Pattern */}
       

        {/* Grid Background */}
        <div className="absolute top-0 left-0 w-full h-full win-grid win-grid-two" id="win-grid" style={{ zIndex: 2 }}>
          {Array.from({ length: gridSize }).map((_, index) => (
            <div 
              key={index} 
              className="win-btn" 
              id={`${index}`} 
              style={{ border: '1px solid rgba(29, 130, 130, 0.07)' }}
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
                    src="/assets/images/hero/hero2.png"
                    alt="Hero Laptop"
                    width={600}
                    height={500}
                    className="relative z-10 lg:mt-30"
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`w-full lg:w-1/2 order-1 lg:order-2 ${language === 'he' ? 'text-right' : 'text-left'}`}>
              {/* Heading */}
              <h2 className={`text-4xl md:text-5xl xl:text-55 text-white/70 font-semibold mb-[35px] pointer-events-auto xl:ml-5 mx-auto ${language === 'he' ? 'text-right' : 'text-left'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
                <span>{t(`hero.${userType}.title`)} </span>
                <span className="relative inline-block px-3 font-bold text-white uppercase">
                  <span className="relative z-10">{t(`hero.${userType}.titleHighlight`)} </span>
                  <span className="absolute top-0 left-0 block w-full h-full bg-gradient-to-r from-cyan-400"></span>
                </span>
                <br />
                <span className="italic">{t(`hero.${userType}.subtitle`)}</span>
              </h2>



            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-in" style={{ animationName: 'fade-up', animationDuration: '0.8s', animationDelay: '0.6s', animationFillMode: 'both' }}>
              <p className={`text-white/60 bg-white/10 mb-10 border-cyan-400 p-3 rounded text-xs ${
                language === 'he' 
                  ? 'pr-5 ml-20 rounded-l-2xl text-right' 
                  : 'pl-5 mr-20 rounded-r-2xl text-left'
              }`} dir={language === 'he' ? 'rtl' : 'ltr'}>
                {t(`hero.${userType}.description`)}
            </p>
                <Link href="/services" className="flex items-center gap-2 bg-transparent border border-cyan-400/30 text-white px-8 py-4 rounded-full hover:bg-cyan-400/10 transition-all">
                  <span>{t(`hero.${userType}.servicesButton`)}</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2 border-white/10 gradient-to-r from-cyan-400/40 to-cyan-400/40 bg-cyan-400/40 border-cyan-400/40 text-white px-8 py-4 rounded-full hover:bg-cyan-500/40 transition-all">
                  <span>{t(`hero.${userType}.contactButton`)}</span>
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
