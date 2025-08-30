'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import BackgroundEffects from './BackgroundEffects';
import { LAYOUT_CONFIG, ANIMATION_CONFIG } from './constants';
import { createAnimationTimer } from './utils';
import type { AnimationState } from './types';
import CubeButton from './CubeButton';

/**
 * AI Consultant CTA section with enhanced animations and accessibility
 * Features responsive design and optimized performance
 */
function AIConsultantCTASection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const { language, t } = useLanguage();
  const [animationState, setAnimationState] = useState<AnimationState>({
    isHovered: false,
    isVisible: false,
    mounted: false
  });

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handlePrimaryClick = useCallback(() => {
    // Navigate to AI consultant chat section
    const chatSection = document.getElementById('ai-consultant');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: navigate to AI consultant page
      window.location.href = '/ai-consultant';
    }
  }, []);
  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  useEffect(() => {
    setAnimationState(prev => ({ ...prev, mounted: true }));
    
    // Trigger animations after component mounts
    const cleanup = createAnimationTimer(() => {
      setAnimationState(prev => ({ ...prev, isVisible: true }));
    }, ANIMATION_CONFIG.mountDelay);

    return cleanup;
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideUpZoom {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-zoom-in {
          animation: zoomIn ${ANIMATION_CONFIG.zoomDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-slide-up-zoom {
          animation: slideUpZoom ${ANIMATION_CONFIG.slideDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .animate-fade-in-scale {
          animation: fadeInScale ${ANIMATION_CONFIG.fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
      <section 
        className="mx-auto theme-container container px-4 py-6 md:py-8"
        role="region"
        aria-label={t('aiConsultantCTA.sectionAriaLabel')}
      >
        <div 
          className="relative flex items-center justify-center overflow-hidden min-h-[150px] md:min-h-[160px]"
        >
          <div 
            className="w-full flex justify-center items-center relative z-10 px-4"
            style={{ maxWidth: '400px' }}
          >
            {/* Single Cube Button */}
            <div 
              className={`transition-all duration-800 ${animationState.mounted && animationState.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ animationDelay: '0.1s' }}
            >
              <CubeButton
                onClick={handlePrimaryClick}
                language={language}
                className="min-w-[240px] md:min-w-[280px]"
              />
            </div>
          </div>

          <BackgroundEffects />
        </div>
      </section>
    </>
  );
}

export default memo(AIConsultantCTASection);
