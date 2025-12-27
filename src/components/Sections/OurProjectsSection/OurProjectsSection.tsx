'use client';

import React, { memo, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageBg: string;
}

const projectsDataHe: ProjectCard[] = [
  {
    id: 'whatsapp-chatbot',
    title: "צ'אטבוט AI לוואטסאפ",
    subtitle: '24/7 שירות לקוחות אוטומטי',
    description: "צ'אטבוט חכם המשולב בוואטסאפ עם בינה מלאכותית מתקדמת לטיפול בפניות לקוחות.",
    features: ['מענה אוטומטי 24/7', 'עיבוד שפה טבעית', 'אינטגרציה מלאה', 'דוחות וניתוח'],
    imageBg: '/assets/images/projects/1.png'
  },
  {
    id: 'task-organizer',
    title: 'מארגן משימות חכם',
    subtitle: 'מבוסס AI ו-NLP',
    description: 'אפליקציה חכמה לארגון משימות עם עיבוד שפה טבעית, זיהוי דפוסים אוטומטי וסיווג משימות מתקדם בעברית ואנגלית.',
    features: ['עיבוד שפה טבעית', 'זיהוי דפוסים', 'סיווג אוטומטי', 'תמיכה דו-לשונית'],
    imageBg: '/assets/images/projects/2.png'
  },
  {
    id: 'chatbot-builder',
    title: "בונה צ'אטבוטים חכם",
    subtitle: 'יצירת סוכנים מותאמים אישית',
    description: "פלטפורמה מתקדמת ליצירת צ'אטבוטים וסוכני AI מותאמים אישית עם יכולות למידה מתקדמות ושילוב קל במערכות קיימות.",
    features: ['יצירה ללא קוד', 'למידה מתקדמת', 'אינטגרציות קלות', 'התאמה אישית'],
    imageBg: '/assets/images/projects/3.png'
  }
];

const projectsDataEn: ProjectCard[] = [
  {
    id: 'whatsapp-chatbot',
    title: 'WhatsApp AI Chatbot',
    subtitle: '24/7 Automated Customer Service',
    description: 'Smart chatbot integrated with WhatsApp using advanced AI for handling customer inquiries.',
    features: ['24/7 Auto Response', 'Natural Language Processing', 'Full Integration', 'Reports & Analytics'],
    imageBg: '/assets/images/projects/1.png'
  },
  {
    id: 'task-organizer',
    title: 'Smart Task Organizer',
    subtitle: 'AI & NLP Based',
    description: 'Smart task organization app with natural language processing, automatic pattern recognition and advanced task classification in Hebrew and English.',
    features: ['Natural Language Processing', 'Pattern Recognition', 'Auto Classification', 'Bilingual Support'],
    imageBg: '/assets/images/projects/2.png'
  },
  {
    id: 'chatbot-builder',
    title: 'Smart Chatbot Builder',
    subtitle: 'Custom Agent Creation',
    description: 'Advanced platform for creating custom chatbots and AI agents with advanced learning capabilities and easy integration with existing systems.',
    features: ['No-Code Creation', 'Advanced Learning', 'Easy Integrations', 'Customization'],
    imageBg: '/assets/images/projects/3.png'
  }
];

