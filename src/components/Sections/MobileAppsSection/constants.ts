import type { MobileApp, PhoneDevice } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const MOBILE_APPS: ReadonlyArray<MobileApp> = [
  {
    id: 1,
    name: "אפליקציית ניהול תקציב",
    icon: "💰",
    color: "bg-orange-500"
  },
  {
    id: 2,
    name: "אפליקציית כושר",
    icon: "💪",
    color: "bg-green-500"
  },
  {
    id: 3,
    name: "אפליקציית תיכנון טיולים",
    icon: "✈️",
    color: "bg-blue-500"
  }
] as const;

export const PHONE_DEVICES: ReadonlyArray<PhoneDevice> = [
  {
    id: 1,
    className: "relative z-20",
    gradient: "from-gray-900 to-gray-800",
    zIndex: "z-20",
    opacity: "opacity-100",
    position: "relative"
  },
  {
    id: 2,
    className: "absolute -right-8 top-8 z-10 opacity-70",
    gradient: "from-pink-400 to-pink-600",
    zIndex: "z-10",
    opacity: "opacity-70",
    position: "absolute -right-8 top-8"
  },
  {
    id: 3,
    className: "absolute -left-12 top-16 z-0 opacity-50",
    gradient: "from-green-400 to-green-600",
    zIndex: "z-0",
    opacity: "opacity-50",
    position: "absolute -left-12 top-16"
  }
] as const;

export const SECTION_CONTENT = {
  title: "אפליקציות Mobile",
  description: "פיתוח אפליקציות מובייל חדשניות, המשלבות עיצוב מוקפד וחווית משתמש ידידותית ונוחה. באמצעות טכנולוגיית נו-קוד אנו יוצרים אפליקציות אינטואיטיביות המותאמות לצרכי המשתמשים והשוק.",
  examplesLabel: "דוגמאות:",
  ctaText: "למידע נוסף",
  ctaHref: "/mobile-apps",
  greeting: "היי מירית",
  subtitle: "איך אפשר לעזור לך היום?"
} as const;
