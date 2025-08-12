'use client';

import React, { memo, useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { PROJECT_SECTIONS, SECTION_TITLE, SECTION_SUBTITLE, VIEW_MORE_PROJECTS_TEXT } from './constants';

/**
 * Our Projects section with vertical carousel
 */
function OurProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const cardHeight = carouselRef.current.scrollHeight / PROJECT_SECTIONS.length;
      carouselRef.current.scrollTo({
        top: cardHeight * index,
        behavior: 'smooth'
      });
    }
  };

  const nextCard = () => {
    const nextIndex = (currentIndex + 1) % PROJECT_SECTIONS.length;
    scrollToCard(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = currentIndex === 0 ? PROJECT_SECTIONS.length - 1 : currentIndex - 1;
    scrollToCard(prevIndex);
  };

  return (
    <section 
      className="w-full py-16 md:py-24 relative overflow-hidden"
      role="region"
      aria-label="הפרויקטים שלנו"
    >
      <div className="container mx-auto px-10 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-2">
            <h1 
              className="font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide"
              dir="rtl"
              style={{ textAlign: 'center' }}
            >
              {SECTION_TITLE}
            </h1>
            <p 
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto"
              dir="rtl"
            >
              {SECTION_SUBTITLE}
            </p>
          </div>

          {/* Vertical Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="carousel-container h-[500px] lg:h-[600px] overflow-y-auto scroll-smooth"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
            >
              <div className="space-y-10 lg:space-y-24">
                {PROJECT_SECTIONS.map((section, index) => (
                  <div key={section.id} className="min-h-[400px] lg:min-h-[400px]  items-center">
                    <ProjectCard
                      section={section}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
              {/* Up Arrow */}
              <button
                onClick={prevCard}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Previous project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Down Arrow */}
              <button
                onClick={nextCard}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Next project"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* View More Button - Centered */}
          <div className="flex justify-center mt-16">
            <button 
              className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-3 rounded-full font-semibold flex items-center gap-2" 
              dir="rtl"
              aria-label={VIEW_MORE_PROJECTS_TEXT}
            >
              {VIEW_MORE_PROJECTS_TEXT}
              <svg 
                className="transition-all duration-300" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19 12H5M12 19L5 12L12 5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

                
        
      
      {/* Custom Keyframes Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          75% { transform: translateY(-15px) rotate(2deg); }
        }
        
        /* Hide scrollbar for webkit browsers */
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default memo(OurProjectsSection);
