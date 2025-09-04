'use client';

import React, { memo } from 'react';
import { getServiceCardClasses } from './utils';
import { ANIMATION_CONFIG } from './constants';
import type { ServiceCardProps } from './types';

/**
 * Memoized service card component with interactive selection
 */
const ServiceCard = memo<ServiceCardProps>(({ 
  service, 
  isSelected, 
  onSelect, 
  className = '' 
}) => {
  const handleClick = () => {
    onSelect(service);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(service);
    }
  };

  return (
    <div
      className={`${getServiceCardClasses(isSelected)} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`בחר שירות: ${service.title}`}
    >
      {/* Service Icon/Gradient */}
      <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${service.color} rounded-2xl mb-4 md:mb-6 flex items-center justify-center`}>
        <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg"></div>
      </div>

      {/* Service Content */}
      <div className="space-y-3 md:space-y-4" >
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Selection Indicator */}
      <div className={`mt-4 md:mt-6 flex justify-center transition-opacity ${ANIMATION_CONFIG.hoverTransition} ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full`}></div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-4xl pointer-events-none"></div>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
