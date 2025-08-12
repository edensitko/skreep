import type { FooterLink } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const FOOTER_LINKS: ReadonlyArray<FooterLink> = [
  {
    href: "#",
    text: "מדיניות פרטיות"
  },
  {
    href: "#",
    text: "תנאי שימוש"
  }
] as const;

export const COPYRIGHT_TEXT = "2025 © כל הזכויות שמורות ל-סקריפ מערכות" as const;

export const WHATSAPP_URL = "https://wa.me/9725887744" as const;

export const SCROLL_THRESHOLD = 300 as const;
