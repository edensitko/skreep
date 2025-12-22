'use client';

import React, { memo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Language = 'he' | 'en';

interface AboutContentProps {
  title: string;
  heading: string;
  description: string;
  buttonText: string;
  isVisible: boolean;
  language: Language;
}

interface TypingEffectProps {
  text: string;
  isVisible: boolean;
  delay?: number;
  speed?: number;
  className?: string;
  dir?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, isVisible, delay = 0, speed = 0, className = '', dir }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible || !elementRef.current) return;

    let lastScrollY = window.scrollY;
    let accumulatedScroll = 0;
    const scrollPerCharacter = 2; // Pixels of scroll needed per character

    const updateTypingProgress = () => {
      const element = elementRef.current;
      if (!element) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Accumulate or reduce scroll based on direction when element is in view
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down - add characters
          accumulatedScroll += scrollDelta;
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - remove characters
          accumulatedScroll = Math.max(0, accumulatedScroll - scrollDelta);
        }
      }

      lastScrollY = currentScrollY;

      // Calculate how many characters should be shown based on accumulated scroll
      const targetIndex = Math.min(text.length, Math.floor(accumulatedScroll / scrollPerCharacter));

      setCurrentIndex(targetIndex);
      setDisplayedText(text.slice(0, targetIndex));
    };

    // Initial calculation
    updateTypingProgress();

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateTypingProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, text]);

  const progress = text.length > 0 ? currentIndex / text.length : 0;

  return (
    <span ref={elementRef} className={`${className} transition-all duration-300`} dir={dir}>
      <span style={{ color: 'rgb(255 255 255 / 70%)' }}>
        {displayedText}
        <span style={{ color: 'rgb(50 50 50/70%)' }}>
          {text.slice(currentIndex)}
        </span>
      </span>
    </span>
  );
};

/**
 * Memoized about content component with animated title
 */
const AboutContent = memo<AboutContentProps>(({ title, heading, description, buttonText, isVisible, language }) => (
  <div className="about-article-area z-10 order-2 xl:order-2 mt-8 xl:mt-0">
    <div className="mx-auto max-w-full px-4 md:px-0">
      {/* Animated Title */}
      <h1
        className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
          }`}
        dir={language === 'he' ? 'rtl' : 'ltr'}
        style={{ textAlign: 'center' }}
      >
        {title}
      </h1>

      {/* Description */}
      <div className={`mb-4 font-semibold text-lg md:text-lg lg:text-xl xl:text-2xl leading-relaxed ${language === 'he' ? 'text-center md:text-right' : 'text-left'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {description.split('\n\n').map((paragraph, index) => (
          <p key={index} className={`${index > 0 ? 'mt-4' : ''}`}>
            <TypingEffect
              text={paragraph}
              isVisible={isVisible}
              delay={0}
              speed={20}
              dir={language === 'he' ? 'rtl' : 'ltr'}
            />
          </p>
        ))}
      </div>

      {/* CTA Button */}
      <div className={`flex w-full justify-start relative z-50`}>
        <Link
          href="/about"
          className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base hover:scale-105 relative z-50"
          dir={language === 'he' ? 'rtl' : 'ltr'}
          aria-label={buttonText}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  </div>
));

AboutContent.displayName = 'AboutContent';

export default AboutContent;
