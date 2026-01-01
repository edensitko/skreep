'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserType } from '@/hooks/useGlobalUserType';

// Import translations directly
import heMessages from '../../../../messages/he.json';
import enMessages from '../../../../messages/en.json';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  color: string;
  imageBg: string;
}

const messages = {
  he: heMessages,
  en: enMessages
};

function InteractiveShowcaseSection() {
  const { language, t } = useLanguage();
  const { userType } = useUserType();
  
  // Define colors based on user type
  const colors = {
    primary: userType === 'entrepreneurs' ? '#22c55e' : '#22d3ee', // green-500 : cyan-400
    primaryRgb: userType === 'entrepreneurs' ? '34, 197, 94' : '34, 211, 238',
    hover: userType === 'entrepreneurs' ? '#86efac' : '#a5f3fc', // green-300 : cyan-200
  };
  
  // Get services data directly from translation files
  const translatedServices = React.useMemo(() => {
    const currentMessages = messages[language as 'he' | 'en'];
    const services = currentMessages?.interactiveServices?.items;
    
    if (Array.isArray(services) && services.length > 0) {
      return services.map((service) => ({
        id: String(service.id || ''),
        title: String(service.title || ''),
        description: String(service.description || ''),
        longDescription: String(service.longDescription || ''),
        features: Array.isArray(service.features) ? service.features.map((f: string) => String(f)) : [],
        color: String(service.color || ''),
        imageBg: String(service.imageBg || '')
      }));
    }
    return [];
  }, [language]);
  
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(translatedServices[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Update selected service when translated services change
  useEffect(() => {
    if (translatedServices.length > 0) {
      setSelectedService(translatedServices[0]);
    }
  }, [translatedServices]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSubtitleVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSubtitleRef = subtitleRef.current;
    if (currentSubtitleRef) {
      observer.observe(currentSubtitleRef);
    }

    return () => {
      if (currentSubtitleRef) {
        observer.unobserve(currentSubtitleRef);
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

  // Detect centered service on scroll (mobile) - throttled for performance
  useEffect(() => {
    let scrollTimeout: number | null = null;
    
    const handleScroll = () => {
      if (scrollTimeout) return;
      
      scrollTimeout = window.setTimeout(() => {
        scrollTimeout = null;
        
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
              const service = translatedServices.find(s => s.id === serviceId);
              if (service && selectedService?.id !== service.id) {
                setSelectedService(service);
              }
            }
          }
        }
      }, 50); // Throttle to 20fps
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [selectedService, translatedServices]);

  // Memoize expensive operations
  const selectService = useCallback((service: ServiceCard) => {
    if (selectedService?.id !== service.id) {
      setSelectedService(service);
      
      // Smooth scroll to content box on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          const contentBox = document.querySelector('[data-content-box]');
          if (contentBox) {
            contentBox.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      }
    }
  }, [selectedService?.id]);

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pt-10 w-[95%] mx-auto bg-gradient-to-br">
        <div className="mx-auto max-w-full px-0">
          {/* Header */}
          <div className="text-center pt-16 pb-8 w-full">
            <h1 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} 
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('interactiveServices.title') || (language === 'he' ? ' מה אנחנו מציעים' : 'Our Services')}
            </h1>
            
            <p 
              ref={subtitleRef}
              className={`text-md font-light md:text-lg text-white/70 mx-auto transition-all duration-1000 delay-200 ${
                isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('interactiveServices.subtitle') || (language === 'he' ? ' מציעים מגוון רחב של שירותים טכנולוגיים מתקדמים המותאמים במדויק לצרכים הייחודיים של העסק שלכם' : 'wide range of advanced technological services precisely tailored to your business unique needs')}
            </p>
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
              className="overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="flex gap-4 md:gap-6 p-2 pl-[calc(50vw-12rem)] md:pl-2 pr-[calc(50vw-12rem)] md:pr-2 min-w-max">
                {translatedServices.map((service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    data-service-id={service.id}
                    onClick={() => selectService(service)}
                    className={`flex-shrink-0 w-52 lg:w-60 h-38 md:h-38 backdrop-blur-sm border rounded-2xl p-4 md:p-6 cursor-pointer group transition-all duration-300 hover:scale-105 bg-cover bg-center bg-no-repeat relative overflow-hidden ${
                      selectedService?.id === service.id
                        ? 'opacity-100 shadow-lg scale-105 ring-2'
                        : 'opacity-70 border-white/20 hover:border-white/30 hover:opacity-90'
                    }`}
                    style={{
                      backgroundImage: `url(${service.imageBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      ...(selectedService?.id === service.id && {
                        borderColor: `rgba(${colors.primaryRgb}, 0.6)`,
                        boxShadow: `0 10px 15px -3px rgba(${colors.primaryRgb}, 0.2), 0 4px 6px -4px rgba(${colors.primaryRgb}, 0.2)`,
                        '--tw-ring-color': `rgba(${colors.primaryRgb}, 0.3)`,
                      } as React.CSSProperties),
                    }}
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 rounded-2xl"></div>
                    
                    <div className="text-center relative z-20 h-full flex flex-col justify-center">
                      <h3 
                        className="text-lg md:text-xl font-bold text-white mb-2 transition-colors"
                        style={{
                          ['--hover-color' as string]: colors.hover,
                        } as React.CSSProperties}
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.hover}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                      >
                        {service.title}
                      </h3>
                      <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors line-clamp-2">
                        {service.description}
                      </p>
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
        <div className="mt-6 w-[85%] mx-auto relative" data-content-box>
          {/* Main Content Container - Now Clickable */}
          <Link href={`/services/${selectedService.id}`} className="block group">
            <div 
              className="bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-3xl border border-white/20 rounded-3xl lg:rounded-4xl shadow-2xl shadow-black/50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[12px] hover:border-white/30 hover:shadow-2xl hover:scale-[1.02] cursor-pointer animate-in"
              style={{
                animationName: 'fade-in-up',
                animationDuration: '0.6s',
                animationFillMode: 'both',
                ['--hover-shadow' as string]: `rgba(${colors.primaryRgb}, 0.1)`,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 25px 50px -12px rgba(${colors.primaryRgb}, 0.1)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
              }}
            >
              
              {/* Animated Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 rounded-3xl lg:rounded-4xl"></div>
              <div 
                className="absolute inset-0 opacity-50 rounded-3xl lg:rounded-4xl"
                style={{
                  background: `linear-gradient(to top left, rgba(${colors.primaryRgb}, 0.08), transparent, rgba(168, 85, 247, 0.08))`
                }}
              ></div>
              
              {/* Full-Width Image Banner */}
              <div 
                className="w-full h-32 md:h-40 lg:h-48 bg-cover bg-center bg-no-repeat relative overflow-hidden rounded-t-3xl lg:rounded-t-4xl transition-all duration-500"
                style={{
                  backgroundImage: `url(${selectedService.imageBg})`,
                }}
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Click Indicator */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Content Wrapper */}
              <div 
                key={selectedService.id}
                className="relative z-10 p-6 lg:p-8"
              >
                {/* Header Section */}
                <div className="text-center mb-8" >
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-3 leading-tight">
                    {selectedService.title}
                  </h2>
                  <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                    {selectedService.longDescription}
                  </p>
                </div>

                {/* Features Grid - 2 Columns Mobile, 3 Columns Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 mb-8">
                  {selectedService.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 lg:gap-4 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-white/10 border border-white/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-white/90 text-xs lg:text-sm font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Click to Learn More Indicator */}
                <div className="text-center">
                  <div 
                    className="inline-flex items-center gap-2 font-medium text-sm opacity-75 hover:opacity-100 transition-opacity"
                    style={{ color: colors.primary }}
                  >
                    <span>{language === 'he' ? 'לחץ למידע נוסף' : 'Click to learn more'}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${language === 'he' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

              </div>
              
              {/* Enhanced Background Decorations */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                  className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full blur-3xl animate-pulse"
                  style={{ backgroundColor: `rgba(${colors.primaryRgb}, 0.1)` }}
                ></div>
                <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-lightblue-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </Link>

          {/* View All Services Button - Outside the card */}
          <div className="flex justify-center mt-8">
            <Link
              href="/services"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2 hover:bg-white/15 hover:scale-110 transition-all duration-300"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {t('common.allServices') || (language === 'he' ? 'כל השירותים' : 'All Services')}
              <svg 
                className={`transition-all duration-300 ${language === 'he' ? '' : 'rotate-180'}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19 12H5M12 19L5 12L12 5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default InteractiveShowcaseSection;
