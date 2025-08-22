'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';
import FAQItem from './FAQItem';
import type { FAQ } from './types';

interface FAQData {
  id: number;
  question: string;
  answer: string;
}

/**
 * FAQ section with user-type specific questions and smooth animations
 * Features accessible accordion interface with keyboard navigation
 */
function FAQSection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [faqData, setFaqData] = useState<FAQData[]>([]);
  const { userType } = useUserType();
  const { language, t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Load FAQ data when language or userType changes
  useEffect(() => {
    const loadFaqData = async () => {
      try {
        const messages = await import(`../../../../messages/${language}.json`);
        const faqSection = messages.default?.faq || messages.faq;
        const translatedFaqData = userType === 'entrepreneurs' 
          ? faqSection?.entrepreneursFaqs
          : faqSection?.businessFaqs;
        
        if (Array.isArray(translatedFaqData) && translatedFaqData.length > 0) {
          setFaqData(translatedFaqData);
          return;
        }
      } catch (error) {
        console.warn('Failed to load FAQ data from translations:', error);
      }
      
      // Fallback data if translation loading fails
      const fallbackFaqs: FAQData[] = userType === 'entrepreneurs' ? [
      {
        id: 1,
        question: language === 'he' ? 'כמה זמן לוקח לפתח MVP עם AI?' : 'How long does it take to develop an MVP with AI?',
        answer: language === 'he' 
          ? 'פיתוח MVP עם AI בסיסי יכול להיות מוכן תוך 2-4 שבועות. זה כולל צ\'אט בוט פשוט, ניתוח נתונים בסיסי ואינטגרציה עם המערכות הקיימות שלך. אנו מתמקדים בפתרון מהיר שיאפשר לך לבדוק את הרעיון בשוק.'
          : 'A basic AI MVP can be ready within 2-4 weeks. This includes a simple chatbot, basic data analysis, and integration with your existing systems. We focus on a quick solution that allows you to test the idea in the market.'
      },
      {
        id: 2,
        question: language === 'he' ? 'איך AI יכול לעזור לי למצוא לקוחות?' : 'How can AI help me find customers?',
        answer: language === 'he'
          ? 'AI יכול לנתח את התנהגות הלקוחות הפוטנציאליים, לזהות דפוסים בנתונים ולחזות מי הכי סביר לרכוש. אנו בונים מערכות שמזהות לידים איכותיים, מתאימות הודעות שיווקיות ומייעלות את תהליך המכירות - מה שיכול להגדיל את שיעור ההמרה ב-40-60%.'
          : 'AI can analyze potential customer behavior, identify patterns in data, and predict who is most likely to purchase. We build systems that identify quality leads, personalize marketing messages, and optimize the sales process - which can increase conversion rates by 40-60%.'
      },
      {
        id: 3,
        question: language === 'he' ? 'כמה זה עולה ליזם מתחיל?' : 'How much does it cost for a startup entrepreneur?',
        answer: language === 'he'
          ? 'אנו מבינים שליזמים מתחילים יש תקציב מוגבל. החבילה הבסיסית שלנו מתחילה מ-1,500₪ לחודש וכוללת את כל הכלים הבסיסיים. בנוסף, אנו מציעים תוכנית הדרגתית שמתחילה עם עלויות נמוכות ועולה בהתאם לצמיחת העסק.'
          : 'We understand that startup entrepreneurs have limited budgets. Our basic package starts at $400 per month and includes all the basic tools. Additionally, we offer a gradual program that starts with low costs and scales according to business growth.'
      },
      {
        id: 4,
        question: language === 'he' ? 'האם אני צריך ידע טכני כדי להשתמש בפתרונות?' : 'Do I need technical knowledge to use the solutions?',
        answer: language === 'he'
          ? 'בכלל לא! אנו מתכננים את הפתרונות שלנו במיוחד ליזמים ללא רקע טכני. הממשק פשוט ואינטואיטיבי, אנו מספקים הדרכה אישית, ויש לנו צוות תמיכה שזמין לעזור בכל שאלה. המטרה היא שתוכל להתמקד בעסק ולא בטכנולוגיה.'
          : 'Not at all! We design our solutions specifically for entrepreneurs without technical backgrounds. The interface is simple and intuitive, we provide personal training, and we have a support team available to help with any questions. The goal is for you to focus on business, not technology.'
      },
      {
        id: 5,
        question: language === 'he' ? 'איך אני יודע שה-AI באמת עובד עבור העסק שלי?' : 'How do I know the AI actually works for my business?',
        answer: language === 'he'
          ? 'אנו מתחילים עם פיילוט קטן שמאפשר לך לראות תוצאות מוחשיות תוך 30 יום. אנו מגדירים KPIs ברורים, מספקים דוחות שבועיים ומראים בדיוק איך ה-AI משפיע על המכירות, חיסכון בזמן או שיפור בשירות הלקוחות. רק אחרי שאתה רואה ערך אמיתי אנו ממשיכים לשלב הבא.'
          : 'We start with a small pilot that allows you to see tangible results within 30 days. We define clear KPIs, provide weekly reports, and show exactly how AI affects sales, time savings, or customer service improvement. Only after you see real value do we proceed to the next stage.'
      }
    ] : [
      {
        id: 1,
        question: language === 'he' ? 'איך AI יכול לשפר את היעילות הארגונית שלנו?' : 'How can AI improve our organizational efficiency?',
        answer: language === 'he'
          ? 'AI יכול לאוטמט תהליכים חוזרים, לנתח נתונים עסקיים מורכבים ולספק תובנות לקבלת החלטות. אנו מיישמים פתרונות שמייעלים את ניהול המלאי, שירות לקוחות, ניתוח ביצועים ועוד. העסקים שלנו רואים שיפור של 30-50% ביעילות התפעולית.'
          : 'AI can automate repetitive processes, analyze complex business data, and provide insights for decision-making. We implement solutions that optimize inventory management, customer service, performance analysis, and more. Our businesses see 30-50% improvement in operational efficiency.'
      },
      {
        id: 2,
        question: language === 'he' ? 'איך מבטיחים אינטגרציה חלקה עם המערכות הקיימות?' : 'How do you ensure smooth integration with existing systems?',
        answer: language === 'he'
          ? 'אנו מתמחים באינטגרציה עם מערכות ERP, CRM ו-BI קיימות. הצוות שלנו מנתח את הארכיטקטורה הנוכחת ובונה גשרים טכנולוגיים שמבטיחים זרימת נתונים חלקה. אנו תומכים בכל הפרוטוקולים הסטנדרטיים ומספקים APIs מותאמים אישית.'
          : 'We specialize in integration with existing ERP, CRM, and BI systems. Our team analyzes the current architecture and builds technological bridges that ensure smooth data flow. We support all standard protocols and provide custom APIs.'
      },
      {
        id: 3,
        question: language === 'he' ? 'מה רמת האבטחה והציות לתקנות בפתרונות שלכם?' : 'What is the level of security and regulatory compliance in your solutions?',
        answer: language === 'he'
          ? 'אבטחת מידע היא בראש סדר העדיפויות שלנו. אנו עובדים לפי תקני ISO 27001, GDPR ו-SOC 2. כל הנתונים מוצפנים ב-256-bit encryption, אנו מבצעים ביקורות אבטחה רבעוניות ומספקים דוחות ציות מפורטים. הפתרונות שלנו עוברים בדיקות חדירה חיצוניות.'
          : 'Information security is our top priority. We work according to ISO 27001, GDPR, and SOC 2 standards. All data is encrypted with 256-bit encryption, we conduct quarterly security audits, and provide detailed compliance reports. Our solutions undergo external penetration testing.'
      },
      {
        id: 4,
        question: language === 'he' ? 'איך מתבצע תהליך ההטמעה והאימון?' : 'How is the implementation and training process carried out?',
        answer: language === 'he'
          ? 'תהליך ההטמעה מתחיל בניתוח מעמיק של התהליכים הקיימים. אנו בונים תוכנית הטמעה מדורגת, מספקים הכשרה מקיפה לצוותים ונותנים תמיכה צמודה במשך 90 הימים הראשונים. כל עובד מקבל הדרכה אישית והמערכת מותאמת לתפקידו הספציפי.'
          : 'The implementation process begins with an in-depth analysis of existing processes. We build a phased implementation plan, provide comprehensive team training, and offer close support for the first 90 days. Each employee receives personal guidance and the system is tailored to their specific role.'
      },
      {
        id: 5,
        question: language === 'he' ? 'איך מודדים ROI ותוצאות מהשקעה ב-AI?' : 'How do you measure ROI and results from AI investment?',
        answer: language === 'he'
          ? 'אנו מגדירים KPIs ברורים עוד לפני ההטמעה ומספקים דשבורד בזמן אמת למעקב אחר התוצאות. אנו מודדים חיסכון בעלויות, שיפור ביעילות, עלייה בהכנסות ושביעות רצון לקוחות. הלקוחות שלנו רואים בממוצע ROI של 300-400% תוך השנה הראשונה.'
          : 'We define clear KPIs before implementation and provide real-time dashboards to track results. We measure cost savings, efficiency improvements, revenue increases, and customer satisfaction. Our clients see an average ROI of 300-400% within the first year.'
      }
    ];
    
    setFaqData(fallbackFaqs);
    };
    
    loadFaqData();
  }, [userType, language]);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  const currentFaqs: ReadonlyArray<FAQData> = useMemo(() => faqData, [faqData]);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const toggleFAQ = useCallback((id: number) => {
    setOpenFAQ(prev => prev === id ? null : id);
  }, []);

  // Intersection Observer for title animation and scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

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

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      className="w-[90%] mx-auto rounded-b-2xl pt-16 md:pt-24 relative overflow-hidden "
      role="region"
      aria-label={t('faq.title')}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('faq.title')}
            </h2>
            <p 
              className={`text-md md:text-xl text-white/70 leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ textAlign: 'center' }}
            >
              {userType === 'entrepreneurs' 
                ? t('faq.entrepreneursSubtitle')
                : t('faq.businessSubtitle')
              }
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 md:space-y-6 ">
            {currentFaqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openFAQ === faq.id}
                onToggle={toggleFAQ}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-99" aria-hidden="true">
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-cyan-400/3 to-purple-400/3 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '4s' }}
          ></div>
          
          {/* Mobile-Optimized Floating Question Marks */}
          <div className="absolute top-8 left-2 text-6xl sm:text-6xl md:text-8xl text-cyan-400/8 sm:text-cyan-400/10 z-0" style={{ rotate: '10deg', transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)` }}>?</div>
          <div className="absolute top-40 right-4 text-7xl sm:text-5xl md:text-6xl text-cyan-400/8 sm:text-cyan-400/10 z-0" style={{ rotate: '15deg', transform: `translateY(${Math.cos(scrollY * 0.01) * 8}px)` }}>?</div>
          <div className="absolute top-25 right-1/3 text-4xl sm:text-5xl md:text-6xl text-cyan-400/8 sm:text-cyan-400/10 z-0" style={{ rotate: '5deg', transform: `translateY(${Math.sin(scrollY * 0.008) * 12}px)` }}>?</div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQSection);
