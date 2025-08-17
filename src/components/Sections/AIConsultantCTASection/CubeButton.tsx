'use client';

import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CubeButtonProps {
  onClick: () => void;
  language: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Clean button with glass-morphism styling
 */
const CubeButton = memo<CubeButtonProps>(({ 
  onClick, 
  language,
  className = '',
  disabled = false 
}) => {
  const { t } = useLanguage();
  
  const buttonText = t('aiConsultantCTA.primaryButtonText');
  const ariaLabel = t('aiConsultantCTA.primaryAriaLabel');

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${className}
        px-8 md:px-8 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base
        bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60
        text-white border border-white/20 
        hover:border-cyan-400/50 hover:from-cyan-400/20 hover:via-cyan-400/40 hover:to-cyan-400/70
        transition-all duration-300 ease-out transform hover:scale-105 active:scale-95
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={ariaLabel}
      type="button"
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      {buttonText}
    </button>
  );
});

CubeButton.displayName = 'CubeButton';

export default CubeButton;
