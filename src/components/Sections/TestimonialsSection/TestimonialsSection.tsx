'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS_DATA } from './constants';

/**
 * Testimonials section with continuous carousels
 * Features glass-morphism cards in smooth sliding animation
 */
function TestimonialsSection() {
  // Language context
  const { t } = useLanguage();
  
  // State for animations
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Use testimonials data from constants
  const testimonialsData = TESTIMONIALS_DATA;

  // Intersection Observer for title animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="testimonials" 
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl"
      dir="rtl"
      role="region"
      aria-label={t('testimonials.sectionAriaLabel')}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <h2 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out text-center ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir="rtl"
          >
            {t('testimonials.title')}
          </h2>
        </div>

        {/* First Continuous Testimonials Carousel */}
        <div className="relative overflow-hidden mb-8">
          {/* Left shadow */}
          <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none"></div>
          {/* Right shadow */}
          <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll-ltr gap-6" style={{animationDelay: '0s'}}>
            {[...testimonialsData, ...testimonialsData].map((testimonial, index) => (
              <div key={`ltr-${testimonial.id}-${index}`} className="flex-shrink-0">
                <TestimonialCard 
                  testimonial={testimonial}
                  language="he"
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Continuous Testimonials Carousel (Reverse Direction) */}
        <div className="relative overflow-hidden">
          {/* Left shadow */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none"></div>
          {/* Right shadow */}
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll-rtl gap-6" style={{animationDelay: '0s'}}>
            {[...testimonialsData.slice().reverse(), ...testimonialsData.slice().reverse()].map((testimonial, index) => (
              <div key={`rtl-${testimonial.id}-${index}`} className="flex-shrink-0">
                <TestimonialCard 
                  testimonial={testimonial}
                  language="he"
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
      