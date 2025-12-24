'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import InnovationSection from '@/components/Sections/InnovationSection/InnovationSection';
import PageHero from '@/components/Layout/PageHero';
import { blogPosts } from '@/data/blogPosts';

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

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

  // Get featured post (first one)
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  // FAQ data for SEO
  const faqData = React.useMemo(() => [
    {
      question: language === 'he' ? "איך לבחור נושא לבלוג טכנולוגי?" : "How to choose a topic for a technology blog?",
      answer: language === 'he' ? "חשוב לבחור נושאים רלוונטיים לקהל היעד, לעקוב אחר מגמות בתחום ולכתוב על נושאים שיש לכם מומחיות בהם" : "It's important to choose topics relevant to your target audience, follow industry trends, and write about subjects you have expertise in"
    },
    {
      question: language === 'he' ? "כמה פעמים כדאי לפרסם בבלוג?" : "How often should you publish blog posts?",
      answer: language === 'he' ? "מומלץ לפרסם באופן קבוע, לפחות פעם בשבוע, כדי לשמור על מעורבות הקוראים ולשפר את הדירוג במנועי החיפוש" : "It's recommended to publish regularly, at least once a week, to maintain reader engagement and improve search engine rankings"
    }
  ], [language]);

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Components */}
      <SEOMeta 
        title={language === 'he' ? "בלוג טכנולוגיה ובינה מלאכותית | סקריפ" : "Technology & AI Blog | Skreep"}
        description={language === 'he' ? "מאמרים מעמיקים על בינה מלאכותית, אוטומציה, צ'אטבוטים וטכנולוגיות מתקדמות. תובנות מקצועיות מצוות המומחים של סקריפ" : "In-depth articles about artificial intelligence, automation, chatbots, and advanced technologies. Professional insights from Skreep's expert team"}
        keywords={language === 'he' ? ["בלוג טכנולוגיה", "בינה מלאכותית", "אוטומציה", "צ'אטבוטים", "מאמרים טכניים", "חדשנות"] : ["technology blog", "artificial intelligence", "automation", "chatbots", "technical articles", "innovation"]}
        image="/assets/images/blog-og.jpg"
        canonical="https://skreep.com/blog"
      />
      
      <PageSEO 
        pageType="projects"
        title={language === 'he' ? "בלוג טכנולוגיה ובינה מלאכותית" : "Technology & AI Blog"}
        description={language === 'he' ? "מאמרים מקצועיים בתחום הטכנולוגיה" : "Professional articles in technology field"}
        faqs={faqData}
      />
      
      <LocalSEO showMap={false} />

      <Header />
      
      {/* Hero Section with RippleGrid */}
      <PageHero 
        title={language === 'he' ? 'בלוג טכנולוגיה ובינה מלאכותית' : 'Technology & AI Blog'}
        subtitle={language === 'he' 
          ? 'מאמרים מעמיקים, תובנות מקצועיות וחדשנות בעולם הטכנולוגיה'
          : 'In-depth articles, professional insights, and innovation in the world of technology'
        }
        language={language as 'he' | 'en'}
      />

      {/* Featured Post Section */}
      <div ref={contentRef}>
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-8 hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title[language as 'he' | 'en']}
                      className="w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-cyan-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        {language === 'he' ? 'מומלץ' : 'Featured'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    <div className="flex flex-wrap gap-2 text-sm text-white/60">
                      <span>{featuredPost.category[language as 'he' | 'en']}</span>
                      <span>•</span>
                      <span>{new Date(featuredPost.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime[language as 'he' | 'en']}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-cyan-300 transition-all duration-300">
                      {featuredPost.title[language as 'he' | 'en']}
                    </h2>
                    <p className="text-white/80 leading-relaxed">
                      {featuredPost.excerpt[language as 'he' | 'en']}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-cyan-400 font-semibold">{featuredPost.author.name}</span>
                      <span className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-2 rounded-full font-semibold group-hover:bg-cyan-500 group-hover:scale-105 transition-all duration-300">
                        {language === 'he' ? 'קרא עוד' : 'Read More'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

      {/* Blog Posts Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center">
            {language === 'he' ? 'מאמרים נוספים' : 'More Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {otherPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.02] hover:border-cyan-400/30 transition-all duration-500"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Image Section */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title[language as 'he' | 'en']}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      {post.category[language as 'he' | 'en']}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Date and Read Time */}
                  <div className="flex items-center gap-2 text-white/60 text-xs mb-3">
                    <span>{new Date(post.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US')}</span>
                    <span>•</span>
                    <span>{post.readTime[language as 'he' | 'en']}</span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  >
                    {post.title[language as 'he' | 'en']}
                  </h3>

                  {/* Excerpt */}
                  <p 
                    className="text-white/70 leading-relaxed text-sm mb-4 line-clamp-3"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  >
                    {post.excerpt[language as 'he' | 'en']}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>{language === 'he' ? 'קרא עוד' : 'Read More'}</span>
                    <svg 
                      className={`w-4 h-4 ${language === 'he' ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </div>

      <InnovationSection/>
      <ContactFormSection/>
      <Footer />
    </div>
  );
}
