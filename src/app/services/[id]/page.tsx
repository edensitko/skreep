import ServiceDetailClient from './ServiceDetailClient';

// Generate static params for all service IDs
export function generateStaticParams() {
  return [
    { id: 'ai-solutions' },
    { id: 'web-development' },
    { id: 'automation' },
    { id: 'mobile-apps' },
    { id: 'cloud-solutions' },
    { id: 'saas-development' },
    { id: 'chatbot-development' },
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ServiceDetailClient serviceId={id} />;
}
