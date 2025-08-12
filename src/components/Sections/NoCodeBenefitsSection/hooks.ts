'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateScrollProgress, shouldItemBeVisible, throttle, getBenefitsByUserType } from './utils';
import type { SectionState, UserType, Benefit } from './types';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook for managing section state with hydration and visibility
 */
export const useSectionState = (benefits: readonly Benefit[]) => {
  const [state, setState] = useState<SectionState>({
    visibleItems: new Array(benefits.length).fill(false),
    scrollProgress: 0,
    isHydrated: false,
    isVisible: false
  });

  const updateVisibleItems = useCallback((newVisibleItems: boolean[]) => {
    setState(prev => ({
      ...prev,
      visibleItems: newVisibleItems
    }));
  }, []);

  const updateScrollProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      scrollProgress: progress
    }));
  }, []);

  const setIsHydrated = useCallback((hydrated: boolean) => {
    setState(prev => ({
      ...prev,
      isHydrated: hydrated
    }));
  }, []);

  const setIsVisible = useCallback((visible: boolean) => {
    setState(prev => ({
      ...prev,
      isVisible: visible
    }));
  }, []);

  return {
    state,
    updateVisibleItems,
    updateScrollProgress,
    setIsHydrated,
    setIsVisible
  };
};

/**
 * Hook for handling scroll-based animations and visibility
 */
export const useScrollAnimations = (
  benefits: readonly Benefit[],
  onVisibleItemsChange: (items: boolean[]) => void,
  onScrollProgressChange: (progress: number) => void
) => {
  const sectionRef = useRef<HTMLElement>(null);

  const throttledScroll = useCallback(
    throttle(() => {
      const progress = calculateScrollProgress(sectionRef);
      onScrollProgressChange(progress);

      const newVisibleItems = benefits.map((_, index) => 
        shouldItemBeVisible(index, progress, benefits.length)
      );
      onVisibleItemsChange(newVisibleItems);
    }),
    [benefits, onVisibleItemsChange, onScrollProgressChange]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    throttledScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [throttledScroll]);

  return { sectionRef };
};

/**
 * Hook for intersection observer animation
 */
export const useIntersectionAnimation = (onVisibilityChange: (isVisible: boolean) => void) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(entry.isIntersecting);
      },
      { threshold: 0.3 }
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
  }, [onVisibilityChange]);

  return { titleRef };
};

/**
 * Hook for managing benefits based on user type
 */
export const useBenefitsData = (userType: UserType) => {
  const [benefits, setBenefits] = useState<readonly Benefit[]>(() => 
    getBenefitsByUserType(userType)
  );

  useEffect(() => {
    setBenefits(getBenefitsByUserType(userType));
  }, [userType]);

  return benefits;
};

/**
 * Hook for preventing hydration mismatch
 */
export const useHydration = (onHydrated: (hydrated: boolean) => void) => {
  useEffect(() => {
    onHydrated(true);
  }, [onHydrated]);
};
