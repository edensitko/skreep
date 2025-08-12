'use client';

import React, { memo, useCallback } from 'react';
import ServiceCard from './ServiceCard';
import ServiceDetails from './ServiceDetails';
import ScrollControls from './ScrollControls';
import { SERVICES_DATA, SECTION_CONTENT, ANIMATION_CONFIG } from './constants';
import { scrollLeft, scrollRight } from './utils';
import { useShowcaseState, useScrollContainer, useIntersectionAnimation } from './hooks';

/**
 * Interactive showcase section with service cards and detailed view
 * Features horizontal scrolling and responsive design
 */
function InteractiveShowcaseSection() {
  // ============================================================================
  // STATE MANAGEMENT & HOOKS
  // ============================================================================
  
  const { state, selectService, updateScrollCapabilities, setIsVisible } = useShowcaseState();
  const { scrollContainerRef } = useScrollContainer(updateScrollCapabilities);
  const { titleRef } = useIntersectionAnimation(setIsVisible);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleScrollLeft = useCallback(() => {
    scrollLeft(scrollContainerRef.current);
  }, []);

  const handleScrollRight = useCallback(() => {
    scrollRight(scrollContainerRef.current);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <section 
        className="relative w-full bg-black py-12 md:py-20 overflow-hidden"
        role="region"
        aria-label="מוצגים אינטראקטיביים של השירותים"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 
              ref={titleRef}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent transition-all duration-1000 ${
                state.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {SECTION_CONTENT.title}
            </h1>
            <p 
              className={`text-lg md:text-xl text-white/70 leading-relaxed transition-all duration-1000 delay-200 ${
                state.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {SECTION_CONTENT.subtitle}
            </p>
          </div>

          {/* Services Carousel */}
          <div className="relative">
            {/* Scroll Controls */}
            <div className="flex justify-center mb-6 md:mb-8">
              <ScrollControls
                onScrollLeft={handleScrollLeft}
                onScrollRight={handleScrollRight}
                canScrollLeft={state.canScrollLeft}
                canScrollRight={state.canScrollRight}
              />
            </div>

            {/* Services Container */}
            <div className="relative overflow-hidden">
              <div 
                ref={scrollContainerRef}
                className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {SERVICES_DATA.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={state.selectedService?.id === service.id}
                    onSelect={selectService}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Service Details */}
          {state.selectedService && (
            <ServiceDetails 
              service={state.selectedService}
              className={ANIMATION_CONFIG.fadeInClass}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default memo(InteractiveShowcaseSection);
