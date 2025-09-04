'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { ScrollProgressHook } from './types';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook for tracking scroll progress within a section
 */
export const useScrollProgress = (): ScrollProgressHook => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const scrollTop = Math.max(0, -rect.top);
      const scrollableHeight = sectionHeight - windowHeight;
      const progress = Math.min(1, Math.max(0, scrollTop / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, sectionRef };
};

/**
 * Hook for mouse movement animation
 */
export const useMouseAnimation = () => {
  const mouseAnimRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!mouseAnimRef.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const moveX = deltaX * 10;
    const moveY = deltaY * 10;
    
    if (mouseAnimRef.current) {
      mouseAnimRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) rotate(0.0001deg)`;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return { mouseAnimRef, containerRef };
};

/**
 * Hook for intersection observer animations
 */
export const useIntersectionAnimation = (elementsCount: number) => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(elementsCount).fill(false)
  );
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useMemo(
    () => Array.from({ length: elementsCount }, () => ({ current: null } as React.RefObject<HTMLDivElement | null>)),
    [elementsCount]
  );

  useEffect(() => {
    // Intersection Observer for title animation
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleRef.current) {
            setIsVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Intersection Observer for card animations
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardIndex = cardRefs.findIndex(ref => ref.current === entry.target);
          if (cardIndex !== -1) {
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[cardIndex] = entry.isIntersecting;
              return newVisible;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe title element
    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      titleObserver.observe(currentTitleRef);
    }

    // Observe card elements
    const currentCardRefs = cardRefs.map(ref => ref.current).filter(Boolean);
    currentCardRefs.forEach(card => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      if (currentTitleRef) {
        titleObserver.unobserve(currentTitleRef);
      }
      currentCardRefs.forEach(card => {
        if (card) cardObserver.unobserve(card);
      });
    };
  }, []);

  return { isVisible, visibleCards, titleRef, cardRefs };
};
