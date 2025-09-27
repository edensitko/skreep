'use client';

import React, { memo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePageLoading } from '@/hooks/usePageLoading';

// Lazy load components
const LoadingScreen = dynamic(() => import('@/components/Layout/LoadingScreen'), {
  ssr: false,
  loading: () => null
});


interface ClientLayoutProps {
  children: React.ReactNode;
}

function ClientLayout({ children }: ClientLayoutProps) {
  const { isLoading, handleLoadingComplete } = usePageLoading();

  // Remove loading class from body when loading completes
  useEffect(() => {
    if (!isLoading) {
      // Minimal delay for smooth transition
      setTimeout(() => {
        document.body.classList.remove('loading');
      }, 50); // Reduced from 100ms to 50ms
    }
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete}
      />
      
      {/* Main Content - Hide completely during loading */}
      {!isLoading && (
        <div className="relative z-20 animate-in fade-in duration-100">
          {children}
        </div>
      )}
    </>
  );
}

export default memo(ClientLayout);
