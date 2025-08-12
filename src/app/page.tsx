// import React from 'react';
// import dynamic from 'next/dynamic';
// import HeroGrid from '@/components/Hero/HeroGrid';
// import PartnersSection from '@/components/Sections/PartnersSection';
// import AboutSection from '@/components/Sections/AboutSection';
// import OurProjectsSection from '@/components/Sections/OurProjectsSection';
// import ServicesSection from '@/components/InteractiveShowcaseSection';
// import HeroFour from '@/components/Hero/HeroFour';

// // Lazy load heavy components to reduce initial memory usage
// const AIConsultantSection = dynamic(() => import('@/components/Sections/AIConsultantSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });

// const AIConsultantCTASection = dynamic(() => import('@/components/Sections/AIConsultantCTASection'), {
//   loading: () => <div className="h-64 bg-black/20 animate-pulse" />
// });

// const StatsSection = dynamic(() => import('@/components/Sections/StatsSection'), {
//   loading: () => <div className="h-48 bg-black/20 animate-pulse" />
// });

// const FAQSection = dynamic(() => import('@/components/Sections/FAQSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });

// // const PricingSection = dynamic(() => import('@/components/Sections/PricingSection'), {
// //   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// // });

// // const PricingCarouselSection = dynamic(() => import('@/components/Sections/PricingCarouselSection'), {
// //   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// // });

// const TestimonialsSection = dynamic(() => import('@/components/Sections/TestimonialsSection'), {
//   loading: () => <div className="h-64 bg-black/20 animate-pulse" />
// });

// const NoCodeBenefitsSection = dynamic(() => import('@/components/Sections/NoCodeBenefitsSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });

// const ComparisonTableSection = dynamic(() => import('@/components/Sections/ComparisonTableSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });


// const ContactFormSection = dynamic(() => import('@/components/Sections/ContactFormSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });

// const InteractiveShowcaseSection = dynamic(() => import('@/components/Sections/InteractiveShowcaseSection'), {
//   loading: () => <div className="h-96 bg-black/20 animate-pulse" />
// });

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col bg-black">
//       <HeroGrid />
//       <PartnersSection />

//       <AboutSection />
//       <StatsSection />
//       <ServicesSection />
//       <AIConsultantSection />
//       {/* <NoCodeBenefitsSection /> */}
//       <OurProjectsSection />
//       <FAQSection />
//       {/* <PricingSection /> */}
//       {/* <PricingCarouselSection /> */}
//       <AIConsultantCTASection />
//       <TestimonialsSection />
//       <ComparisonTableSection />
//       <ContactFormSection />
//     </main>
    
//   );
// }



import React from 'react';
import { MaintenancePage } from '@/components/MaintenancePage';

// ============================================================================
// TEMPORARY: MAINTENANCE MODE 
// TO RESTORE ORIGINAL HOMEPAGE: Replace this file with the backup version
// ============================================================================

// ORIGINAL HOMEPAGE CODE IS AVAILABLE IN BACKUP - CONTACT DEVELOPER TO RESTORE

// ============================================================================
// MAINTENANCE MODE: TEMPORARY HOMEPAGE REPLACEMENT
// ============================================================================

export default function Home() {
  return <MaintenancePage />;
}

export const metadata = {
  title: 'Skreep - אנחנו חוזרים בקרוב',
  description: 'האתר שלנו עובר שדרוג כדי להביא לכם חוויה טובה יותר',
};
