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
    description: 'פיתוח  מובייל  והיברידיות עם חוויית משתמש  וביצועים גבוהים.',
    longDescription: 'פיתוח אפליקציות מובייל נטיביות והיברידיות עם חוויית משתמש  וביצועים גבוהים.',
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

function ServicesSection() {
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
        // Start from beginning on large screens
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        // Start from right side for RTL on mobile
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
        
        // Find the card closest to center
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
      // Initial check
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
      // In RTL, left arrow should scroll right (positive direction)
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      // In RTL, right arrow should scroll left (negative direction)
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-10 w-[95%] mx-auto bg-gradient-to-br" >
      <div className="mx-auto max-w-full px-0">
          {/* Header */}
          <div className="text-center w-full">
            <h1 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
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
            >
              <div className="flex gap-4 md:gap-6 p-4 pl-[calc(50vw-8rem)] md:pl-4 pr-[calc(50vw-8rem)] md:pr-4">
                {/* Duplicate services for infinite loop effect */}
                {servicesData.map((service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    data-service-id={service.id}
                    onClick={() => selectService(service)}
                    className={`flex-shrink-0 w-42 lg:w-60 h-32 md:h-32 backdrop-blur-sm border rounded-2xl p-4 md:p-6 cursor-pointer group transition-all duration-300 hover:scale-90 bg-cover bg-center bg-no-repeat relative overflow-hidden ${
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
                    {/* Background overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 rounded-2xl"></div>
                    
                    {/* Content */}
                    <div className="text-center relative z-20">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-200 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                        {/* {service.description} */}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    <div className={`mt-4 md:mt-6 flex justify-center transition-opacity duration-300 ${
                      selectedService?.id === service.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    
        {/* Content Box */}
        {selectedService && (
          <div className="mt-12 w-[95%] mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-4xl before:absolute before:inset-0 before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 p-8">
              <div key={selectedService.id}   
              style={{ backgroundImage: `url(${selectedService.imageBg})`,
                backgroundSize: 'contain',
                backgroundPosition: 'left',
                backgroundRepeat: 'no-repeat' }}
              className="animate-fade-in relative z-10 ">
                {/* Header */}
                <div className="flex items-center gap-6 mb-8" dir="rtl">
                 
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedService.title}</h2>
                    <p className="text-gray-300 text-lg">{selectedService.description}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Side - Description */}
                  <div className="space-y-6" dir="rtl">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">תיאור מפורט</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{selectedService.longDescription}</p>
                    </div>
                  </div>

                  {/* Right Side - Features */}
                  <div className="space-y-6" dir="rtl">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">תכונות עיקריות</h3>
                      <div className="space-y-3">
                        {selectedService.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className={`w-6 h-6 bg-gradient-to-r ${selectedService.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-200">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        )}
    </>
  );
}

export default ServicesSection;
