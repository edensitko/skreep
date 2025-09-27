import { ANIMATION_CONFIG } from './constants';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create animation delay timer
 */
export const createAnimationTimer = (callback: () => void, delay: number = ANIMATION_CONFIG.mountDelay): (() => void) => {
  const timer = setTimeout(callback, delay);
  return () => clearTimeout(timer);
};

/**
 * Generate animation class names based on state
 */
export const getAnimationClasses = (mounted: boolean, isVisible: boolean): string => {
  if (!mounted || !isVisible) {
    return 'opacity-0 transform scale-0';
  }
  return 'animate-zoom-in';
};

/**
 * Generate button classes with responsive design
 */
export const getButtonClasses = (isHovered?: boolean): string => {
  const baseClasses = 'bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-3 md:px-16 md:py-5 rounded-full font-semibold transition-all flex items-center justify-center gap-2 md:gap-3 text-base md:text-xl w-full max-w-sm md:max-w-none md:w-auto';
  const hoverClasses = isHovered ? 'bg-cyan-500' : 'hover:bg-cyan-500';
  
  return `${baseClasses} ${hoverClasses}`;
};

/**
 * Generate background grid styles
 */
export const getGridStyles = (opacity: number = 0.02, size: string = '80px') => ({
  backgroundImage: `
    linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
  `,
  backgroundSize: `${size} ${size}`
});
