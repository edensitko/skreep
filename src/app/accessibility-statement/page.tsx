'use client';

import { useState, useEffect, useRef } from 'react';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';

export default function AccessibilityStatementPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState('he');
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Detect language from browser or default to Hebrew
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.startsWith('he') ? 'he' : 'en';
      setLanguage(browserLang);
    }
  }, []);

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

  const accessibilityContent = {
    he: {
      title: 'הצהרת נגישות',
      subtitle: 'מחויבים לנגישות דיגיטלית לכל המשתמשים',
      lastUpdated: 'עדכון אחרון: ינואר 2024',
      sections: [
        {
          title: 'מחויבותנו לנגישות',
          content: 'סקריפ מחויבת להנגיש את שירותיה הדיגיטליים לכלל הציבור, כולל אנשים עם מוגבלויות. אנו פועלים ליצירת חוויית משתמש נגישה ושווה לכולם.'
        },
        {
          title: 'תקנים ונהלים',
          content: 'האתר שלנו נבנה בהתאם לתקן הנגישות הישראלי תקן 5568 ולהנחיות WCAG 2.1 ברמת AA. אנו עובדים באופן מתמיד לשיפור הנגישות ועמידה בתקנים הגבוהים ביותר.'
        },
        {
          title: 'תכונות נגישות באתר',
          content: 'האתר כולל תכונות נגישות מתקדמות: ניווט במקלדת, תמיכה בקוראי מסך, ניגודיות גבוהה, גופנים ברורים, תיאורי תמונות חלופיים, וכותרות מובנות היטב.'
        },
        {
          title: 'תמיכה בטכנולוגיות מסייעות',
          content: 'האתר תומך במגוון טכנולוגיות מסייעות כולל קוראי מסך (JAWS, NVDA, VoiceOver), ניווט קולי, מקלדות מותאמות ועוד.'
        },
        {
          title: 'בדיקות ומעקב',
          content: 'אנו מבצעים בדיקות נגישות שוטפות עם משתמשים עם מוגבלויות ומומחי נגישות. האתר נבדק באופן קבוע ומתעדכן לפי הצרכים שמתגלים.'
        },
        {
          title: 'שיפורים מתמשכים',
          content: 'אנו ממשיכים לפתח ולשפר את נגישות האתר. המטרה שלנו היא להגיע לרמת הנגישות הגבוהה ביותר האפשרית עבור כל המשתמשים.'
        },
        {
          title: 'דרכי יצירת קשר לנושאי נגישות',
          content: 'אם נתקלתם בבעיית נגישות באתר או זקוקים לסיוע, אנא צרו קשר: אימייל: accessibility@skreep.com, טלפון: 03-1234567, או דרך טופס יצירת הקשר באתר.'
        },
        {
          title: 'הליך הגשת תלונות',
          content: 'ניתן להגיש תלונה על נגישות לרשות השוויון לאנשים עם מוגבלויות במשרד המשפטים. פרטי יצירת קשר זמינים באתר הרשות: gov.il/disability'
        }
      ]
    },
    en: {
      title: 'Accessibility Statement',
      subtitle: 'Committed to digital accessibility for all users',
      lastUpdated: 'Last updated: January 2024',
      sections: [
        {
          title: 'Our Commitment to Accessibility',
          content: 'Skreep is committed to making its digital services accessible to the general public, including people with disabilities. We work to create an accessible and equal user experience for everyone.'
        },
        {
          title: 'Standards and Procedures',
          content: 'Our website is built according to Israeli accessibility standard 5568 and WCAG 2.1 AA guidelines. We continuously work to improve accessibility and meet the highest standards.'
        },
        {
          title: 'Accessibility Features',
          content: 'The site includes advanced accessibility features: keyboard navigation, screen reader support, high contrast, clear fonts, alternative image descriptions, and well-structured headings.'
        },
        {
          title: 'Assistive Technology Support',
          content: 'The site supports various assistive technologies including screen readers (JAWS, NVDA, VoiceOver), voice navigation, adapted keyboards, and more.'
        },
        {
          title: 'Testing and Monitoring',
          content: 'We conduct ongoing accessibility testing with users with disabilities and accessibility experts. The site is regularly tested and updated according to identified needs.'
        },
        {
          title: 'Continuous Improvements',
          content: 'We continue to develop and improve the accessibility of the site. Our goal is to achieve the highest possible level of accessibility for all users.'
        },
        {
          title: 'Contact for Accessibility Issues',
          content: 'If you encounter an accessibility issue on the site or need assistance, please contact us: Email: accessibility@skreep.com, Phone: 03-1234567, or through the contact form on the site.'
        },
        {
          title: 'Complaint Procedure',
          content: 'Accessibility complaints can be filed with the Equal Rights for People with Disabilities Authority at the Ministry of Justice. Contact details are available on the authority\'s website: gov.il/disability'
        }
      ]
    }
  };

  const content = accessibilityContent[language as keyof typeof accessibilityContent];

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
