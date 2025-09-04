'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';

export default function PrivacyPolicyPage() {
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

  const privacyContent = {
    he: {
      title: 'מדיניות פרטיות',
      subtitle: 'הגנה על הפרטיות שלכם היא בראש סדר העדיפויות שלנו',
      lastUpdated: 'עדכון אחרון: ינואר 2024',
      sections: [
        {
          title: 'כללי',
          content: 'אנו מכבדים את פרטיות המשתמשים באתר ("האתר") ומתחייבים לשמור עליה בהתאם לחוקי הגנת הפרטיות החלים. מדיניות זו נועדה להסביר אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם, עם מי אנו משתפים אותם ומהן זכויותיך כמשתמש.\n\nהשימוש באתר מהווה הסכמה למדיניות פרטיות זו.'
        },
        {
          title: 'איסוף מידע',
          content: 'בעת שימושך באתר אנו עשויים לאסוף:\n• מידע שמסרת מיוזמתך: שם, כתובת דוא״ל, טלפון, פרטי תשלום וכד\'.\n• מידע טכני ואנליטי: כתובת IP, סוג דפדפן, מערכת הפעלה, מיקום גיאוגרפי משוער, נתוני שימוש ותעבורת רשת.\n• עוגיות (Cookies) וטכנולוגיות דומות: לאיסוף נתונים סטטיסטיים, שיפור חווית המשתמש, התאמת פרסום ושמירת העדפות.'
        },
        {
          title: 'שימוש במידע',
          content: 'המידע שנאסף משמש אותנו ל:\n1. מתן שירות ותפעול האתר.\n2. שיפור חווית המשתמש והתוכן באתר.\n3. שליחת הודעות ועדכונים (בכפוף להסכמתך).\n4. ניתוח נתוני שימוש באמצעות כלי אנליטיקה (כגון Google Analytics).\n5. עמידה בדרישות חוקיות ורגולטוריות.'
        },
        {
          title: 'שיתוף מידע עם צדדים שלישיים',
          content: '• אנו לא נמכור או נשכיר מידע אישי לצדדים שלישיים.\n• ייתכן ששותפינו הטכנולוגיים (ספקי ענן, שירותי תשלום, מערכות אנליטיקה ופרסום) יקבלו גישה למידע – אך רק לצורך מתן השירותים.\n• במקרה שנדרש על פי חוק, ייתכן שנעביר מידע לרשויות מוסמכות.'
        },
        {
          title: 'אבטחת מידע',
          content: '• אנו מיישמים אמצעי אבטחה סבירים (טכנולוגיים וארגוניים) כדי להגן על המידע מפני גישה בלתי מורשית, שימוש לרעה או אובדן.\n• עם זאת, אין באפשרותנו להבטיח הגנה מוחלטת.'
        },
        {
          title: 'שמירת מידע (Data Retention)',
          content: '• נשמור מידע אישי רק כל עוד הוא דרוש לצורך המטרות המפורטות במדיניות זו.\n• מידע אנליטי עשוי להישמר באופן אנונימי לצרכי סטטיסטיקה בלבד.\n• ניתן לבקש מחיקה או אנונימיזציה של מידע אישי בהתאם לזכויותיך (ראה סעיף "זכויות המשתמש").'
        },
        {
          title: 'זכויות המשתמש',
          content: 'בהתאם לחוקי הפרטיות החלים (כולל חוק הגנת הפרטיות הישראלי, GDPR, ו־CCPA), עומדות לרשותך הזכויות הבאות:\n• עיון: לקבל עותק מהמידע שנאסף אודותיך.\n• תיקון: לדרוש עדכון או תיקון של נתונים לא נכונים.\n• מחיקה: לבקש מחיקת מידע אישי ("הזכות להישכח").\n• התנגדות: להתנגד לעיבוד מידע אישי למטרות שיווק.\n• ניידות מידע: לקבל את המידע בפורמט נגיש להעברה לגוף אחר (GDPR).\n• Opt-Out: לתושבי קליפורניה (CCPA) הזכות לבקש שלא נאסוף או נשתף מידע מסוים.\n\nלביצוע זכויות אלה, ניתן לפנות אלינו בפרטי הקשר שלהלן.'
        },
        {
          title: 'עוגיות (Cookies)',
          content: 'אנו משתמשים בעוגיות ובטכנולוגיות דומות לשם:\n• תפעול תקין של האתר.\n• ניתוח ושיפור ביצועי האתר.\n• התאמת פרסומות ותוכן.\n\nבאפשרותך לנהל או לחסום עוגיות דרך הגדרות הדפדפן שלך.'
        },
        {
          title: 'עדכונים למדיניות פרטיות',
          content: 'מדיניות זו עשויה להשתנות מעת לעת. נעדכן על שינויים מהותיים באמצעות פרסום גרסה מעודכנת באתר.'
        },
        {
          title: 'יצירת קשר',
          content: 'לשאלות, בקשות או בירורים הנוגעים למדיניות פרטיות זו, ניתן ליצור קשר בכתובת:\n📧 info@skreep.com\n📞 03-1234567'
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'Protecting your privacy is our top priority',
      lastUpdated: 'Last updated: January 2024',
      sections: [
        {
          title: 'General Information',
          content: 'Skreep is committed to protecting your privacy and safeguarding your personal information. This privacy policy explains how we collect, use, and protect your information.'
        },
        {
          title: 'Information Collection',
          content: 'We collect information that you provide to us directly, such as name, email address, and phone number when you contact us or use our services.'
        },
        {
          title: 'Use of Information',
          content: 'The information we collect is used to provide services, improve your experience, communicate with you, and develop personalized solutions.'
        },
        {
          title: 'Information Sharing',
          content: 'We do not share your personal information with third parties without your explicit consent, except in cases required by law.'
        },
        {
          title: 'Information Security',
          content: 'We employ advanced security measures to protect your information, including encryption, secure backups, and restricted access controls.'
        },
        {
          title: 'Your Rights',
          content: 'You have the right to access, update, delete, or limit the use of your information. You can contact us at any time to exercise these rights.'
        },
        {
          title: 'Policy Updates',
          content: 'We may update this privacy policy from time to time. Changes will be posted on our website and take effect immediately upon publication.'
        },
        {
          title: 'Contact Us',
          content: 'For questions or requests regarding the privacy policy, you can contact us at: info@skreep.com or phone: 03-1234567'
        }
      ]
    }
  };

  const content = privacyContent[language as keyof typeof privacyContent];

  return (
    <>
      <PageSEO 
        pageType="about"
        title={content.title}
        description={content.subtitle}
      />
      <LocalSEO />
      <SEOMeta />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="text-center mb-16">
              <h1 
                ref={titleRef}
                className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 transition-all duration-1000 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                } bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent`}
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {content.title}
              </h1>
              <p 
                className={`text-xl md:text-2xl lg:text-3xl text-white/90 transition-all duration-1000 delay-200 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {content.subtitle}
              </p>
              <p 
                className={`text-sm md:text-base text-white/60 mt-4 transition-all duration-1000 delay-300 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {content.lastUpdated}
              </p>
            </div>

            {/* Content */}
            <div className="relative">
              <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden">
                <div className="relative z-10 p-8 md:p-12 lg:p-16">
                  <div className="space-y-8" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {content.sections.map((section, index) => (
                      <div 
                        key={index}
                        className={`transition-all duration-1000 delay-${(index + 4) * 100} ${
                          isVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                        }`}
                      >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent">
                          {section.title}
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
