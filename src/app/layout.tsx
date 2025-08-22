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
  title: "סקריפ | skreep - פתרונות בינה מלאכותית | AI Solutions Israel",
  description: "פתרונות בינה מלאכותית מתקדמים לעסקים בישראל. אנחנו מספקים פתרונות טכנולוגיים חדשניים שיעזרו לעסק שלכם לחסוך עלויות ולהגדיל יעילות. AI consulting, automation, chatbots.",
  keywords: "בינה מלאכותית, פתרונות טכנולוגיים, עסקים, חדשנות, אוטומציה, AI Israel, artificial intelligence, chatbots, automation, consulting, ישראל",
  authors: [{ name: "Skreep AI Solutions" }],
  creator: "Skreep",
  publisher: "Skreep",
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
  openGraph: {
    title: "סקריפ | skreep - פתרונות בינה מלאכותית",
    description: "פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
    type: "website",
    locale: "he_IL",
    alternateLocale: "en_US",
    url: "https://skreep.com",
    siteName: "Skreep AI Solutions",
    images: [
      {
        url: "https://skreep.com/assets/images/logo-1.png",
        width: 1200,
        height: 630,
        alt: "Skreep AI Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "סקריפ | skreep - פתרונות בינה מלאכותית",
    description: "פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
    images: ["https://skreep.com/assets/images/logo-1.png"],
  },
  alternates: {
    canonical: "https://skreep.com",
    languages: {
      'he': 'https://skreep.com',
      'en': 'https://skreep.com/en',
      'x-default': 'https://skreep.com',
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
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
