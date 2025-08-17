// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Testimonial {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly image: string;
  readonly text: string;
  readonly company?: string;
  readonly rating?: number;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  language: string;
}

export interface SliderConfig {
  readonly slideWidth: number;
  readonly slideMargin: number;
  readonly animationSpeed: number;
}
