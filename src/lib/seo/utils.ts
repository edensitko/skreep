// ============================================================================
// SEO UTILITIES
// ============================================================================

import { Metadata } from 'next';
import { seoConfig } from './config';

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
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${seoConfig.siteUrl}#business`,
    name: "סקריפ - פתרונות בינה מלאכותית",
    url: seoConfig.siteUrl,
    telephone: "+972-3-1234567",
    email: "info@skreep.com",
    image: `${seoConfig.siteUrl}/logo-512.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "רחוב הטכנולוגיה 123",
      addressLocality: "תל אביב",
      addressRegion: "מחוז תל אביב",
      postalCode: "6789012",
      addressCountry: "IL"
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    }],
    areaServed: [{
      "@type": "Country",
      name: "Israel"
    }],
    sameAs: [
      "https://www.linkedin.com/company/skreep",
      "https://twitter.com/skreep_ai"
    ]
  };
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seoConfig.siteUrl}#organization`,
    name: "Skreep",
    url: seoConfig.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${seoConfig.siteUrl}/logo-512.png`,
      width: 512,
      height: 512
    },
    description: "פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+972-50-000-0000",
      email: "hello@skreep.com",
      contactType: "customer service",
      availableLanguage: ["Hebrew", "English"]
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL"
    },
    sameAs: [
      "https://www.linkedin.com/company/skreep",
      "https://twitter.com/skreep_ai"
    ]
  };
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${seoConfig.siteUrl}#website`,
    url: seoConfig.siteUrl,
    name: "Skreep",
    publisher: { "@id": `${seoConfig.siteUrl}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://skreep.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: ["he-IL", "en-US"]  };
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
