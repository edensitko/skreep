'use client';

import React, { memo } from 'react';
import BenefitCard from './BenefitCard';
import TimelineIcon from './TimelineIcon';
import type { TimelineProps } from './types';

/**
 * Modern timeline component with glass-morphism design and enhanced animations
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
      {/* Enhanced Timeline Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Desktop Timeline Spine */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        
        {/* Mobile Timeline Spine - Right positioned for RTL */}
        <div className="md:hidden absolute right-6 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        
        {/* Desktop Glowing Progress Line */}
        <div 
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-cyan-400/80 via-purple-400/60 to-cyan-400/80 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        
        {/* Mobile Glowing Progress Line - Right positioned for RTL */}
        <div 
          className="md:hidden absolute right-6 top-0 w-1 bg-gradient-to-b from-cyan-400/80 via-purple-400/60 to-cyan-400/80 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        
        {/* Desktop Timeline Glow Effect */}
        <div 
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 w-8 bg-gradient-to-b from-cyan-400/20 via-purple-400/10 to-cyan-400/20 blur-xl transition-all duration-500 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
        
        {/* Mobile Timeline Glow Effect - Right positioned for RTL */}
        <div 
          className="md:hidden absolute right-6 top-0 w-8 bg-gradient-to-b from-cyan-400/20 via-purple-400/10 to-cyan-400/20 blur-xl transition-all duration-500 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
      
      {/* Timeline Items Container */}
      <div className="relative space-y-20 md:space-y-32">
        {benefits.map((benefit, index) => {
          const isEven = index % 2 === 0;
          const delay = index * 100; // Reduced from 200ms to 100ms for faster appearance
          
          return (
            <div 
              key={benefit.icon} 
              className="relative group"
              style={{ 
                transitionDelay: `${delay}ms` 
              }}
            >
              {/* Desktop Timeline Node Connection */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
                <div className={`w-6 h-6 rounded-full border-4 border-black bg-gradient-to-r ${benefit.gradient || 'from-cyan-400 to-purple-400'} shadow-lg transition-all duration-700 scale-100 opacity-100 shadow-[0_0_30px_rgba(34,211,238,0.5)]`} />
                
                {/* Node Pulse Effect */}
                <div className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${benefit.gradient || 'from-cyan-400 to-purple-400'} transition-all duration-1000 ${
                  visibleItems[index] ? 'animate-ping opacity-20' : 'opacity-0'
                }`} />
              </div>
              
              {/* Mobile Timeline Node Connection */}
              <div className="md:hidden absolute right-6 transform translate-x-1/2 top-6 z-20">
                <div className={`w-4 h-4 rounded-full border-2 border-black bg-gradient-to-r ${benefit.gradient || 'from-cyan-400 to-purple-400'} shadow-lg transition-all duration-700 scale-100 opacity-100 shadow-[0_0_20px_rgba(34,211,238,0.4)]`} />
              </div>

              {/* Enhanced Desktop Layout */}
              <div className="hidden md:flex items-center justify-center">
                {/* Content Container */}
                <div className={`w-full max-w-6xl mx-auto flex items-center ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  
                  {/* Benefit Card Side */}
                  <div className={`w-5/12 ${
                    isEven ? 'pr-16' : 'pl-16'
                  }`}>
                    <div className={`transform transition-all duration-1000 ease-out translate-x-0 opacity-100`}
                    style={{ transitionDelay: `${delay + 50}ms` }}
                    >
                      <BenefitCard
                        benefit={benefit}
                        index={index}
                        isVisible={visibleItems[index]}
                        isHydrated={isHydrated}
                      />
                    </div>
                  </div>
                  
                  {/* Spacer for timeline */}
                  <div className="w-2/12 flex justify-center">
                    {/* Timeline Icon */}
                    <div className={`transform transition-all duration-700 ${
                      visibleItems[index] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{ transitionDelay: `${delay + 25}ms` }}
                    >
                      <TimelineIcon
                        benefit={benefit}
                        index={index}
                        isVisible={visibleItems[index]}
                        isHydrated={isHydrated}
                      />
                    </div>
                  </div>
                  
                  {/* Empty side for balance */}
                  <div className="w-5/12" />
                </div>
              </div>
              
              {/* Enhanced Mobile Layout */}
              <div className="md:hidden">
                <div className="flex items-start pr-16 pl-4">
                  {/* Mobile Timeline Icon - Positioned over right timeline */}
                  <div className="absolute right-6 transform translate-x-1/2 top-2">
                    <div className={`transform transition-all duration-700 ${
                      visibleItems[index] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{ transitionDelay: `${delay + 25}ms` }}
                    >
                      <TimelineIcon
                        benefit={benefit}
                        index={index}
                        isVisible={visibleItems[index]}
                        isHydrated={isHydrated}
                      />
                    </div>
                  </div>
                  
                  {/* Mobile Benefit Card */}
                  <div className="flex-1">
                    <div className={`transform transition-all duration-1000 ease-out translate-x-0 opacity-100`}
                    style={{ transitionDelay: `${delay + 50}ms` }}
                    >
                      <BenefitCard
                        benefit={benefit}
                        index={index}
                        isVisible={visibleItems[index]}
                        isHydrated={isHydrated}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Enhanced Timeline End */}
      <div className="mt-24 mb-16 md:mb-24 relative z-10">
        {/* Timeline End with Checkmark - Positioned at timeline spine */}
        <div className="relative">
          {/* Position at timeline spine location */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div 
              className={`w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 shadow-2xl transition-all duration-1000 ${
                isHydrated && scrollProgress > 0.8 ? 'scale-100 opacity-100 shadow-[0_0_40px_rgba(34,211,238,0.6)]' : 'scale-0 opacity-0'
              }`}
            />
            
            {/* End Node Glow */}
            <div 
              className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 blur-xl transition-all duration-1000 ${
                isHydrated && scrollProgress > 0.8 ? 'scale-150 opacity-30' : 'scale-0 opacity-0'
              }`}
            />
            
            {/* Success Checkmark */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 delay-300 ${
                isHydrated && scrollProgress > 0.8 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          {/* Mobile version - positioned at right timeline */}
          <div className="md:hidden absolute right-6 transform translate-x-1/2">
            <div 
              className={`w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 shadow-xl transition-all duration-1000 ${
                isHydrated && scrollProgress > 0.8 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
            
            {/* Success Checkmark */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 delay-300 ${
                isHydrated && scrollProgress > 0.8 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* CTA Button - Centered */}
        <div className="flex justify-center mt-8 md:mt-12">
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isHydrated && scrollProgress > 0.8 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
          <button 
            className="group relative bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/20 rounded-2xl px-8 py-4 transition-all duration-500 hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-400/20 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 overflow-hidden"
            onClick={() => {
              // Scroll to contact section or open contact form
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                // Fallback: navigate to contact page
                window.location.href = '/contact';
              }
            }}
          >
            <span className="relative z-10 text-white font-semibold text-lg group-hover:text-cyan-100 transition-colors duration-300">
              המסע שלכם מתחיל כאן
            </span>
            
            {/* Button Icon */}
            <div className="relative z-10 inline-flex items-center mr-2">
              <svg 
                className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
