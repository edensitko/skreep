import React from 'react';
import type { SliderConfig } from './types';
import { TESTIMONIALS_DATA } from './constants';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates animation cleanup function for slider
 * @param sliderRef - Reference to the slider element
 * @param direction - Animation direction (1 for right, -1 for left)
 * @param config - Slider configuration
 * @returns Cleanup function to cancel animation
 */
export const createSliderAnimation = (
  sliderRef: React.RefObject<HTMLDivElement | null>, 
  direction: number,
  config: SliderConfig
) => {
  if (!sliderRef.current) return;

  const slider = sliderRef.current;
  const slideWidth = config.slideWidth + config.slideMargin;
  const totalWidth = slideWidth * TESTIMONIALS_DATA.length;
  
  let currentTranslate = direction < 0 ? -totalWidth : 0;
  let animationId: number;
  
  const animate = () => {
    if (!slider) return;
    
    currentTranslate += direction * config.animationSpeed;
    
    if (direction > 0 && currentTranslate >= totalWidth) {
      currentTranslate = 0;
    } else if (direction < 0 && currentTranslate <= -totalWidth) {
      currentTranslate = 0;
    }
    
    slider.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
    animationId = requestAnimationFrame(animate);
  };
  
  slider.style.transform = `translate3d(${currentTranslate}px, 0px, 0px)`;
  animationId = requestAnimationFrame(animate);
  
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};
