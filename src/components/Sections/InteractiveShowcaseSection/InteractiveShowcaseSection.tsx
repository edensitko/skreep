'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  color: string;
  imageBg: string;
}

const servicesData: ServiceCard[] = [
  {
    id: 'ai-solutions',
    title: 'פתרונות בינה מלאכותית',
    description: 'מערכות AI מתקדמות לעסקים',
    longDescription: 'פיתוח פתרונות בינה מלאכותית מותאמים אישית שמשפרים את היעילות העסקית ומאפשרים קבלת החלטות מבוססות נתונים.',
    features: ['למידת מכונה מתקדמת', 'עיבוד שפה טבעית', 'ניתוח נתונים חכם', 'אוטומציה חכמה'],
    color: 'from-blue-500 to-purple-600',
    imageBg: '/assets/images/img/6.png'
  },
  {
    id: 'web-development',
    title: 'פיתוח אתרים ואפליקציות',
    description: 'פתרונות דיגיטליים מותאמים אישית',
    longDescription: 'יצירת אתרים ואפליקציות מתקדמות עם עיצוב רספונסיבי, ביצועים מהירים וחוויית משתמש מעולה.',
    features: ['עיצוב רספונסיבי', 'ביצועים מהירים', 'SEO מתקדם', 'אבטחה גבוהה'],
    color: 'from-green-500 to-teal-600',
    imageBg: '/assets/images/img/7.png'
  },
  {
    id: 'automation',
    title: 'אוטומציה ותהליכים',
    description: 'חיסכון בזמן ומשאבים',
    longDescription: 'יישום פתרונות אוטומציה מתקדמים שמייעלים תהליכים עסקיים ומפחיתים עלויות תפעול.',
    features: ['אוטומציה של תהליכים', 'ניהול זרימת עבודה', 'דוחות אוטומטיים', 'אינטגרציות מתקדמות'],
    color: 'from-orange-500 to-red-600',
    imageBg: '/assets/images/img/8.png'
  },
  {
    id: 'mobile-apps',
    title: 'פיתוח אפליקציות',
    description: 'פיתוח מובייל והיברידיות עם חוויית משתמש וביצועים גבוהים.',
    longDescription: 'פיתוח אפליקציות מובייל נטיביות והיברידיות עם חוויית משתמש וביצועים גבוהים.',
    features: ['פיתוח נטיבי', 'עיצוב UX/UI מתקדם', 'אינטגרציה עם API', 'פרסום בחנויות'],
    color: 'from-pink-500 to-rose-600',
    imageBg: '/assets/images/img/9.png'
  },
  {
    id: 'cloud-solutions',
    title: 'פתרונות ענן',
    description: 'תשתיות ענן מתקדמות ומאובטחות',
    longDescription: 'הקמה וניהול של תשתיות ענן מתקדמות עם זמינות גבוהה, אבטחה מקסימלית וגמישות מלאה.',
    features: ['AWS & Azure', 'אבטחת מידע', 'גיבויים אוטומטיים', 'ניטור 24/7'],
    color: 'from-cyan-500 to-blue-600',
    imageBg: '/assets/images/img/10.png'
  },
  {
    id: 'data-analytics',
    title: 'ניתוח נתונים ו-BI',
    description: 'תובנות עסקיות מבוססות נתונים',
    longDescription: 'יצירת מערכות ניתוח נתונים מתקדמות ודשבורדים אינטראקטיביים לקבלת החלטות מבוססות נתונים.',
    features: ['דשבורדים אינטראקטיביים', 'ניתוח נתונים מתקדם', 'דוחות אוטומטיים', 'תחזיות עסקיות'],
    color: 'from-indigo-500 to-purple-600',
    imageBg: '/assets/images/img/11.png'
  },
  {
    id: 'ecommerce',
    title: 'מסחר אלקטרוני',
    description: 'חנויות אונליין מתקדמות ומניבות',
    longDescription: 'פיתוח פלטפורמות מסחר אלקטרוני מתקדמות עם מערכות תשלום מאובטחות וניהול מלאי חכם.',
    features: ['עגלת קניות מתקדמת', 'מערכות תשלום', 'ניהול מלאי', 'אנליטיקס מכירות'],
    color: 'from-yellow-500 to-orange-600',
    imageBg: '/assets/images/img/12.png'
  }
];

