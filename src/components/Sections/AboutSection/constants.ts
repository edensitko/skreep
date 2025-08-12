import type { AboutContent } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const ABOUT_CONTENT: AboutContent = {
  title: "קצת עלינו",
  heading: "בית תוכנה מוביל",
  description: "מוגדרים על ידי דינמיות דיגיטלית, סוכנות השיווק הדיגיטלית שלנו מתבלטת כמגדלור של חדשנות ויכולת אסטרטגית.\n\nאנחנו אוהבים להפוך את הידע והבנתה שלנו למשהו שיעזור לכם להצלחה.\n\nאנחנו מאמינים ביכולת האתגר והשינוי להפוך את העולם ליעילה יותר.",
  buttonText: "קרא עוד"
} as const;

export const ABOUT_IMAGE = {
  src: "./assets/images/logo-2.png",
  alt: "about main image",
  width: 500,
  height: 400
} as const;
