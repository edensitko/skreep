import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import "./globals.css";

import ClientLayout from '@/components/Layout/ClientLayout';
import { UserTypeProvider } from '@/hooks/useGlobalUserType';
import { ConditionalLayout } from '@/components/Layout/ConditionalLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add a Hebrew font
const hebrewFont = Rubik({
  subsets: ['hebrew'],
  variable: '--font-hebrew',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "סקריפ | skreep - פתרונות בינה מלאכותית",
  description: "פתרונות בינה מלאכותית מתקדמים לעסקים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hebrewFont.variable} antialiased bg-black min-h-screen relative loading`}
      >
        <UserTypeProvider>
          <ClientLayout>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ClientLayout>
        </UserTypeProvider>
      </body>
    </html>
  );
}
