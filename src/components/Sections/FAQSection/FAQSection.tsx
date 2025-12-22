'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedList from '../../UI/AnimatedList';
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
  
  const [selectedFAQ, setSelectedFAQ] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
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
      },
      {
        id: 6,
        question: language === 'he' ? 'מה קורה אם הפתרון לא מתאים לי?' : 'What happens if the solution doesn\'t fit my needs?',
        answer: language === 'he'
          ? 'אנו מציעים תקופת ניסיון של 30 יום עם החזר מלא אם אתה לא מרוצה. בנוסף, אנו מתאימים את הפתרון לצרכים הספציפיים שלך ומספקים תמיכה רציפה. המטרה שלנו היא שתצליח, ולכן אנו עושים הכל כדי להבטיח שהפתרון יעבוד בצורה מושלמת עבורך.'
          : 'We offer a 30-day trial period with full refund if you\'re not satisfied. Additionally, we customize the solution to your specific needs and provide ongoing support. Our goal is for you to succeed, so we do everything to ensure the solution works perfectly for you.'
      },
      {
        id: 7,
        question: language === 'he' ? 'איך AI יכול לעזור לי לחסוך זמן ביום יום?' : 'How can AI help me save time in daily operations?',
        answer: language === 'he'
          ? 'AI יכול לאוטמט משימות חוזרות כמו מענה לשאלות לקוחות, ניהול לוחות זמנים, עיבוד הזמנות וניתוח נתונים. לדוגמה, צ\'אט בוט יכול לטפל ב-80% מהפניות הבסיסיות, מערכת ניהול אוטומטית יכולה לתזמן פגישות ולשלוח תזכורות, ומערכת ניתוח יכולה להכין דוחות אוטומטיים. זה יכול לחסוך לך 3-5 שעות ביום.'
          : 'AI can automate repetitive tasks like answering customer questions, managing schedules, processing orders, and analyzing data. For example, a chatbot can handle 80% of basic inquiries, an automated management system can schedule meetings and send reminders, and an analysis system can prepare automatic reports. This can save you 3-5 hours per day.'
      },
      {
        id: 8,
        question: language === 'he' ? 'איך מתחילים עם פרויקט AI ראשון?' : 'How do I start with my first AI project?',
        answer: language === 'he'
          ? 'אנו מתחילים עם פגישת ייעוץ חינמית כדי להבין את הצרכים שלך. אחר כך אנו מזהים את התחום הכי מתאים להתחיל בו - בדרך כלל משהו פשוט כמו צ\'אט בוט או אוטומציה של תהליך אחד. אנו בונים MVP קטן תוך 2-3 שבועות, בודקים שהוא עובד, ורק אז מרחיבים. הגישה שלנו היא צעדים קטנים עם תוצאות מהירות.'
          : 'We start with a free consultation meeting to understand your needs. Then we identify the most suitable area to begin with - usually something simple like a chatbot or automation of one process. We build a small MVP within 2-3 weeks, test that it works, and only then expand. Our approach is small steps with quick results.'
      },
      {
        id: 9,
        question: language === 'he' ? 'מה ההבדל בין AI לאוטומציה רגילה?' : 'What\'s the difference between AI and regular automation?',
        answer: language === 'he'
          ? 'אוטומציה רגילה עובדת לפי כללים קבועים - אם קורה X אז עשה Y. AI יכול ללמוד מנתונים, להתאים את עצמו למצבים חדשים ולקבל החלטות מורכבות. לדוגמה, אוטומציה רגילה תשלח אימייל אוטומטי לכל לקוח, בעוד AI יכול להתאים את התוכן לכל לקוח בהתאם להיסטוריה שלו, העדפותיו והתנהגותו.'
          : 'Regular automation works according to fixed rules - if X happens then do Y. AI can learn from data, adapt to new situations, and make complex decisions. For example, regular automation will send an automatic email to every customer, while AI can customize the content for each customer based on their history, preferences, and behavior.'
      },
      {
        id: 10,
        question: language === 'he' ? 'איך מבטיחים שה-AI יישאר מעודכן?' : 'How do you ensure the AI stays up-to-date?',
        answer: language === 'he'
          ? 'אנו מעדכנים את מודלי ה-AI באופן רציף עם נתונים חדשים ומשפרים את הביצועים שלהם. יש לנו מערכת ניטור אוטומטית שבודקת את איכות התוצאות ומתריעה אם יש ירידה בביצועים. בנוסף, אנו עוקבים אחר החידושים הטכנולוגיים ומשלבים אותם במערכות הקיימות. כל עדכון נבדק בסביבת פיתוח לפני שהוא מגיע לייצור.'
          : 'We continuously update AI models with new data and improve their performance. We have an automatic monitoring system that checks the quality of results and alerts if there\'s a performance decline. Additionally, we follow technological innovations and integrate them into existing systems. Every update is tested in a development environment before reaching production.'
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
      },
      {
        id: 6,
        question: language === 'he' ? 'איך מתמודדים עם שינויים טכנולוגיים מהירים?' : 'How do you handle rapid technological changes?',
        answer: language === 'he'
          ? 'אנו מעדכנים את הפתרונות שלנו באופן רציף ומתאימים אותם לטכנולוגיות החדשות ביותר. הצוות שלנו עוקב אחר המגמות בתחום ה-AI ומיישם עדכונים אוטומטיים. כל לקוח מקבל גישה לעדכונים החדשים ללא עלות נוספת, כך שהמערכת שלו תמיד תישאר מתקדמת ורלוונטית.'
          : 'We continuously update our solutions and adapt them to the latest technologies. Our team follows AI trends and implements automatic updates. Every client gets access to new updates at no additional cost, ensuring their system always remains advanced and relevant.'
      },
      {
        id: 7,
        question: language === 'he' ? 'מה התמיכה הטכנית שאתם מספקים?' : 'What technical support do you provide?',
        answer: language === 'he'
          ? 'אנו מספקים תמיכה טכנית 24/7 בעברית ובאנגלית. יש לנו צוות מומחים זמין לטלפון, צ\'אט ואימייל. בנוסף, אנו מציעים הדרכות אישיות, מדריכים מפורטים ובסיס ידע מקיף. לכל לקוח יש מנהל חשבון ייעודי שמכיר את הפרויקט ויכול לעזור בכל בעיה או שאלה.'
          : 'We provide 24/7 technical support in Hebrew and English. We have a team of experts available by phone, chat, and email. Additionally, we offer personal training, detailed guides, and a comprehensive knowledge base. Each client has a dedicated account manager who knows the project and can help with any issue or question.'
      },
      {
        id: 8,
        question: language === 'he' ? 'איך מתמודדים עם תקלות במערכת?' : 'How do you handle system failures?',
        answer: language === 'he'
          ? 'יש לנו מערכת גיבוי מתקדמת ותוכנית התאוששות מאסונות. כל הנתונים מגובים בזמן אמת במספר מיקומים גיאוגרפיים. במקרה של תקלה, המערכת עוברת אוטומטיות לשרתי גיבוי תוך פחות מ-30 שניות. אנו מבטיחים זמינות של 99.9% ויש לנו SLA ברור עם פיצויים במקרה של אי עמידה ביעדים.'
          : 'We have an advanced backup system and disaster recovery plan. All data is backed up in real-time across multiple geographic locations. In case of failure, the system automatically switches to backup servers within less than 30 seconds. We guarantee 99.9% uptime and have a clear SLA with compensation in case of not meeting targets.'
      },
      {
        id: 9,
        question: language === 'he' ? 'מה העלות החודשית לתחזוקה?' : 'What is the monthly maintenance cost?',
        answer: language === 'he'
          ? 'עלות התחזוקה תלויה בגודל המערכת ומורכבותה. החבילה הבסיסית מתחילה מ-800₪ לחודש וכוללת תמיכה טכנית, עדכונים, גיבויים ומעקב ביצועים. לעסקים גדולים יותר יש חבילות מותאמות אישית. אנו מציעים גם אפשרות לתשלום שנתי עם הנחה של 15%.'
          : 'Maintenance cost depends on system size and complexity. The basic package starts at $200 per month and includes technical support, updates, backups, and performance monitoring. For larger businesses, we have custom packages. We also offer annual payment option with 15% discount.'
      },
      {
        id: 10,
        question: language === 'he' ? 'איך מבטיחים סודיות המידע?' : 'How do you ensure information confidentiality?',
        answer: language === 'he'
          ? 'אנו חותמים על הסכמי סודיות מחמירים עם כל הלקוחות. כל הנתונים מוצפנים ב-256-bit encryption, אנו עובדים לפי תקני ISO 27001 ו-GDPR. הצוות שלנו עובר הכשרה בנושא אבטחת מידע ואנו מבצעים ביקורות אבטחה רבעוניות. הנתונים נשמרים בשרתים מאובטחים בישראל ולא מועברים לצדדים שלישיים.'
          : 'We sign strict confidentiality agreements with all clients. All data is encrypted with 256-bit encryption, we work according to ISO 27001 and GDPR standards. Our team undergoes information security training and we conduct quarterly security audits. Data is stored on secure servers in Israel and is not transferred to third parties.'
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
  
  const faqQuestions = useMemo(() => 
    currentFaqs.map(faq => faq.question), 
    [currentFaqs]
  );
  
  const faqAnswers = useMemo(() => 
    currentFaqs.map(faq => faq.answer), 
    [currentFaqs]
  );

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleFAQSelect = useCallback((item: string, index: number) => {
    setSelectedFAQ(item);
    setSelectedIndex(index);
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
      className="w-[95%] mx-auto rounded-b-2xl pt-16 md:pt-24 relative overflow-hidden "
      role="region"
      aria-label={t('faq.title')}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              
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
          <div className="w-full max-w-4xl mx-auto">
            <AnimatedList
              items={faqQuestions}
              answers={faqAnswers}
              onItemSelect={handleFAQSelect}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
              expandable={true}
              className="w-full"
              itemClassName="hover:bg-cyan-400/10 transition-colors duration-200"
              initialSelectedIndex={-1}
            />
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
