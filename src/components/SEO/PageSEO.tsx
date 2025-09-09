// ============================================================================
// PAGE-SPECIFIC SEO COMPONENT
// ============================================================================

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import StructuredData from './StructuredData';
import { generateFAQSchema, generateServiceSchema } from '@/lib/seo/utils';
import { useSEO } from '@/hooks/useSEO';
import { StructuredDataItem } from './types';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface ServiceItem {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
}

interface PageSEOProps {
  pageType?: 'home' | 'about' | 'services' | 'contact' | 'projects' | 'faq';
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  services?: ServiceItem[];
  onStructuredData?: (data: StructuredDataItem[]) => void;
}

/**
 * Page-specific SEO component with dynamic structured data
 */
export default function PageSEO({
  pageType = 'home',
  title,
  description,
  faqs,
  services,
  onStructuredData
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
  const getStructuredData = (): StructuredDataItem[] => {
    const data: StructuredDataItem[] = [];

    // Add FAQ schema if FAQs are provided
    if (faqs && faqs.length > 0) {
      const faqSchema = generateFAQSchema(faqs);
      if (faqSchema) {
        data.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        });      }
    }

    // Add service schema if services are provided
    if (services && services.length > 0) {
      services.forEach(service => {
        const serviceSchema = generateServiceSchema(service);
        if (serviceSchema) {
          data.push(serviceSchema);
        }
      });
    }

    // Add breadcrumb schema for better navigation
    if (pathname && pathname !== '/') {
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

  // Pass structured data up to the root layout if callback is provided
  useEffect(() => {
    if (onStructuredData && structuredData.length > 0) {
      onStructuredData(structuredData);
    }
  }, [onStructuredData, structuredData]);

  return null;
}
