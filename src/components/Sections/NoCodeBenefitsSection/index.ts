// ============================================================================
// BARREL EXPORTS - NoCodeBenefitsSection
// ============================================================================

// Main component
export { default } from './NoCodeBenefitsSection';
export { default as NoCodeBenefitsSection } from './NoCodeBenefitsSection';

// Sub-components
export { default as BenefitCard } from './BenefitCard';
export { default as TimelineIcon } from './TimelineIcon';
export { default as Timeline } from './Timeline';

// Types
export type {
  Benefit,
  BenefitCardProps,
  TimelineProps,
  ScrollProgressProps,
  SectionState,
  UserType
} from './types';

// Constants
export {
  ENTREPRENEURS_BENEFITS,
  BUSINESS_BENEFITS,
  SECTION_CONTENT,
  ANIMATION_CONFIG,
  LAYOUT_CONFIG
} from './constants';

// Utilities
export {
  getBenefitsByUserType,
  calculateScrollProgress,
  shouldItemBeVisible,
  throttle,
  getBenefitCardClasses,
  getTimelineIconClasses,
  getArrowClasses,
  getArrowBorderClasses
} from './utils';

// Hooks
export {
  useSectionState,
  useScrollAnimations,
  useIntersectionAnimation,
  useBenefitsData,
  useHydration
} from './hooks';
