import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { TestimonialCardProps } from './types';

/**
 * Memoized testimonial card component
 * Displays individual testimonial with user info and text
 */
const TestimonialCard = memo<TestimonialCardProps>(({ testimonial, language }) => {
  const { t } = useLanguage();
  
  return (
  <div 
    className="px-6 md:px-10 transition-all duration-300 border py-6 md:py-9 bg-white/5 rounded-xl border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] h-[180px] md:h-[180px] mr-[20px] md:mr-[30px] flex flex-col justify-between"
    role="article"
    aria-label={`${t('testimonials.testimonialAriaLabel')}${testimonial.name}`}
  >
    <blockquote className="text-white/70 leading-relaxed flex-1 text-sm md:text-base overflow-hidden relative" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <span className={`text-8xl md:text-10xl text-white/5 absolute top-1/2 transform -translate-y-1/2 font-serif leading-none z-0 select-none pointer-events-none ${language === 'he' ? 'right-2 md:right-4' : 'left-2 md:left-4'}`}>&quot;</span>
      <span className="line-clamp-4 md:line-clamp-3 relative z-10">
        {testimonial.text}
      </span>
    </blockquote>
    <div className="flex items-center gap-3 md:gap-5 mt-3 md:mt-4">
   


        
      
      <div className="min-w-0 flex-1">
        <div className="flex flex-col" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <span className="font-semibold text-white text-base md:text-lg font-inter truncate">
            {testimonial.name}
          </span>
          <span className="text-xs md:text-sm font-normal text-white/50 truncate">
            {testimonial.title}
          </span>
          {testimonial.company && (
            <span className="text-xs text-white/40 truncate">
              {testimonial.company}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
