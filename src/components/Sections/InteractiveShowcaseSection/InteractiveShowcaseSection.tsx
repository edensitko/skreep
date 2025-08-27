'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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
    features: ['למידת מכונה מתקדמת', 'עיבוד שפה טבעית', 'ניתוח נתונים חכם', 'אוטומציה חכמה', 'ראייה ממוחשבת', 'זיהוי דפוסים', 'חיזוי מגמות', 'אלגוריתמים מתקדמים', 'בינה עסקית', 'למידה עמוקה', 'עיבוד תמונות', 'ניתוח סנטימנט'],
    color: 'from-blue-500 to-purple-600',
    imageBg: '/assets/images/servicesimg/1.png'
  },
  {
    id: 'web-development',
    title: 'פיתוח אתרים ואפליקציות',
    description: 'פתרונות דיגיטליים מותאמים אישית',
    longDescription: 'יצירת אתרים ואפליקציות מתקדמות עם עיצוב רספונסיבי, ביצועים מהירים וחוויית משתמש מעולה.',
    features: ['עיצוב רספונסיבי', 'ביצועים מהירים', 'SEO מתקדם', 'אבטחה גבוהה', 'פיתוח React', 'Node.js Backend', 'מסדי נתונים', 'API Integration', 'Progressive Web Apps', 'TypeScript', 'GraphQL', 'Cloud Deployment'],
    color: 'from-green-500 to-teal-600',
    imageBg: '/assets/images/servicesimg/2.png'
  },
  {
    id: 'automation',
    title: 'אוטומציה ותהליכים',
    description: 'חיסכון בזמן ומשאבים',
    longDescription: 'יישום פתרונות אוטומציה מתקדמים שמייעלים תהליכים עסקיים ומפחיתים עלויות תפעול.',
    features: ['אוטומציה של תהליכים', 'ניהול זרימת עבודה', 'דוחות אוטומטיים', 'אינטגרציות מתקדמות', 'RPA Solutions', 'Workflow Optimization', 'Task Scheduling', 'Email Automation', 'Data Processing', 'System Integration', 'Quality Assurance', 'Performance Monitoring'],
    color: 'from-orange-500 to-red-600',
    imageBg: '/assets/images/servicesimg/3.png'
  },
  {
    id: 'mobile-apps',
    title: 'פיתוח אפליקציות',
    description: 'פיתוח מובייל והיברידיות עם חוויית משתמש וביצועים גבוהים.',
    longDescription: 'פיתוח אפליקציות מובייל נטיביות והיברידיות עם חוויית משתמש וביצועים גבוהים.',
    features: ['פיתוח נטיבי', 'עיצוב UX/UI מתקדם', 'אינטגרציה עם API', 'פרסום בחנויות', 'React Native', 'Flutter Development', 'iOS Development', 'Android Development', 'Cross-Platform', 'Push Notifications', 'In-App Purchases', 'Analytics Integration'],
    color: 'from-pink-500 to-rose-600',
    imageBg: '/assets/images/servicesimg/4.png'
  },
  {
    id: 'cloud-solutions',
    title: 'פתרונות ענן',
    description: 'תשתיות ענן מתקדמות ומאובטחות',
    longDescription: 'הקמה וניהול של תשתיות ענן מתקדמות עם זמינות גבוהה, אבטחה מקסימלית וגמישות מלאה.',
    features: ['AWS & Azure', 'אבטחת מידע', 'גיבויים אוטומטיים', 'ניטור 24/7', 'Docker Containers', 'Kubernetes', 'CI/CD Pipelines', 'Load Balancing', 'Auto Scaling', 'Database Management', 'Security Compliance', 'Disaster Recovery'],
    color: 'from-cyan-500 to-blue-600',
    imageBg: '/assets/images/servicesimg/5.png'
  },
  {
    id: 'data-analytics',
    title: 'ניתוח נתונים ו-BI',
    description: 'תובנות עסקיות מבוססות נתונים',
    longDescription: 'יצירת מערכות ניתוח נתונים מתקדמות ודשבורדים אינטראקטיביים לקבלת החלטות מבוססות נתונים.',
    features: ['דשבורדים אינטראקטיביים', 'ניתוח נתונים מתקדם', 'דוחות אוטומטיים', 'תחזיות עסקיות', 'Power BI', 'Tableau Integration', 'Data Warehousing', 'ETL Processes', 'Real-time Analytics', 'Machine Learning Models', 'Statistical Analysis', 'Data Visualization'],
    color: 'from-indigo-500 to-purple-600',
    imageBg: '/assets/images/servicesimg/6.png'
  },
  {
    id: 'ecommerce',
    title: 'מסחר אלקטרוני',
    description: 'חנויות אונליין מתקדמות ומניבות',
    longDescription: 'פיתוח פלטפורמות מסחר אלקטרוני מתקדמות עם מערכות תשלום מאובטחות וניהול מלאי חכם.',
    features: ['עגלת קניות מתקדמת', 'מערכות תשלום', 'ניהול מלאי', 'אנליטיקס מכירות', 'Multi-vendor Support', 'Product Catalog', 'Order Management', 'Customer Reviews', 'Discount Systems', 'Shipping Integration', 'Tax Calculation', 'Mobile Commerce'],
    color: 'from-yellow-500 to-orange-600',
    imageBg: '/assets/images/servicesimg/7.png'
  },
  {
    id: 'cybersecurity',
    title: 'אבטחת סייבר',
    description: 'הגנה מתקדמת על נכסים דיגיטליים',
    longDescription: 'פתרונות אבטחת סייבר מתקדמים להגנה על מידע רגיש ומערכות קריטיות מפני איומים דיגיטליים.',
    features: ['ניטור אבטחה 24/7', 'זיהוי איומים', 'הצפנת נתונים', 'גיבוי מאובטח', 'Penetration Testing', 'Vulnerability Assessment', 'Security Audits', 'Incident Response', 'Compliance Management', 'Multi-Factor Authentication', 'Network Security', 'Endpoint Protection'],
    color: 'from-red-500 to-pink-600',
    imageBg: '/assets/images/servicesimg/8.png'
  },
  {
    id: 'iot-solutions',
    title: 'פתרונות IoT',
    description: 'חיבור חכם של מכשירים ומערכות',
    longDescription: 'פיתוח פתרונות אינטרנט של הדברים (IoT) מתקדמים לחיבור ובקרה של מכשירים חכמים.',
    features: ['חיישנים חכמים', 'בקרה מרחוק', 'ניתוח נתונים בזמן אמת', 'אוטומציה חכמה', 'Device Management', 'Edge Computing', 'Sensor Networks', 'Smart Home Solutions', 'Industrial IoT', 'Predictive Maintenance', 'Energy Management', 'Asset Tracking'],
    color: 'from-emerald-500 to-green-600',
    imageBg: '/assets/images/servicesimg/9.png'
  },
  {
    id: 'blockchain',
    title: 'טכנולוגיית בלוקצ׳יין',
    description: 'פתרונות מבוזרים ומאובטחים',
    longDescription: 'פיתוח יישומים מבוססי בלוקצ׳יין לשקיפות, אבטחה ומהימנות מקסימלית.',
    features: ['חוזים חכמים', 'מטבעות דיגיטליים', 'NFT פלטפורמות', 'DeFi פתרונות', 'Smart Contracts', 'Cryptocurrency', 'Decentralized Apps', 'Token Development', 'Wallet Integration', 'Consensus Mechanisms', 'Digital Identity', 'Supply Chain Tracking'],
    color: 'from-violet-500 to-purple-600',
    imageBg: '/assets/images/servicesimg/10.png'
  }
];

