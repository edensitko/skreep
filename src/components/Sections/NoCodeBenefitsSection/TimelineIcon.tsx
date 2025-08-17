'use client';

import React, { memo } from 'react';
import { ANIMATION_CONFIG } from './constants';
import { getTimelineIconClasses } from './utils';
import type { Benefit } from './types';

interface TimelineIconProps {
  benefit: Benefit;
  index: number;
  isVisible: boolean;
  isHydrated: boolean;
  className?: string;
}

/**
 * Memoized timeline icon component with gradient and animations
 */
const TimelineIcon = memo<TimelineIconProps>(({ 
  benefit, 
  index, 
  isVisible, 
  isHydrated,
  className = '' 
}) => {
  return (
    <div className={`absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 flex flex-col items-center ${className}`}>
      {/* Timeline Line */}
      <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-24 md:h-32 bg-gradient-to-b from-cyan-400/50 to-purple-400/30" />
      
      {/* Icon Circle */}
      <div 
        className={`hidden md:flex ${getTimelineIconClasses(index, isVisible, isHydrated, benefit.gradient)}`}
        style={{
          transitionDelay: `${index * ANIMATION_CONFIG.itemDelay}ms`
        }}
      >
        {benefit.icon}
      </div>
      
      {/* Glow Effect */}
      <div 
        className={`hidden md:block absolute inset-0 rounded-full bg-gradient-to-r ${benefit.gradient} opacity-20 blur-xl transition-all duration-1000 ${
          isHydrated && isVisible ? 'scale-150' : 'scale-0'
        }`}
        style={{
          transitionDelay: `${index * ANIMATION_CONFIG.itemDelay + ANIMATION_CONFIG.iconDelay}ms`
        }}
        aria-hidden="true"
      />
    </div>
  );
});

TimelineIcon.displayName = 'TimelineIcon';

export default TimelineIcon;
