'use client';

import React, { memo } from 'react';
import BenefitCard from './BenefitCard';
import TimelineIcon from './TimelineIcon';
import type { TimelineProps } from './types';

/**
 * Clean timeline component with alternating layout
 */
const Timeline = memo<TimelineProps>(({ 
  benefits, 
  visibleItems, 
  isHydrated, 
  scrollProgress,
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main Timeline Line */}
      <div className="absolute right-6 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 md:w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      
      {/* Progress Line */}
      <div 
        className="absolute right-6 md:left-1/2 md:transform md:-translate-x-1/2 top-0 w-1 md:w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400 transition-all duration-300 ease-out"
        style={{ height: `${scrollProgress * 100}%` }}
      />
      
      {/* Timeline Items */}
      <div className="space-y-16 md:space-y-24">
        {benefits.map((benefit, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={benefit.icon} 
              className="relative"
            >
              {/* Mobile Layout - Timeline on right */}
              <div className="md:hidden flex items-start gap-4 flex-row-reverse">
                <TimelineIcon
                  benefit={benefit}
                  index={index}
                  isVisible={visibleItems[index]}
                  isHydrated={isHydrated}
                />
                <BenefitCard
                  benefit={benefit}
                  index={index}
                  isVisible={visibleItems[index]}
                  isHydrated={isHydrated}
                />
              </div>

              {/* Desktop Layout - Wider Alternating */}
              <div className="hidden md:flex md:items-center md:relative md:max-w-7xl md:mx-auto">
                {/* Left side (even indices) */}
                <div className={`w-6/12 ${isEven ? 'flex justify-end pr-12' : ''}`}>
                  {isEven && (
                    <div className="max-w-lg">
                      <BenefitCard
                        benefit={benefit}
                        index={index}
                        isVisible={visibleItems[index]}
                        isHydrated={isHydrated}
                      />
                    </div>
                  )}
                </div>
                
                {/* Center icon */}
                <div className="flex-shrink-0 z-10 mx-4">
                  <TimelineIcon
                    benefit={benefit}
                    index={index}
                    isVisible={visibleItems[index]}
                    isHydrated={isHydrated}
                  />
                </div>
                
                {/* Right side (odd indices) */}
                <div className={`w-6/12 ${!isEven ? 'flex justify-start pl-12' : ''}`}>
                  {!isEven && (
                    <div className="max-w-lg">
                      <BenefitCard
                        benefit={benefit}
                        index={index}
                        isVisible={visibleItems[index]}
                        isHydrated={isHydrated}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Timeline End Decoration */}
      <div className="flex justify-center mt-16">
        <div 
          className={`w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-lg transition-all duration-1000 ${
            isHydrated && scrollProgress > 0.8 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
