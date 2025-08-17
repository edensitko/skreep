'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';

export default function AboutPage() {
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



  // Company values data
  const companyValues = React.useMemo(() => [
    {
      id: 1,
      icon: "🚀",
      title: language === 'he' ? "חדשנות" : "Innovation",
      description: language === 'he' ? "אנחנו תמיד בחזית הטכנולוגיה, מפתחים פתרונות חדשניים ומתקדמים" : "We're always at the forefront of technology, developing innovative and advanced solutions"
    },
    {
      id: 2,
      icon: "🎯",
      title: language === 'he' ? "מצוינות" : "Excellence",
      description: language === 'he' ? "אנחנו שואפים למצוינות בכל מה שאנחנו עושים ומתחייבים לאיכות הגבוהה ביותר" : "We strive for excellence in everything we do and commit to the highest quality"
    },
    {
      id: 3,
      icon: "🤝",
      title: language === 'he' ? "שותפות" : "Partnership",
      description: language === 'he' ? "אנחנו רואים בלקוחותינו שותפים לדרך ועובדים יחד להשגת המטרות" : "We see our clients as partners and work together to achieve goals"
    },
    {
      id: 4,
      icon: "🌟",
      title: language === 'he' ? "שקיפות" : "Transparency",
      description: language === 'he' ? "אנחנו מאמינים בתקשורת פתוחה וכנה עם הלקוחות והצוות שלנו" : "We believe in open and honest communication with our clients and team"
    }
  ], [language]);

  // FAQ data for SEO
  const faqData = React.useMemo(() => [
    {
      question: language === 'he' ? "מתי נוסדה חברת סקריפ?" : "When was Skreep founded?",
      answer: language === 'he' ? "סקריפ נוסדה בשנת 2020 על ידי צוות של מומחי טכנולוגיה עם חזון לשנות את עולם העסקים באמצעות בינה מלאכותית" : "Skreep was founded in 2020 by a team of technology experts with a vision to transform the business world through artificial intelligence"
    },
    {
      question: language === 'he' ? "איפה נמצא המשרד הראשי של סקריפ?" : "Where is Skreep's main office located?",
      answer: language === 'he' ? "המשרד הראשי שלנו נמצא בתל אביב, ישראל, ואנחנו משרתים לקוחות ברחבי העולם" : "Our main office is located in Tel Aviv, Israel, and we serve clients worldwide"
    }
  ], [language]);

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Components */}
      <SEOMeta 
        title={language === 'he' ? "אודות סקריפ - מובילים בבינה מלאכותית | Skreep" : "About Skreep - AI Leaders | Skreep"}
        description={language === 'he' ? "הכירו את הצוות המקצועי של סקריפ, החזון שלנו והערכים שמנחים אותנו בפיתוח פתרונות בינה מלאכותית מתקדמים" : "Meet Skreep's professional team, our vision and the values that guide us in developing advanced artificial intelligence solutions"}
        keywords={language === 'he' ? ["אודות סקריפ", "צוות", "חזון", "ערכי חברה", "בינה מלאכותית", "מומחים"] : ["about skreep", "team", "vision", "company values", "artificial intelligence", "experts"]}
        image="/assets/images/about-og.jpg"
        canonical="https://skreep.com/about"
      />
      
      <PageSEO 
        pageType="about"
        title={language === 'he' ? "אודות סקריפ - מובילים בבינה מלאכותית" : "About Skreep - AI Leaders"}
        description={language === 'he' ? "הכירו את הצוות והחזון של סקריפ" : "Meet Skreep's team and vision"}
        faqs={faqData}
      />
      
      <LocalSEO showMap={false} />

      <Header />
      
      {/* Main About Section */}
      <section className="pt-32 lg:pt-40 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-16 items-center">
            {/* Image Section */}
            <div className="order-1 xl:order-1">
              <img 
                src="./assets/images/img/1.png" 
                alt={language === 'he' ? 'אודות סקריפ' : 'About Skreep'}
                className="w-full h-64 lg:h-80 xl:h-96 object-cover rounded-xl filter brightness-110"
              />
            </div>
            
            {/* Content Section */}
            <div ref={titleRef} className="order-2 xl:order-2 mt-8 xl:mt-0" dir={language === 'he' ? 'rtl' : 'ltr'}>
              <div className="mx-auto max-w-full px-4 md:px-0">
                {/* Main Title */}
                <h1 
                  className={`font-bold mb-6 lg:mb-10 ${language === 'he' ? 'text-center md:text-right' : 'text-left'} bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-4xl xl:text-5xl leading-tight tracking-wide transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {language === 'he' ? 'אודות סקריפ' : 'About Skreep'}
                </h1>

                {/* Subtitle */}
                <h2 
                  className={`font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 leading-tight tracking-wide ${language === 'he' ? 'text-center md:text-right' : 'text-left'}`}
                >
                  {language === 'he' ? 'מובילים בבינה מלאכותית' : 'Leading AI Innovation'}
                </h2>
                
                {/* Description */}
                <div className={`text-white/90 mb-8 text-sm md:text-base lg:text-lg leading-relaxed ${language === 'he' ? 'text-center md:text-right' : 'text-left'}`}>
                  <p className="mb-4">
                    {language === 'he' 
                      ? 'סקריפ נוסדה בשנת 2020 מתוך חזון ברור - להפוך את הבינה המלאכותית לנגישה ויעילה עבור כל עסק. אנחנו צוות של מומחי טכנולוגיה המתמחים בפיתוח פתרונות AI מתקדמים.'
                      : 'Skreep was founded in 2020 with a clear vision - to make artificial intelligence accessible and effective for every business. We are a team of technology experts specializing in developing advanced AI solutions.'
                    }
                  </p>
                  <p>
                    {language === 'he' 
                      ? 'היום אנחנו גאים לשרת מאות לקוחות ברחבי העולם, ומספקים פתרונות שמשנים את אופן הפעילות של עסקים בכל הגדלים.'
                      : 'Today we are proud to serve hundreds of clients worldwide, providing solutions that transform how businesses of all sizes operate.'
                    }
                  </p>
                </div>
                
                {/* CTA Button */}
                <div className={`flex w-full ${language === 'he' ? 'justify-center md:justify-end' : 'justify-start'}`}>
                  <button 
                    className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base hover:scale-105"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {language === 'he' ? 'צרו קשר' : 'Contact Us'}
                  </button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="space-y-6" dir={language === 'he' ? 'rtl' : 'ltr'}>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent">
                  {language === 'he' ? 'הסיפור שלנו' : 'Our Story'}
                </h2>
                <p className="text-white/80 leading-relaxed text-lg">
                  {language === 'he' 
                    ? 'סקריפ נוסדה בשנת 2020 מתוך חזון ברור - להפוך את הבינה המלאכותית לנגישה ויעילה עבור כל עסק. החלנו כצוות קטן של מפתחים ומומחי AI, ומאז גדלנו לחברה מובילה בתחום.'
                    : 'Skreep was founded in 2020 with a clear vision - to make artificial intelligence accessible and effective for every business. We started as a small team of developers and AI experts, and have since grown into a leading company in the field.'
                  }
                </p>
                <p className="text-white/80 leading-relaxed text-lg">
                  {language === 'he' 
                    ? 'היום אנחנו גאים לשרת מאות לקוחות ברחבי העולם, ומספקים פתרונות AI מתקדמים שמשנים את אופן הפעילות של עסקים בכל הגדלים.'
                    : 'Today we are proud to serve hundreds of clients worldwide, providing advanced AI solutions that transform how businesses of all sizes operate.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center">
            {language === 'he' ? 'הערכים שלנו' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {companyValues.map((value, index) => (
              <div
                key={value.id}
                className="group bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 hover:scale-105 p-6"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Value Icon */}
                <div className="text-4xl mb-4 text-center">
                  {value.icon}
                </div>

                {/* Value Title */}
                <h3 
                  className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center"
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                  {value.title}
                </h3>

                {/* Value Description */}
                <p 
                  className="text-white/80 leading-relaxed text-center text-xs md:text-sm"
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                  {value.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-4xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-12 text-center">
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' ? 'בואו נכיר' : "Let's Connect"}
            </h2>
            <p 
              className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' 
                ? 'מעוניינים לשמוע עוד על הפתרונות שלנו? בואו נדבר על איך אנחנו יכולים לעזור לעסק שלכם'
                : "Interested in learning more about our solutions? Let's talk about how we can help your business"
              }
            </p>
            <button 
              className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-cyan-500 hover:scale-105 transition-all duration-300 text-lg"
              onClick={() => window.location.href = '/contact'}
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' ? 'צרו קשר' : 'Contact Us'}
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
