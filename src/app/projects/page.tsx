'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import PageHero from '@/components/Layout/PageHero';

interface ProjectCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageBg: string;
  delay: number;
}

const projectsData: ProjectCard[] = [
  {
    id: 'whatsapp-chatbot',
    title: "צ'אטבוט AI לוואטסאפ",
    subtitle: '24/7 שירות לקוחות אוטומטי',
    description: "צ'אטבוט חכם המשולב בוואטסאפ עם בינה מלאכותית מתקדמת לטיפול בפניות לקוחות, מענה אוטומטי 24/7 ועיבוד שפה טבעית מתקדם.",
    features: ['מענה אוטומטי 24/7', 'עיבוד שפה טבעית', 'אינטגרציה מלאה', 'דוחות וניתוח'],
    imageBg: '/assets/images/projects/1.png',
    delay: 0
  },
  {
    id: 'task-organizer',
    title: 'מארגן משימות חכם',
    subtitle: 'מבוסס AI ו-NLP',
    description: 'אפליקציה חכמה לארגון משימות עם עיבוד שפה טבעית, זיהוי דפוסים אוטומטי וסיווג משימות מתקדם בעברית ואנגלית.',
    features: ['עיבוד שפה טבעית', 'זיהוי דפוסים', 'סיווג אוטומטי', 'תמיכה דו-לשונית'],
    imageBg: '/assets/images/projects/2.png',
    delay: 100
  },
  {
    id: 'chatbot-builder',
    title: "בונה צ'אטבוטים חכם",
    subtitle: 'יצירת סוכנים מותאמים אישית',
    description: "פלטפורמה מתקדמת ליצירת צ'אטבוטים וסוכני AI מותאמים אישית עם יכולות למידה מתקדמות ושילוב קל במערכות קיימות.",
    features: ['יצירה ללא קוד', 'למידה מתקדמת', 'אינטגרציות קלות', 'התאמה אישית'],
    imageBg: '/assets/images/projects/3.png',
    delay: 200
  }
];

const projectsDataEn: ProjectCard[] = [
  {
    id: 'whatsapp-chatbot',
    title: 'WhatsApp AI Chatbot',
    subtitle: '24/7 Automated Customer Service',
    description: 'Smart chatbot integrated with WhatsApp using advanced AI for handling customer inquiries, 24/7 automated responses and advanced natural language processing.',
    features: ['24/7 Auto Response', 'Natural Language Processing', 'Full Integration', 'Reports & Analytics'],
    imageBg: '/assets/images/projects/1.png',
    delay: 0
  },
  {
    id: 'task-organizer',
    title: 'Smart Task Organizer',
    subtitle: 'AI & NLP Based',
    description: 'Smart task organization app with natural language processing, automatic pattern recognition and advanced task classification in Hebrew and English.',
    features: ['Natural Language Processing', 'Pattern Recognition', 'Auto Classification', 'Bilingual Support'],
    imageBg: '/assets/images/projects/2.png',
    delay: 100
  },
  {
    id: 'chatbot-builder',
    title: 'Smart Chatbot Builder',
    subtitle: 'Custom Agent Creation',
    description: 'Advanced platform for creating custom chatbots and AI agents with advanced learning capabilities and easy integration with existing systems.',
    features: ['No-Code Creation', 'Advanced Learning', 'Easy Integrations', 'Customization'],
    imageBg: '/assets/images/projects/3.png',
    delay: 200
  }
];

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

  const currentProjectsData = language === 'he' ? projectsData : projectsDataEn;

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

      {/* Projects Grid Section - Same style as Services */}
      <section className="relative py-8 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Projects Grid - 2 Columns Mobile, 3 Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {currentProjectsData.map((project) => {
              // Truncate description to 300 words
              const truncateText = (text: string, maxWords: number = 25) => {
                const words = text.split(' ');
                if (words.length <= maxWords) return text;
                return words.slice(0, maxWords).join(' ') + '...';
              };

              return (
                <div
                  key={project.id}
                  className="relative bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group hover:border-cyan-400/30 hover:shadow-cyan-400/20 transition-all duration-500 flex flex-col h-[450px] md:h-[500px]"
                  style={{
                    animationDelay: `${project.delay}ms`
                  }}
                >
                  {/* Top Half - Image with Shadow Overlay */}
                  <div className="relative h-1/2 overflow-hidden">
                    <img
                      src={project.imageBg}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Black shadow gradient from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Additional subtle overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>

                  {/* Bottom Half - Content */}
                  <div className="flex flex-col justify-between h-1/2 p-4 md:p-6">
                    {/* Title and Description in Center */}
                    <div className="flex-1 flex flex-col justify-center text-center">
                      <span className="inline-block bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium mb-3 mx-auto">
                        {project.subtitle}
                      </span>
                      
                      <h3 
                        className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        {project.title}
                      </h3>

                      <p 
                        className="text-white/80 leading-relaxed text-xs md:text-sm lg:text-base mb-4 md:mb-6"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        {truncateText(project.description, 20)}
                      </p>
                    </div>

                    {/* View Details Button at Bottom */}
                    <div className="flex justify-center">
                      <button
                        className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 flex items-center gap-2"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      >
                        <span className="text-xs md:text-sm lg:text-base">
                          {language === 'he' ? 'פרטים נוספים' : 'View Details'}
                        </span>
                        <svg 
                          className={`w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1 ${language === 'he' ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <InnovationSection />

      {/* Contact Form Section */}
      <ContactFormSection />
    </div>
  );
}
