'use client';

import React from 'react';

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: "🔍",
      title: "בינה מלאכותית",
      subtitle: "פתרונות מתקדמים",
      description: "פיתוח מערכות AI מתקדמות לעסקים, כולל עיבוד שפה טבעית וניתוח נתונים חכם",
      delay: 0
    },
    {
      id: 2,
      icon: "🎯",
      title: "אוטומציה חכמה",
      subtitle: "תהליכים אוטומטיים",
      description: "יצירת תהליכי עבודה אוטומטיים המשפרים יעילות ומפחיתים עלויות תפעול",
      delay: 100
    },
    {
      id: 3,
      icon: "💬",
      title: "צ'אט בוטים",
      subtitle: "שירות לקוחות 24/7",
      description: "פיתוח צ'אט בוטים חכמים המספקים שירות לקוחות מקצועי בכל שעות היממה",
      delay: 200
    },
    {
      id: 4,
      icon: "💭",
      title: "ניתוח נתונים",
      subtitle: "תובנות עסקיות",
      description: "ניתוח מתקדם של נתונים עסקיים להפקת תובנות ושיפור קבלת החלטות",
      delay: 300
    },
    {
      id: 5,
      icon: "⚙️",
      title: "אינטגרציה",
      subtitle: "חיבור מערכות",
      description: "אינטגרציה חלקה של פתרונות AI עם המערכות הקיימות בארגון",
      delay: 400
    },
    {
      id: 6,
      icon: "🤖",
      title: "ייעוץ טכנולוגי",
      subtitle: "הדרכה מקצועית",
      description: "ייעוץ מקצועי והדרכה לצוותים ביישום טכנולוגיות AI מתקדמות",
      delay: 500
    }
  ];

  return (
    <section className="home-one-service-wrapper w-[95%] mt-5 mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-4xl before:absolute before:inset-0 before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 active:backdrop-blur-[80px] group cursor-pointer">
      <div className="mx-auto theme-container container px-4 py-16 md:py-24">
        <div className="w-full relative z-10">
          {/* Title Area */}
          <div className="flex justify-center w-full title-area mb-16">
            <div className="flex flex-col items-center">

              <div className="text-center">
                <h2 className="w-full font-bold text-center bg-gradient-to-r from-white/90 via-white-50 to-white/10 bg-clip-text text-transparent text-3xl md:text-3xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out opacity-100 translate-y-0" dir="rtl">
                  פתרונות <span className="text-cyan-400">בינה מלאכותית</span><br />
                  מתקדמים לעסק שלך
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto" dir="rtl">
                  אנו מספקים פתרונות AI מותאמים אישית שיעזרו לעסק שלך להתקדם ולהשיג יעדים
                </p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="service-item p-6 md:p-8 relative group bg-gradient-to-br from-black/40 via-black/20 to-black/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 overflow-hidden hover:backdrop-blur-2xl hover:bg-gradient-to-br hover:from-black/30 hover:via-black/10 hover:to-white/5 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-black/10 before:opacity-40 hover:before:opacity-70 after:absolute after:inset-0 after:bg-gradient-to-tl after:from-cyan-400/5 after:via-transparent after:to-purple-400/5 after:opacity-0 hover:after:opacity-30 cursor-pointer"
                style={{
                  animationDelay: `${service.delay}ms`
                }}
              >
                {/* Icon */}
                <div className="service-item-ico w-16 h-16 rounded-xl flex justify-center items-center mb-6 bg-gradient-to-br from-cyan-400 to-cyan-500 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-400/20">
                  <div className="text-white text-2xl">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-3 font-bold text-white text-xl leading-tight group-hover:text-cyan-100 transition-colors duration-300" dir="rtl">
                    {service.title}
                  </h3>
                  <h4 className="mb-4 font-medium text-cyan-400/80 text-sm group-hover:text-cyan-300 transition-colors duration-300" dir="rtl">
                    {service.subtitle}
                  </h4>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed text-sm" dir="rtl">
                    {service.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400/60 rounded-full group-hover:bg-cyan-400 transition-colors duration-300"></div>
                <div className="absolute top-6 right-6 w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 border border-cyan-400/30 transform rotate-45 group-hover:border-cyan-400/60 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle floating shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-2xl"></div>
        
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>
    </section>
  );
}
