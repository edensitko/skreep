'use client';

import React, { memo } from 'react';
import type { ScrollControlsProps } from './types';

/**
 * Memoized scroll controls component with left/right navigation
 */
const ScrollControls = memo<ScrollControlsProps>(({ 
  onScrollLeft, 
  onScrollRight, 
  canScrollLeft, 
  canScrollRight,
  className = ''
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Scroll Left Button */}
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center ${
          canScrollLeft 
            ? 'bg-white/10 hover:bg-white/20 text-white hover:border-white/50' 
            : 'bg-white/5 text-white/30 cursor-not-allowed'
        }`}
        aria-label="גלול שמאלה"
        type="button"
      >
        <svg 
          className="w-5 h-5 md:w-6 md:h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>

      {/* Scroll Right Button */}
      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center ${
          canScrollRight 
            ? 'bg-white/10 hover:bg-white/20 text-white hover:border-white/50' 
            : 'bg-white/5 text-white/30 cursor-not-allowed'
        }`}
        aria-label="גלול ימינה"
        type="button"
      >
        <svg 
          className="w-5 h-5 md:w-6 md:h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 5l7 7-7 7" 
          />
        </svg>
      </button>
    </div>
  );
});

ScrollControls.displayName = 'ScrollControls';

export default ScrollControls;
