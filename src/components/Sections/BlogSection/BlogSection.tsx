'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { BLOG_DATA, BLOG_CATEGORIES, BlogPost } from '@/data/blogData';

interface BlogSectionProps {
  language?: 'he' | 'en';
}

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function BlogSection({ language: propLanguage }: BlogSectionProps) {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const [currentSlide, setCurrentSlide] = useState(1); // Start at 1 for infinite scroll
  const [visibleSlides, setVisibleSlides] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const updateVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      setVisibleSlides(1); // Always show 1 centered item with partial side views
    }
  };

  useEffect(() => {
    updateVisibleSlides();
    const handleResize = () => updateVisibleSlides();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = BLOG_DATA.length;
  const extendedData = [BLOG_DATA[totalSlides - 1], ...BLOG_DATA, BLOG_DATA[0]];

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

  // Removed auto-play functionality

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
    <section className="relative overflow-hidden py-16 w-[95%] lg:w-[85%] mx-auto bg-gradient-to-br">
      <div className="mx-auto max-w-full px-0">
        {/* Header */}
        <div className="text-center pt-16 pb-8 w-full">
          <h2 
            className="font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out"
            style={{ textAlign: 'center' }}
          >
            {language === 'he' ? 'הבלוג שלנו' : 'Our Blog'}
          </h2>
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
              {BLOG_DATA.map((post: BlogPost, index: number) => (
                <Link
                  key={`${post.id}-${index}`}
                  href={`/blog/${post.id}`}
                  className="flex-shrink-0 w-80 lg:w-96 h-64 md:h-72 backdrop-blur-sm border rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-95 bg-cover bg-center bg-no-repeat relative overflow-hidden opacity-90 border-white/20 hover:border-white/30 hover:opacity-100 block"
                  style={{ backgroundImage: `url(${post.image})` }}
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 rounded-2xl"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 relative z-20">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-cyan-400/20 text-cyan-300 text-xs font-medium rounded-full mb-2">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-white/60 text-xs mb-2">
                        <span>{formatDate(post.publishDate)}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-white/70 text-sm font-medium">
                        {post.author}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
