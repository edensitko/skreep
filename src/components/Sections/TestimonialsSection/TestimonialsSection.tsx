'use client';

import React, { useEffect, useRef, useState, useMemo, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TestimonialCard from './TestimonialCard';
import { createSliderAnimation } from './utils';
import { SLIDER_CONFIG } from './constants';

/**
 * Main testimonials section component
 * Features dual sliding testimonial carousels with smooth animations
 */
function TestimonialsSection() {
  // Language context
  const { language, t } = useLanguage();
  
  // State and refs
  const slider1Ref = useRef<HTMLDivElement | null>(null);
  const slider2Ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Get testimonials data from translations with fallback
  const testimonialsData = useMemo(() => {
    try {
      const data = t('testimonials.data');
      return Array.isArray(data) ? data : [];
    } catch {
      // Fallback data if translation fails
      return language === 'he' ? [
        {
          id: 1,
          name: "מתיו ב. לאו",
          title: "מנהל ומייסד",
          company: "טכנולוגיות חדשניות",
          image: "👤",
          rating: 5,
          text: "העבודה עם \"סקריפ\" הייתה פריצת דרך עבור המותג שלנו. הגישה החדשנית שלהם ותשומת הלב לפרטים עזרו לנו לשדרג את השיווק שלנו באופן משמעותי."
        },
        {
          id: 2,
          name: "שרה כהן",
          title: "מנהלת מוצר",
          company: "סטארט-אפ טק",
          image: "👩",
          rating: 5,
          text: "הפתרונות של סקריפ חסכו לנו חודשים של פיתוח. הצוות המקצועי והמסור שלהם הפך את החלום שלנו למציאות."
        },
        {
          id: 3,
          name: "דוד לוי",
          title: "מייסד",
          company: "חברת ייעוץ",
          image: "👨",
          rating: 5,
          text: "התוצאות מדברות בעד עצמן - עלייה של 300% בהמרות ושיפור משמעותי בחוויית המשתמש. מומלץ בחום!"
        }
      ] : [
        {
          id: 1,
          name: "Matthew B. Law",
          title: "Manager & Founder",
          company: "Innovative Technologies",
          image: "👤",
          rating: 5,
          text: "Working with Skreep was a breakthrough for our brand. Their innovative approach and attention to detail helped us significantly upgrade our marketing."
        },
        {
          id: 2,
          name: "Sarah Cohen",
          title: "Product Manager",
          company: "Tech Startup",
          image: "👩",
          rating: 5,
          text: "Skreep's solutions saved us months of development. Their professional and dedicated team turned our dream into reality."
        },
        {
          id: 3,
          name: "David Levy",
          title: "Founder",
          company: "Consulting Company",
          image: "👨",
          rating: 5,
          text: "The results speak for themselves - a 300% increase in conversions and significant improvement in user experience. Highly recommended!"
        }
      ];
    }
  }, [language, t]);
  
  // Memoized duplicated testimonials for seamless loop
  const duplicatedTestimonials = useMemo(
    () => [...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData],
    [testimonialsData]
  );

  // Animation setup effect
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Start animations
      const cleanup1 = createSliderAnimation(slider1Ref, 1, SLIDER_CONFIG); // Move right
      const cleanup2 = createSliderAnimation(slider2Ref, -1, SLIDER_CONFIG); // Move left
      
      // Store cleanup functions for component unmount
      return () => {
        cleanup1?.();
        cleanup2?.();
      };
    }, 100);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
    };
  }, [mounted]);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <section 
        id="testimonials" 
        className="w-full overflow-hidden pb-16 md:pb-[130px] h4-testimonial-bg relative bg-black/30" 
        dir={language === 'he' ? 'rtl' : 'ltr'}
      >
        <div className="flex w-full justify-center items-center flex-col mb-[60px] px-4">
          <div className="animate-pulse bg-white/10 h-8 w-64 rounded mb-4"></div>
          <div className="animate-pulse bg-white/5 h-4 w-96 rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="testimonials" 
      className="w-full overflow-hidden pb-16 md:pb-[130px] h4-testimonial-bg relative bg-black/30" 
      dir={language === 'he' ? 'rtl' : 'ltr'}
      role="region"
      aria-label={t('testimonials.sectionAriaLabel')}
    >
      {/* Header */}
      <div className="flex w-full justify-center items-center flex-col mb-[60px] px-4">
        <h2 
          className="font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide"
          dir={language === 'he' ? 'rtl' : 'ltr'}
          style={{ textAlign: 'center' }}
        >
          {t('testimonials.title')}
        </h2>
        <p className="text-lg text-white/70 text-center max-w-2xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
          {t('testimonials.subtitle')}
        </p>
      </div>

      {/* First Slider - Moving Right */}
      <div className="swiper h4-testimonials_first_slider mb-[30px] overflow-hidden h-auto">
        <div 
          ref={slider1Ref}
          className="swiper-wrapper flex"
          style={{ 
            transitionDuration: '0ms',
            transform: 'translate3d(0px, 0px, 0px)'
          }}
          role="list"
          aria-label={t('testimonials.firstSliderAriaLabel')}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} testimonial={testimonial} index={index} language={language} />
          ))}
        </div>
      </div>

      {/* Second Slider - Moving Left */}
      <div className="swiper h4-testimonials_second_slider overflow-hidden mt-[30px] h-auto">
        <div 
          ref={slider2Ref}
          className="swiper-wrapper flex"
          style={{ 
            transitionDuration: '0ms',
            transform: 'translate3d(0px, 0px, 0px)'
          }}
          role="list"
          aria-label={t('testimonials.secondSliderAriaLabel')}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} testimonial={testimonial} index={index} language={language} />
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Decorative plus sign */}
        <div className="absolute top-20 right-20 text-white/20 text-4xl">+</div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
