'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHero from '@/components/Layout/PageHero';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import { BlogPost, blogPosts } from '@/data/blogPosts';
import {
  post1ContentHe, post1ContentEn,
  post2ContentHe, post2ContentEn,
  post3ContentHe, post3ContentEn,
  post4ContentHe, post4ContentEn,
  post5ContentHe, post5ContentEn,
  post6ContentHe, post6ContentEn
} from '@/data/blogContent';

// Map slug to content
const contentMap: Record<string, { he: string; en: string }> = {
  'ai-business-transformation-2024': { he: post1ContentHe, en: post1ContentEn },
  'chatbot-revolution-customer-service': { he: post2ContentHe, en: post2ContentEn },
  'whatsapp-business-automation': { he: post3ContentHe, en: post3ContentEn },
  'business-process-automation': { he: post4ContentHe, en: post4ContentEn },
  'ai-marketing-strategies': { he: post5ContentHe, en: post5ContentEn },
  'future-of-work-ai-automation': { he: post6ContentHe, en: post6ContentEn },
};

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const content = contentMap[post.slug];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const postContent = content ? content[language as 'he' | 'en'] : '';

  return (
    <div className="min-h-screen bg-black">
      <PageHero
        title={post.title[language as 'he' | 'en']}
        subtitle={post.excerpt[language as 'he' | 'en']}
        language={language as 'he' | 'en'}
      />

      {/* Post Meta */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-3 text-white/50 text-xs">
            <span className="bg-cyan-400/15 text-cyan-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {post.category[language as 'he' | 'en']}
            </span>
            <span>{new Date(post.date).toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <span className="text-white/30">•</span>
            <span>{post.readTime[language as 'he' | 'en']}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 pb-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title[language as 'he' | 'en']}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div 
            className={`bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8 lg:p-10 transition-all duration-700 relative shadow-xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <article 
              className="prose prose-invert prose-sm md:prose-base max-w-none relative z-10"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              <div 
                className="text-white/85 leading-relaxed blog-content text-sm md:text-base space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: postContent
                    .replace(/## /g, '<h2 class="text-xl md:text-2xl font-bold mt-10 mb-5 pb-3 border-b border-white/10 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">')
                    .replace(/### /g, '<h3 class="text-lg md:text-xl font-semibold mt-8 mb-4 text-white/95 flex items-center gap-2"><span class="w-1 h-5 bg-cyan-400 rounded-full inline-block"></span>')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                    .replace(/\n- /g, '</p><li class="text-white/75 ml-5 mb-2 text-sm md:text-base leading-relaxed list-disc marker:text-cyan-400">')
                    .replace(/\n\n/g, '</p><p class="text-white/75 leading-8 mb-5 text-sm md:text-base">')
                    .replace(/`([^`]+)`/g, '<code class="bg-cyan-400/10 px-2 py-1 rounded text-cyan-300 text-xs font-mono">$1</code>')
                }}
              />
            </article>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300"
          >
            <svg 
              className={`w-4 h-4 ${language === 'he' ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {language === 'he' ? 'חזרה לבלוג' : 'Back to Blog'}
          </Link>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
            {language === 'he' ? 'מאמרים נוספים' : 'More Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/5"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title[language as 'he' | 'en']}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] text-cyan-400 mb-1.5 block uppercase tracking-wide">
                      {relatedPost.category[language as 'he' | 'en']}
                    </span>
                    <h3 
                      className="text-sm font-semibold text-white mb-1.5 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {relatedPost.title[language as 'he' | 'en']}
                    </h3>
                    <p 
                      className="text-white/50 text-xs line-clamp-2 leading-relaxed"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      {relatedPost.excerpt[language as 'he' | 'en']}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <ContactFormSection />
    </div>
  );
}
