'use client';

import React, { memo } from 'react';
import { SECTION_CONTENT, ANIMATION_CONFIG } from './constants';
import { getFeatureItemClasses } from './utils';
import type { ServiceDetailsProps } from './types';

/**
 * Memoized service details component with features and description
 */
const ServiceDetails = memo<ServiceDetailsProps>(({ 
  service, 
  className = '' 
}) => {
  return (
    <div 
      className={`mt-12 w-[95%] mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-4xl before:absolute before:inset-0 before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden ${ANIMATION_CONFIG.transitionDuration} ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 p-8 ${className}`}
    >
      <div 
        key={service.id}   
        style={{ 
          backgroundImage: `url(${service.imageBg})`,
          backgroundSize: 'contain',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat' 
        }}
        className={`${ANIMATION_CONFIG.fadeInClass} relative z-10`}
      >
        {/* Header */}
        <div className="flex items-center gap-6 mb-8" dir="rtl">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {service.title}
            </h2>
            <p className="text-gray-300 text-lg">
              {service.description}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Description */}
          <div className="space-y-6" dir="rtl">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {SECTION_CONTENT.detailsTitle}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {service.longDescription}
              </p>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-6" dir="rtl">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {SECTION_CONTENT.featuresTitle}
              </h3>
              <div className="space-y-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={getFeatureItemClasses(service.color)}>
                      <svg 
                        className="w-4 h-4 text-white" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
});

ServiceDetails.displayName = 'ServiceDetails';

export default ServiceDetails;
