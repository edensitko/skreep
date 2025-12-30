'use client';

import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export function usePerformanceMode() {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check for performance indicators
    const checkPerformance = () => {
      const connection = (navigator as { connection?: { effectiveType: string; saveData: boolean } }).connection;
      const memory = (performance as { memory?: { usedJSHeapSize: number } }).memory;
      
      let lowPerformance = false;
      
      // Check network connection
      if (connection) {
        lowPerformance = connection.effectiveType === 'slow-2g' || 
                        connection.effectiveType === '2g' ||
                        connection.saveData;
      }
      
      // Check memory usage
      if (memory) {
        const usedMemory = memory.usedJSHeapSize / 1024 / 1024; // MB
        lowPerformance = lowPerformance || usedMemory > 150;
      }
      
      // Check hardware concurrency (CPU cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        lowPerformance = true;
      }
      
      setIsLowPerformance(lowPerformance || prefersReducedMotion);
    };

    checkPerformance();
    
    // Recheck every 30 seconds
    const interval = setInterval(checkPerformance, 30000);
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return {
    isLowPerformance,
    prefersReducedMotion,
    shouldReduceAnimations: isLowPerformance || prefersReducedMotion
  };
}