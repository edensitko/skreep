'use client';

import { useEffect } from 'react';
import { useMemoryOptimizer } from '@/utils/memoryOptimization';

export default function MemoryMonitor() {
  const { getMemoryInfo, forceGC, cleanup } = useMemoryOptimizer();

  useEffect(() => {
    const checkMemory = () => {
      const memInfo = getMemoryInfo();
      if (memInfo) {
        const usedMB = Math.round(memInfo.usedJSHeapSize / 1024 / 1024);
        const totalMB = Math.round(memInfo.totalJSHeapSize / 1024 / 1024);
        
        // Log memory usage in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`Memory: ${usedMB}MB / ${totalMB}MB`);
        }
        
        // If memory usage is high, try to clean up
        if (usedMB > 200) {
          console.warn('High memory usage detected, attempting cleanup...');
          cleanup();
          
          // Force garbage collection if available
          setTimeout(() => {
            forceGC();
          }, 1000);
        }
      }
    };

    // Check memory every 30 seconds
    const interval = setInterval(checkMemory, 30000);
    
    // Initial check
    checkMemory();

    return () => {
      clearInterval(interval);
    };
  }, [getMemoryInfo, forceGC, cleanup]);

  // This component doesn't render anything
  return null;
}