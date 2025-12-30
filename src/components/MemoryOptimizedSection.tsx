'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useMemoryOptimizer } from '@/utils/memoryOptimization';

interface MemoryOptimizedSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  unloadOnExit?: boolean;
  className?: string;
}

export default function MemoryOptimizedSection({
  children,
  fallback = <div className="h-64 bg-black/20 animate-pulse" />,
  rootMargin = '100px',
  threshold = 0.1,
  unloadOnExit = false,
  className = ''
}: MemoryOptimizedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { addObserver } = useMemoryOptimizer();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        
        if (isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
        
        // If unloadOnExit is true, unload when not visible
        if (unloadOnExit && !isIntersecting && hasBeenVisible) {
          // Small delay to prevent flickering
          setTimeout(() => {
            if (!elementRef.current?.getBoundingClientRect().top) {
              setHasBeenVisible(false);
            }
          }, 1000);
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);
    addObserver(observer);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, unloadOnExit, hasBeenVisible, addObserver]);

  return (
    <div ref={elementRef} className={className}>
      {(isVisible || hasBeenVisible) ? children : fallback}
    </div>
  );
}