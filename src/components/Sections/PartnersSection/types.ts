// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Partner {
  readonly id: number;
  readonly src: string;
  readonly alt: string;
}

export interface PartnerSlideProps {
  partner: Partner;
  isActive: boolean;
  onTap: (partnerId: number, event: React.MouseEvent | React.TouchEvent) => void;
}

export interface SwiperConfig {
  readonly slidesPerView: number;
  readonly spaceBetween: number;
  readonly loop: boolean;
  readonly autoplay: {
    readonly delay: number;
    readonly disableOnInteraction: boolean;
  };
  readonly allowTouchMove: boolean;
  readonly touchStartPreventDefault: boolean;
  readonly breakpoints: Record<number, {
    readonly slidesPerView: number;
    readonly spaceBetween: number;
  }>;
}
