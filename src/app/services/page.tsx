'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import { SERVICES_DATA } from '@/components/Sections/InteractiveShowcaseSection/constants';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import PageHero from '@/components/Layout/PageHero';

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  // Intersection observer for content animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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

  // SEO data for services
  const seoServicesData = React.useMemo(() => [
    {
      name: language === 'he' ? "בינה מלאכותית" : "Artificial Intelligence Solutions",
      description: language === 'he' ? "פיתוח מערכות AI מתקדמות לעסקים, כולל עיבוד שפה טבעית וניתוח נתונים חכם" : "Development of advanced AI systems for businesses, including natural language processing and smart data analysis",
      provider: "Skreep",
      areaServed: ["Israel", "Tel Aviv", "Jerusalem", "Haifa"],
      serviceType: "Artificial Intelligence"
    },
    {
      name: language === 'he' ? "אוטומציה חכמה" : "Smart Automation",
      description: language === 'he' ? "יצירת תהליכי עבודה אוטומטיים המשפרים יעילות ומפחיתים עלויות תפעול" : "Creating automated workflows that improve efficiency and reduce operational costs",
      provider: "Skreep",
      areaServed: ["Israel", "Tel Aviv", "Jerusalem", "Haifa"],
      serviceType: "Business Automation"
    },
    {
      name: language === 'he' ? "צ'אטבוטים" : "Chatbot Development",
      description: language === 'he' ? "פיתוח צ'אטבוטים חכמים המספקים שירות לקוחות מקצועי מסביב לשעון" : "Development of smart chatbots that provide professional customer service around the clock",
      provider: "Skreep",
      areaServed: ["Israel", "Tel Aviv", "Jerusalem", "Haifa"],
      serviceType: "Customer Service Technology"
    },
    {
      name: language === 'he' ? "ניתוח נתונים" : "Data Analysis",
      description: language === 'he' ? "ניתוח מתקדם של נתונים עסקיים ליצירת תובנות ושיפור קבלת החלטות" : "Advanced analysis of business data to generate insights and improve decision making",
      provider: "Skreep",
      areaServed: ["Israel", "Tel Aviv", "Jerusalem", "Haifa"],
      serviceType: "Data Analytics"
    },
    {
      name: language === 'he' ? "אינטגרציה" : "System Integration",
      description: language === 'he' ? "אינטגרציה חלקה של פתרונות AI עם מערכות ארגוניות קיימות" : "Seamless integration of AI solutions with existing organizational systems",
      provider: "Skreep",
      areaServed: ["Israel", "Tel Aviv", "Jerusalem", "Haifa"],
      serviceType: "Technology Integration"
    },
    {
      name: language === 'he' ? "ייעוץ טכנולוגי" : "Technology Consulting",
      description: language === 'he' ? "ייעוץ מקצועי והכשרה לצוותים ביישום טכנולוגיות AI מתקדמות" : "Professional consulting and training for teams in implementing advanced AI technologies",
      provider: "Skreep",
      areaServed: ["Israel", "Tel Aviv", "Jerusalem", "Haifa"],
      serviceType: "Technology Consulting"
    }
  ], [language]);

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
    // Import messages directly based on language
    const messages = language === 'he' 
      ? require('../../../messages/he.json')
      : require('../../../messages/en.json');
    
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
       

          {/* Enhanced Services Grid - Mobile 2 Columns */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {servicesData.map((service) => {
              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-500 shadow-xl shadow-black/20 group"
                  style={{
                    animationDelay: `${service.delay}ms`
                  }}
                >
                  {/* Enhanced Image Section - Mobile Optimized */}
                  <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Enhanced Overlay Content - Mobile Optimized */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 lg:p-8">
                      {/* Service Title */}
                      <h3 
                        className="text-md sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-2xl"
                        dir="ltr"
                      >
                        {service.title}
                      </h3>

                      {/* Service Description - Mobile Optimized */}
                      <p 
                        className="text-white/90 leading-relaxed text-center text-xs sm:text-sm md:text-base drop-shadow-lg"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        {service.description}
                      </p>

                      {/* View More Indicator */}
                      <div className={`mt-4 flex items-center justify-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-medium">{language === 'he' ? 'לפרטים נוספים' : 'View Details'}</span>
                        <svg className={`w-4 h-4 transition-transform ${language === 'he' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                </Link>

              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 lg:p-12 shadow-xl shadow-black/20 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {language === 'he' ? 'מוכנים להתחיל?' : 'Ready to Get Started?'}
              </h3>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' 
                  ? 'צרו איתנו קשר עוד היום ונתחיל לעבוד על הפתרון המושלם עבורכם'
                  : 'Contact us today and let\'s start working on the perfect solution for you'
                }
              </p>
              <button className="bg-gradient-to-r from-cyan-400/30 to-purple-400/30 text-white border border-cyan-400/50 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 flex items-center space-x-3 mx-auto">
                <span>{language === 'he' ? 'בואו נתחיל' : 'Let\'s Start'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

   
       <InnovationSection/>  
<ContactFormSection/>
    </div>
  );
}