function OurProjectsSection() {
  const { language, t } = useLanguage();

  const currentProjectsData = language === 'he' ? projectsDataHe : projectsDataEn;

  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(currentProjectsData[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Update selected project when language changes
  useEffect(() => {
    if (currentProjectsData.length > 0) {
      setSelectedProject(currentProjectsData[0]);
    }
  }, [language]);

  // Intersection Observer for title animation
  useEffect(() => {
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

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSubtitleVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSubtitleRef = subtitleRef.current;
    if (currentSubtitleRef) {
      observer.observe(currentSubtitleRef);
    }

    return () => {
      if (currentSubtitleRef) {
        observer.unobserve(currentSubtitleRef);
      }
    };
  }, []);

  // Initialize carousel position
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const isLargeScreen = window.innerWidth >= 768;

      if (isLargeScreen) {
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: maxScroll, behavior: 'auto' });
      }
    }
  }, []);

  // Detect centered project on scroll (mobile)
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && window.innerWidth < 768) {
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        const cards = container.querySelectorAll('[data-project-id]') as NodeListOf<HTMLElement>;
        let closestCard: HTMLElement | null = null;
        let closestDistance = Infinity;

        cards.forEach((card: HTMLElement) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(centerX - cardCenterX);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
          }
        });

        if (closestCard) {
          const projectId = (closestCard as HTMLElement).getAttribute('data-project-id');
          if (projectId) {
            const project = currentProjectsData.find(p => p.id === projectId);
            if (project && selectedProject?.id !== project.id) {
              setSelectedProject(project);
            }
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [selectedProject, currentProjectsData]);

  const selectProject = (project: ProjectCard) => {
    setSelectedProject(project);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? 240 : 280;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative overflow-hidden pt-10 w-[95%] mx-auto bg-gradient-to-br">
        <div className="mx-auto max-w-full px-0">
          {/* Header */}
          <div className="text-center pt-16 pb-8 w-full">
            <h1
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('ourProjects.title') || (language === 'he' ? 'חלק מהעבודות שלנו' : 'Some of Our Work')}
            </h1>

            <p
              ref={subtitleRef}
              className={`text-md font-light md:text-lg text-white/70 mx-auto transition-all duration-1000 delay-200 ${isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              dir={language === 'he' ? 'rtl' : 'ltr'}
              style={{ textAlign: 'center' }}
            >
              {t('ourProjects.subtitle') || (language === 'he'
                ? 'פתרונות דיגיטליים מתקדמים שיצרנו עבור לקוחותינו'
                : 'Advanced digital solutions we created for our clients')}
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={scrollLeft}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label={language === 'he' ? 'הבא' : 'Next'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={scrollRight}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              aria-label={language === 'he' ? 'קודם' : 'Previous'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide"
              style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-4 md:gap-6 p-2 pl-[calc(50vw-12rem)] md:pl-2 pr-[calc(50vw-12rem)] md:pr-2 min-w-max">
                {currentProjectsData.map((project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    data-project-id={project.id}
                    onClick={() => selectProject(project)}
                    className={`flex-shrink-0 w-52 lg:w-60 h-32 md:h-32 backdrop-blur-sm border rounded-2xl p-4 md:p-6 cursor-pointer group transition-all duration-300 hover:scale-90 bg-cover bg-center bg-no-repeat relative overflow-hidden ${selectedProject?.id === project.id
                        ? 'opacity-100 border-white/80 shadow-lg'
                        : 'opacity-70 border-white/20 hover:border-white/30 hover:opacity-90'
                      }`}
                    style={{
                      backgroundImage: `url(${project.imageBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/50 rounded-2xl"></div>

                    <div className="text-center relative z-20">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-200 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Box */}
      {selectedProject && (
        <div className="mt-6 w-[85%] mx-auto relative">
          {/* Main Content Container */}
          <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-3xl border border-white/20 rounded-3xl lg:rounded-4xl shadow-2xl shadow-black/50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[12px] hover:border-white/30 hover:shadow-cyan-400/10 hover:shadow-2xl">

            {/* Animated Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 rounded-3xl lg:rounded-4xl"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/8 via-transparent to-purple-400/8 opacity-50 rounded-3xl lg:rounded-4xl"></div>

            {/* Full-Width Image Banner */}
            <div
              className="w-full h-32 md:h-40 lg:h-48 bg-cover bg-center bg-no-repeat relative overflow-hidden rounded-t-3xl lg:rounded-t-4xl"
              style={{
                backgroundImage: `url(${selectedProject.imageBg})`,
              }}
            >
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Content Wrapper */}
            <div
              key={selectedProject.id}
              className="relative z-10 p-6 lg:p-8"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {/* Header Section */}
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-3 leading-tight text-start">
                  {selectedProject.title}
                </h2>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl text-start">
                  {selectedProject.description}
                </p>
              </div>

              {/* View Project Button - Inside Card */}
              <div className="flex justify-start">
                <Link
                  href={`/projects/${selectedProject.id}`}
                  className="bg-white/05 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1 text-white text-sm font-light flex items-center gap-2 hover:bg-white/15 hover:scale-105 transition-all duration-300"
                >
                  {t('common.toProject') || (language === 'he' ? 'לפרויקט' : 'To project')}
                  <svg
                    className={`transition-all duration-300 ${language === 'he' ? '' : 'rotate-180'}`}
                    width="12"
                    height="12"
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
                </Link>
              </div>

            </div>

            {/* Enhanced Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="/projects"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2 hover:bg-white/15 hover:scale-110 transition-all duration-300"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {t('ourProjects.viewMoreProjects') || (language === 'he' ? 'לכל הפרויקטים' : 'View All Projects')}
              <svg
                className={`transition-all duration-300 ${language === 'he' ? '' : 'rotate-180'}`}
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
            </Link>
          </div>
        </div>
      )}

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

export default memo(OurProjectsSection);
