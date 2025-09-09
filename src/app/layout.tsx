// import type { Metadata } from "next";
// import "./globals.css";

// import ClientLayout from '@/components/Layout/ClientLayout';
// import { UserTypeProvider } from '@/hooks/useGlobalUserType';
// import { ConditionalLayout } from '@/components/Layout/ConditionalLayout';
// import { LanguageProvider } from '@/contexts/LanguageContext';
// import Analytics from '@/components/SEO/Analytics';
// import CookieConsent from '@/components/SEO/CookieConsent';
// import DynamicMetadata from '@/components/Layout/DynamicMetadata';
// import { DynamicHtmlWrapper } from '@/components/Layout/DynamicHtmlWrapper';
// import StructuredData from '@/components/SEO/StructuredData';
// import { generateLocalBusinessSchema, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/utils';

// // Using system fonts to avoid Turbopack issues

// export const metadata: Metadata = {
//   title: "סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
//   description: "סקריפ - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות טכנולוגיים חדשניים לעסקים: אוטומציה חכמה, צ'אטבוטים, ניתוח נתונים וייעוץ בינה מלאכותית. חסכו עלויות והגדילו יעילות עם הפתרונות המתקדמים שלנו.",
//   keywords: "סקריפ, בינה מלאכותית, פתרונות טכנולוגיים, עסקים, חדשנות, אוטומציה, צ'אטבוטים, ייעוץ טכנולוגי, פתרונות עסקיים, ישראל",
//   authors: [{ name: "Skreep AI Solutions" }],
//   creator: "Skreep",
//   publisher: "Skreep",
//   icons: {
//     icon: '/assets/images/logo-2.png',
//     shortcut: '/assets/images/logo-2.png',
//     apple: '/assets/images/logo-2.png',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   openGraph: {
//     title: "סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
//     description: "סקריפ - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות טכנולוגיים חדשניים לעסקים: אוטומציה חכמה, צ'אטבוטים וניתוח נתונים",
//     type: "website",
//     locale: "he_IL",
//     alternateLocale: "en_US",
//     url: "https://skreep.com",
//     siteName: "סקריפ",
//     images: [
//       {
//         url: "https://skreep.com/assets/images/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Skreep AI Solutions Logo",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
//     description: "סקריפ - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות טכנולוגיים חדשניים לעסקים",
//     images: ["https://skreep.com/assets/images/og-image.jpg"],
//   },
//   alternates: {
//     canonical: "https://skreep.com",
//     languages: {
//       'he': 'https://skreep.com',
//       'en': 'https://skreep.com/en',
//       'x-default': 'https://skreep.com',
//     },
//   },
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
//     yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || '',
//     other: {
//       'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
//     },
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // Generate structured data
//   const structuredData = [
//     generateLocalBusinessSchema(),
//     generateOrganizationSchema(),
//     generateWebsiteSchema()
//   ];

//   return (
//     <html lang="he" dir="rtl" suppressHydrationWarning>
//       <head>
//         <StructuredData data={structuredData} />
//       </head>
//       <body
//         className="antialiased bg-black min-h-screen relative loading font-sans"
//       >
//         <Analytics />
//         <LanguageProvider>
//           <DynamicMetadata />
//           <DynamicHtmlWrapper>
//             <UserTypeProvider>
//               <ClientLayout>
//                 <ConditionalLayout>
//                   {children}
//                 </ConditionalLayout>
//               </ClientLayout>
//             </UserTypeProvider>
//           </DynamicHtmlWrapper>
//           <CookieConsent />
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import ClientLayout from "@/components/Layout/ClientLayout";
import { UserTypeProvider } from "@/hooks/useGlobalUserType";
import { ConditionalLayout } from "@/components/Layout/ConditionalLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Analytics from "@/components/SEO/Analytics";
import CookieConsent from "@/components/SEO/CookieConsent";
import DynamicMetadata from "@/components/Layout/DynamicMetadata";
import { DynamicHtmlWrapper } from "@/components/Layout/DynamicHtmlWrapper";
import StructuredData from "@/components/SEO/StructuredData";
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/seo/utils";

// חשוב: ודא שבנתיב הבא קיימים הקבצים:
// /assets/images/logo-2.png  (32x32 לפחות)
// /logo-full.png              (מומלץ 512x512)
// /apple-touch-icon.png       (180x180)
// /assets/images/og-image.jpg (1200x630)

export const metadata: Metadata = {
  metadataBase: new URL("https://skreep.com"),
  title: "סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
  description:
    "סקריפ - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות טכנולוגיים חדשניים לעסקים: אוטומציה חכמה, צ'אטבוטים, ניתוח נתונים וייעוץ בינה מלאכותית. חסכו עלויות והגדילו יעילות עם הפתרונות המתקדמים שלנו.",
  keywords:
    "סקריפ, בינה מלאכותית, פתרונות טכנולוגיים, עסקים, חדשנות, אוטומציה, צ'אטבוטים, ייעוץ טכנולוגי, פתרונות עסקיים, ישראל",
  authors: [{ name: "Skreep AI Solutions", url: "https://skreep.com" }],
  creator: "Skreep",
  publisher: "Skreep",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/images/logo-2.png", type: "image/png", sizes: "32x32" },
      { url: "/logo-full.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
    description:
      "סקריפ - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות טכנולוגיים חדשניים לעסקים: אוטומציה חכמה, צ'אטבוטים וניתוח נתונים",
    type: "website",
    locale: "he_IL",
    alternateLocale: ["en_US"],
    url: "https://skreep.com",
    siteName: "סקריפ",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skreep AI Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "סקריפ - פתרונות בינה מלאכותית מתקדמים לעסקים בישראל",
    description:
      "סקריפ - חברת פתרונות בינה מלאכותית מובילה בישראל. פתרונות טכנולוגיים חדשניים לעסקים",
    images: ["/assets/images/og-image.jpg"],
  },

  alternates: {
    canonical: "https://skreep.com",
    languages: {
      "he-IL": "https://skreep.com",
      "en-US": "https://skreep.com/en",
      "x-default": "https://skreep.com",
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD גלובלי – ארגון/אתר/עסק מקומי
  const structuredData = [
    generateLocalBusinessSchema(),
    generateOrganizationSchema(), 
    generateWebsiteSchema(),
  ];

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <StructuredData data={structuredData} />
      </head>
      <body className="antialiased bg-black min-h-screen relative loading font-sans">
        <Analytics />
        <LanguageProvider>
          <DynamicMetadata />
          <DynamicHtmlWrapper>
            <UserTypeProvider>
              <ClientLayout>
                <ConditionalLayout>{children}</ConditionalLayout>
              </ClientLayout>
            </UserTypeProvider>
          </DynamicHtmlWrapper>
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
