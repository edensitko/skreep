# SEO, AEO & GEO Implementation Guide

## Overview
This guide covers the comprehensive SEO (Search Engine Optimization), AEO (Answer Engine Optimization), and GEO (Geographic/Local SEO) implementation for the skreep website.

## 🚀 Quick Start

### 1. Environment Setup
Copy `env.example` to `.env.local` and fill in your tracking IDs:

```bash
cp env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SITE_URL` - Your website URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID
- `NEXT_PUBLIC_FB_PIXEL_ID` - Facebook Pixel ID

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate Sitemap
```bash
npm run seo:sitemap
```

## 📁 File Structure

```
src/
├── lib/seo/
│   ├── config.ts          # SEO configuration
│   └── utils.ts           # SEO utilities and schema generators
├── components/SEO/
│   ├── StructuredData.tsx # JSON-LD structured data
│   ├── SEOMeta.tsx        # Additional meta tags
│   ├── Analytics.tsx      # Tracking scripts
│   ├── PageSEO.tsx        # Page-specific SEO
│   ├── LocalSEO.tsx       # Local/Geographic SEO
│   ├── AEO.tsx           # Answer Engine Optimization
│   └── index.ts          # Barrel exports
├── hooks/
│   └── useSEO.ts         # SEO tracking hook
public/
├── robots.txt            # Search engine directives
├── manifest.json         # Web app manifest
├── browserconfig.xml     # Microsoft browser config
└── sitemap.xml          # Generated sitemap
```

## 🎯 Features Implemented

### SEO (Search Engine Optimization)
- ✅ Comprehensive metadata generation
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card optimization
- ✅ Canonical URLs and alternate languages
- ✅ Structured data (JSON-LD)
- ✅ XML sitemap generation
- ✅ Robots.txt optimization
- ✅ Performance optimizations

### AEO (Answer Engine Optimization)
- ✅ FAQ schema for AI search engines
- ✅ HowTo schema for step-by-step guides
- ✅ Speakable content for voice search
- ✅ AI-friendly meta tags
- ✅ Conversational query optimization

### GEO (Geographic/Local SEO)
- ✅ Local business schema
- ✅ Geographic coordinates
- ✅ Opening hours and contact info
- ✅ Service area definitions
- ✅ Customer reviews schema
- ✅ Google Maps integration

## 🔧 Usage Examples

### Basic Page SEO
```tsx
import { PageSEO } from '@/components/SEO';

export default function MyPage() {
  return (
    <>
      <PageSEO
        pageType="services"
        title="AI Solutions"
        description="Advanced AI solutions for businesses"
      />
      {/* Your page content */}
    </>
  );
}
```

### Local SEO
```tsx
import { LocalSEO } from '@/components/SEO';

export default function ContactPage() {
  return (
    <>
      <LocalSEO showMap={true} />
      {/* Your contact page content */}
    </>
  );
}
```

### AEO Implementation
```tsx
import { AEO } from '@/components/SEO';

const faqs = [
  {
    question: "מה זה בינה מלאכותית?",
    answer: "בינה מלאכותית היא טכנולוגיה המאפשרת למחשבים לבצע משימות הדורשות אינטליגנציה אנושית."
  }
];

export default function FAQPage() {
  return (
    <>
      <AEO questions={faqs} />
      {/* Your FAQ content */}
    </>
  );
}
```

### Analytics Tracking
```tsx
import { useSEO } from '@/hooks/useSEO';

export default function MyComponent() {
  const { trackEvent, trackConversion } = useSEO();

  const handleButtonClick = () => {
    trackEvent({
      title: 'CTA Click',
      category: 'engagement',
      action: 'click',
      label: 'hero-cta'
    });
  };

  return (
    <button onClick={handleButtonClick}>
      Get Started
    </button>
  );
}
```

## 📊 Analytics & Tracking

### Google Analytics 4
- Page views tracking
- Custom events
- Conversion tracking
- Enhanced ecommerce

### Facebook Pixel
- Page views
- Custom events
- Lead tracking
- Conversion optimization

### LinkedIn Insight Tag
- B2B tracking
- Lead generation
- Professional audience insights

## 🌍 Multilingual SEO

The implementation supports Hebrew and English:
- Automatic language detection
- Hreflang tags
- Localized structured data
- RTL/LTR text direction
- Cultural content adaptation

## 🚀 Performance Optimizations

- Lazy loading of analytics scripts
- Optimized structured data
- Efficient meta tag generation
- Preconnect to external domains
- DNS prefetching

## 📈 Monitoring & Maintenance

### Regular Tasks
1. **Monthly**: Update sitemap
2. **Quarterly**: Review structured data
3. **Annually**: Update business information

### Tools for Monitoring
- Google Search Console
- Google Analytics
- Facebook Analytics
- LinkedIn Campaign Manager

### SEO Health Checks
```bash
# Generate fresh sitemap
npm run seo:sitemap

# Analyze SEO implementation
npm run seo:analyze
```

## 🔍 Schema Types Implemented

1. **LocalBusiness** - Business information
2. **Organization** - Company details
3. **WebSite** - Site structure
4. **FAQPage** - Question/answer content
5. **Service** - Service offerings
6. **BreadcrumbList** - Navigation structure
7. **Place** - Geographic location
8. **Review** - Customer feedback
9. **HowTo** - Step-by-step guides
10. **Product** - Service products

## 🎯 Best Practices

### Content Optimization
- Use semantic HTML structure
- Include relevant keywords naturally
- Optimize for featured snippets
- Create FAQ sections
- Use descriptive headings (H1-H6)

### Technical SEO
- Ensure fast loading times
- Implement proper URL structure
- Use HTTPS everywhere
- Optimize images with alt text
- Implement proper redirects

### Local SEO
- Maintain consistent NAP (Name, Address, Phone)
- Encourage customer reviews
- Use local keywords
- Create location-specific content
- Optimize for "near me" searches

## 🚨 Important Notes

1. **Environment Variables**: Always set up your tracking IDs in production
2. **Sitemap Updates**: Regenerate sitemap after content changes
3. **Schema Validation**: Use Google's Rich Results Test
4. **Performance**: Monitor Core Web Vitals
5. **Compliance**: Ensure GDPR/privacy compliance for tracking

## 📞 Support

For questions about this SEO implementation:
1. Check the code comments in each component
2. Review the configuration in `src/lib/seo/config.ts`
3. Test structured data with Google's tools
4. Monitor performance in analytics dashboards
