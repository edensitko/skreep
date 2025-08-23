import { RefObject } from 'react';
import { SCROLL_CONFIG } from './constants';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate scroll capabilities based on current position
 */
export const calculateScrollCapabilities = (scrollContainer: HTMLElement | null): {
  canScrollLeft: boolean;
  canScrollRight: boolean;
} => {
  if (!scrollContainer) {
    return { canScrollLeft: false, canScrollRight: false };
  }

  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
  
  return {
    canScrollLeft: scrollLeft > 0,
    canScrollRight: scrollLeft < scrollWidth - clientWidth - 1
  };
};

/**
 * Smooth scroll to left
 */
export const scrollLeft = (scrollContainer: HTMLElement | null): void => {
  if (!scrollContainer) return;
  
  scrollContainer.scrollBy({
    left: -SCROLL_CONFIG.scrollAmount,
    behavior: SCROLL_CONFIG.smoothBehavior
  });
};

/**
 * Smooth scroll to right
 */
export const scrollRight = (scrollContainer: HTMLElement | null): void => {
  if (!scrollContainer) return;
  
  scrollContainer.scrollBy({
    left: SCROLL_CONFIG.scrollAmount,
    behavior: SCROLL_CONFIG.smoothBehavior
  });
};

/**
 * Create intersection observer for animations
 */
export const createIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  threshold: number = SCROLL_CONFIG.threshold
): IntersectionObserver => {
  return new IntersectionObserver(
    ([entry]) => {
      callback(entry.isIntersecting);
    },
    { threshold }
  );
};

/**
 * Generate service card classes based on selection state
 */
export const getServiceCardClasses = (isSelected: boolean): string => {
  const baseClasses = 'group relative bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-4xl p-6 md:p-8 cursor-pointer transition-all duration-500 hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 min-w-[280px] md:min-w-[320px]';
  
  const selectedClasses = isSelected 
    ? 'ring-2 ring-cyan-400/50 bg-gradient-to-br from-black/40 via-black/25 to-black/10' 
    : '';
    
  return `${baseClasses} ${selectedClasses}`;
};

/**
 * Generate feature item classes
 */
export const getFeatureItemClasses = (color: string): string => {
  return `w-6 h-6 bg-gradient-to-r ${color} rounded-full flex items-center justify-center flex-shrink-0`;
};
