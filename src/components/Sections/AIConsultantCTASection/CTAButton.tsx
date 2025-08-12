'use client';

import React, { memo } from 'react';
import { CTA_CONTENT, ANIMATION_CONFIG } from './constants';
import { getButtonClasses, getAnimationClasses } from './utils';
import type { CTAButtonProps, AnimationState } from './types';

interface CTAButtonWithAnimationProps extends CTAButtonProps {
  animationState: AnimationState;
}

/**
 * Memoized CTA Button component with animation support
 */
const CTAButton = memo<CTAButtonWithAnimationProps>(({ 
  onClick, 
  animationState,
  className = '',
  disabled = false 
}) => {
  const { mounted, isVisible, isHovered } = animationState;
  
  return (
    <div 
      className={`relative transition-all duration-800 ${getAnimationClasses(mounted, isVisible)} ${className}`} 
      style={{ animationDelay: ANIMATION_CONFIG.buttonDelay }}
    >
      <button 
        onClick={onClick}
        disabled={disabled}
        className={getButtonClasses(isHovered)}
        aria-label={CTA_CONTENT.ariaLabel}
        type="button"
      >
        {CTA_CONTENT.buttonText}
      </button>
    </div>
  );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;
