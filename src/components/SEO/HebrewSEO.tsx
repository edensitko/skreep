'use client';

import Head from 'next/head';

/**
 * Hebrew SEO optimization component specifically for "סקריפ" search visibility
 */
export default function HebrewSEO() {
  return (
    <>
      {/* Hebrew-specific meta tags for better search visibility */}
      <meta name="description" content="סקריפ (Skreep) - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות AI מתקדמים, אוטומציה חכמה וצ'אטבוטים לעסקים" />
      <meta name="keywords" content="סקריפ, Skreep, בינה מלאכותית, AI ישראל, פתרונות טכנולוגיים, עסקים, חדשנות, אוטומציה, צ'אטבוטים, chatbots, automation, consulting, ישראל, AI consulting, artificial intelligence Israel, טכנולוגיה מתקדמת, פתרונות חכמים" />
      
      {/* Hebrew business information */}
      <meta name="business-name" content="סקריפ | Skreep AI Solutions" />
      <meta name="business-type" content="חברת בינה מלאכותית" />
      <meta name="location" content="ישראל" />
      <meta name="services" content="פתרונות בינה מלאכותית, אוטומציה, צ'אטבוטים, ייעוץ טכנולוגי" />
      
      {/* Hebrew Open Graph tags */}
      <meta property="og:title" content="סקריפ | Skreep - פתרונות בינה מלאכותית מתקדמים" />
      <meta property="og:description" content="סקריפ (Skreep) - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות AI מתקדמים לעסקים" />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:site_name" content="סקריפ | Skreep AI Solutions" />
      
      {/* Hebrew Twitter Card */}
      <meta name="twitter:title" content="סקריפ | Skreep - פתרונות בינה מלאכותית מתקדמים" />
      <meta name="twitter:description" content="סקריפ (Skreep) - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות AI מתקדמים לעסקים" />
      
      {/* Hebrew language and regional tags */}
      <meta httpEquiv="content-language" content="he-IL" />
      <meta name="geo.region" content="IL" />
      <meta name="geo.country" content="Israel" />
      <meta name="geo.placename" content="ישראל" />
      
      {/* Hebrew alternate language tags */}
      <link rel="alternate" hrefLang="he" href="https://skreep.com" />
      <link rel="alternate" hrefLang="en" href="https://skreep.com/en" />
      <link rel="alternate" hrefLang="x-default" href="https://skreep.com" />
      
      {/* Hebrew structured data for local business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "סקריפ | Skreep AI Solutions",
            "alternateName": ["סקריפ", "Skreep", "Skreep AI", "סקריפ בינה מלאכותית"],
            "description": "סקריפ (Skreep) - חברת פתרונות בינה מלאכותית מובילה בישראל. מספקת פתרונות AI מתקדמים, אוטומציה חכמה וצ'אטבוטים לעסקים.",
            "url": "https://skreep.com",
            "telephone": "+972-50-123-4567",
            "email": "info@skreep.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "תל אביב",
              "addressRegion": "מחוז תל אביב",
              "addressCountry": "IL"
            },
            "areaServed": {
              "@type": "Country",
              "name": "ישראל"
            },
            "serviceType": [
              "פתרונות בינה מלאכותית",
              "אוטומציה עסקית",
              "צ'אטבוטים",
              "ייעוץ טכנולוגי",
              "AI Consulting",
              "Business Automation"
            ],
            "knowsAbout": [
              "בינה מלאכותית",
              "אוטומציה",
              "צ'אטבוטים",
              "טכנולוגיה מתקדמת",
              "פתרונות עסקיים",
              "Artificial Intelligence",
              "Machine Learning",
              "Automation"
            ],
            "inLanguage": ["he", "en"],
            "availableLanguage": ["Hebrew", "English"]
          })
        }}
      />
      
      {/* Hebrew FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "מה זה סקריפ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "סקריפ (Skreep) היא חברת פתרונות בינה מלאכותית מובילה בישראל המתמחה בפיתוח פתרונות AI מתקדמים, אוטומציה עסקית וצ'אטבוטים לעסקים."
                }
              },
              {
                "@type": "Question",
                "name": "איך סקריפ יכולה לעזור לעסק שלי?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "סקריפ מספקת פתרונות בינה מלאכותית מותאמים אישית שיעזרו לעסק שלכם לחסוך עלויות, להגדיל יעילות ולשפר את חוויית הלקוח באמצעות אוטומציה חכמה וטכנולוגיות מתקדמות."
                }
              },
              {
                "@type": "Question",
                "name": "איפה סקריפ נמצאת?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "סקריפ פועלת בישראל ומספקת שירותים לעסקים ברחבי הארץ. אנחנו מתמחים בפתרונות בינה מלאכותית המותאמים לשוק הישראלי."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
