import type { Stat } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const STATS_DATA: ReadonlyArray<Stat> = [
  {
    number: "5",
    suffix: "+",
    label: "שנות ניסיון",
    color: "text-main-black"
  },
  {
    number: "50",
    suffix: "+",
    label: " פרוייקטים מוצלחים",
    color: "text-main-black"
  },
  {
    number: "100",
    suffix: " %",
    label: " שביעות רצון",
    color: "text-main-black"
  }
] as const;

export const STATS_INFO = {
  description: "מוגדרים על ידי דינמיות דיגיטלית, סוכנות השיווק הדיגיטלית שלנו מתבלטת של ד ויכולת אסטרטגית.",
  buttonText: "למידע נוסף",
  buttonHref: "/"
} as const;