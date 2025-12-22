'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageHero from '@/components/Layout/PageHero';

export default function AccessibilityStatementPage() {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

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
    <div className="min-h-screen bg-black">
      <PageSEO 
        pageType="about"
        title={content.title}
        description={content.subtitle}
      />
      <LocalSEO />
      <SEOMeta />

      <Header />

      {/* Hero Section with RippleGrid */}
      <PageHero 
        title={content.title}
        subtitle={content.subtitle}
        language={language as 'he' | 'en'}
      />

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <p 
            className="text-sm md:text-base text-white/60 mb-8 text-center"
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {content.lastUpdated}
          </p>

          <div 
            ref={contentRef}
            className="bg-gradient-to-br from-black/40 via-black/20 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden p-8 md:p-12"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-8" dir={language === 'he' ? 'rtl' : 'ltr'}>
              {content.sections.map((section, index) => (
                <div 
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent">
                    {section.title}
                  </h2>
                  <p className="text-white/80 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
