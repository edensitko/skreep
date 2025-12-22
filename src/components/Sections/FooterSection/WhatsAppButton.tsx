import React, { memo } from 'react';
import type { SocialButtonProps } from './types';

/**
 * Memoized WhatsApp contact button component
 */
const WhatsAppButton = memo<SocialButtonProps>(({ href, ariaLabel, icon, className = "" }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className={`w-14 h-14 rounded-full bg-green-500 border-2 border-white flex justify-center items-center hover:bg-green-600 transition-all duration-300 shadow-lg z-50 ${className}`}
  >
    {icon}
  </a>
));

WhatsAppButton.displayName = 'WhatsAppButton';

export default WhatsAppButton;
