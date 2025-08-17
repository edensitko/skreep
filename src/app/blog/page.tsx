'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language, t } = useLanguage();

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

  // Blog posts data
  const blogPosts = React.useMemo(() => [
    {
      id: 1,
      image: "./assets/images/img/1.png",
      title: language === 'he' ? "עתיד הבינה המלאכותית בעסקים" : "The Future of AI in Business",
      excerpt: language === 'he' ? "איך בינה מלאכותית משנה את פני העסקים המודרניים ומה צופן העתיד" : "How artificial intelligence is transforming modern businesses and what the future holds",
      date: language === 'he' ? "15 ינואר 2024" : "January 15, 2024",
      author: language === 'he' ? "צוות סקריפ" : "Skreep Team",
      category: language === 'he' ? "בינה מלאכותית" : "Artificial Intelligence",
      readTime: language === 'he' ? "5 דקות קריאה" : "5 min read",
      featured: true
    },
    {
      id: 2,
      image: "./assets/images/img/2.png",
      title: language === 'he' ? "אוטומציה חכמה לעסקים קטנים" : "Smart Automation for Small Businesses",
      excerpt: language === 'he' ? "כיצד עסקים קטנים יכולים לנצל אוטומציה לשיפור היעילות והרווחיות" : "How small businesses can leverage automation to improve efficiency and profitability",
      date: language === 'he' ? "10 ינואר 2024" : "January 10, 2024",
      author: language === 'he' ? "דוד כהן" : "David Cohen",
      category: language === 'he' ? "אוטומציה" : "Automation",
      readTime: language === 'he' ? "7 דקות קריאה" : "7 min read",
      featured: false
    },
    {
      id: 3,
      image: "./assets/images/img/3.png",
      title: language === 'he' ? "צ'אטבוטים מתקדמים לשירות לקוחות" : "Advanced Chatbots for Customer Service",
      excerpt: language === 'he' ? "המדריך המלא לבניית צ'אטבוטים שמספקים חוויית לקוח מעולה" : "The complete guide to building chatbots that deliver exceptional customer experience",
      date: language === 'he' ? "5 ינואר 2024" : "January 5, 2024",
      author: language === 'he' ? "שרה לוי" : "Sarah Levy",
      category: language === 'he' ? "צ'אטבוטים" : "Chatbots",
      readTime: language === 'he' ? "6 דקות קריאה" : "6 min read",
      featured: false
    },
    {
      id: 4,
      image: "./assets/images/img/4.png",
      title: language === 'he' ? "ניתוח נתונים עם בינה מלאכותית" : "Data Analysis with Artificial Intelligence",
      excerpt: language === 'he' ? "איך להפיק תובנות עסקיות חשובות מנתונים באמצעות כלי AI מתקדמים" : "How to extract valuable business insights from data using advanced AI tools",
      date: language === 'he' ? "28 דצמבר 2023" : "December 28, 2023",
      author: language === 'he' ? "מיכל רוזן" : "Michal Rosen",
      category: language === 'he' ? "ניתוח נתונים" : "Data Analysis",
      readTime: language === 'he' ? "8 דקות קריאה" : "8 min read",
      featured: false
    },
    {
      id: 5,
      image: "./assets/images/img/5.png",
      title: language === 'he' ? "אינטגרציה של מערכות AI" : "AI Systems Integration",
      excerpt: language === 'he' ? "אסטרטגיות מוכחות לשילוב פתרונות AI במערכות עסקיות קיימות" : "Proven strategies for integrating AI solutions into existing business systems",
      date: language === 'he' ? "20 דצמבר 2023" : "December 20, 2023",
      author: language === 'he' ? "אלון ברק" : "Alon Barak",
      category: language === 'he' ? "אינטגרציה" : "Integration",
      readTime: language === 'he' ? "10 דקות קריאה" : "10 min read",
      featured: false
    },
    {
      id: 6,
      image: "./assets/images/img/6.png",
      title: language === 'he' ? "מגמות טכנולוגיות לשנת 2024" : "Technology Trends for 2024",
      excerpt: language === 'he' ? "התחזיות החמות ביותר בעולם הטכנולוגיה והבינה המלאכותית לשנה הקרובה" : "The hottest predictions in technology and artificial intelligence for the coming year",
      date: language === 'he' ? "15 דצמבר 2023" : "December 15, 2023",
      author: language === 'he' ? "רונית גולד" : "Ronit Gold",
      category: language === 'he' ? "טכנולוגיה" : "Technology",
      readTime: language === 'he' ? "12 דקות קריאה" : "12 min read",
      featured: false
    }
  ], [language]);

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
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 
            ref={titleRef}
            className={`font-bold bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-2xl md:text-3xl lg:text-4xl mb-4 leading-tight tracking-wide text-center transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {language === 'he' ? 'בלוג טכנולוגיה ובינה מלאכותית' : 'Technology & AI Blog'}
          </h1>
          <p 
            className={`text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            dir={language === 'he' ? 'rtl' : 'ltr'}
          >
            {language === 'he' 
              ? 'מאמרים מעמיקים, תובנות מקצועיות וחדשנות בעולם הטכנולוגיה'
              : 'In-depth articles, professional insights, and innovation in the world of technology'
            }
          </p>
        </div>
      </section>

      {/* Featured Post Section */}
      {blogPosts.filter(post => post.featured).map((post) => (
        <section key={post.id} className="py-8 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cyan-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {language === 'he' ? 'מומלץ' : 'Featured'}
                    </span>
                  </div>
                </div>
                <div className="space-y-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <div className="flex flex-wrap gap-2 text-sm text-white/60">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent">
                    {post.title}
                  </h2>
                  <p className="text-white/80 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-cyan-400 font-semibold">{post.author}</span>
                    <button className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-2 rounded-full font-semibold hover:bg-cyan-500 hover:scale-105 transition-all duration-300">
                      {language === 'he' ? 'קרא עוד' : 'Read More'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Blog Posts Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center">
            {language === 'he' ? 'מאמרים נוספים' : 'More Articles'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <div
                key={post.id}
                className="group bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Blog Post Image - Full Width Top */}
                <div className="relative w-full h-48 md:h-56 mb-6 rounded-t-2xl lg:rounded-t-4xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover filter brightness-110 hover:brightness-125 hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6">
                  {/* Blog Post Meta */}
                  <div className="flex flex-wrap gap-2 text-xs text-white/60 mb-3" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Blog Post Title */}
                  <h3 
                    className="text-lg md:text-xl font-bold mb-2 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  >
                    {post.title}
                  </h3>

                  {/* Blog Post Excerpt */}
                  <p 
                    className="text-white/80 leading-relaxed text-center text-xs md:text-sm mb-4"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  >
                    {post.excerpt}
                  </p>

                  {/* Author and Read More */}
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold text-sm">{post.author}</span>
                    <button className="text-white hover:text-cyan-400 transition-colors text-sm">
                      {language === 'he' ? 'קרא עוד' : 'Read More'} →
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl lg:rounded-4xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-12 text-center">
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' ? 'הישארו מעודכנים' : 'Stay Updated'}
            </h2>
            <p 
              className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' 
                ? 'קבלו את המאמרים החדשים ישירות למייל ותהיו הראשונים לדעת על חדשנות בעולם הטכנולוגיה'
                : "Get the latest articles directly to your email and be the first to know about innovation in the world of technology"
              }
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={language === 'he' ? 'הכניסו את כתובת המייל' : 'Enter your email'}
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/60 focus:outline-none focus:border-cyan-400"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              />
              <button 
                className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 hover:scale-105 transition-all duration-300"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              >
                {language === 'he' ? 'הרשמה' : 'Subscribe'}
              </button>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
