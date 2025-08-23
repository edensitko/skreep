import Script from "next/script";

export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Skreep",
      "url": "https://skreep.com",
      "logo": "https://skreep.com/assets/images/logo.svg",
      "sameAs": [
        "https://www.facebook.com/skreep",
        "https://www.linkedin.com/company/skreep",
        "https://twitter.com/skreep"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+972-50-000-0000",
          "email": "hello@skreep.com",
          "contactType": "customer service",
          "areaServed": "IL",
          "availableLanguage": ["Hebrew", "English"]
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Skreep",
      "url": "https://skreep.com",
      "inLanguage": ["he-IL","en-US"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://skreep.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Chatbots for Business",
      "serviceType": "Conversational AI",
      "provider": { "@type": "Organization", "name": "Skreep" },
      "areaServed": "Worldwide",
      "termsOfService": "https://skreep.com/terms",
      "description": "בניית צ'אטבוטי AI חכמים לשירות, מכירות ותמיכה — אינטגרציות WhatsApp, Messenger ואתר.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI Chatbots Packages",
        "itemListElement": [
          { "@type": "Offer", "name": "Starter" },
          { "@type": "Offer", "name": "Pro" },
          { "@type": "Offer", "name": "Enterprise" }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Automation & Integrations",
      "serviceType": "Process Automation",
      "provider": { "@type": "Organization", "name": "Skreep" },
      "areaServed": "Worldwide",
      "description": "אוטומציה חכמה לתהליכים עסקיים: אינטגרציה למערכות CRM, חיבורי API, טריגרים ותזמונים."
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Experiences",
      "serviceType": "Web Development",
      "provider": { "@type": "Organization", "name": "Skreep" },
      "areaServed": "Worldwide",
      "description": "בניית אתרים ולנדים מהירים ב-Next.js עם SEO מצוין ותמיכה ברב-לשוניות."
    }
  ];

  return (
    <Script
      id="skreep-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
