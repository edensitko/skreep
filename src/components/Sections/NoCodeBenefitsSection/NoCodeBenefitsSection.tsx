'use client';

import React, { memo } from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import Timeline from './Timeline';
import { SECTION_CONTENT } from './constants';
import { 
  useSectionState, 
  useScrollAnimations, 
  useIntersectionAnimation, 
  useBenefitsData, 
  useHydration 
} from './hooks';

/**
 * No-code benefits section with user-type specific content and timeline
 * Features scroll-based animations and responsive design
 */
function NoCodeBenefitsSection() {
  // ============================================================================
  // STATE MANAGEMENT & HOOKS
  // ============================================================================
  
  const { userType } = useUserType();
  const benefits = useBenefitsData(userType);
  
  const { 
    state, 
    updateVisibleItems, 
    updateScrollProgress, 
    setIsHydrated, 
    setIsVisible 
  } = useSectionState(benefits);
  
  const { sectionRef, setItemRef } = useScrollAnimations(
    benefits, 
    updateVisibleItems, 
    updateScrollProgress
  );
  
  const { titleRef } = useIntersectionAnimation(setIsVisible);
  
  useHydration(setIsHydrated);

  // ============================================================================
  // CONTENT SELECTION
  // ============================================================================
  
  const sectionTitle = userType === 'entrepreneurs' 
    ? SECTION_CONTENT.entrepreneursTitle 
    : SECTION_CONTENT.businessTitle;
    
  const sectionSubtitle = userType === 'entrepreneurs'
    ? SECTION_CONTENT.entrepreneursSubtitle
    : SECTION_CONTENT.businessSubtitle;

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-8 md:py-20 overflow-hidden"
      dir="rtl"
      role="region"
      aria-label="יתרונות פתרונות ללא קוד"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid Pattern */}
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
        
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl" />
        

      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
              state.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir="rtl"
            style={{ textAlign: 'center' }}
          >
            {sectionTitle}
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-white/70 leading-relaxed max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
              state.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {sectionSubtitle}
          </p>
        </div>

        {/* Benefits Timeline */}
        <div className="max-w-6xl mx-auto">
          <Timeline
            benefits={benefits}
            visibleItems={state.visibleItems}
            isHydrated={state.isHydrated}
            scrollProgress={state.scrollProgress}
            setItemRef={setItemRef}
          />
        </div>
      </div>
    </section>
  );
}

export default memo(NoCodeBenefitsSection);