function InteractiveShowcaseSection() {
  const { language, t } = useLanguage();
  
  // Use translated services data
  const translatedServices = React.useMemo(() => {
    const services = t('interactiveServices.items') || [];
    if (Array.isArray(services) && services.length > 0) {
      return services.map((service: Record<string, unknown>) => ({
        id: String(service.id || ''),
        title: String(service.title || ''),
        description: String(service.description || ''),
        longDescription: String(service.longDescription || ''),
        features: Array.isArray(service.features) ? service.features.map(f => String(f)) : [],
        color: String(service.color || ''),
        imageBg: String(service.imageBg || '')
      }));
    }
    return servicesData; // Fallback to hardcoded data
  }, [t]);
  
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(translatedServices[0]);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
          <div className="text-center pt-16 pb-8 w-full">
            <h1 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`} 
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('interactiveServices.title') || (language === 'he' ? 'השירותים שלנו' : 'Our Services')}
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
                {translatedServices.map((service, index) => (
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
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    dir={language === 'he' ? 'rtl' : 'ltr'}
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
        <div className="mt-6 w-[85%] mx-auto relative">
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
              className="relative z-10 p-6 lg:p-8"
            >
              {/* Header Section */}
              <div className="text-center mb-8" dir="rtl">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-3 leading-tight">
                  {selectedService.title}
                </h2>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                  {selectedService.longDescription}
                </p>
              </div>

              {/* Features Grid - 2 Columns Mobile, 3 Columns Desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3" dir="rtl">
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
