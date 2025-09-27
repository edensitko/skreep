// ============================================================================
// SEO HOOK
// ============================================================================

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SEOTrackingProps {
  title?: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  event?: string;
  page_path?: string;
  page_type?: string;
  page_title?: string;
}

/**
 * Hook for SEO and analytics tracking
 */
export function useSEO() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: pathname,
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }

      // LinkedIn Insight
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID });
      }
    }
  }, [pathname]);

  // Track custom events and page views
  const trackEvent = ({
    title = 'Custom Event',
    category = 'engagement',
    action = 'click',
    label,
    value,
    event,
    page_path,
    page_type,
    page_title
  }: SEOTrackingProps) => {
    if (typeof window === 'undefined') return;

    // Handle page view events
    if (event === 'page_view') {
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: page_title || document.title,
          page_path: page_path || window.location.pathname,
          page_type: page_type || 'page'
        });
      }
      return;
    }

    // Handle custom events
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        custom_parameter: title,
      });
    }

    if (window.fbq) {
      window.fbq('track', 'CustomEvent', {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Track conversions
  const trackConversion = (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: process.env.NEXT_PUBLIC_GA_ID,
          event_category: 'conversion',
          event_label: conversionType,
          value: value,
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: conversionType,
          value: value,
          currency: 'ILS',
        });
      }
    }
  };

  return {
    trackEvent,
    trackConversion,
  };
}
