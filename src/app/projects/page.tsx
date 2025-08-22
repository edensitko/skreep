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
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  image: string;
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
          accentColor: 'green-400',
          image: '/assets/images/projects/3.png'
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
          accentColor: 'cyan-400',
          image: '/assets/images/projects/1.png'
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
          accentColor: 'purple-400',
          image: '/assets/images/projects/2.png'
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
      
      <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">

        {/* Hero Section with Background Image */}
        <section className="relative h-[300px] pt-44 pb-20 px-4 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="./assets/images/img/1.png"
              alt=""
              className="w-full h-full object-fill"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <h1 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-4xl md:text-4xl lg:text-5xl mb-4 leading-tight transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ textAlign: 'center' }}
              dir="ltr"
            >
              {language === 'he' ? 'פרוייקטים' : 'Projects'}
            </h1>
            
          </div>
        </section>

        {/* Main Content Container with About Page Glass-morphism Style */}
        <div className="relative bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 mx-4 my-8 overflow-hidden">

          {/* Projects Grid Section */}
          <section className="py-12 px-4 relative z-10">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((project, index) => (
                  <Link 
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group block relative bg-black/20 border border-white/10 rounded-3xl p-6 hover:border-cyan-400/30 transition-all duration-300 hover:bg-black/30"
                  >
                    {/* Project Image */}
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <Image 
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Project Category */}
                    <span 
                      className="inline-block bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium mb-3"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {project.subtitle}
                    </span>

                    {/* Project Title */}
                    <h3 
                      className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p 
                      className="text-white/70 leading-relaxed text-sm mb-4"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {project.description}
                    </p>

                    {/* Project Link Button */}
                    <div className="flex justify-center">
                      <div className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-4 py-2 rounded-full font-semibold transition-all duration-300 text-sm group-hover:scale-105">
                        {language === 'he' ? 'צפה בפרטים' : 'View Details'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Innovation Section */}
        <InnovationSection />

        {/* Contact Form Section */}
        <ContactFormSection />
      </main>
      
      <Footer />
    </>
  );
}
