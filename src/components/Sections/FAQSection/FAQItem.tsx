import React, { memo } from 'react';
import type { FAQItemProps } from './types';

interface FAQItemPropsWithLanguage extends Omit<FAQItemProps, 'faq'> {
  faq: {
    id: number;
    question: string;
    answer: string;
  };
  language: string;
}

/**
 * Memoized FAQ item component with smooth expand/collapse animation
 */
const FAQItem = memo<FAQItemPropsWithLanguage>(({ faq, index, isOpen, onToggle, language }) => (
  <div 
    className={`group relative p-6 md:p-8 border border-white/10 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 cursor-pointer animate-fadeInUp ${
      isOpen 
        ? 'border-cyan-400/40 bg-gradient-to-br from-black/30 via-black/10 to-white/5 before:opacity-70 after:opacity-40' 
        : ''
    }`}
    onClick={() => onToggle(faq.id)}
    style={{
      animationDelay: `${index * 100}ms`
    }}
    role="button"
    aria-expanded={isOpen}
    aria-controls={`faq-answer-${faq.id}`}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(faq.id);
      }
    }}
  >
    {/* Question Header */}
    <div className="flex items-center justify-between w-full relative z-10">
      <h3 
        className={`font-semibold text-white text-lg md:text-xl flex-1 leading-relaxed ${
          language === 'he' ? 'pr-4 text-right' : 'pl-4 text-left'
        }`}
        dir={language === 'he' ? 'rtl' : 'ltr'}
        id={`faq-question-${faq.id}`}
      >
        {faq.question}
      </h3>
      <div 
        className={`w-8 h-8 flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 transition-all duration-300 flex-shrink-0 ${
          isOpen ? 'rotate-180 bg-cyan-400/20 border-cyan-400/50' : 'group-hover:bg-cyan-400/15'
        }`}
        aria-hidden="true"
      >
        <svg 
          width="16" 
          height="10" 
          viewBox="0 0 19 10" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300"
        >
          <path 
            d="M2 2L9.5 8L17 2" 
            stroke="#22d3ee" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    {/* Answer Content */}
    <div 
      className={`transition-all duration-500 overflow-hidden relative z-10 ${
        isOpen 
          ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-white/10' 
          : 'max-h-0 opacity-0 mt-0'
      }`}
      id={`faq-answer-${faq.id}`}
      aria-labelledby={`faq-question-${faq.id}`}
      role="region"
    >
      <p className={`text-white/80 leading-relaxed text-base md:text-lg ${
        language === 'he' ? 'text-right' : 'text-left'
      }`} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {faq.answer}
      </p>
    </div>
  </div>
));

FAQItem.displayName = 'FAQItem';

export default FAQItem;
