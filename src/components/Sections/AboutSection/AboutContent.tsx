import React, { memo } from 'react';

type Language = 'he' | 'en';

interface AboutContentProps {
  title: string;
  heading: string;
  description: string;
  buttonText: string;
  isVisible: boolean;
  language: Language;
}

/**
 * Memoized about content component with animated title
 */
const AboutContent = memo<AboutContentProps>(({ title, heading, description, buttonText, isVisible, language }) => (
  <div className="about-article-area z-10 order-2 xl:order-2 mt-8 xl:mt-0">
    <div className="mx-auto max-w-full px-4 md:px-0">
      {/* Animated Title */}
      <h1 
        className={`font-bold mb-6 lg:mb-10 ${language === 'he' ? 'text-center md:text-right' : 'text-center md:text-left'} bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-4xl xl:text-5xl leading-tight tracking-wide transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`} 
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        {title}
      </h1>

      {/* Main Heading */}
      <h2 
        className="font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-xl md:text-2xl lg:text-4xl xl:text-5xl mb-4 leading-tight tracking-wide text-center" 
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        {heading}
      </h2>
      
      {/* Description */}
      <div className={`text-white/90 mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-center ${language === 'he' ? 'md:text-right' : 'md:text-left'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {description.split('\n\n').map((paragraph, index) => (
          <p key={index} className={index > 0 ? 'mt-4' : ''}>
            {paragraph}
          </p>
        ))}
      </div>
      
      {/* CTA Button */}
      <div className={`flex justify-center ${language === 'he' ? 'md:justify-end' : 'md:justify-start'}`}>
        <button 
          className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base" 
          dir={language === 'he' ? 'rtl' : 'ltr'}
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
));

AboutContent.displayName = 'AboutContent';

export default AboutContent;
