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
  const { language, t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(pricingPlans[1]); // Mobile carousel state
  const [currentSlide, setCurrentSlide] = useState(1); // Start with Professional plan (second item)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
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

  // Detect centered plan on scroll  // Mobile slide functions
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % pricingPlans.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + pricingPlans.length) % pricingPlans.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    // Prevent default to avoid scrolling issues
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    
    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

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
      className="py-16 px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto">
        <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-8">
          
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
          </div>
          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <h2 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {isRTL ? 'תוכניות מחיר גמישות' : 'Flexible Pricing Plans'}
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative">

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              {/* Navigation Arrows for Mobile */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide container */}
              <div 
                className="relative overflow-hidden touch-pan-x"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-x' }}
              >
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {pricingPlans.map((plan, index) => (
                    <div 
                      key={`mobile-${plan.id}-${index}`} 
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div
                        data-plan-id={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`group bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 hover:scale-[0.98] w-full h-[28rem] p-6 cursor-pointer ${
                          selectedPlan?.id === plan.id
                            ? 'border-cyan-400/50 scale-[1.02]'
                            : 'hover:border-white/40'
                        }`}
                        dir="rtl"
                      >
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
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent mb-3">
                            {isRTL ? plan.name : plan.nameEn}
                          </h3>
                          <p className="text-white/70 text-base">
                            {isRTL ? plan.subtitle : plan.subtitleEn}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-center mb-8">
                          <div className="text-4xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent mb-2">
                            {plan.price}
                          </div>
                          <div className="text-white/60 text-base">
                            {isRTL ? plan.period : plan.periodEn}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex-1 mb-8">
                          <ul className="space-y-4">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-white/80 text-base leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-auto">
                          <button className="w-full bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 py-4 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-base">
                            {isRTL ? plan.buttonText : plan.buttonTextEn}
                          </button>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-4xl"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {pricingPlans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-cyan-400 scale-110'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={`desktop-${plan.id}-${index}`}
                  data-plan-id={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`group bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 hover:scale-[1.02] w-full h-[32rem] p-6 cursor-pointer ${
                    selectedPlan?.id === plan.id
                      ? 'border-cyan-400/50 scale-[1.05] shadow-2xl shadow-cyan-400/20'
                      : 'hover:border-white/40 hover:scale-[1.02]'
                  } ${plan.popular ? 'md:scale-[1.05] lg:scale-[1.08]' : ''}`}
                  dir="rtl"
                >
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
                    <div className="text-center mb-6">
                      <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent mb-3">
                        {isRTL ? plan.name : plan.nameEn}
                      </h3>
                      <p className="text-white/70 text-base">
                        {isRTL ? plan.subtitle : plan.subtitleEn}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent mb-2">
                        {plan.price}
                      </div>
                      <div className="text-white/60 text-base">
                        {isRTL ? plan.period : plan.periodEn}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex-1 mb-8">
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-white/80 text-base leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 py-4 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-base">
                        {isRTL ? plan.buttonText : plan.buttonTextEn}
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-4xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
