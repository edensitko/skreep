'use client';

import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  style
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src && !hasError) {
      // Try WebP first, fallback to original if it fails
      const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      
      // Test if WebP version exists
      const testImg = new Image();
      testImg.onload = () => setCurrentSrc(webpSrc);
      testImg.onerror = () => setCurrentSrc(src);
      testImg.src = webpSrc;
    }
  }, [isInView, src, hasError]);

  // Don't render img until src is available to prevent empty src errors
  if (!src || src.trim() === '') {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height, ...style }}
        aria-label={alt}
      />
    );
  }

  // Show placeholder until image is in view and src is determined
  if (!isInView || !currentSrc) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-100 animate-pulse ${className}`}
        style={{ width, height, ...style }}
        aria-label={alt}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={style}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setHasError(true);
        // Final fallback to original src
        if (currentSrc !== src) {
          setCurrentSrc(src);
        }
      }}
      loading="lazy"
      decoding="async"
    />
  );
}
