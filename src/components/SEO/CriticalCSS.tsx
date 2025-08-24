'use client';

import { useEffect } from 'react';

/**
 * Component to handle critical CSS inlining and non-critical CSS deferring
 * Improves PageSpeed Insights scores by reducing render-blocking resources
 */
export default function CriticalCSS() {
  useEffect(() => {
    // Defer non-critical CSS loading
    const deferCSS = () => {
      // Load Swiper CSS asynchronously
      const swiperCSS = document.createElement('link') as HTMLLinkElement;
      swiperCSS.rel = 'stylesheet';
      swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
      swiperCSS.media = 'print';
      swiperCSS.onload = function() {
        (this as HTMLLinkElement).media = 'all';
      };
      document.head.appendChild(swiperCSS);

      // Preload critical fonts
      const fontPreload = document.createElement('link') as HTMLLinkElement;
      fontPreload.rel = 'preload';
      fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontPreload.as = 'style';
      fontPreload.onload = function() {
        (this as HTMLLinkElement).onload = null;
        (this as HTMLLinkElement).rel = 'stylesheet';
      };
      document.head.appendChild(fontPreload);

      // Add fallback for browsers that don't support preload
      const fontFallback = document.createElement('noscript');
      fontFallback.innerHTML = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">';
      document.head.appendChild(fontFallback);
    };

    // Defer CSS loading until after initial paint
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', deferCSS);
      } else {
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(deferCSS);
        } else {
          setTimeout(deferCSS, 100);
        }
      }
    }

    // Mark body as loaded for CSS transitions
    const markAsLoaded = () => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    };

    // Mark as loaded after a short delay to ensure smooth transitions
    setTimeout(markAsLoaded, 100);

    return () => {
      document.removeEventListener('DOMContentLoaded', deferCSS);
    };
  }, []);

  return (
    <>
      {/* Inline critical CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Critical above-the-fold styles */
          html{font-family:system-ui,-apple-system,sans-serif;line-height:1.6;-webkit-text-size-adjust:100%}
          body{margin:0;padding:0;background-color:#000;color:#fff;min-height:100vh;position:relative;font-family:inherit;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
          .min-h-screen{min-height:100vh}
          .bg-black{background-color:#000}
          .text-white{color:#fff}
          .relative{position:relative}
          .absolute{position:absolute}
          .fixed{position:fixed}
          .inset-0{top:0;right:0;bottom:0;left:0}
          .z-10{z-index:10}
          .z-20{z-index:20}
          .z-50{z-index:50}
          .flex{display:flex}
          .items-center{align-items:center}
          .justify-center{justify-content:center}
          .justify-between{justify-content:space-between}
          .container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
          @media(min-width:640px){.container{max-width:640px}}
          @media(min-width:768px){.container{max-width:768px}}
          @media(min-width:1024px){.container{max-width:1024px}}
          @media(min-width:1280px){.container{max-width:1280px}}
          .header-bg{background:rgba(0,0,0,.9);backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.1)}
          .loading{opacity:0;transition:opacity .3s ease-in-out}
          .loaded{opacity:1}
          .hero-gradient{background:linear-gradient(135deg,#000 0%,#1a1a1a 50%,#000 100%)}
          .transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:300ms}
          .opacity-0{opacity:0}
          .opacity-100{opacity:1}
          .hidden{display:none}
          .block{display:block}
          .overflow-hidden{overflow:hidden}
        `
      }} />
      
      {/* Removed preload resources to prevent unused preload warnings */}
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="" />
      <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="" />
    </>
  );
}
