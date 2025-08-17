'use client';

import React, { useMemo, memo, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useLanguage } from '@/contexts/LanguageContext';

// TypeScript interface for testimonial data
interface TestimonialData {
  id: number;
  name: string;
  title: string;
  company: string;
  rating: number;
  text: string;
}

/**
 * Testimonials section with infinite carousel
 * Features glass-morphism cards in smooth sliding animation
 */
function TestimonialsSection() {
  // Language context
  const { language, t } = useLanguage();
  
  // State for animations
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Get testimonials data from translations with fallback
  const testimonialsData = useMemo((): TestimonialData[] => {
    try {
      const data = t('testimonials.data');
      // Ensure data is an array and has the correct structure
      if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
        return (data as TestimonialData[]);
      }
      // If not an array or empty, use fallback
      throw new Error('Invalid testimonials data format');
    } catch {
      // Fallback data if translation fails
      return language === 'he' ? [
        {
          id: 1,
          name: "מתיו ב. לאו",
          title: "מנהל ומייסד",
          company: "טכנולוגיות חדשניות",
          rating: 5,
          text: "העבודה עם \"סקריפ\" הייתה פריצת דרך עבור המותג שלנו. הגישה החדשנית שלהם ותשומת הלב לפרטים עזרו לנו לשדרג את השיווק שלנו באופן משמעותי."
        },
        {
          id: 2,
          name: "שרה כהן",
          title: "מנהלת מוצר",
          company: "סטארט-אפ טק",
          rating: 5,
          text: "הפתרונות של סקריפ חסכו לנו חודשים של פיתוח. הצוות המקצועי והמסור שלהם הפך את החלום שלנו למציאות."
        },
        {
          id: 3,
          name: "דוד לוי",
          title: "מייסד",
          company: "חברת ייעוץ",
          rating: 5,
          text: "התוצאות מדברות בעד עצמן - עלייה של 300% בהמרות ושיפור משמעותי בחוויית המשתמש. מומלץ בחום!"
        },
        {
          id: 4,
          name: "רחל אברהם",
          title: "מנכ\"לית",
          company: "חברת פיננסים",
          rating: 5,
          text: "סקריפ הביאו לנו פתרונות יצירתיים שלא חשבנו עליהם. הם הצליחו להגדיל את המכירות שלנו ב-250% תוך 6 חודשים."
        },
        {
          id: 5,
          name: "אמיר שלום",
          title: "מנהל שיווק",
          company: "חברת אי-קומרס",
          rating: 5,
          text: "הגישה המקצועית והיצירתית של הצוות הפכה את האתר שלנו לכלי מכירות חזק. ממליץ מאוד!"
        },
        {
          id: 6,
          name: "מיכל רוזן",
          title: "מייסדת",
          company: "סטודיו עיצוב",
          rating: 5,
          text: "עבודה מעולה! סקריפ הבינו בדיוק מה אנחנו צריכים והביאו תוצאות מעבר לציפיות."
        },
        {
          id: 7,
          name: "יוסי גולד",
          title: "מנהל פרויקטים",
          company: "חברת הייטק",
          rating: 5,
          text: "הפתרונות הטכנולוגיים שלהם חסכו לנו זמן יקר ועזרו לנו להשיק מוצרים מהר יותר לשוק."
        },
        {
          id: 8,
          name: "נועה בן דוד",
          title: "מנהלת פיתוח עסקי",
          company: "סטארט-אפ פינטק",
          rating: 5,
          text: "שירות מעולה ותוצאות מרשימות. הצוות של סקריפ באמת מבין את הצרכים של עסקים מודרניים."
        }
      ] : [
        {
          id: 1,
          name: "Matthew B. Law",
          title: "Manager & Founder",
          company: "Innovative Technologies",
          rating: 5,
          text: "Working with Skreep was a breakthrough for our brand. Their innovative approach and attention to detail helped us significantly upgrade our marketing."
        },
        {
          id: 2,
          name: "Sarah Cohen",
          title: "Product Manager",
          company: "Tech Startup",
          rating: 5,
          text: "Skreep's solutions saved us months of development. Their professional and dedicated team turned our dream into reality."
        },
        {
          id: 3,
          name: "David Levy",
          title: "Founder",
          company: "Consulting Company",
          rating: 5,
          text: "The results speak for themselves - a 300% increase in conversions and significant improvement in user experience. Highly recommended!"
        },
        {
          id: 4,
          name: "Rachel Abraham",
          title: "CEO",
          company: "Financial Services",
          rating: 5,
          text: "Skreep brought us creative solutions we hadn't thought of. They managed to increase our sales by 250% within 6 months."
        },
        {
          id: 5,
          name: "Amir Shalom",
          title: "Marketing Manager",
          company: "E-commerce Company",
          rating: 5,
          text: "The team's professional and creative approach turned our website into a powerful sales tool. Highly recommend!"
        },
        {
          id: 6,
          name: "Michelle Rosen",
          title: "Founder",
          company: "Design Studio",
          rating: 5,
          text: "Excellent work! Skreep understood exactly what we needed and delivered results beyond expectations."
        },
        {
          id: 7,
          name: "Joseph Gold",
          title: "Project Manager",
          company: "Tech Company",
          rating: 5,
          text: "Their technological solutions saved us valuable time and helped us launch products faster to market."
        },
        {
          id: 8,
          name: "Noa Ben David",
          title: "Business Development Manager",
          company: "Fintech Startup",
          rating: 5,
          text: "Excellent service and impressive results. The Skreep team truly understands the needs of modern businesses."
        }
      ];
    }
  }, [language, t]);

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

  // Swiper configuration for testimonials carousel (LTR)
  const swiperConfigLTR = {
    modules: [Autoplay],
    spaceBetween: 20,
    slidesPerView: 3,
    loop: true,
    autoplay: {
      delay: 10,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
      reverseDirection: false,
    },
    speed: 2000,
    grabCursor: true,
    centeredSlides: false,
    allowTouchMove: false,
    breakpoints: {
      480: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 36,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  };

  // Swiper configuration for testimonials carousel (RTL)
  const swiperConfigRTL = {
    modules: [Autoplay],
    spaceBetween: 20,
    slidesPerView: 3,
    loop: true,
    autoplay: {
      delay: 10,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
      reverseDirection: true,
    },
    speed: 5000,
    grabCursor: true,
    centeredSlides: false,
    allowTouchMove: false,
    breakpoints: {
      480: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 36,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  };

  return (
    <section 
      id="testimonials" 
      className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border-y border-white/10"
      dir={language === 'he' ? 'rtl' : 'ltr'}
      role="region"
      aria-label={t('testimonials.sectionAriaLabel')}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center justify-center">
          <h2 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out text-center ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-white/70 text-center max-w-2xl mx-auto" dir={language === 'he' ? 'rtl' : 'ltr'}>
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* First Testimonials Carousel (LTR) */}
        <Swiper
          {...swiperConfigLTR}
          className="testimonials-swiper overflow-visible "
          aria-label={t('testimonials.sectionAriaLabel')}
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div 
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:border-cyan-400/30 transition-all duration-300 hover:bg-black/30 h-full flex flex-col"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
            
                {/* Testimonial Text */}
                <blockquote className="text-white/90 text-xs leading-relaxed mb-4 flex-grow">
                  {testimonial.text}
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold text-sm truncate">{testimonial.name}</h4>
                    <p className="text-white/60 text-xs truncate">{testimonial.title}</p>
                    <p className="text-cyan-400/80 text-xs truncate">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Second Testimonials Carousel (RTL) */}
        <Swiper
          {...swiperConfigRTL}
          className="testimonials-swiper overflow-visible"
          aria-label={t('testimonials.sectionAriaLabel')}
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={`rtl-${testimonial.id}`}>
              <div 
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:border-cyan-400/30 transition-all duration-300 hover:bg-black/30 h-full flex flex-col"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
            
                {/* Testimonial Text */}
                <blockquote className="text-white/90 text-xs leading-relaxed mb-4 flex-grow">
                  {testimonial.text}
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold text-sm truncate">{testimonial.name}</h4>
                    <p className="text-white/60 text-xs truncate">{testimonial.title}</p>
                    <p className="text-cyan-400/80 text-xs truncate">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
