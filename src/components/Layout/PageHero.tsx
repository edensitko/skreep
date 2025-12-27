'use client';

import React, { useState, useRef, useEffect } from 'react';
import RippleGrid from '@/components/Hero/RippleGrid';
import { useUserType } from '@/hooks/useGlobalUserType';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  language?: 'he' | 'en';
}

const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { userType } = useUserType();

  // Color based on user type
  const rippleColor = userType === 'entrepreneurs' ? '#22C55E' : '#00ffff';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => { if (titleRef.current) observer.unobserve(titleRef.current); };
  }, []);

  return (
    <section className="relative min-h-[250px] pt-32 pb-2 px-4 overflow-hidden">
      {/* RippleGrid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <RippleGrid
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor={rippleColor}
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={40}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]"></div>

      <div className="container mx-auto text-center relative z-10">
        <h1
          ref={titleRef}
          className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
