'use client';

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import PartnerSlide from './PartnerSlide';
import { 
  PARTNERS_DATA, 
  SWIPER_CONFIG, 
  SWIPER_MODULES, 
  TAP_TIMEOUT_DURATION 
} from './constants';
import { handlePartnerInteraction, cleanupTimeout } from './utils';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Partners section with interactive slider showcasing company partnerships
 * Features responsive design and touch-friendly interactions
 */
function PartnersSection() {
  // ============================================================================
  // HOOKS
  // ============================================================================
  
  const { language, t } = useLanguage();
  
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [isVisible, setIsVisible] = useState(false);
  const [activeTappedPartner, setActiveTappedPartner] = useState<number | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handlePartnerTap = useCallback((partnerId: number, event: React.MouseEvent | React.TouchEvent) => {
    handlePartnerInteraction(
      partnerId, 
      event, 
      setActiveTappedPartner, 
      tapTimeoutRef, 
      TAP_TIMEOUT_DURATION
    );
  }, []);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      cleanupTimeout(tapTimeoutRef);
    };
  }, []);

  return (
    <section 
      className="relative overflow-hidden pt-10 w-[100%] mx-auto bg-gradient-to-br"
      role="region"
      aria-label={t('partners.ariaLabel')}
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-full px-0">
        {/* Header */}
        <div className="relative z-20 mb-8 md:mb-12">
          <h1 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ textAlign: 'center' }}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {t('partners.title') || 'חלק מהצלחות שלנו'}
          </h1>
        </div>
        
        {/* Partners Slider */}
        <Swiper
          modules={SWIPER_MODULES}
          {...SWIPER_CONFIG}
          className="overflow-hidden"
          aria-label={t('partners.listAriaLabel')}
        >
          {PARTNERS_DATA.map((partner) => (
            <SwiperSlide key={partner.id}>
              <PartnerSlide
                partner={partner}
                isActive={activeTappedPartner === partner.id}
                onTap={handlePartnerTap}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
   
      {/* Background Shapes */}
      <div className="w-full h-[550px] sm:h-[350px] md:h-[595px] overflow-hidden absolute left-0 -bottom-10 sm:-bottom-24 md:-bottom-[130px]" aria-hidden="true">
        <div className="line-shape w-full h-[1000px] bg-black "></div>
      </div>
      
      {/* Corner Shapes */}
      <div className="absolute z-10 shape-1 left-40 top-96 opacity-40" aria-hidden="true">
        <img src="/assets/images/img/1.png" alt="" />
      </div>
      <div className="absolute z-10 shape-2 right-96 top-96 opacity-40" aria-hidden="true">
        <img src="/assets/images/img/2.png" alt="" />
      </div>
      <div className="shape-3 absolute left-96 top-[550px] z-10 opacity-40" aria-hidden="true">
        <img src="/assets/images/img/3.png" alt="" />
      </div>
      <div className="shape-4 absolute right-96 top-[550px] z-10 opacity-40" aria-hidden="true">
        <img src="/assets/images/img/4.png" alt="" />
      </div>
    </section>
  );
}

export default memo(PartnersSection);
