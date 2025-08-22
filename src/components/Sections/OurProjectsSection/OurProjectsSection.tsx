'use client';

import React, { memo, useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectCard from './ProjectCard';
import type { ProjectSection } from './types';

/**
 * Our Projects section with vertical carousel
 */
function OurProjectsSection() {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectsData, setProjectsData] = useState<ProjectSection[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update projects data when language changes
  useEffect(() => {
    const getProjectsData = async (): Promise<ProjectSection[]> => {
      try {
        // Dynamically import the translation file
        const messages = await import(`../../../../messages/${language}.json`);
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
          slug: 'whatsapp-chatbot-ai',
          title: language === 'he' ? 'צ\'אטבוט AI לוואטסאפ' : 'WhatsApp AI Chatbot',
          subtitle: language === 'he' ? '24/7 שירות לקוחות אוטומטי' : '24/7 Automated Customer Service',
          description: language === 'he' 
            ? 'צ\'אטבוט חכם המשולב בוואטסאפ עם בינה מלאכותית מתקדמת לטיפול בפניות לקוחות.'
            : 'Smart chatbot integrated with WhatsApp featuring advanced AI for handling customer inquiries.',
          gradient: 'from-blue-400/20 to-purple-500/20',
          accentColor: 'blue-400',
          image: '/assets/images/projects/1.png'
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
          image: '/assets/images/projects/1.png'
        }
      ];
    };

    getProjectsData().then((data) => {
      setProjectsData(data);
    });
  }, [language]);

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const cardHeight = carouselRef.current.scrollHeight / projectsData.length;
      carouselRef.current.scrollTo({
        top: cardHeight * index,
        behavior: 'smooth'
      });
    }
  };

  const nextCard = () => {
    if (projectsData.length === 0) return;
    const nextIndex = (currentIndex + 1) % projectsData.length;
    scrollToCard(nextIndex);
  };

  const prevCard = () => {
    if (projectsData.length === 0) return;
    const prevIndex = currentIndex === 0 ? projectsData.length - 1 : currentIndex - 1;
    scrollToCard(prevIndex);
  };

  return (
    <section 
      className="w-[90%] mx-auto py-16 md:py-24 relative overflow-hidden"
      role="region"
      aria-label={t('ourProjects.title')}
    >
      <div className="container mx-auto px-10 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-2">
            <h1 
              className="font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out"
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('ourProjects.title')}
            </h1>
            <p 
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto text-center"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {t('ourProjects.subtitle')}
            </p>
          </div>

          {/* Vertical Carousel */}
          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="carousel-container h-[500px] lg:h-[600px] overflow-y-auto scroll-smooth"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
            >
              <div className="space-y-10 lg:space-y-24">
                {projectsData.map((section, index) => (
                  <div key={section.id} className="min-h-[400px] lg:min-h-[400px]  items-center">
                    <ProjectCard
                      index={index}
                      language={language}
                      section={section}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
              {/* Up Arrow */}
              <button
                onClick={prevCard}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label={language === 'he' ? 'פרויקט קודם' : 'Previous project'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Down Arrow */}
              <button
                onClick={nextCard}
                className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                aria-label={language === 'he' ? 'פרויקט הבא' : 'Next project'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* View More Button - Centered */}
          <div className="flex justify-center mt-16">
            <button 
              className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-3 rounded-full font-semibold flex items-center gap-2" 
              dir={language === 'he' ? 'rtl' : 'ltr'}
              aria-label={t('ourProjects.viewMoreProjects')}
            >
              {t('ourProjects.viewMoreProjects')}
              <svg 
                className="transition-all duration-300" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M19 12H5M12 19L5 12L12 5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

                
        
      
      {/* Custom Keyframes Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
          75% { transform: translateY(-15px) rotate(2deg); }
        }
        
        /* Hide scrollbar for webkit browsers */
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default memo(OurProjectsSection);
