// ============================================================================
// BARREL EXPORTS - InteractiveShowcaseSection
// ============================================================================

// Main component
export { default } from './InteractiveShowcaseSection';
export { default as InteractiveShowcaseSection } from './InteractiveShowcaseSection';

// Sub-components
export { default as ServiceCard } from './ServiceCard';
export { default as ServiceDetails } from './ServiceDetails';
export { default as ScrollControls } from './ScrollControls';

// Types
export type {
  ServiceCard as ServiceCardType,
  ServiceCardProps,
  ServiceDetailsProps,
  ScrollControlsProps,
  ShowcaseState,
  ScrollPosition
} from './types';

// Constants
export {
  SERVICES_DATA,
  SECTION_CONTENT,
  SCROLL_CONFIG,
  ANIMATION_CONFIG
} from './constants';

// Utilities
export {
  calculateScrollCapabilities,
  scrollLeft,
  scrollRight,
  createIntersectionObserver,
  getServiceCardClasses,
  getFeatureItemClasses
} from './utils';

// Hooks
export {
  useShowcaseState,
  useScrollContainer,
  useIntersectionAnimation
} from './hooks';
