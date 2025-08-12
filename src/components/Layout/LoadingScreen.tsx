'use client';

import React, { useEffect, useState, memo, useRef } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(isLoading);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isLoading && !hasStarted.current) {
      hasStarted.current = true;
      setIsVisible(true);
      setProgress(0);
      
      // Clear any existing animation
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      
      // Simulate loading progress - faster animation
      animationRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (animationRef.current) {
              clearInterval(animationRef.current);
              animationRef.current = null;
            }
            // Reduced delay before hiding
            setTimeout(() => {
              setIsVisible(false);
              hasStarted.current = false;
              onLoadingComplete?.();
            }, 200); // Reduced from 500ms to 200ms
            return 100;
          }
          return prev + Math.random() * 20 + 10; // Faster increment
        });
      }, 60); // Faster interval: 60ms instead of 100ms

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
        
            <img src="./assets/images/logo-2.png" alt="Logo" className=" h-32"/>
        </div>
      </div>
    </div>
  );
}

export default memo(LoadingScreen);
