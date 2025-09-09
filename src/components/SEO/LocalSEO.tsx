'use client';

import React, { useEffect, useMemo } from 'react';
import { StructuredDataItem, SEOBaseProps, Address, GeoCoordinates, OpeningHoursSpecification, Review } from './types';
import { businessInfo } from '@/lib/seo/config';

interface LocalSEOProps extends Omit<SEOBaseProps, 'title' | 'description' | 'image' | 'url' | 'type' | 'publishedTime' | 'modifiedTime'> {
  showMap?: boolean;
  customLocation?: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
}

/**
 * Local SEO component for geographic and location-based optimization
 */
const LocalSEO = ({ showMap = false, customLocation, onStructuredData }: LocalSEOProps): React.JSX.Element => {
  const location = customLocation || {
    name: businessInfo.name,
    address: `${businessInfo.address.streetAddress}, ${businessInfo.address.addressLocality}`,
    latitude: businessInfo.geo.latitude,
    longitude: businessInfo.geo.longitude
  };

  // Generate local business structured data
  const localBusinessSchema: StructuredDataItem = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: location.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    telephone: businessInfo.telephone,
    email: businessInfo.email,
    url: businessInfo.url,
    openingHoursSpecification: businessInfo.openingHours.map(hours => {
      const [days, time] = hours.split(' ');
      const [opens, closes] = time.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.split('-').map(day => {
          const dayMap: { [key: string]: string } = {
            'Mo': 'Monday',
            'Tu': 'Tuesday',
            'We': 'Wednesday',
            'Th': 'Thursday',
            'Fr': 'Friday',
            'Sa': 'Saturday',
            'Su': 'Sunday'
          };
          return dayMap[day] || day;
        }),
        opens,
        closes,
      };
    }),
    priceRange: businessInfo.priceRange,
    areaServed: businessInfo.areaServed.map(area => ({
      '@type': 'Place',
      name: area,
    })),
    serviceType: businessInfo.serviceType,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'דוד כהן'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'שירות מעולה ופתרונות טכנולוגיים מתקדמים. ממליץ בחום!'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'שרה לוי'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'הצוות המקצועי ביותר שעבדתי איתו. פתרונות חדשניים ויעילים.'
      }
    ]
  };

  // Generate place schema for better local search
  const placeSchema: StructuredDataItem = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: location.name,
    address: location.address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    hasMap: `https://maps.google.com/?q=${location.latitude},${location.longitude}`,
    photo: 'https://skreep.com/assets/images/office-location.jpg'
  };

  // Pass structured data up to the root layout if callback is provided
  useEffect(() => {
    if (onStructuredData) {
      onStructuredData([localBusinessSchema, placeSchema]);
    }
  }, [onStructuredData]);
  
  // Memoize the schemas to prevent unnecessary re-renders
  const schemas = useMemo(() => [localBusinessSchema, placeSchema], [localBusinessSchema, placeSchema]);
  
  // Update parent when schemas change
  useEffect(() => {
    if (onStructuredData) {
      onStructuredData(schemas);
    }
  }, [onStructuredData, schemas]);

  return (
    <>
      {/* Geo Meta Tags */}
      <meta name="geo.region" content={`IL-${businessInfo.address.addressRegion?.toUpperCase() || 'TA'}`} />
      <meta name="geo.placename" content={businessInfo.address.addressLocality} />
      <meta name="geo.position" content={`${location.latitude};${location.longitude}`} />
      <meta name="ICBM" content={`${location.latitude}, ${location.longitude}`} />
      
      {/* Local Business Meta */}
      <meta name="business:contact_data:street_address" content={businessInfo.address.streetAddress} />
      <meta name="business:contact_data:locality" content={businessInfo.address.addressLocality} />
      <meta name="business:contact_data:region" content={businessInfo.address.addressRegion} />
      <meta name="business:contact_data:postal_code" content={businessInfo.address.postalCode} />
      <meta name="business:contact_data:country_name" content="Israel" />
      <meta name="business:contact_data:phone_number" content={businessInfo.telephone} />
      <meta name="business:contact_data:email" content={businessInfo.email} />
      
      {showMap && (
        <div className="local-seo-map" style={{ display: 'none' }}>
          {/* Hidden map for crawlers */}
          <iframe
            src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`מפה של ${location.name}`}
          />
        </div>
      )}
    </>
  );
}

// Default export for backward compatibility
export default LocalSEO;
