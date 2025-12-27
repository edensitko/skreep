import "./globals.css";
import ClientLayout from "@/components/Layout/ClientLayout";
import { UserTypeProvider } from "@/hooks/useGlobalUserType";
import { ConditionalLayout } from "@/components/Layout/ConditionalLayout";
import Analytics from "@/components/SEO/Analytics";
import DynamicMetadata from "@/components/Layout/DynamicMetadata";
import { DynamicHtmlWrapper } from "@/components/Layout/DynamicHtmlWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AEO, LocalSEO, PageSEO } from '@/components/SEO';
import CookieConsent from "@/components/CookieConsent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = {
    "@type": "Organization",
    "@id": "https://skreep.com#organization",
    name: "Skreep",
    url: "https://skreep.com",
    logo: {
      "@type": "ImageObject",
      url: "https://skreep.com/assets/images/logo-1.webp",
      width: 512,
      height: 512
    },
    description: "פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
    sameAs: [
      "https://www.linkedin.com/company/skreep",
      "https://twitter.com/skreep_ai"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+972-50-000-0000",
      email: "hello@skreep.com",
      contactType: "customer service",
      availableLanguage: ["Hebrew", "English"]
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
      addressRegion: "Israel"
    }
  };

  const website = {
    "@type": "WebSite",
    "@id": "https://skreep.com#website",
    url: "https://skreep.com",
    name: "Skreep",
    publisher: { "@id": "https://skreep.com#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://skreep.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: ["he-IL", "en-US"]
  };

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": "https://skreep.com#business",
    name: "סקריפ - פתרונות בינה מלאכותית",
    url: "https://skreep.com",
    telephone: "+972-3-1234567",
    email: "makwe n",
    address: {
      "@type": "PostalAddress",
      streetAddress: "רחוב הטכנולוגיה 123",
      addressLocality: "תל אביב",
      addressRegion: "מחוז תל אביב",
      postalCode: "6789012",
      addressCountry: "IL"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    priceRange: "$$",
    sameAs: [
      "https://www.linkedin.com/company/skreep",
      "https://twitter.com/skreep_ai"
    ]
  };

  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness]
  };

  const structuredData = JSON.stringify(ldJson);

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="antialiased bg-black min-h-screen relative loading font-sans">
        <Analytics />
        <LanguageProvider>
          <DynamicMetadata />
          <DynamicHtmlWrapper>
            <UserTypeProvider>
              <ClientLayout>
                <ConditionalLayout>
                  <PageSEO />
                  <LocalSEO />
                  <AEO />
                  {children}
                </ConditionalLayout>
              </ClientLayout>
            </UserTypeProvider>
          </DynamicHtmlWrapper>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
