// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Smooth scroll to top of page
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Check if scroll position is above threshold
 */
export const shouldShowScrollButton = (scrollY: number, threshold: number): boolean => {
  return scrollY > threshold;
};
