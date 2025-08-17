'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import { SERVICES_DATA } from '@/components/Sections/InteractiveShowcaseSection/constants';

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language, t } = useLanguage();

  // Intersection observer for title animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
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

  // Use all services data from constants (no user type filtering)
  const servicesData = React.useMemo(() => {
    return SERVICES_DATA.map((service, index) => ({
      id: index + 1,
      image: service.imageBg,
      title: service.title,
      subtitle: service.description,
      description: service.longDescription,
      delay: index * 100
    }));
  }, []);

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
        services={seoServicesData}
        faqs={faqData}
      />
      
      <LocalSEO showMap={false} />

      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-br from-white via-cyan-100 to-white bg-clip-text text-transparent transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {language === 'he' ? 'כל השירותים שלנו' : 'All Our Services'}
          </h1>
          <p 
            className={`text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {servicesData.map((service, index) => {
              const originalService = SERVICES_DATA[index];
              return (
                <div
                  key={service.id}
                  className={`group relative bg-gradient-to-br ${originalService.color}/10 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer`}
                  style={{
                    animationDelay: `${service.delay}ms`
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl lg:rounded-t-4xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>

                  {/* Content Section */}
                  <div className="px-6 pb-6">
                    {/* Service Title */}
                    <h3 
                      className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {service.title}
                    </h3>

                    {/* Service Subtitle */}
                    <h4 
                      className="text-sm text-cyan-400 font-semibold mb-3 text-center"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {service.subtitle}
                    </h4>

                    {/* Service Description */}
                    <p 
                      className="text-white/80 leading-relaxed text-center text-xs md:text-sm"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-4">
                      <ul className="text-xs text-white/60 space-y-1">
                        {originalService.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center justify-center gap-2">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
                            <span dir={language === 'he' ? 'rtl' : 'ltr'}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${originalService.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-4xl`}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-12 text-center">
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' ? 'מוכנים להתחיל?' : 'Ready to Get Started?'}
            </h2>
            <p 
              className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' 
                ? 'בואו נדבר על הפרויקט שלכם ונראה איך סקריפ יכול לעזור לכם להגשים אותו'
                : "Let's talk about your project and see how Skreep can help you bring it to life"
              }
            </p>
            <button 
              className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-cyan-500 hover:scale-105 transition-all duration-300 text-lg"
              onClick={() => window.location.href = '/contact'}
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' ? 'בואו נדבר' : "Let's Talk"}
            </button>

            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
