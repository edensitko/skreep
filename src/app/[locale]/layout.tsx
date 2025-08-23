import type { Metadata } from 'next';
import Script from 'next/script';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Analytics from '@/components/SEO/Analytics';
import JsonLd from '../../components/SEO/JsonLd';
import '../globals.css';

export const metadata: Metadata = {
  title: "Skreep - AI Solutions & Innovation | פתרונות בינה מלאכותית",
  description: "Skreep מפתחת פתרונות AI מתקדמים לעסקים: בניית אתרים, מערכות אוטומציה, צ'אטבוטים חכמים וחדשנות טכנולוגית. גלה איך הבינה המלאכותית יכולה להעצים את העסק שלך.",
  keywords: [
    "AI",
    "Artificial Intelligence", 
    "בינה מלאכותית",
    "צ'אטבוטים",
    "בניית אתרים",
    "אוטומציה",
    "Skreep",
    "פתרונות דיגיטליים",
    "חדשנות טכנולוגית",
    "Israel",
    "ישראל",
    "Hebrew",
    "English"
  ],
  authors: [{ name: 'Skreep', url: 'https://skreep.com' }],
  creator: 'Skreep',
  publisher: 'Skreep',
  metadataBase: new URL('https://skreep.com'),
  alternates: {
    canonical: '/',
    languages: {
      'he-IL': '/he',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Skreep - AI Solutions & Innovation",
    description: "פתרונות AI מתקדמים לעסקים: אתרים, אוטומציה וצ'אטבוטים חכמים. הצטרף לעולם החדש של Skreep.",
    url: 'https://skreep.com',
    siteName: 'Skreep',
    images: [
      {
        url: 'https://skreep.com/assets/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skreep AI Solutions',
      },
    ],
    locale: 'he_IL',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Skreep - AI Solutions & Innovation",
    description: "פתרונות AI חכמים לבניית אתרים, צ'אטבוטים ואוטומציה לעסקים. Skreep משנה את הדרך בה עובדים עם טכנולוגיה.",
    site: '@skreep',
    creator: '@skreep',
    images: ['https://skreep.com/assets/images/og-image.jpg'],
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
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <LanguageProvider>
          {children}
          <Analytics />
          <JsonLd />
        </LanguageProvider>
      </body>
    </html>
  );
}
