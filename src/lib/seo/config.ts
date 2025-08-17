// ============================================================================
// SEO CONFIGURATION
// ============================================================================

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultImage: string;
  twitterHandle: string;
  facebookAppId?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
  yandexVerification?: string;
  locale: string;
  alternateLocale: string;
  // Multilingual content
  multilingual: {
    he: {
      title: string;
      description: string;
      keywords: string[];
      aiTopics: string;
      conversationalQueries: string;
      businessType: string;
    };
    en: {
      title: string;
      description: string;
      keywords: string[];
      aiTopics: string;
      conversationalQueries: string;
      businessType: string;
    };
  };
}

export const seoConfig: SEOConfig = {
  siteName: 'סקריפ | skreep',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://skreep.com',
  defaultTitle: 'סקריפ | skreep - פתרונות בינה מלאכותית מתקדמים',
  defaultDescription: 'פתרונות בינה מלאכותית מתקדמים לעסקים. אנחנו מספקים פתרונות טכנולוגיים חדשניים שיעזרו לעסק שלכם לחסוך עלויות ולהגדיל יעילות.',
  defaultKeywords: [
    'בינה מלאכותית',
    'פתרונות טכנולוגיים',
    'עסקים',
    'חדשנות',
    'אוטומציה',
    'AI solutions',
    'business automation',
    'technology consulting',
    'artificial intelligence',
    'digital transformation'
  ],
  defaultImage: '/assets/images/og-image.jpg',
  twitterHandle: '@skreep_ai',
  locale: 'he_IL',
  alternateLocale: 'en_US',
  multilingual: {
    he: {
      title: 'סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים',
      description: 'פתרונות בינה מלאכותית מתקדמים לעסקים. אנחנו מספקים פתרונות טכנולוגיים חדשניים שיעזרו לעסק שלכם לחסוך עלויות ולהגדיל יעילות.',
      keywords: [
        'בינה מלאכותית',
        'פתרונות טכנולוגיים',
        'עסקים',
        'חדשנות',
        'אוטומציה',
        'ייעוץ טכנולוגי',
        'טרנספורמציה דיגיטלית',
        'פתרונות עסקיים'
      ],
      aiTopics: 'בינה מלאכותית, אוטומציה עסקית, ייעוץ טכנולוגי',
      conversationalQueries: 'פתרונות בינה מלאכותית לעסקים, שירותי אוטומציה, ייעוץ טכנולוגי ישראל',
      businessType: 'שירותים עסקיים'
    },
    en: {
      title: 'skreep - Advanced AI Solutions for Business',
      description: 'Advanced artificial intelligence solutions for businesses. We provide innovative technology solutions that help your business save costs and increase efficiency.',
      keywords: [
        'artificial intelligence',
        'AI solutions',
        'business automation',
        'technology consulting',
        'digital transformation',
        'business solutions',
        'innovation',
        'automation'
      ],
      aiTopics: 'artificial intelligence, business automation, technology consulting',
      conversationalQueries: 'AI solutions for business, automation services, technology consulting Israel',
      businessType: 'business-services'
    }
  }
};

// Business/Local SEO Information
export interface BusinessInfo {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  url: string;
  openingHours: string[];
  priceRange: string;
  areaServed: string[];
  serviceType: string[];
}

export const businessInfo: BusinessInfo = {
  name: 'סקריפ - פתרונות בינה מלאכותית',
  description: 'חברת פתרונות בינה מלאכותית מובילה המתמחה בפיתוח פתרונות טכנולוגיים חדשניים לעסקים',
  address: {
    streetAddress: 'רחוב הטכנולוgia 123',
    addressLocality: 'תל אביב',
    addressRegion: 'מחוז תל אביב',
    postalCode: '6789012',
    addressCountry: 'IL'
  },
  geo: {
    latitude: 32.0853,
    longitude: 34.7818
  },
  telephone: '+972-3-1234567',
  email: 'info@skreep.com',
  url: 'https://skreep.com',
  openingHours: [
    'Mo-Fr 09:00-18:00'
  ],
  priceRange: '$$',
  areaServed: ['Israel', 'Tel Aviv', 'Jerusalem', 'Haifa'],
  serviceType: [
    'AI Consulting',
    'Business Automation',
    'Digital Transformation',
    'Technology Solutions'
  ]
};
