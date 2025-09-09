'use client';

import { useCallback, useMemo, useState } from 'react';
import "./globals.css";

import ClientLayout from "@/components/Layout/ClientLayout";
import { UserTypeProvider } from "@/hooks/useGlobalUserType";
import { ConditionalLayout } from "@/components/Layout/ConditionalLayout";
import Analytics from "@/components/SEO/Analytics";
import CookieConsent from "@/components/SEO/CookieConsent";
import DynamicMetadata from "@/components/Layout/DynamicMetadata";
import { DynamicHtmlWrapper } from "@/components/Layout/DynamicHtmlWrapper";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AEO, LocalSEO, PageSEO, StructuredData } from '@/components/SEO';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/utils';

interface StructuredDataItem {
  [key: string]: unknown;
}

// Client component for the main layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State to collect structured data from child components
  const [structuredData, setStructuredData] = useState<StructuredDataItem[]>([]);

  // Generate base schemas
  const baseStructuredData = useMemo(
    () => [
      generateLocalBusinessSchema(),
      generateOrganizationSchema(),
      generateWebsiteSchema(),
    ],
    []
  );

  // Callback to receive structured data from child components
  const handleStructuredData = useCallback((data: StructuredDataItem[]) => {
    setStructuredData((prev) => [...prev, ...data]);
  }, []);

  // Combine base schemas with component schemas
  const allStructuredData = useMemo(
    () => [...baseStructuredData, ...structuredData],
    [baseStructuredData, structuredData]
  );

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <StructuredData data={allStructuredData} />
      </head>
      <body className="antialiased bg-black min-h-screen relative loading font-sans">
        <Analytics />
        <LanguageProvider>
          <DynamicMetadata />
          <DynamicHtmlWrapper>
            <UserTypeProvider>
              <ClientLayout>
                <ConditionalLayout>
                  <PageSEO onStructuredData={handleStructuredData} />
                  <LocalSEO onStructuredData={handleStructuredData} />
                  <AEO onStructuredData={handleStructuredData} />
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
