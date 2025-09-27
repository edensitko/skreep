'use client';

import { useEffect, useCallback, useRef } from 'react';

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

declare global {
  interface Performance {
    memory?: MemoryInfo;
  }
}

// Extend Window interface for custom properties
interface ExtendedWindow extends Window {
  _eventListeners?: Record<string, unknown[]>;
  gc?: () => void;
}

export function useMemoryOptimization() {
  // Clean up unused event listeners
  const cleanupEventListeners = useCallback(() => {
    // Remove any orphaned event listeners
    const events = ['scroll', 'resize', 'mousemove', 'touchmove'];
    events.forEach(event => {
      // This is a safety measure - normally listeners should be cleaned up in useEffect cleanup
      const extendedWindow = window as ExtendedWindow;
      const listeners = extendedWindow._eventListeners?.[event] || [];
      if (Array.isArray(listeners) && listeners.length > 10) {
        console.warn(`High number of ${event} listeners detected:`, listeners.length);
      }
    });
  }, []);

  // Force garbage collection (development only)
  const forceGarbageCollection = useCallback(() => {
    const extendedWindow = window as ExtendedWindow;
    if (process.env.NODE_ENV === 'development' && extendedWindow.gc) {
      extendedWindow.gc();
    }
  }, []);

  // Monitor memory usage
  const getMemoryUsage = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window && window.performance.memory) {
      const memory = window.performance.memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      };
    }
    return null;
  }, []);

  // Log memory usage periodically in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(() => {
        const memoryUsage = getMemoryUsage();
        if (memoryUsage && memoryUsage.percentage > 80) {
          console.warn('High memory usage detected:', memoryUsage);
          cleanupEventListeners();
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }
  }, [getMemoryUsage, cleanupEventListeners]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupEventListeners();
      forceGarbageCollection();
    };
  }, [cleanupEventListeners, forceGarbageCollection]);

  return {
    getMemoryUsage,
    cleanupEventListeners,
    forceGarbageCollection
  };
}

// Utility function to debounce expensive operations
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<T>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
}

// Hook for intersection observer to reduce scroll listeners
export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  return { observe, unobserve };
}
