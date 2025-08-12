// ============================================================================
// PARTNERS SECTION - BARREL EXPORTS
// ============================================================================

export { default } from './PartnersSection';
export { default as PartnerSlide } from './PartnerSlide';
export type { 
  Partner, 
  PartnerSlideProps, 
  SwiperConfig 
} from './types';
export { 
  PARTNERS_DATA, 
  SWIPER_CONFIG, 
  SWIPER_MODULES, 
  SECTION_TITLE, 
  TAP_TIMEOUT_DURATION 
} from './constants';
export { handlePartnerInteraction, cleanupTimeout } from './utils';
