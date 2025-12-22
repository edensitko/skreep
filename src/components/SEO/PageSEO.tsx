// ============================================================================
// PAGE-SPECIFIC SEO COMPONENT
// ============================================================================

'use client';

import { usePathname } from 'next/navigation';
import { useSEO } from '@/hooks/useSEO';
import { useEffect } from 'react';

interface PageSEOProps {
  title?: string;
  description?: string;
  pageType?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export default function PageSEO({
  title,
  description,
  pageType,
  faqs
}: PageSEOProps) {
  const pathname = usePathname();
  const { trackEvent } = useSEO();

  // Track page views
  useEffect(() => {
    const pageTypeFromPath = pageType || pathname.split('/')[1] || 'home';
    trackEvent({
      event: 'page_view',
      page_path: pathname,
      page_type: pageTypeFromPath,
      page_title: title,
    });
  }, [pathname, title, trackEvent, pageType]);

  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </>
  );
}
