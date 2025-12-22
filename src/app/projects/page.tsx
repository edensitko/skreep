'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import PageHero from '@/components/Layout/PageHero';
import ProjectsShowcaseSection from '@/components/Sections/ProjectsShowcaseSection';

export default function ProjectsPage() {
  const { language } = useLanguage();

  // FAQ data for SEO
  const faqData = React.useMemo(
    () => [
      {
        question:
          language === 'he'
            ? 'איך אני יכול להתחיל פרויקט עם סקריפ?'
            : 'How can I start a project with Skreep?',
        answer:
          language === 'he'
            ? 'פשוט צרו איתנו קשר דרך הטופס באתר או התקשרו אלינו ישירות. נקבע פגישת ייעוץ ראשונית חינם כדי להבין את הצרכים שלכם.'
            : "Simply contact us through the form on our website or call us directly. We'll schedule a free initial consultation to understand your needs.",
      },
      {
        question:
          language === 'he'
            ? 'כמה זמן לוקח לפתח פרויקט?'
            : 'How long does it take to develop a project?',
        answer:
          language === 'he'
            ? 'זמן הפיתוח תלוי במורכבות הפרויקט. פרויקטים פשוטים יכולים להיות מוכנים תוך מספר שבועות, בעוד פרויקטים מורכבים יכולים לקחת מספר חודשים.'
            : 'Development time depends on project complexity. Simple projects can be ready in a few weeks, while complex projects may take several months.',
      },
    ],
    [language]
  );

  return (
    <div className="min-h-screen bg-black">
      <PageSEO
        pageType="projects"
        title={
          language === 'he'
            ? 'פרויקטים - דוגמאות עבודות בינה מלאכותית'
            : 'Projects - AI Work Examples | Skreep'
        }
        description={
          language === 'he'
            ? 'דוגמאות לפרויקטים שפיתחנו בתחום הבינה המלאכותית. מערכות ניהול חכמות, פלטפורמות מסחר ואפליקציות בריאות דיגיטליות.'
            : 'Examples of AI projects we developed. Smart management systems, commerce platforms and digital health applications.'
        }
        faqs={faqData}
      />
      <LocalSEO />
      <SEOMeta />

      {/* Hero Section with RippleGrid */}
      <PageHero
        title={language === 'he' ? 'הפרויקטים שלנו' : 'Our Projects'}
        subtitle={
          language === 'he'
            ? 'פתרונות דיגיטליים מתקדמים שיצרנו עבור לקוחותינו'
            : 'Advanced digital solutions we created for our clients'
        }
        language={language as 'he' | 'en'}
      />

      {/* Projects Carousel Section */}
      <ProjectsShowcaseSection />

      {/* Innovation Section */}
      <InnovationSection />

      {/* Contact Form Section */}
      <ContactFormSection />
    </div>
  );
}
