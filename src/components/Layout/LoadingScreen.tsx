'use client';

import React, { useEffect, useState, memo, useRef } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(isLoading);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isLoading && !hasStarted.current) {
      hasStarted.current = true;
      setIsVisible(true);
      // Simplified loading without progress tracking
      setTimeout(() => {
        setIsVisible(false);
        hasStarted.current = false;
        onLoadingComplete?.();
      }, 1000); // Simple 1 second delay

      return () => {
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
      };
    }
  }, [isLoading, onLoadingComplete]);

  // Remove loading class from body when loading completes
  useEffect(() => {
    if (!isLoading && isVisible === false) {
      document.body.classList.remove('loading');
    }
  }, [isLoading, isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      data-loading-screen
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >

      {/* Logo Only */}
      <div className=" z-10">
        <div className="">
          
          {/* Logo Container */}
        
            <Image src="/assets/images/logo-2.png" alt="Logo" width={128} height={128} className=" h-32" priority/>
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingScreen);
