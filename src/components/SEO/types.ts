// Base interface for address information
export interface Address {
  '@type'?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

// Interface for geo coordinates
export interface GeoCoordinates {
  '@type'?: string;
  latitude?: number | string;
  longitude?: number | string;
}

// Interface for opening hours
export interface OpeningHoursSpecification {
  '@type'?: string;
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
  validFrom?: string;
  validThrough?: string;
}

// Interface for review data
export interface Review {
  '@type'?: string;
  author: {
    '@type'?: string;
    name: string;
  };
  reviewRating: {
    '@type'?: string;
    ratingValue: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
  };
  reviewBody?: string;
  datePublished?: string;
}

// Interface for main entity (used in FAQ, HowTo, etc.)
export interface MainEntity {
  '@type': string;
  name?: string;
  text?: string;
  url?: string;
  [key: string]: unknown;
}

export type StructuredDataItem = {
  [key: string]: string | number | boolean | unknown[] | object | undefined;
  '@context'?: string | string[];
  '@type'?: string | string[];
  name?: string;
  description?: string;
  address?: Address | string;
  geo?: GeoCoordinates;
  hasMap?: string;
  photo?: string | string[];
  telephone?: string;
  email?: string;
  url?: string;
  openingHoursSpecification?: OpeningHoursSpecification[];
  priceRange?: string;
  areaServed?: string[] | Array<{ '@type'?: string; name: string }>;
  serviceType?: string | string[];
  aggregateRating?: {
    '@type'?: string;
    ratingValue: string | number;
    reviewCount: string | number;
    bestRating?: string | number;
    worstRating?: string | number;
  };
  review?: Review[];
  mainEntity?: MainEntity[];
  step?: Array<{
    '@type'?: string;
    name?: string;
    text: string;
    url?: string;
    image?: string;
  }>;
  image?: string | string[];
  sameAs?: string[];
};

export interface SEOBaseProps {
  onStructuredData?: (data: StructuredDataItem[]) => void;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export interface AEOProps extends SEOBaseProps {
  // FAQ Schema
  questions?: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
  
  // HowTo Schema
  howTo?: {
    name: string;
    description: string;
    steps: Array<{
      name: string;
      text: string;
      image?: string;
    }>;
  };
  
  // Product Schema
  product?: {
    name: string;
    description: string;
    brand: string;
    offers: {
      price: string;
      currency: string;
      availability: string;
    };
  };
  
  // Language support
  language?: 'he' | 'en';
  
  // Callback for structured data
  onStructuredData?: (data: StructuredDataItem[]) => void;
}

export interface LocalSEOProps extends SEOBaseProps {
  // Add LocalSEO-specific props here
  businessName?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  latitude?: string | number;
  longitude?: string | number;
  phone?: string;
  email?: string;
  openingHours?: string[];
  priceRange?: string;
  servesCuisine?: string[];
}

export interface PageSEOProps extends SEOBaseProps {
  // Add PageSEO-specific props here
  canonicalUrl?: string;
  locale?: string;
  alternateLocales?: string[];
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  schemaType?: 'Article' | 'BlogPosting' | 'WebPage' | 'WebSite' | 'Organization';
}
