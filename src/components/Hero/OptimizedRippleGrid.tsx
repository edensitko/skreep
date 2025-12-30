'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useMemoryOptimizer } from '@/utils/memoryOptimization';

// Lazy load the heavy RippleGrid component
const RippleGrid = dynamic(() => import('./RippleGrid'), {
  loading: () => <div className="w-full h-full bg-gradient-to-br from-cyan-400/5 to-purple-400/5" />,
  ssr: false
});

interface OptimizedRippleGridProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
  className?: string;
}

export default function OptimizedRippleGrid({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = '#00ffff',
  speed = 3,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 40,
  className = ''
}: OptimizedRippleGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { addObserver, isMemoryHigh } = useMemoryOptimizer();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        // Only render if visible and memory usage is not too high
        if (isIntersecting && !isMemoryHigh(150 * 1024 * 1024)) { // 150MB threshold
          setShouldRender(true);
        } else if (!isIntersecting) {
          // Delay unmounting to prevent flickering
          setTimeout(() => {
            if (!elementRef.current?.getBoundingClientRect().top) {
              setShouldRender(false);
            }
          }, 2000);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(element);
    addObserver(observer);

    return () => {
      observer.disconnect();
    };
  }, [addObserver, isMemoryHigh]);

  // Fallback for high memory usage
  if (isMemoryHigh(200 * 1024 * 1024)) {
    return (
      <div 
        ref={elementRef} 
        className={`w-full h-full bg-gradient-to-br from-cyan-400/10 via-black to-purple-400/10 ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={elementRef} className={`w-full h-full ${className}`}>
      {shouldRender ? (
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-cyan-400/5 to-purple-400/5" />}>
          <RippleGrid
            beamWidth={beamWidth}
            beamHeight={beamHeight}
            beamNumber={beamNumber}
            lightColor={lightColor}
            speed={speed}
            noiseIntensity={noiseIntensity}
            scale={scale}
            rotation={rotation}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-cyan-400/5 to-purple-400/5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
}