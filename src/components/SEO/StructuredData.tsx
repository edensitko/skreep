// ============================================================================
// STRUCTURED DATA COMPONENT
// ============================================================================

import Script from 'next/script';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
