import type { ProjectSection } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const PROJECT_SECTIONS: ReadonlyArray<ProjectSection> = [
  {
    id: 3,
    title: "מערכת ניהול נדל״ן",
    subtitle: "500M+ שקל בנכסים",
    description: "מערכת ניהול מקיפה עם CRM מותאם, חוזים דיגיטליים ודשבורד אנליטיקה.",
    gradient: "from-green-400/20 to-emerald-500/20",
    accentColor: "green-400"
  },
  {
    id: 1,
    title: "פלטפורמת E-commerce",
    subtitle: "50,000+ מוצרים",
    description: "פלטפורמת מסחר מלאה עם תשלומים מאובטחים, ניהול מלאי חכם ומערכת המלצות AI.",
    gradient: "from-cyan-400/20 to-blue-500/20",
    accentColor: "cyan-400"
  },
  {
    id: 2,
    title: "אפליקציית בריאות",
    subtitle: "10,000+ משתמשים פעילים",
    description: "אפליקציה לבריאות דיגיטלית עם וידאו קונפרנס מאובטח ומערכת תורים חכמה.",
    gradient: "from-purple-400/20 to-pink-500/20",
    accentColor: "purple-400"
  }
] as const;

export const SECTION_TITLE = "הפרויקטים שלנו" as const;

export const SECTION_SUBTITLE = "פתרונות דיגיטליים מתקדמים שיצרנו עבור לקוחותינו" as const;

export const VIEW_MORE_TEXT = "ראה עוד" as const;

export const VIEW_MORE_PROJECTS_TEXT = "ראה עוד פרויקטים" as const;

export const HERO_IMAGE_PATH = "/assets/images/hero/hero1.png" as const;
