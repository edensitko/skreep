'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import RippleGrid from '@/components/Hero/RippleGrid';
import { useUserType } from '@/hooks/useGlobalUserType';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language } = useLanguage();
  const { userType } = useUserType();

  // Color based on user type
  const rippleColor = userType === 'entrepreneurs' ? '#22C55E' : '#00ffff';

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
      description: language === 'he' ? "אנו מובילים את המהפכה הטכנולוגית עם פתרונות AI חדשניים שמשנים את עולם העסקים" : "We lead the technological revolution with innovative AI solutions that transform the business world",
      color: "from-blue-500/20 to-cyan-500/20",
      accentColor: "text-cyan-400"
    },
    {
      id: 2,
      icon: "🎯",
      title: language === 'he' ? "מצוינות" : "Excellence",
      description: language === 'he' ? "כל פרויקט שאנו מבצעים עובר בקרת איכות קפדנית ומספק תוצאות יוצאות דופן" : "Every project we execute undergoes rigorous quality control and delivers exceptional results",
      color: "from-purple-500/20 to-pink-500/20",
      accentColor: "text-purple-400"
    },
    {
      id: 3,
      icon: "🤝",
      title: language === 'he' ? "שותפות" : "Partnership",
      description: language === 'he' ? "אנו בונים קשרים ארוכי טווח עם לקוחותינו ומלווים אותם לאורך כל המסע הדיגיטלי" : "We build long-term relationships with our clients and accompany them throughout their digital journey",
      color: "from-green-500/20 to-emerald-500/20",
      accentColor: "text-green-400"
    },
    {
      id: 4,
      icon: "🌟",
      title: language === 'he' ? "שקיפות" : "Transparency",
      description: language === 'he' ? "תקשורת פתוחה וכנה היא הבסיס לכל פרויקט מוצלח - אנו מעדכנים בכל שלב" : "Open and honest communication is the foundation of every successful project - we update at every step",
      color: "from-orange-500/20 to-yellow-500/20",
      accentColor: "text-orange-400"
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
      
      {/* Hero Section */}
      <section className="relative min-h-[250px] pt-32 pb-2 px-4 overflow-hidden">
        {/* RippleGrid Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <RippleGrid
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor={rippleColor}
            speed={3}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={40}
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textAlign: 'center' }}
          >
            {language === 'he' ? 'אודות סקריפ' : 'About Skreep'}
          </h1>
          <p 
            className={`text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {language === 'he' 
              ? 'מובילים בחדשנות טכנולוגית ופתרונות בינה מלאכותית מתקדמים'
              : 'Leading technological innovation and advanced artificial intelligence solutions'
            }
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-black/40 via-black/20 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>
            
            <div className="text-center max-w-4xl mx-auto relative z-10">
              <div className="space-y-6" dir={language === 'he' ? 'rtl' : 'ltr'}>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent mb-8">
                  {language === 'he' ? 'הסיפור שלנו' : 'Our Story'}
                </h2>
                <p className="text-white/80 leading-relaxed text-lg md:text-xl">
                  {language === 'he' 
                    ? 'סקריפ נוסדה בשנת 2020 מתוך חזון ברור - להפוך את הבינה המלאכותית לנגישה ויעילה עבור כל עסק. החלנו כצוות קטן של מפתחים ומומחי AI, ומאז גדלנו לחברה מובילה בתחום.'
                    : 'Skreep was founded in 2020 with a clear vision - to make artificial intelligence accessible and effective for every business. We started as a small team of developers and AI experts, and have since grown into a leading company in the field.'
                  }
                </p>
                <p className="text-white/80 leading-relaxed text-lg md:text-xl">
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
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br from-white via-cyan-400 to-white bg-clip-text text-transparent">
              {language === 'he' ? 'הערכים שמנחים אותנו' : 'The Values That Guide Us'}
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto" dir={language === 'he' ? 'rtl' : 'ltr'}>
              {language === 'he' 
                ? 'הערכים הבסיסיים שלנו הם הבסיס לכל מה שאנו עושים ומשקפים את המחויבות שלנו למצוינות'
                : 'Our core values are the foundation of everything we do and reflect our commitment to excellence'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {companyValues.map((value, index) => (
              <div
                key={value.id}
                className="group relative bg-gradient-to-br from-black/50 via-black/40 to-black/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-400/10 transition-all duration-700 cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-30`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-cyan-400/10 rounded-full blur-lg"></div>
                
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                      <span className="text-3xl">{value.icon}</span>
                    </div>
                    <div>
                      <h3 
                        className={`text-2xl md:text-3xl font-bold ${value.accentColor} group-hover:scale-105 transition-transform duration-300`}
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        {value.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <p 
                      className="text-white/85 leading-relaxed text-base md:text-lg group-hover:text-white transition-colors duration-300"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {value.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={`mt-6 h-1 bg-gradient-to-r ${value.color.replace('/20', '/60')} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color.replace('/20', '/5')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">100+</div>
              <div className="text-white/70 text-sm md:text-base">{language === 'he' ? 'פרויקטים מוצלחים' : 'Successful Projects'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">5+</div>
              <div className="text-white/70 text-sm md:text-base">{language === 'he' ? 'שנות ניסיון' : 'Years Experience'}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-white/70 text-sm md:text-base">{language === 'he' ? 'תמיכה מלאה' : 'Full Support'}</div>
            </div>
          </div>
        </div>
      </section>



      <InnovationSection/>
      <ContactFormSection/>
      <Footer />
    </div>
  );
}
