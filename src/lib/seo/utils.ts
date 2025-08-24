// ============================================================================
// SEO UTILITIES
// ============================================================================

import { Metadata } from 'next';
import { seoConfig, businessInfo } from './config';

export interface PageSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

/**
 * Generate comprehensive metadata for pages
 */
export function generatePageMetadata(props: PageSEOProps = {}): Metadata {
  const {
    title,
    description,
    keywords,
    image = seoConfig.defaultImage,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
    locale = seoConfig.locale,
    noindex = false,
    nofollow = false
  } = props;

  // Determine language from locale
  const language = locale.startsWith('he') ? 'he' : 'en';
  const langConfig = seoConfig.multilingual[language];

  // Use multilingual content as defaults
  const finalDescription = description || langConfig.description;
  const finalKeywords = keywords || langConfig.keywords;

  const fullTitle = title 
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const fullImage = image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: finalDescription,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || seoConfig.defaultTitle,
        },
      ],
      locale,
      type,
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: finalDescription,
      images: [fullImage],
      creator: seoConfig.twitterHandle,
      site: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'he': fullUrl,
        'en': fullUrl.replace('/he/', '/en/'),
        'x-default': fullUrl,
      },
    },
    other: {
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
    },
  };

  return metadata;
}

/**
 * Generate JSON-LD structured data for local business
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${seoConfig.siteUrl}#business`,
    name: businessInfo.name,
    description: businessInfo.description,
    url: businessInfo.url,
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: businessInfo.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1],
    })),
    priceRange: businessInfo.priceRange,
    areaServed: businessInfo.areaServed.map(area => ({
      '@type': 'Place',
      name: area,
    })),
    serviceType: businessInfo.serviceType,
    sameAs: [
      // Add social media URLs here
      'https://www.linkedin.com/company/skreep',
      'https://twitter.com/skreep_ai',
    ],
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.siteUrl}#organization`,
    name: 'סקריפ | Skreep AI Solutions',
    alternateName: ['סקריפ', 'Skreep', 'Skreep AI', 'סקריפ בינה מלאכותית'],
    url: businessInfo.url,
    logo: `${seoConfig.siteUrl}/assets/images/logo.png`,
    description: 'סקריפ (Skreep) - חברת פתרונות בינה מלאכותית מובילה בישראל. מספקת פתרונות AI מתקדמים, אוטומציה חכמה וצ\'אטבוטים לעסקים.',
    slogan: 'פתרונות בינה מלאכותית מתקדמים לעסקים בישראל',
    keywords: 'סקריפ, Skreep, בינה מלאכותית, AI ישראל, פתרונות טכנולוגיים, אוטומציה, צ\'אטבוטים',
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessInfo.telephone,
      contactType: 'customer service',
      email: businessInfo.email,
      availableLanguage: ['Hebrew', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/skreep',
      'https://twitter.com/skreep_ai',
    ],
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.siteUrl}#website`,
    url: seoConfig.siteUrl,
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    publisher: {
      '@id': `${seoConfig.siteUrl}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['he', 'en'],
  };
}

/**
 * Generate JSON-LD structured data for FAQ
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for service
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${seoConfig.siteUrl}#organization`,
    },
    areaServed: service.areaServed.map(area => ({
      '@type': 'Place',
      name: area,
    })),
    serviceType: service.serviceType,
  };
}
