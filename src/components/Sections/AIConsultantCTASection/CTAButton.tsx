'use client';

import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ANIMATION_CONFIG } from './constants';
import { getButtonClasses, getAnimationClasses } from './utils';
import type { CTAButtonProps, AnimationState } from './types';

interface CTAButtonWithAnimationProps extends CTAButtonProps {
  animationState: AnimationState;
  language: string;
}

/**
 * Memoized CTA Button component with animation support
 */
const CTAButton = memo<CTAButtonWithAnimationProps>(({ 
  onClick, 
  animationState,
  language,
  className = '',
  disabled = false 
}) => {
  const { t } = useLanguage();
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
        aria-label={t('aiConsultantCTA.ariaLabel')}
        type="button"
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        {t('aiConsultantCTA.buttonText')}
      </button>
    </div>
  );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;
