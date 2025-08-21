

import Home from './home/home';
import { Metadata } from 'next';
import { seoConfig, businessInfo } from '@/lib/seo/config';
import { MetadataRoute } from 'next';

export const metadata: Metadata = {
  title: seoConfig.defaultTitle,
  description: seoConfig.defaultDescription,
  keywords: seoConfig.defaultKeywords,
  authors: [{ name: 'skreep', url: 'https://skreep.com' }],
  creator: 'skreep',
  publisher: 'skreep',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'he-IL': '/he',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: seoConfig.defaultTitle,
      },
    ],
    locale: 'he_IL',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    site: seoConfig.twitterHandle,
    creator: seoConfig.twitterHandle,
    images: [seoConfig.defaultImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
  // Organization Schema for Google
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

// Add organization schema for rich snippets
function addOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: businessInfo.name,
    url: businessInfo.url,
    logo: `${seoConfig.siteUrl}/assets/images/logo.svg`,
    sameAs: [
      'https://www.facebook.com/yourpage',
      'https://www.linkedin.com/company/yourcompany',
      'https://twitter.com/yourhandle',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessInfo.telephone,
      contactType: 'customer service',
      email: businessInfo.email,
      areaServed: businessInfo.areaServed,
      availableLanguage: ['Hebrew', 'English']
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Home params={Promise.resolve({ locale: 'he' })} />
      {addOrganizationSchema()}
    </>
  );
}