function InteractiveShowcaseSection() {
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(servicesData[0]);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  // Initialize carousel position
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isLargeScreen = window.innerWidth >= 768;
      
      if (isLargeScreen) {
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: maxScroll, behavior: 'auto' });
      }
    }
  }, []);

  // Detect centered service on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && window.innerWidth < 768) {
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        
        const cards = container.querySelectorAll('[data-service-id]') as NodeListOf<HTMLElement>;
        let closestCard: HTMLElement | null = null;
        let closestDistance = Infinity;
        
        cards.forEach((card: HTMLElement) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(centerX - cardCenterX);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
          }
        });
        
        if (closestCard) {
          const serviceId = (closestCard as HTMLElement).getAttribute('data-service-id');
          if (serviceId) {
            const service = servicesData.find(s => s.id === serviceId);
            if (service && selectedService?.id !== service.id) {
              setSelectedService(service);
            }
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [selectedService]);

  const selectService = (service: ServiceCard) => {
    setSelectedService(service);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-10 w-[95%] mx-auto bg-gradient-to-br">
        <div className="mx-auto max-w-full px-0">
          {/* Header */}
          <div className="text-center w-full">
            <h1 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} 
              dir="rtl"
              style={{ textAlign: 'center' }}
            >
              שירותים שעושים הבדל
            </h1>
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
                {servicesData.map((service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    data-service-id={service.id}
                    onClick={() => selectService(service)}
                    className={`flex-shrink-0 w-52 lg:w-60 h-32 md:h-32 backdrop-blur-sm border rounded-2xl p-4 md:p-6 cursor-pointer group transition-all duration-300 hover:scale-90 bg-cover bg-center bg-no-repeat relative overflow-hidden ${
                      selectedService?.id === service.id
                        ? 'opacity-100 border-white/80 shadow-lg'
                        : 'opacity-70 border-white/20 hover:border-white/30 hover:opacity-90'
                    }`}
                    style={{
                      backgroundImage: `url(${service.imageBg})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    dir="rtl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 rounded-2xl"></div>
                    
                    <div className="text-center relative z-20">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-200 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Box */}
      {selectedService && (
        <div className="mt-16 w-[95%] mx-auto relative">
          {/* Main Content Container */}
          <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-3xl border border-white/20 rounded-3xl lg:rounded-4xl shadow-2xl shadow-black/50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[12px] hover:border-white/30 hover:shadow-cyan-400/10 hover:shadow-2xl">
            
            {/* Animated Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 rounded-3xl lg:rounded-4xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/8 via-transparent to-purple-400/8 opacity-50 rounded-3xl lg:rounded-4xl"></div>
            
            {/* Full-Width Image Banner */}
            <div 
              className="w-full h-32 md:h-40 lg:h-48 bg-cover bg-center bg-no-repeat relative overflow-hidden rounded-t-3xl lg:rounded-t-4xl"
              style={{
                backgroundImage: `url(${selectedService.imageBg})`,
              }}
            >
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Content Wrapper */}
            <div 
              key={selectedService.id}
              className="relative z-10 p-8 lg:p-12"
            >
              {/* Header Section */}
              <div className="text-center mb-10 lg:mb-12" dir="rtl">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-3 lg:mb-4 leading-tight">
                  {selectedService.title}
                </h2>
                <p className="text-white/80 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                  {selectedService.description}
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Description Section */}
                <div className="space-y-6" dir="rtl">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <p className="text-white/80 leading-relaxed text-lg lg:text-xl">
                      {selectedService.longDescription}
                    </p>
                  </div>
                </div>

                {/* Features Section */}
                <div className="space-y-6" dir="rtl">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="space-y-4">
                      {selectedService.features.map((feature, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${selectedService.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-white/90 text-lg font-medium group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>


            </div>
            
            {/* Enhanced Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InteractiveShowcaseSection;
