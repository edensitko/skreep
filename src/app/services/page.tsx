'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import PageHero from '@/components/Layout/PageHero';
import heMessages from '../../../messages/he.json';
import enMessages from '../../../messages/en.json';

export default function ServicesPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  // Intersection observer for content animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        // Animation logic can be added here if needed
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = contentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // FAQ data for SEO
  const faqData = React.useMemo(() => [
    {
      question: language === 'he' ? "איך בינה מלאכותית יכולה לעזור לעסק שלי?" : "How can artificial intelligence help my business?",
      answer: language === 'he' ? "בינה מלאכותית יכולה לאוטמט תהליכים, לשפר שירות לקוחות, לנתח נתונים ולהגביר יעילות תפעולית" : "Artificial intelligence can automate processes, improve customer service, analyze data, and increase operational efficiency"
    },
    {
      question: language === 'he' ? "כמה זמן לוקח לפתח פתרון AI?" : "How long does it take to develop an AI solution?",
      answer: language === 'he' ? "זמן הפיתוח תלוי במורכבות הפרויקט, בדרך כלל בין 2-6 חודשים לפתרון מלא" : "Development time depends on project complexity, typically 2-6 months for a complete solution"
    },
    {
      question: language === 'he' ? "האם אתם מספקים תמיכה לאחר הפיתוח?" : "Do you provide support after development?",
      answer: language === 'he' ? "כן, אנו מספקים תמיכה מלאה, עדכונים ותחזוקה שוטפת לכל הפתרונות שלנו" : "Yes, we provide full support, updates, and ongoing maintenance for all our solutions"
    }
  ], [language]);

  // Use translated services data
  const servicesData = React.useMemo(() => {
    // Use imported messages based on language
    const messages = language === 'he' ? heMessages : enMessages;
    const translatedServices = messages.interactiveServices?.items;
    
    if (Array.isArray(translatedServices) && translatedServices.length > 0) {
      return translatedServices.map((service: { id?: string; imageBg?: string; title: string; description: string; longDescription?: string; features?: string[] }, index: number) => ({
        id: service.id || `service-${index + 1}`,
        image: service.imageBg || `/assets/images/servicesimg/${index + 1}.png`,
        title: service.title,
        subtitle: service.description,
        description: service.longDescription || service.description,
        features: service.features || [],
        delay: index * 100
      }));
    }
    
    // This should not happen now, but keeping as ultimate fallback
    return [];
  }, [language]);

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Components */}
      <SEOMeta 
        title={language === 'he' ? "שירותי בינה מלאכותית מתקדמים | סקריפ" : "Advanced AI Services | Skreep"}
        description={language === 'he' ? "פתרונות בינה מלאכותית מתקדמים לעסקים: אוטומציה חכמה, צ'אטבוטים, ניתוח נתונים ואינטגרציה. שירותי AI מקצועיים בישראל" : "Advanced AI solutions for businesses: smart automation, chatbots, data analysis, and integration. Professional AI services in Israel"}
        keywords={language === 'he' ? ["בינה מלאכותית", "AI", "אוטומציה", "צ'אטבוטים", "ניתוח נתונים", "שירותי טכנולוגיה", "ישראל"] : ["artificial intelligence", "AI", "automation", "chatbots", "data analysis", "technology services", "Israel"]}
        image="/assets/images/services-og.jpg"
        canonical="https://skreep.com/services"
      />
      
      <PageSEO 
        pageType="services"
        title={language === 'he' ? "שירותי בינה מלאכותית מתקדמים" : "Advanced AI Services"}
        description={language === 'he' ? "פתרונות AI מותאמים אישית לעסקים" : "Customized AI solutions for businesses"}
        faqs={faqData}
      />
      
      <LocalSEO showMap={false} />
      
      {/* Hero Section with RippleGrid */}
      <PageHero 
        title={language === 'he' ? 'כל השירותים' : 'Our Services'}
        subtitle={language === 'he' 
          ? 'פתרונות בינה מלאכותית מתקדמים לעסקים'
          : 'Advanced AI solutions for businesses'
        }
        language={language as 'he' | 'en'}
      />

      {/* Enhanced Services Grid Section */}
      <section ref={contentRef} className="relative py-8 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Section Header */}
       

          {/* Enhanced Services Grid - 2 Columns Mobile, 3 Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {servicesData.map((service) => {
              // Truncate description to 300 words
              const truncateText = (text: string, maxWords: number = 50) => {
                const words = text.split(' ');
                if (words.length <= maxWords) return text;
                return words.slice(0, maxWords).join(' ') + '...';
              };

              return (
                <div
                  key={service.id}
                  className="relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group hover:border-cyan-400/30 hover:shadow-cyan-400/20 transition-all duration-500 flex flex-col h-[450px] md:h-[500px]"
                  style={{
                    animationDelay: `${service.delay}ms`
                  }}
                >
                  {/* Top Half - Image with Shadow Overlay */}
                  <div className="relative h-1/2 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Black shadow gradient from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Additional subtle overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  {/* Bottom Half - Content */}
                  <div className="flex flex-col justify-between h-1/2 p-4 md:p-6">
                    {/* Title and Description in Center */}
                    <div className="flex-1 flex flex-col justify-center text-center">
                      <h3 
                        className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        {service.title}
                      </h3>

                      <p 
                        className="text-white/80 leading-relaxed text-xs md:text-sm lg:text-base mb-4 md:mb-6"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        {truncateText(service.description, 25)}
                      </p>
                    </div>

                    {/* Read More Button at Bottom */}
                    <div className="flex justify-center">
                      <Link
                        href={`/services/${service.id}`}
                        className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 flex items-center gap-2"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        <span className="text-xs md:text-sm lg:text-base">
                          {language === 'he' ? 'לפרטים נוספים' : 'View Details'}
                        </span>
                        <svg 
                          className={`w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1 ${language === 'he' ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

   
       <InnovationSection/>  
<ContactFormSection/>
    </div>
  );
}
