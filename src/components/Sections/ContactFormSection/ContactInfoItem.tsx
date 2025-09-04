import React, { memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ContactInfoItemProps } from './types';

/**
 * Memoized contact info item with proper accessibility
 */
const ContactInfoItem = memo<ContactInfoItemProps>(({ contact, language }) => {
  const { type, value, icon, gradient, href } = contact;
  const { t } = useLanguage();
  
  return (
    <div className="flex gap-1" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div 
        className={`w-6 h-6 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center flex-shrink-0`}
        aria-hidden="true"
      >
        <svg 
          className="w-4 h-4 text-white" 
          fill="currentColor" 
          viewBox={icon.viewBox}
          aria-hidden="true"
        >
          <path d={icon.path} />
        </svg>
      </div>
      <a 
        href={href}
        className="text-white/90 hover:text-white transition-colors duration-300 text-sm"
        aria-label={`${type === 'email' ? (language === 'he' ? 'שלח אימייל ל' : 'Send email to') : (language === 'he' ? 'התקשר ל' : 'Call')} ${value}`}
      >
        {value}
      </a>
    </div>
  );
});

ContactInfoItem.displayName = 'ContactInfoItem';

export default ContactInfoItem;
