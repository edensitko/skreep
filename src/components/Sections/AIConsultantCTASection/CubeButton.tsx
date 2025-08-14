'use client';

import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CubeButtonProps {
  onClick: () => void;
  variant: 'primary' | 'secondary';
  language: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Cube-style button with 3D border effect
 */
const CubeButton = memo<CubeButtonProps>(({ 
  onClick, 
  variant,
  language,
  className = '',
  disabled = false 
}) => {
  const { t } = useLanguage();
  
  const isPrimary = variant === 'primary';
  const buttonText = isPrimary ? t('aiConsultantCTA.primaryButtonText') : t('aiConsultantCTA.secondaryButtonText');
  const ariaLabel = isPrimary ? t('aiConsultantCTA.primaryAriaLabel') : t('aiConsultantCTA.secondaryAriaLabel');
  
  const baseClasses = `
    relative group cursor-pointer transition-all duration-300 ease-out
    transform hover:scale-105 active:scale-95
    ${className}
  `;
  
  const cubeClasses = isPrimary 
    ? `
      bg-gradient-to-br from-cyan-500/20 to-blue-600/20 
      border-2 border-cyan-400/50 
      hover:border-cyan-300 hover:from-cyan-400/30 hover:to-blue-500/30
      shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30
    `
    : `
      bg-gradient-to-br from-purple-500/20 to-pink-600/20 
      border-2 border-purple-400/50 
      hover:border-purple-300 hover:from-purple-400/30 hover:to-pink-500/30
      shadow-lg shadow-purple-500/20 hover:shadow-purple-400/30
    `;

  return (
    <div className={baseClasses}>
      {/* 3D Cube Effect */}
      <div className="relative">
        {/* Top face */}
        <div 
          className={`
            absolute -top-2 -left-2 w-full h-full rounded-xl
            ${isPrimary ? 'bg-cyan-400/10 border border-cyan-400/30' : 'bg-purple-400/10 border border-purple-400/30'}
            transform -translate-x-1 -translate-y-1
            transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2
          `}
        />
        
        {/* Right face */}
        <div 
          className={`
            absolute -top-1 -right-1 w-full h-full rounded-xl
            ${isPrimary ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-purple-500/10 border border-purple-500/30'}
            transform translate-x-1 -translate-y-1
            transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2
          `}
        />
        
        {/* Main button face */}
        <button
          onClick={onClick}
          disabled={disabled}
          className={`
            relative z-10 w-full px-8 py-4 rounded-xl
            font-semibold text-lg text-white
            transition-all duration-300
            backdrop-blur-sm
            ${cubeClasses}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label={ariaLabel}
          type="button"
          dir={language === 'he' ? 'rtl' : 'ltr'}
        >
          <span className="relative z-10">
            {buttonText}
          </span>
          
          {/* Inner glow effect */}
          <div 
            className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              ${isPrimary ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20' : 'bg-gradient-to-r from-purple-400/20 to-pink-500/20'}
            `}
          />
        </button>
      </div>
    </div>
  );
});

CubeButton.displayName = 'CubeButton';

export default CubeButton;
