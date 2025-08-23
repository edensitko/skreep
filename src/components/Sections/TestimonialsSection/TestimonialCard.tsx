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
    <blockquote className="text-white/70 leading-relaxed flex-1 text-sm md:text-base overflow-hidden" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <span className="line-clamp-4 md:line-clamp-3">
        {testimonial.text}
      </span>
    </blockquote>
    <div className="flex items-center gap-3 md:gap-5 mt-3 md:mt-4">
      <div 
        className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center text-white text-lg md:text-xl flex-shrink-0"
        aria-hidden="true"
      >
    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="avatar" className="w-full h-full object-cover" />  


        
      </div>
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
