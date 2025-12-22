// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

export const MAINTENANCE_CONTENT = {
  brand: "SKREEP",
  title: "אנחנו חוזרים בקרוב!",
  subtitle: "האתר שלנו עובר שדרוג  כדי להביא לכם חוויה טובה יותר.  תודה על הסבלנות!",
  ctaTitle: "היו הראשונים לדעת",
  ctaSubtitle: "הירשמו לקבלת עדכון ברגע שנחזור לאוויר",
  footerMessage: "© 2025 Skreep. כל הזכויות שמורות.",
  
  // Form content
  emailPlaceholder: "הכניסו את כתובת המייל שלכם...",
  submitText: "עדכנו אותי",
  submitLoadingText: "שולח...",
  successMessage: "תודה! נעדכן אותכם ברגע שנחזור",
  
  // Social links
  socialTitle: "עקבו אחרינו ברשתות החברתיות",
  
 
} as const;

// Visual effects configuration
export const VISUAL_EFFECTS = {
  gradients: {
    primary: 'from-cyan-400 via-blue-500 to-purple-600',
    secondary: 'from-purple-400 via-pink-500 to-red-500',
    background: 'from-black via-gray-900 to-black',
    card: 'from-black/40 via-black/20 to-transparent',
    success: 'from-green-400 via-emerald-500 to-teal-600'
  },
  shadows: {
    glow: 'shadow-[0_0_50px_rgba(6,182,212,0.3)]',
    card: 'shadow-[0_20px_60px_rgba(0,0,0,0.4)]',
    button: 'shadow-[0_10px_30px_rgba(6,182,212,0.2)]',
    success: 'shadow-[0_10px_30px_rgba(34,197,94,0.3)]'
  },
  blur: {
    backdrop: 'backdrop-blur-3xl',
    strong: 'backdrop-blur-2xl',
    light: 'backdrop-blur-xl'
  }
} as const;

// Animation configurations
export const ANIMATION_CONFIG = {
  staggerDelay: 0.2,
  slideInDuration: 0.8,
  scaleHoverDuration: 0.3,
  countdownUpdate: 1000,
  particleCount: 50
} as const;

// Social media links
export const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/972501234567',
    color: 'from-green-400 to-green-600',
    emoji: ' '
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/skreep',
    color: 'from-blue-400 to-blue-600',
    emoji: ' '
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/skreep',
    color: 'from-pink-400 via-purple-500 to-orange-500',
    emoji: ' '
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/skreep',
    color: 'from-blue-500 to-blue-700',
    emoji: ' '
  }
] as const;

// Floating particles configuration
export const PARTICLES_CONFIG = {
  count: 30,
  colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
  sizes: [2, 3, 4, 5],
  speeds: [0.5, 1, 1.5, 2],
  directions: ['up', 'down', 'left', 'right', 'diagonal']
} as const;

// Background effects
export const BACKGROUND_EFFECTS = {
  gridSize: 60,
  gridOpacity: 0.1,
  waveAmplitude: 20,
  waveFrequency: 0.02,
  orbs: [
    { size: 400, color: 'cyan', opacity: 0.1, x: 20, y: 20 },
    { size: 300, color: 'purple', opacity: 0.08, x: 80, y: 60 },
    { size: 350, color: 'blue', opacity: 0.09, x: 50, y: 80 },
    { size: 250, color: 'pink', opacity: 0.07, x: 10, y: 70 }
  ]
} as const;
