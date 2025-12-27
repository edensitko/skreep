import { ENTREPRENEURS_BENEFITS_HE, ENTREPRENEURS_BENEFITS_EN, BUSINESS_BENEFITS_HE, BUSINESS_BENEFITS_EN, ANIMATION_CONFIG } from './constants';
import type { Benefit, UserType } from './types';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get benefits data based on user type and language
 */
export const getBenefitsByUserType = (userType: UserType, language: string = 'en'): readonly Benefit[] => {
  if (userType === 'entrepreneurs') {
    return language === 'he' ? ENTREPRENEURS_BENEFITS_HE : ENTREPRENEURS_BENEFITS_EN;
  }
  return language === 'he' ? BUSINESS_BENEFITS_HE : BUSINESS_BENEFITS_EN;
};

/**
 * Calculate scroll progress based on section position
 */
export const calculateScrollProgress = (sectionRef: React.RefObject<HTMLElement | null>): number => {
  if (!sectionRef.current) return 0;
  
  const rect = sectionRef.current.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const sectionHeight = rect.height;
  
  // Simple calculation: when section top reaches viewport top, start progress
  // When section bottom reaches viewport bottom, complete progress
  const scrolled = Math.max(0, -rect.top);
  const maxScroll = Math.max(1, sectionHeight - windowHeight);
  
  return Math.min(1, Math.max(0, scrolled / maxScroll));
};

/**
 * Check if item should be visible based on scroll position
 */
export const shouldItemBeVisible = (
  index: number, 
  scrollProgress: number, 
  totalItems: number
): boolean => {
  // For mobile: sequential animation with staggered delays
  if (window.innerWidth < 768) {
    const itemThreshold = (index + 1) / totalItems;
    const staggerDelay = 0.15; // Delay between items
    return scrollProgress >= itemThreshold * staggerDelay;
  }
  
  // For desktop: make items appear immediately when section is in view
  const itemThreshold = (index + 1) / totalItems;
  return scrollProgress >= itemThreshold * 0.1 || scrollProgress > 0;
};

/**
 * Create throttled function
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T, 
  delay: number = ANIMATION_CONFIG.throttleDelay
): T => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return ((...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime >= delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
        timeoutId = null;
      }, delay);
    }
  }) as T;
};

/**
 * Generate benefit card classes
 */
export const getBenefitCardClasses = (
  index: number, 
  isVisible: boolean, 
  isHydrated: boolean
): string => {
  const baseClasses = 'group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 p-4 md:p-8 hover:border-cyan-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2';
  
  const visibilityClasses = isHydrated && isVisible 
    ? 'opacity-100' 
    : 'opacity-0';
    
  return `${baseClasses} ${visibilityClasses}`;
};

/**
 * Generate timeline icon classes
 */
export const getTimelineIconClasses = (
  index: number, 
  isVisible: boolean, 
  isHydrated: boolean,
  gradient: string
): string => {
  const baseClasses = `relative z-20 w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-2xl transition-opacity duration-1000`;
  
  const visibilityClasses = isHydrated && isVisible 
    ? 'opacity-100' 
    : 'opacity-0';
    
  return `${baseClasses} ${visibilityClasses}`;
};

/**
 * Generate arrow indicator classes for desktop
 */
export const getArrowClasses = (index: number): string => {
  const isEven = index % 2 === 0;
  const baseClasses = `absolute top-8 hidden md:block`;
  const positionClasses = isEven ? 'md:-right-2' : 'md:-left-2';
  
  return `${baseClasses} ${positionClasses}`;
};

/**
 * Generate arrow border classes
 */
export const getArrowBorderClasses = (index: number): string => {
  const isEven = index % 2 === 0;
  const baseClasses = 'w-0 h-0 border-t-8 border-b-8 border-transparent transition-colors duration-500';
  const borderClasses = isEven 
    ? 'border-r-8 border-r-white/20 group-hover:border-r-cyan-400/50' 
    : 'border-l-8 border-l-white/20 group-hover:border-l-cyan-400/50';
    
  return `${baseClasses} ${borderClasses}`;
};
