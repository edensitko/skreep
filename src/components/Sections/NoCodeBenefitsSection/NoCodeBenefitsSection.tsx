'use client';

import React, { memo } from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { language, t } = useLanguage();
  const benefits = useBenefitsData(userType, language);
  
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
    ? (t('noCodeBenefits.entrepreneurs.title') || (language === 'he' ? SECTION_CONTENT.entrepreneursTitle_he : SECTION_CONTENT.entrepreneursTitle_en))
    : (t('noCodeBenefits.business.title') || (language === 'he' ? SECTION_CONTENT.businessTitle_he : SECTION_CONTENT.businessTitle_en));
    
  const sectionSubtitle = userType === 'entrepreneurs'
    ? (t('noCodeBenefits.entrepreneurs.subtitle') || (language === 'he' ? SECTION_CONTENT.entrepreneursSubtitle_he : SECTION_CONTENT.entrepreneursSubtitle_en))
    : (t('noCodeBenefits.business.subtitle') || (language === 'he' ? SECTION_CONTENT.businessSubtitle_he : SECTION_CONTENT.businessSubtitle_en));

  return (
    <section 
      ref={sectionRef}
      className="relative w-[95%] mx-auto pt-20 md:pt-20 overflow-hidden"
      dir={language === 'he' ? 'rtl' : 'ltr'}
      role="region"
      aria-label={t('noCodeBenefits.ariaLabel') || (language === 'he' ? 'יתרונות פתרונות ללא קוד' : 'No-code solutions benefits')}
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
            className={`font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
              state.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
            style={{ textAlign: 'center' }}
          >
            {sectionTitle}
          </h1>
          
          <p 
            className={`text-md  font-light md:text-lg text-white/70 mx-auto transition-all duration-1000 delay-200 ${
              state.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
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
