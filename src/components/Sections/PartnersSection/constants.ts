import { Autoplay, Pagination } from 'swiper/modules';
import type { Partner, SwiperConfig } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const PARTNERS_DATA: ReadonlyArray<Partner> = [
  { id: 1, src: "/assets/images/6.png", alt: "Partner 1" },
  { id: 2, src: "/assets/images/5.png", alt: "Partner 2" },
  { id: 3, src: "/assets/images/4.png", alt: "Partner 3" },
  { id: 4, src: "/assets/images/3.png", alt: "Partner 4" },
  { id: 5, src: "/assets/images/2.png", alt: "Partner 5" },
  { id: 6, src: "/assets/images/6.png", alt: "Partner 6" },
  { id: 7, src: "/assets/images/4.png", alt: "Partner 7" },
  { id: 8, src: "/assets/images/3.png", alt: "Partner 8" },
] as const;

export const SWIPER_CONFIG: SwiperConfig = {
  slidesPerView: 6,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  allowTouchMove: true,
  touchStartPreventDefault: false,
  breakpoints: {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
} as const;

export const SWIPER_MODULES = [Autoplay, Pagination];

export const SECTION_TITLE = "חלק מהצלחות שלנו" as const;

export const TAP_TIMEOUT_DURATION = 1000 as const;
