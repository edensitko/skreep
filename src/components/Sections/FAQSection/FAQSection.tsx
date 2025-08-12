'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import FAQItem from './FAQItem';
import { ENTREPRENEURS_FAQS, BUSINESS_FAQS } from './constants';
import type { FAQ } from './types';

/**
 * FAQ section with user-type specific questions and smooth animations
 * Features accessible accordion interface with keyboard navigation
 */
function FAQSection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const { userType } = useUserType();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  const currentFaqs: ReadonlyArray<FAQ> = useMemo(() => {
    return userType === 'entrepreneurs' ? ENTREPRENEURS_FAQS : BUSINESS_FAQS;
  }, [userType]);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const toggleFAQ = useCallback((id: number) => {
    setOpenFAQ(prev => prev === id ? null : id);
  }, []);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
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

  return (
    <section 
      className="w-full py-16 md:py-24 relative overflow-hidden bg-black/20"
      role="region"
      aria-label="שאלות נפוצות"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 
              ref={titleRef}
              className={`font-bold bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              dir="rtl"
              style={{ textAlign: 'center' }}
            >
              שאלות נפוצות
            </h2>
            <p 
              className={`text-lg md:text-xl text-white/70 leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              dir="rtl"
            >
              {userType === 'entrepreneurs' 
                ? 'כל מה שיזמים רוצים לדעת על פתרונות AI'
                : 'תשובות לשאלות הנפוצות ביותר של בעלי עסקים'
              }
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 md:space-y-6">
            {currentFaqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openFAQ === faq.id}
                onToggle={toggleFAQ}
              />
            ))}
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '2s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-cyan-400/3 to-purple-400/3 rounded-full blur-3xl animate-pulse" 
            style={{ animationDelay: '4s' }}
          ></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="w-full h-full" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px'
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQSection);
