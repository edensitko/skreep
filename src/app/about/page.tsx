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
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] pt-32 pb-20 px-4 overflow-hidden">
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
      <section className="py-16 px-4">
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center">
            {language === 'he' ? 'הערכים שלנו' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {companyValues.map((value, index) => (
              <div
                key={value.id}
                className="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-white/20 transition-all duration-500 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Icon Section */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-600/20">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/50 to-black/20"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                    {/* Value Icon */}
                    <div className="text-6xl mb-4 drop-shadow-lg">
                      {value.icon}
                    </div>

                    {/* Value Title */}
                    <h3 
                      className="text-xl md:text-2xl font-bold mb-2 text-white drop-shadow-lg text-center"
                      dir="ltr"
                    >
                      {value.title}
                    </h3>

                    {/* Value Description */}
                    <p 
                      className="text-white/90 leading-relaxed text-center text-sm drop-shadow-md"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {value.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <InnovationSection/>
      <ContactFormSection/>
      <Footer />
    </div>
  );
}
