'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useMemoryOptimizer } from '@/utils/memoryOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75, // Reduced from default 100
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill,
  style
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { addObserver } = useMemoryOptimizer();

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    observer.observe(element);
    addObserver(observer);

    return () => {
      observer.disconnect();
    };
  }, [priority, addObserver]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      ) : isVisible ? (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            fill={fill}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            sizes={sizes}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
          />
        </>
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}