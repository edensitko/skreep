'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
}

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language, t } = useLanguage();
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);

  // Load projects data when language changes
  useEffect(() => {
    const getProjectsData = async (): Promise<ProjectData[]> => {
      try {
        // Dynamically import the translation file
        const messages = await import(`../../../messages/${language}.json`);
        const projectsItems = messages.default?.ourProjects?.projects || messages.ourProjects?.projects;
        if (Array.isArray(projectsItems)) {
          return projectsItems;
        }
      } catch (error) {
        console.warn('Failed to load projects data:', error);
      }
      
      // Fallback data if translation loading fails
      return [
        {
          id: 3,
          slug: 'real-estate-management',
          title: language === 'he' ? 'מערכת ניהול נדל״ן' : 'Real Estate Management System',
          subtitle: language === 'he' ? '500M+ שקל בנכסים' : '500M+ NIS in Assets',
          description: language === 'he' 
            ? 'מערכת ניהול מקיפה עם CRM מותאם, חוזים דיגיטליים ודשבורד אנליטיקה.'
            : 'Comprehensive management system with custom CRM, digital contracts and analytics dashboard.',
          gradient: 'from-green-400/20 to-emerald-500/20',
          accentColor: 'green-400'
        },
        {
          id: 1,
          slug: 'e-commerce-platform',
          title: language === 'he' ? 'פלטפורמת E-commerce' : 'E-commerce Platform',
          subtitle: language === 'he' ? '50,000+ מוצרים' : '50,000+ Products',
          description: language === 'he'
            ? 'פלטפורמת מסחר מלאה עם תשלומים מאובטחים, ניהול מלאי חכם ומערכת המלצות AI.'
            : 'Complete commerce platform with secure payments, smart inventory management and AI recommendation system.',
          gradient: 'from-cyan-400/20 to-blue-500/20',
          accentColor: 'cyan-400'
        },
        {
          id: 2,
          slug: 'healthcare-application',
          title: language === 'he' ? 'אפליקציית בריאות' : 'Healthcare Application',
          subtitle: language === 'he' ? '10,000+ משתמשים פעילים' : '10,000+ Active Users',
          description: language === 'he'
            ? 'אפליקציה לבריאות דיגיטלית עם וידאו קונפרנס מאובטח ומערכת תורים חכמה.'
            : 'Digital health application with secure video conferencing and smart appointment system.',
          gradient: 'from-purple-400/20 to-pink-500/20',
          accentColor: 'purple-400'
        }
      ];
    };

    getProjectsData().then((data) => {
      setProjectsData(data);
    });
  }, [language]);

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

  // FAQ data for SEO
  const faqData = React.useMemo(() => [
    {
      question: language === 'he' ? 'איך אני יכול להתחיל פרויקט עם סקריפ?' : 'How can I start a project with Skreep?',
      answer: language === 'he' 
        ? 'פשוט צרו איתנו קשר דרך הטופס באתר או התקשרו אלינו ישירות. נקבע פגישת ייעוץ ראשונית חינם כדי להבין את הצרכים שלכם.'
        : 'Simply contact us through the form on our website or call us directly. We\'ll schedule a free initial consultation to understand your needs.'
    },
    {
      question: language === 'he' ? 'כמה זמן לוקח לפתח פרויקט?' : 'How long does it take to develop a project?',
      answer: language === 'he'
        ? 'זמן הפיתוח תלוי במורכבות הפרויקט. פרויקטים פשוטים יכולים להיות מוכנים תוך מספר שבועות, בעוד פרויקטים מורכבים יכולים לקחת מספר חודשים.'
        : 'Development time depends on project complexity. Simple projects can be ready in a few weeks, while complex projects may take several months.'
    }
  ], [language]);

  return (
    <>
      <PageSEO 
        pageType="projects"
        title={language === 'he' ? 'פרוייקטים - פרויקטי בינה מלאכותית | סקריפ' : 'projects - AI Projects | Skreep'}
        description={language === 'he' 
          ? 'גלו את הפרויקטים המתקדמים שלנו בתחום הבינה המלאכותית. מערכות ניהול חכמות, פלטפורמות מסחר ואפליקציות בריאות דיגיטליות.'
          : 'Discover our advanced AI projects. Smart management systems, commerce platforms and digital health applications.'
        }
        faqs={faqData}
      />
      <LocalSEO />
      <SEOMeta />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="container mx-auto">
            <div className="text-center relative z-10">
              <h1 
                ref={titleRef}
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {language === 'he' ? 'פרוייקטים ' : 'projects'}
              </h1>
              <p 
                className={`text-xl md:text-2xl text-white/70 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {language === 'he' 
                  ? 'גלו את הפרויקטים המתקדמים שלנו בתחום הבינה המלאכותית ופתרונות טכנולוגיים חדשניים'
                  : 'Discover our advanced AI projects and innovative technological solutions'
                }
              </p>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center">
              {language === 'he' ? 'הפרויקטים שלנו' : 'Our Projects'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <Link 
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group block relative bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 overflow-hidden hover:scale-105 transition-all duration-500"
                >
                  <div className="relative z-10 p-6">
                    {/* Project Image */}
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <Image 
                        src={`/assets/images/project-${project.id}.svg`}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Project Category */}
                    <span 
                      className={`inline-block bg-${project.accentColor}/20 text-${project.accentColor} px-3 py-1 rounded-full text-xs font-medium mb-3`}
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {project.subtitle}
                    </span>

                    {/* Project Title */}
                    <h3 
                      className={`text-xl font-bold text-white mb-3 group-hover:text-${project.accentColor} transition-colors duration-300`}
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p 
                      className="text-white/80 leading-relaxed text-sm mb-4"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {project.description}
                    </p>

                    {/* Project Link Button */}
                    <div className="flex justify-center">
                      <div 
                        className={`bg-gradient-to-l from-${project.accentColor}/10 via-${project.accentColor}/30 to-${project.accentColor}/60 text-white border border-white/20 px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm group-hover:scale-105`}
                      >
                        {language === 'he' ? 'צפה בפרטים' : 'View Details'}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-4xl`}></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-12 text-center">
              <h2 
                className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {language === 'he' ? 'בואו נכיר' : "Let's Connect"}
              </h2>
              <p 
                className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {language === 'he' 
                  ? 'מעוניינים לשמוע עוד על הפתרונות שלנו? בואו נדבר על איך אנחנו יכולים לעזור לעסק שלכם'
                  : "Interested in learning more about our solutions? Let's talk about how we can help your business"
                }
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-cyan-500 hover:scale-105 transition-all duration-300 text-lg"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {language === 'he' ? 'צרו קשר' : 'Contact Us'}
              </Link>

              {/* Background decorative elements */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
