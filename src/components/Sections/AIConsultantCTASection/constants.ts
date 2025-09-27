// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

export const CTA_CONTENT = {
  buttonText: 'נסו את יועץ הבינה מלאכותית שלנו',
  ariaLabel: 'נסו את יועץ הבינה המלאכותית שלנו',
  title: 'יועץ AI מתקדם'
} as const;

export const ANIMATION_CONFIG = {
  mountDelay: 100,
  zoomDuration: 800,
  slideDuration: 600,
  fadeDuration: 500,
  buttonDelay: '0.2s'
} as const;

export const LAYOUT_CONFIG = {
  maxWidth: '800px',
  minHeight: {
    mobile: '200px',
    desktop: '300px'
  },
  buttonMaxWidth: {
    mobile: 'max-w-sm',
    desktop: 'md:max-w-none'
  }
} as const;

export const BACKGROUND_CONFIG = {
  gridOpacity: 0.02,
  gridSize: '80px',
  gradientColors: {
    from: 'rgba(34,211,238,0.3)',
    to: 'rgba(34,211,238,0.3)'
  }
} as const;
