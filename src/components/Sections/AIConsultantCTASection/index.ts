// ============================================================================
// BARREL EXPORTS - AIConsultantCTASection
// ============================================================================

// Main component
export { default } from './AIConsultantCTASection';
export { default as AIConsultantCTASection } from './AIConsultantCTASection';

// Sub-components
export { default as CTAButton } from './CTAButton';
export { default as BackgroundEffects } from './BackgroundEffects';

// Types
export type {
  CTAButtonProps,
  AnimationState,
  BackgroundEffectsProps
} from './types';

// Constants
export {
  CTA_CONTENT,
  ANIMATION_CONFIG,
  LAYOUT_CONFIG,
  BACKGROUND_CONFIG
} from './constants';

// Utilities
export {
  createAnimationTimer,
  getAnimationClasses,
  getButtonClasses,
  getGridStyles
} from './utils';
