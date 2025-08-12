'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import CTAButton from './CTAButton';
import BackgroundEffects from './BackgroundEffects';
import { LAYOUT_CONFIG, ANIMATION_CONFIG } from './constants';
import { createAnimationTimer } from './utils';
import type { AnimationState } from './types';

/**
 * AI Consultant CTA section with enhanced animations and accessibility
 * Features responsive design and optimized performance
 */
function AIConsultantCTASection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [animationState, setAnimationState] = useState<AnimationState>({
    isHovered: false,
    isVisible: false,
    mounted: false
  });

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleCTAClick = useCallback(() => {
    // Navigate to AI consultant or trigger action
    console.log('AI Consultant CTA clicked');
    // Add your navigation logic here
  }, []);

  const handleHover = useCallback((hovered: boolean) => {
    setAnimationState(prev => ({
      ...prev,
      isHovered: hovered
    }));
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
        className="mx-auto theme-container container px-4 py-8 md:py-16"
        role="region"
        aria-label="קריאה לפעולה - יועץ בינה מלאכותית"
      >
        <div 
          className="relative flex items-center justify-center overflow-hidden min-h-[400px] md:min-h-[600px]"
        >
          <div 
            className="w-full flex justify-center items-center flex-col relative z-10"
            style={{ maxWidth: LAYOUT_CONFIG.maxWidth }}
          >
            <CTAButton
              onClick={handleCTAClick}
              animationState={animationState}
              onHover={handleHover}
            />
          </div>

          <BackgroundEffects />
        </div>
      </section>
    </>
  );
}

export default memo(AIConsultantCTASection);
