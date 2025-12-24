'use client';

import React, { useState, useEffect, useRef } from 'react';
import { blogPosts } from '@/data/blogPosts';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

const BlogSection = () => {
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubtitleVisible, setIsSubtitleVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const updateVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      // setVisibleSlides(1); // Always show 1 centered item with partial side views
    }
  };

  useEffect(() => {
    updateVisibleSlides();
    const handleResize = () => updateVisibleSlides();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const totalSlides = blogPosts.length;
  const extendedData = [blogPosts[totalSlides - 1], ...blogPosts, blogPosts[0]];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (language === 'he') {
      setCurrentSlide(prev => prev - 1); // RTL: next goes left
    } else {
      setCurrentSlide(prev => prev + 1); // LTR: next goes right
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (language === 'he') {
      setCurrentSlide(prev => prev + 1); // RTL: prev goes right
    } else {
      setCurrentSlide(prev => prev - 1); // LTR: prev goes left
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === 0) {
      setCurrentSlide(totalSlides);
    } else if (currentSlide === totalSlides + 1) {
      setCurrentSlide(1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'he') {
      return date.toLocaleDateString('he-IL');
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="relative overflow-hidden py-20 w-[95%] lg:w-[85%] mx-auto bg-gradient-to-br">
      <div className="mx-auto max-w-full px-0">
        {/* Header */}
        <div className="text-center pb-2 w-full">
          <h2 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ textAlign: 'center' }}
          >
            {language === 'he' ? 'הבלוג שלנו' : 'Our Blog'}
          </h2>
          
          <p 
            ref={subtitleRef}
            className={`text-md font-light md:text-lg text-white/70 mx-auto transition-all duration-1000 delay-200 ${
              isSubtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
            style={{ textAlign: 'center' }}
          >
            {language === 'he' ? 'תובנות, טיפים ומאמרים על טכנולוגיות מתקדמות ובינה מלאכותית' : 'Insights, tips, and articles about advanced technologies and artificial intelligence'}
          </p>
        </div>


        {/* Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute ${language === 'he' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={language === 'he' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className={`absolute ${language === 'he' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={language === 'he' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>

          {/* Cards Container */}
          <div 
            className="overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-4 md:gap-6 p-2 pl-[calc(50vw-12rem)] md:pl-2 pr-[calc(50vw-12rem)] md:pr-2 min-w-max">
              {blogPosts.map((post, n) => (
                <Link
                  key={`${post.id}-${n}`}
                  href={`/blog/${post.slug}`}
                  className="flex-shrink-0 w-70 lg:w-96 h-64 md:h-72 backdrop-blur-sm border rounded-3xl cursor-pointer group transition-all duration-300 hover:scale-95 bg-cover bg-center bg-no-repeat relative overflow-hidden opacity-90 border-white/20 hover:border-cyan-400/30 hover:opacity-100 block"
                  style={{ backgroundImage: `url(${post.image})` }}
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 rounded-3xl"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 relative z-20">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-cyan-400/20 text-cyan-300 text-xs font-medium rounded-full mb-2">
                        {post.category[language as 'he' | 'en']}
                      </span>
                      <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readTime[language as 'he' | 'en']}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors line-clamp-2">
                      {post.title[language as 'he' | 'en']}
                    </h3>
                    
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {post.excerpt[language as 'he' | 'en']}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* View More Button - Centered */}
          <div className="flex justify-center mt-16">
            <Link 
              href="/blog"
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2 hover:bg-white/15 hover:scale-110 transition-all duration-300" 
              dir={language === 'he' ? 'rtl' : 'ltr'}
              aria-label={language === 'he' ? 'ראה עוד מאמרים' : 'View more articles'}
            >
              {language === 'he' ? 'ראה עוד מאמרים' : 'View more articles'}
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
