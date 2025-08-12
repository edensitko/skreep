import React, { memo } from 'react';
import type { ContactInfoItemProps } from './types';

/**
 * Memoized contact info item with proper accessibility
 */
const ContactInfoItem = memo<ContactInfoItemProps>(({ contact }) => {
  const { type, value, icon, gradient, href } = contact;
  
  return (
    <div className="flex items-center gap-4" dir="rtl">
      <div 
        className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center flex-shrink-0`}
        aria-hidden="true"
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="currentColor" 
          viewBox={icon.viewBox}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      </div>
      <a 
        href={href}
        className="text-white/90 hover:text-white transition-colors duration-300 text-lg"
        aria-label={`${type === 'email' ? 'שלח אימייל ל' : 'התקשר ל'}${value}`}
      >
        {value}
      </a>
    </div>
  );
});

ContactInfoItem.displayName = 'ContactInfoItem';

export default ContactInfoItem;
