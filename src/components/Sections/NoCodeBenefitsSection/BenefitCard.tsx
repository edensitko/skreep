'use client';

import React, { memo } from 'react';
import { ANIMATION_CONFIG } from './constants';
import type { BenefitCardProps } from './types';

/**
 * Modern benefit card with glass-morphism design and enhanced animations
 */
const BenefitCard = memo<BenefitCardProps>(({ 
  benefit, 
  index, 

  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div 
        className={`group relative bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 md:p-8 transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:border-white/30 hover:shadow-2xl hover:shadow-cyan-400/10 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-tl after:from-cyan-400/5 after:via-transparent after:to-purple-400/5 after:opacity-50 overflow-hidden opacity-100 translate-y-0 scale-100`}
        style={{
          transitionDelay: `${index * ANIMATION_CONFIG.itemDelay + 100}ms`
        }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* Background Image with better overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-30 transition-all duration-700 scale-110 group-hover:scale-105"
            style={{
              backgroundImage: `url(${benefit.bgImage})`
            }}
          />
          
          {/* Dynamic Gradient Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient || 'from-cyan-400/10 to-purple-400/10'} opacity-0 group-hover:opacity-30 transition-all duration-700`}
          />
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          </div>
        </div>
        
        {/* Enhanced Content */}
        <div className="relative z-10">
          {/* Icon Section */}
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500">
              <img 
                src={benefit.image || '/images/default-benefit.jpg'} 
                alt={benefit.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 leading-tight group-hover:text-cyan-100 transition-colors duration-500">
            {benefit.title}
          </h3>
          
          {/* Description */}
          <p className="text-white/70 text-base md:text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-500">
            {benefit.description}
          </p>
          
          {/* Hover Indicator */}
          <div className="mt-6 flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.gradient || 'from-cyan-400 to-purple-400'} mr-2`} />
            <span className="text-white/60 text-sm font-medium">לחץ לפרטים נוספים</span>
          </div>
        </div>
        
        {/* Enhanced Hover Effects */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
});

BenefitCard.displayName = 'BenefitCard';

export default BenefitCard;
