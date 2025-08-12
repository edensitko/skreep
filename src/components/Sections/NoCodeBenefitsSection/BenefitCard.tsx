'use client';

import React, { memo } from 'react';
import { ANIMATION_CONFIG } from './constants';
import { getBenefitCardClasses, getArrowClasses, getArrowBorderClasses } from './utils';
import type { BenefitCardProps } from './types';

/**
 * Memoized benefit card component with animations and responsive design
 */
const BenefitCard = memo<BenefitCardProps>(({ 
  benefit, 
  index, 
  isVisible, 
  isHydrated,
  className = '' 
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`w-full ${
      // Mobile: right padding for timeline, Desktop: alternating layout
      'pr-16 md:w-5/12 md:' + (isEven ? 'pr-8' : 'pl-8')
    } ${className}`}>
      <div 
        className={getBenefitCardClasses(index, isVisible, isHydrated)}
        style={{
          transitionDelay: `${index * ANIMATION_CONFIG.itemDelay + 100}ms`
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${benefit.bgImage})`
          }}
          aria-hidden="true"
        />

        {/* Gradient Border Glow */}
        <div 
          className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-xl`}
          aria-hidden="true"
        />
          
        {/* Card Content */}
        <div className="relative z-10 bg-black/10 rounded-2xl p-4 group-hover:bg-black/30 transition-all duration-700">
          <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 group-hover:text-cyan-400 transition-colors duration-500">
            {benefit.title}
          </h3>
          
          <p className="text-gray-300 leading-relaxed text-base md:text-lg group-hover:text-white transition-colors duration-500">
            {benefit.description}
          </p>
          
          {/* Desktop Arrow Indicator */}
          <div className={getArrowClasses(index)}>
            <div className={getArrowBorderClasses(index)} />
          </div>
        </div>
      </div>
    </div>
  );
});

BenefitCard.displayName = 'BenefitCard';

export default BenefitCard;
