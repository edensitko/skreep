import type { Metadata } from "next";
import "./globals.css";

import ClientLayout from '@/components/Layout/ClientLayout';
import { UserTypeProvider } from '@/hooks/useGlobalUserType';
import { ConditionalLayout } from '@/components/Layout/ConditionalLayout';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { DynamicHtmlWrapper } from '@/components/Layout/DynamicHtmlWrapper';
import DynamicMetadata from '@/components/Layout/DynamicMetadata';
import StructuredData from '@/components/SEO/StructuredData';
import Analytics from '@/components/SEO/Analytics';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/utils';

// Using system fonts to avoid Turbopack issues

export const metadata: Metadata = {
  title: "סקריפ | skreep - פתרונות בינה מלאכותית",
  description: "פתרונות בינה מלאכותית מתקדמים לעסקים. אנחנו מספקים פתרונות טכנולוגיים חדשניים שיעזרו לעסק שלכם לחסוך עלויות ולהגדיל יעילות.",
  keywords: "בינה מלאכותית, פתרונות טכנולוגיים, עסקים, חדשנות, אוטומציה",
  openGraph: {
    title: "סקריפ | skreep - פתרונות בינה מלאכותית",
    description: "פתרונות בינה מלאכותית מתקדמים לעסקים",
    type: "website",
    locale: "he_IL",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "סקריפ | skreep - פתרונות בינה מלאכותית",
    description: "פתרונות בינה מלאכותית מתקדמים לעסקים",
  },
  alternates: {
    languages: {
      'he': '/',
      'en': '/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data
  const structuredData = [
    generateLocalBusinessSchema(),
    generateOrganizationSchema(),
    generateWebsiteSchema()
  ];

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <StructuredData data={structuredData} />
      </head>
      <body
        className="antialiased bg-black min-h-screen relative loading font-sans"
      >
        <Analytics />
        <LanguageProvider>
          <DynamicMetadata />
          <DynamicHtmlWrapper>
            <UserTypeProvider>
              <ClientLayout>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
              </ClientLayout>
            </UserTypeProvider>
          </DynamicHtmlWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
