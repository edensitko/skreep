'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PricingPlan {
  id: string;
  name: string;
  nameEn: string;
  subtitle: string;
  subtitleEn: string;
  price: string;
  period: string;
  periodEn: string;
  features: string[];
  popular: boolean;
  gradient: string;
  buttonText: string;
  buttonTextEn: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'תוכנית בסיסית',
    nameEn: 'Basic Plan',
    subtitle: 'מושלמת לעסקים קטנים',
    subtitleEn: 'Perfect for small businesses',
    price: '₪299',
    period: 'לחודש',
    periodEn: 'per month',
    features: [
      'עד 1,000 שאילתות AI לחודש',
      'תמיכה בצ\'אטבוט בסיסי',
      'אינטגרציה עם אתר קיים',
      'דוחות ביצועים בסיסיים',
      'תמיכה טכנית במייל'
    ],
    popular: false,
    gradient: 'from-cyan-400 to-purple-400',
    buttonText: 'התחל עכשיו',
    buttonTextEn: 'Get Started'
  },
  {
    id: 'professional',
    name: 'תוכנית מקצועית',
    nameEn: 'Professional Plan',
    subtitle: 'הבחירה הטובה ביותר',
    subtitleEn: 'Best choice for growth',
    price: '₪599',
    period: 'לחודש',
    periodEn: 'per month',
    features: [
      'עד 5,000 שאילתות AI לחודש',
      'צ\'אטבוט מתקדם עם למידה',
      'אינטגרציה מלאה עם מערכות CRM',
      'דוחות מתקדמים וניתוח נתונים',
      'תמיכה טכנית 24/7',
      'הדרכה אישית'
    ],
    popular: true,
    gradient: 'from-cyan-400 to-purple-400',
    buttonText: 'בחר תוכנית',
    buttonTextEn: 'Choose Plan'
  },
  {
    id: 'enterprise',
    name: 'תוכנית ארגונית',
    nameEn: 'Enterprise Plan',
    subtitle: 'פתרון מותאם אישית',
    subtitleEn: 'Custom enterprise solution',
    price: 'מחיר לפי בקשה',
    period: '',
    periodEn: '',
    features: [
      'שאילתות AI ללא הגבלה',
      'פתרונות AI מותאמים אישית',
      'אינטגרציה מלאה עם כל המערכות',
      'ניתוח נתונים מתקדם ו-BI',
      'מנהל חשבון ייעודי',
      'הדרכות צוות מקיפות',
      'SLA מובטח'
    ],
    popular: false,
    gradient: 'from-cyan-400 to-purple-400',
    buttonText: 'צור קשר',
    buttonTextEn: 'Contact Us'
  }
];

export default function PricingCarouselSection() {
  const { language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(pricingPlans[1]); // Mobile carousel state
  const [currentSlide] = useState(1); // Start with Professional plan (second item)
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const isRTL = language === 'he';

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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  // Initialize carousel position to center Professional plan (index 1)
  useEffect(() => {
    const initializeCarousel = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const isLargeScreen = window.innerWidth >= 768;
        
        if (isLargeScreen) {
          // On desktop, scroll to show Professional plan (second card) prominently
          const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
          container.scrollTo({ left: cardWidth, behavior: 'auto' });
        } else {
          // On mobile, center the Professional plan
          const cardWidth = 256 + 16; // w-64 (256px) + gap-4 (16px)
          const containerWidth = container.clientWidth;
          const scrollPosition = cardWidth - (containerWidth / 2) + (cardWidth / 2);
          container.scrollTo({ left: scrollPosition, behavior: 'auto' });
        }
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initializeCarousel, 100);
    return () => clearTimeout(timer);
  }, []);

  
 

  // Desktop scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 312; // card width + gap
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 312; // card width + gap
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Update selected plan when slide changes
  useEffect(() => {
    setSelectedPlan(pricingPlans[currentSlide]);
  }, [currentSlide]);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden pt-10 w-[95%] mx-auto bg-gradient-to-br"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-full px-0">
        {/* Header */}
        <div className="text-center pt-16 pb-8 w-full">
          <h2 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ textAlign: 'center' }}
          >
            {isRTL ? 'תוכניות מחיר גמישות' : 'Flexible Pricing Plans'}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

            {/* Cards Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-4 md:gap-6 p-2 pl-[calc(50vw-12rem)] md:pl-2 pr-[calc(50vw-12rem)] md:pr-2 min-w-max">
              {pricingPlans.map((plan, index) => (
                <div
                  key={`${plan.id}-${index}`}
                  data-plan-id={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`flex-shrink-0 w-72 lg:w-80 h-96 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer group transition-all duration-300 hover:scale-90 relative overflow-hidden ${
                    selectedPlan?.id === plan.id
                      ? 'opacity-100 border-white/80 shadow-lg'
                      : 'opacity-70 border-white/20 hover:border-white/30 hover:opacity-90'
                  }`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 rounded-2xl"></div>
                  
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                        {isRTL ? 'הכי פופולרי' : 'Most Popular'}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Plan Name */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                        {isRTL ? plan.name : plan.nameEn}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {isRTL ? plan.subtitle : plan.subtitleEn}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {plan.price}
                      </div>
                      <div className="text-white/60 text-sm">
                        {isRTL ? plan.period : plan.periodEn}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex-1 mb-6">
                      <ul className="space-y-2">
                        {plan.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-white/80 text-sm leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm">
                        {isRTL ? plan.buttonText : plan.buttonTextEn}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
