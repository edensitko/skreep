// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Benefit {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly gradient: string;
  readonly bgImage: string;
  readonly image: string;
}

export interface BenefitCardProps {
  benefit: Benefit;
  index: number;
  isVisible: boolean;
  isHydrated: boolean;
  className?: string;
}

export interface TimelineProps {
  benefits: readonly Benefit[];
  visibleItems: readonly boolean[];
  isHydrated: boolean;
  scrollProgress: number;
  className?: string;
}

export interface ScrollProgressProps {
  progress: number;
  className?: string;
}

export interface SectionState {
  readonly visibleItems: readonly boolean[];
  readonly scrollProgress: number;
  readonly isHydrated: boolean;
  readonly isVisible: boolean;
}

export type UserType = 'entrepreneurs' | 'business';
