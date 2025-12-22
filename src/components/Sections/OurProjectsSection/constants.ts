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
    gradient: "from-blue-400/20 to-purple-500/20",
    accentColor: "blue-400",
    slug: "property-management-system",
    image: "/assets/images/projects/1.png"
  },
  {
    id: 1,
    title: "פלטפורמת E-commerce",
    subtitle: "50,000+ מוצרים",
    description: "פלטפורמת מסחר מלאה עם תשלומים מאובטחים, ניהול מלאי חכם ומערכת המלצות AI.",
    gradient: "from-cyan-400/20 to-blue-500/20",
    accentColor: "cyan-400",
    slug: "ecommerce-platform",
    image: "/assets/images/projects/1.png"
  },
  {
    id: 2,
    title: "apl",
    subtitle: "10,000+ משתמשים פעילים",
    description: "אפליקציה לבריאות דיגיטלית עם וידאו קונפרנס מאובטח ומערכת תורים חכמה.",
    gradient: "from-gray-400/20 to-pink-500/20",
    accentColor: "gray-400",
    slug: "health-app",
    image: "/assets/images/projects/1.png"
  }
] as const;

export const SECTION_TITLE = "הפרויקטים שלנו" as const;

export const SECTION_SUBTITLE = "פתרונות דיגיטליים מתקדמים שיצרנו עבור לקוחותינו" as const;

export const VIEW_MORE_TEXT = "ראה עוד" as const;

export const VIEW_MORE_PROJECTS_TEXT = "ראה עוד פרויקטים" as const;

