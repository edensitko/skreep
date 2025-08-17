// ============================================================================
// SEO META COMPONENT
// ============================================================================

import Head from 'next/head';
import { seoConfig } from '@/lib/seo/config';

interface SEOMetaProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  alternateLocale?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}

/**
 * SEO Meta component for additional meta tags not covered by Next.js metadata
 */
export default function SEOMeta({
  title,
  description = seoConfig.defaultDescription,
  keywords = seoConfig.defaultKeywords,
  image = seoConfig.defaultImage,
  url,
  type = 'website',
  locale = seoConfig.locale,
  alternateLocale = seoConfig.alternateLocale,
  noindex = false,
  nofollow = false,
  canonical
}: SEOMetaProps) {
  const fullTitle = title 
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  const fullUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const fullImage = image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Head>
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="IL" />
      <meta name="geo.placename" content="Tel Aviv" />
      <meta name="geo.position" content="32.0853;34.7818" />
      <meta name="ICBM" content="32.0853, 34.7818" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content={locale.split('_')[0]} />
      <meta name="language" content={locale.split('_')[0]} />
      
      {/* Additional OpenGraph */}
      <meta property="og:locale:alternate" content={alternateLocale} />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Additional Twitter */}
      <meta name="twitter:domain" content={seoConfig.siteUrl.replace('https://', '')} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="he" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={fullUrl.replace('/he/', '/en/')} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Microsoft */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Theme */}
      <meta name="theme-color" content="#000000" />
      <meta name="color-scheme" content="dark light" />
    </Head>
  );
}
