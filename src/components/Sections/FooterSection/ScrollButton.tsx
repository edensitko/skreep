import React, { memo } from 'react';
import type { ScrollButtonProps } from './types';

/**
 * Memoized scroll to top button component
 */
const ScrollButton = memo<ScrollButtonProps>(({ onClick, ariaLabel, className = "" }) => (
  <button 
    onClick={onClick}
    aria-label={ariaLabel}
    className={`w-10 h-10 rounded-full bg-cyan-400/80 border-2 border-white flex justify-center items-center hover:bg-cyan-300 transition-all duration-300 shadow-lg z-50 ${className}`}
  >
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 19V5M5 12L12 5L19 12" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </button>
));

ScrollButton.displayName = 'ScrollButton';

export default ScrollButton;
