'use client';

import { useEffect, useState, useRef } from 'react';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(() => {
    // Always show loading initially on client side
    if (typeof window === 'undefined') return true; // SSR - show loading
    
    const isPageRefresh = !window.performance.navigation || 
                         window.performance.navigation.type === 1 || 
                         !sessionStorage.getItem('pageLoaded');
    
    return isPageRefresh;
  });
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Only run if we should show loading
    if (!isLoading) return;

    const minLoadTime = 600; 
    const startTime = Date.now();
    
    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
        // Mark as loaded in session storage
        sessionStorage.setItem('pageLoaded', 'true');
      }, remainingTime);
    };

    // If document is already loaded
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      // Wait for window load event
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener('load', finishLoading);
    };
  }, [isLoading]);

  // Clear session storage on page unload to show loading on refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('pageLoaded');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('pageLoaded', 'true');
  };

  return {
    isLoading,
    handleLoadingComplete
  };
}

