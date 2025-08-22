'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BLOG_DATA, BLOG_CATEGORIES, BlogPost } from '@/data/blogData';

interface BlogSectionProps {
  language?: 'he' | 'en';
}

export default function BlogSection({ language: propLanguage }: BlogSectionProps) {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const updateVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) setVisibleSlides(3);
      else if (window.innerWidth >= 768) setVisibleSlides(2);
      else setVisibleSlides(1);
    }
  };

  useEffect(() => {
    updateVisibleSlides();
    const handleResize = () => updateVisibleSlides();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlide = Math.max(0, BLOG_DATA.length - visibleSlides);

  const nextSlide = () => {
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlide]);

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
    <section className="w-[90%] mx-auto relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent">
            {language === 'he' ? 'הבלוג שלנו' : 'Our Blog'}
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed" dir={language === 'he' ? 'rtl' : 'ltr'}>
            {language === 'he' 
              ? 'תובנות, טיפים ומאמרים על טכנולוגיות מתקדמות ובינה מלאכותית'
              : 'Insights, tips, and articles about advanced technologies and artificial intelligence'
            }
          </p>
        </div>


        {/* Blog Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-400/50 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div 
              ref={carouselRef}
              className={`flex transition-transform duration-500 ease-in-out ${language === 'he' ? 'flex-row-reverse' : ''}`}
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`
              }}
            >
              {BLOG_DATA.map((post: BlogPost, index: number) => (
                <article
                  key={post.id}
                  className="flex-none w-full md:w-1/2 lg:w-1/3 px-3"
                >
                  <div className="relative bg-gradient-to-br from-black/40 via-black/20 to-black/10 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden cursor-pointer h-full">
                    {/* Featured Badge */}
                    {post.featured && (
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-cyan-400/80 to-purple-400/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {language === 'he' ? 'מומלץ' : 'Featured'}
                      </div>
                    )}

                    {/* Blog Image */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center">
                        <div className="text-6xl text-white/30">📝</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Category Tag */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-black/60 backdrop-blur-xl text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center justify-between mb-3 text-xs text-white/60">
                        <span>{formatDate(post.publishDate)}</span>
                        <span>{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2" dir={language === 'he' ? 'rtl' : 'ltr'}>
                        {post.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-cyan-300 text-sm font-medium mb-3 line-clamp-1" dir={language === 'he' ? 'rtl' : 'ltr'}>
                        {post.subtitle}
                      </p>

                      {/* Excerpt */}
                      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3" dir={language === 'he' ? 'rtl' : 'ltr'}>
                        {post.excerpt}
                      </p>

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {post.author.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-white/80 text-sm" dir={language === 'he' ? 'rtl' : 'ltr'}>{post.author}</span>
                        </div>
                        
                        <button className="text-cyan-400 text-sm font-medium flex items-center gap-1" dir={language === 'he' ? 'rtl' : 'ltr'}>
                          {language === 'he' ? 'קרא עוד' : 'Read More'}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={language === 'he' ? "M15 19l7-7-7-7" : "M9 5l7 7-7 7"} />
                          </svg>
                        </button>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View Blog Button */}
        <div className="text-center mt-12">
          <a href="/blog" className={`inline-flex items-center ${language === 'he' ? 'space-x-reverse space-x-3' : 'space-x-3'} bg-gradient-to-r from-cyan-400/20 via-cyan-400/30 to-purple-400/20 text-white border border-cyan-400/40 px-8 py-4 rounded-full font-semibold text-base hover:border-cyan-400/60 hover:from-cyan-400/30 hover:via-cyan-400/40 hover:to-purple-400/30 transition-all duration-300`} dir={language === 'he' ? 'rtl' : 'ltr'}>
            <span>{language === 'he' ? 'לבלוג שלנו' : 'Visit Our Blog'}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={language === 'he' ? "M15 19l7-7-7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
