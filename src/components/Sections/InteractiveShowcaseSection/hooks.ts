'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateScrollCapabilities, createIntersectionObserver } from './utils';
import type { ServiceCard, ShowcaseState } from './types';

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Hook for managing showcase state and scroll capabilities
 */
export const useShowcaseState = (initialService?: ServiceCard) => {
  const [state, setState] = useState<ShowcaseState>({
    selectedService: initialService || null,
    canScrollLeft: false,
    canScrollRight: false,
    isVisible: false
  });

  const selectService = useCallback((service: ServiceCard) => {
    setState(prev => ({
      ...prev,
      selectedService: service
    }));
  }, []);

  const updateScrollCapabilities = useCallback((canScrollLeft: boolean, canScrollRight: boolean) => {
    setState(prev => ({
      ...prev,
      canScrollLeft,
      canScrollRight
    }));
  }, []);

  const setIsVisible = useCallback((isVisible: boolean) => {
    setState(prev => ({
      ...prev,
      isVisible
    }));
  }, []);

  return {
    state,
    selectService,
    updateScrollCapabilities,
    setIsVisible
  };
};

/**
 * Hook for managing scroll container and scroll events
 */
export const useScrollContainer = (onScrollCapabilitiesChange: (canScrollLeft: boolean, canScrollRight: boolean) => void) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const { canScrollLeft, canScrollRight } = calculateScrollCapabilities(scrollContainerRef.current);
    onScrollCapabilitiesChange(canScrollLeft, canScrollRight);
  }, [onScrollCapabilitiesChange]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial scroll capabilities check
    handleScroll();

    // Add scroll event listener
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    scrollContainerRef,
    handleScroll
  };
};

/**
 * Hook for intersection observer animation
 */
export const useIntersectionAnimation = (onVisibilityChange: (isVisible: boolean) => void) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = createIntersectionObserver(onVisibilityChange);
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
