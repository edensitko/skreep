import type { ServiceCard } from './types';

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

export const SERVICES_DATA: readonly ServiceCard[] = [
  {
    id: 'ai-solutions',
    title: 'פתרונות בינה מלאכותית',
    description: 'מערכות AI מתקדמות לעסקים',
    longDescription: 'פיתוח פתרונות בינה מלאכותית מותאמים אישית שמשפרים את היעילות העסקית ומאפשרים קבלת החלטות מבוססות נתונים.',
    features: ["בינה מלאכותית לעסקים", "ניתוח נתונים חכם", "אוטומציה חכמה", " צ'אט בוטים חכמים"],
    color: 'from-blue-500 to-purple-600',
    imageBg: '/assets/images/servicesimg/1.png'
  },
  {
    id: 'web-development',
    title: 'פיתוח אתרים ',
    description: 'פתרונות דיגיטליים מותאמים אישית',
    longDescription: 'יצירת אתרים ואפליקציות מתקדמות עם עיצוב רספונסיבי, ביצועים מהירים וחוויית משתמש מעולה.',
    features: ['עיצוב רספונסיבי', 'ביצועים מהירים', 'SEO מתקדם', 'אבטחה גבוהה'],
    color: 'from-green-500 to-teal-600',
    imageBg: '/assets/images/servicesimg/2.png'
  },
  {
    id: 'automation',
    title: 'אוטומציה ותהליכים',
    description: 'חיסכון בזמן ומשאבים',
    longDescription: 'יישום פתרונות אוטומציה מתקדמים שמייעלים תהליכים עסקיים ומפחיתים עלויות תפעול.',
    features: ['אוטומציה של תהליכים', 'ניהול זרימת עבודה', 'דוחות אוטומטיים', 'אינטגרציות מתקדמות'],
    color: 'from-orange-500 to-red-600',
    imageBg: '/assets/images/servicesimg/3.png'
  },
  {
    id: 'mobile-apps',
    title: 'פיתוח אפליקציות',
    description: 'פיתוח מובייל והיברידיות עם חוויית משתמש וביצועים גבוהים.',
    longDescription: 'פיתוח אפליקציות מובייל נטיביות והיברידיות עם חוויית משתמש וביצועים גבוהים.',
    features: ['פיתוח נטיבי', 'עיצוב UX/UI מתקדם', 'אינטגרציה עם API', 'פרסום בחנויות'],
    color: 'from-pink-500 to-rose-600',
    imageBg: '/assets/images/servicesimg/10.png'
  },
  {
    id: 'cloud-solutions',
    title: 'פתרונות ענן',
    description: 'תשתיות ענן מתקדמות ומאובטחות',
    longDescription: 'הקמה וניהול של תשתיות ענן מתקדמות עם זמינות גבוהה, אבטחה מקסימלית וגמישות מלאה.',
    features: ['AWS & Azure', 'אבטחת מידע', 'גיבויים אוטומטיים', 'ניטור 24/7'],
    color: 'from-cyan-500 to-blue-600',
    imageBg: '/assets/images/servicesimg/5.png'
  },
  {
    id: 'data-analytics',
    title: 'ניתוח נתונים ו-BI',
    description: 'תובנות עסקיות מבוססות נתונים',
    longDescription: 'יצירת מערכות ניתוח נתונים מתקדמות ודשבורדים אינטראקטיביים לקבלת החלטות מבוססות נתונים.',
    features: ['דשבורדים אינטראקטיביים', 'ניתוח נתונים מתקדם', 'דוחות אוטומטיים', 'תחזיות עסקיות'],
    color: 'from-indigo-500 to-purple-600',
    imageBg: '/assets/images/servicesimg/6.png'
  },
  {
    id: 'ecommerce',
    title: 'מסחר אלקטרוני',
    description: 'חנויות אונליין מתקדמות ומניבות',
    longDescription: 'פיתוח פלטפורמות מסחר אלקטרוני מתקדמות עם מערכות תשלום מאובטחות וניהול מלאי חכם.',
    features: ['עיצוב חנות מותאם', 'מערכות תשלום מאובטחות', 'ניהול מלאי חכם', 'אנליטיקס מתקדמת'],
    color: 'from-emerald-500 to-green-600',
    imageBg: './assets/images/servicesimg/7.png'
  }
] as const;

export const SECTION_CONTENT = {
  title: 'השירותים שלנו',
  subtitle: 'פתרונות טכנולוגיים מתקדמים לעסק שלכם',
  detailsTitle: 'תיאור מפורט',
  featuresTitle: 'תכונות עיקריות'
} as const;

export const SCROLL_CONFIG = {
  scrollAmount: 300,
  smoothBehavior: 'smooth' as ScrollBehavior,
  threshold: 0.3
} as const;

export const ANIMATION_CONFIG = {
  transitionDuration: 'duration-700',
  hoverTransition: 'transition-all duration-300',
  fadeInClass: 'animate-fade-in'
} as const;
