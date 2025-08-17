// ============================================================================
// PAGE-SPECIFIC SEO COMPONENT
// ============================================================================

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import StructuredData from './StructuredData';
import { generateFAQSchema, generateServiceSchema } from '@/lib/seo/utils';
import { useSEO } from '@/hooks/useSEO';

interface PageSEOProps {
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'projects' | 'faq';
  title?: string;
  description?: string;
  faqs?: Array<{ question: string; answer: string }>;
  services?: Array<{
    name: string;
    description: string;
    provider: string;
    areaServed: string[];
    serviceType: string;
  }>;
}

/**
 * Page-specific SEO component with dynamic structured data
 */
export default function PageSEO({
  pageType = 'home',
  title,
  description,
  faqs,
  services
}: PageSEOProps) {
  const pathname = usePathname();
  const { trackEvent } = useSEO();

  // Track page view
  useEffect(() => {
    trackEvent({
      title: `Page View - ${pageType}`,
      category: 'navigation',
      action: 'page_view',
      label: pathname,
    });
  }, [pathname, pageType, trackEvent]);

  // Generate page-specific structured data
  const getStructuredData = () => {
    const data: Record<string, unknown>[] = [];

    // FAQ Schema
    if (faqs && faqs.length > 0) {
      data.push(generateFAQSchema(faqs));
    }

    // Service Schema
    if (services && services.length > 0) {
      services.forEach(service => {
        data.push(generateServiceSchema(service));
      });
    }

    // Breadcrumb Schema
    if (pathname !== '/') {
      const pathSegments = pathname.split('/').filter(Boolean);
      const breadcrumbItems = [
        { name: 'בית', url: '/' },
        ...pathSegments.map((segment, index) => ({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          url: '/' + pathSegments.slice(0, index + 1).join('/')
        }))
      ];

      data.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `https://skreep.com${item.url}`
        }))
      });
    }

    return data;
  };

  const structuredData = getStructuredData();

  return structuredData.length > 0 ? <StructuredData data={structuredData} /> : null;
}
