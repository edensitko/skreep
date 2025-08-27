// ============================================================================
// ANALYTICS AND TRACKING COMPONENTS
// ============================================================================

'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  linkedInPartnerId?: string;
}

/**
 * Analytics component for tracking and measurement
 */
export default function Analytics({
  googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID,
  googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID,
  facebookPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  linkedInPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID
}: AnalyticsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check for cookie consent
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [googleAnalyticsId]);

  // Don't load any analytics without consent
  if (!hasConsent || !isMounted) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                cookie_flags: 'SameSite=Lax;Secure',
                storage: 'none'
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {googleTagManagerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
          {isMounted && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedInPartnerId && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${linkedInPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
      )}
    </>
  );
}

// Type declarations for global objects
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    lintrk: (...args: unknown[]) => void;
  }
}
