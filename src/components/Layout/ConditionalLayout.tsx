'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

/**
 * ConditionalLayout component that conditionally renders header/footer
 * based on the current route. Excludes header/footer from maintenance page.
 */
export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  
  // Routes that should not show header/footer
  const excludedRoutes = ['/'];
  
  // Check if current route should exclude header/footer
  const shouldExcludeLayout = excludedRoutes.includes(pathname);
  
  if (shouldExcludeLayout) {
    // For maintenance page and other excluded routes, render only the page content
    return <>{children}</>;
  }
  
  // For all other routes, render with header/footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
