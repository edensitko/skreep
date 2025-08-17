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
    className="px-10 transition-all duration-300 border py-9 bg-white/5 rounded-xl border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 flex-shrink-0 w-[398px] mr-[30px]"
    role="article"
    aria-label={`${t('testimonials.testimonialAriaLabel')}${testimonial.name}`}
  >
    <div className="flex items-center gap-5">
      <div 
        className="w-[46px] h-[46px] rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white text-xl"
        aria-hidden="true"
      >
        {testimonial.image}
      </div>
      <div>
        <div className="flex flex-col" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <span className="font-semibold text-white text-lg font-inter">
            {testimonial.name}
          </span>
          <span className="text-sm font-normal text-white/50">
            {testimonial.title}
          </span>
          {testimonial.company && (
            <span className="text-xs text-white/40">
              {testimonial.company}
            </span>
          )}
        </div>
      </div>
    </div>
    <blockquote className="pt-6 text-white/70 leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
      {testimonial.text}
    </blockquote>
  </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
