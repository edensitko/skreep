// ============================================================================
// FOOTER SECTION - BARREL EXPORTS
// ============================================================================

export { default } from './FooterSection';
export { default as ScrollButton } from './ScrollButton';
export { default as WhatsAppButton } from './WhatsAppButton';
export type { 
  FooterLink, 
  ScrollButtonProps, 
  SocialButtonProps 
} from './types';
export { 
  FOOTER_LINKS, 
  COPYRIGHT_TEXT, 
  WHATSAPP_URL, 
  SCROLL_THRESHOLD 
} from './constants';
export { scrollToTop, shouldShowScrollButton } from './utils';
