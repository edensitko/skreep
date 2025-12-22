import React from 'react';
import { notFound } from 'next/navigation';
import PageSEO from '@/components/SEO/PageSEO';
import ProjectPageClient from './ProjectPageClient';

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  fullDescription?: string;
  technologies?: string[];
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  images?: string[];
  client?: string;
  duration?: string;
  category?: string;
}

// Generate static params for all project slugs
export async function generateStaticParams() {
  // Define the project slugs that exist in your system
  const projectSlugs = ['whatsapp-chatbot-ai', 'e-commerce-platform', 'healthcare-application'];
  
  return projectSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Server-side data fetching
async function getProjectData(slug: string, language: string = 'en'): Promise<ProjectData | null> {
  try {
    // Load translation data
    const messages = await import(`../../../../messages/${language}.json`);
    const projectsData = messages.default?.ourProjects?.projects || messages.ourProjects?.projects || [];
    
    // Find specific project by slug
    const foundProject = projectsData.find((p: ProjectData) => p.slug === slug);
    
    if (foundProject) {
      // Enhance project data with additional details
      return {
        ...foundProject,
        fullDescription: getFullDescription(foundProject.id, language),
        technologies: getTechnologies(foundProject.id),
        features: getFeatures(foundProject.id, language),
        stats: getStats(foundProject.id, language),
        images: getProjectImages(foundProject.id),
        client: getClient(foundProject.id, language),
        duration: getDuration(foundProject.id, language),
        category: getCategory(foundProject.id, language)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error loading project data:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise as required by Next.js 15
  const { slug } = await params;
  
  // Get project data for both languages
  const projectEn = await getProjectData(slug, 'en');
  const projectHe = await getProjectData(slug, 'he');
  
  // If project doesn't exist, show 404
  if (!projectEn && !projectHe) {
    notFound();
  }
  
  // Get all projects for navigation
  const allProjectsEn = await getAllProjects('en');
  const allProjectsHe = await getAllProjects('he');

  return (
    <>
      <PageSEO 
        pageType="projects"
        title={`${projectEn?.title || projectHe?.title} - Skreep`}
        description={projectEn?.description || projectHe?.description || ''}
      />
      
      <ProjectPageClient 
        projectEn={projectEn}
        projectHe={projectHe}
        allProjectsEn={allProjectsEn}
        allProjectsHe={allProjectsHe}
        projectSlug={slug}
      />
    </>
  );
}

// Helper function to get all projects
async function getAllProjects(language: string): Promise<ProjectData[]> {
  try {
    const messages = await import(`../../../../messages/${language}.json`);
    return messages.default?.ourProjects?.projects || messages.ourProjects?.projects || [];
  } catch (error) {
    console.error('Error loading all projects:', error);
    return [];
  }
}

// Enhanced project data functions
function getFullDescription(slug: string, lang: string): string {
    const descriptions: Record<string, Record<string, string>> = {
      'whatsapp-chatbot-ai': {
        he: 'צ\'אטבוט חכם ומתקדם המשולב בוואטסאפ עם יכולות בינה מלאכותית מתקדמות. המערכת מספקת שירות לקוחות אוטומטי 24/7, מטפלת בפניות מורכבות, ומספקת תשובות מדויקות ומותאמות אישית. הצ\'אטבוט לומד מכל אינטראקציה ומשתפר עם הזמן.',
        en: 'Smart and advanced chatbot integrated with WhatsApp featuring advanced AI capabilities. The system provides 24/7 automated customer service, handles complex inquiries, and provides accurate and personalized responses. The chatbot learns from every interaction and improves over time.'
      },
      'e-commerce-platform': {
        he: 'פלטפורמת מסחר אלקטרוני מתקדמת שפותחה עבור חברה מובילה בתחום הקמעונאות. המערכת כוללת ניהול מלאי חכם, מערכת תשלומים מאובטחת, והמלצות מותאמות אישית באמצעות בינה מלאכותית. הפלטפורמה מטפלת ביותר מ-50,000 מוצרים ומשרתת אלפי לקוחות מדי יום.',
        en: 'Advanced e-commerce platform developed for a leading retail company. The system includes smart inventory management, secure payment system, and personalized recommendations using artificial intelligence. The platform handles over 50,000 products and serves thousands of customers daily.'
      },
      'healthcare-application': {
        he: 'אפליקציית בריאות דיגיטלית חדשנית המאפשרת למטופלים לקבל טיפול רפואי מרחוק. המערכת כוללת וידאו קונפרנס מאובטח, מערכת תורים חכמה, וניהול רשומות רפואיות. האפליקציה משרתת יותר מ-10,000 משתמשים פעילים ומאפשרת גישה לטיפול רפואי איכותי מכל מקום.',
        en: 'Innovative digital health application that enables patients to receive remote medical care. The system includes secure video conferencing, smart appointment system, and medical records management. The application serves over 10,000 active users and enables access to quality medical care from anywhere.'
      }
    };
    return descriptions[slug]?.[lang] || '';
  };

function getTechnologies(slug: string): string[] {
    const tech: Record<string, string[]> = {
      'whatsapp-chatbot-ai': ['Node.js', 'OpenAI GPT', 'WhatsApp API', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Webhook'],
      'e-commerce-platform': ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Docker'],
      'healthcare-application': ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io', 'AWS', 'Firebase']
    };
    return tech[slug] || [];
  };

function getFeatures(slug: string, lang: string): string[] {
    const features: Record<string, Record<string, string[]>> = {
      'whatsapp-chatbot-ai': {
        he: ['שירות לקוחות 24/7', 'עיבוד שפה טבעית', 'למידה מתמשכת', 'אינטגרציה עם וואטסאפ', 'ניתוח סנטימנט'],
        en: ['24/7 Customer Service', 'Natural Language Processing', 'Continuous Learning', 'WhatsApp Integration', 'Sentiment Analysis']
      },
      'e-commerce-platform': {
        he: ['ניהול מלאי חכם', 'מערכת תשלומים מאובטחת', 'המלצות AI', 'דשבורד ניהול', 'אינטגרציה עם ספקים'],
        en: ['Smart Inventory Management', 'Secure Payment System', 'AI Recommendations', 'Management Dashboard', 'Supplier Integration']
      },
      'healthcare-application': {
        he: ['וידאו קונפרנס מאובטח', 'מערכת תורים חכמה', 'ניהול רשומות רפואיות', 'התראות אוטומטיות', 'אינטגרציה עם מעבדות'],
        en: ['Secure Video Conferencing', 'Smart Appointment System', 'Medical Records Management', 'Automatic Notifications', 'Lab Integration']
      }
    };
    return features[slug]?.[lang] || [];
  };

function getStats(slug: string, lang: string) {
    const stats: Record<string, Record<string, Array<{label: string, value: string}>>> = {
      'whatsapp-chatbot-ai': {
        he: [
          { label: 'הודעות יומיות', value: '10,000+' },
          { label: 'דיוק תשובות', value: '95%' },
          { label: 'זמן תגובה', value: '<2 שניות' },
          { label: 'זמן פיתוח', value: '4 חודשים' }
        ],
        en: [
          { label: 'Daily Messages', value: '10,000+' },
          { label: 'Response Accuracy', value: '95%' },
          { label: 'Response Time', value: '<2 seconds' },
          { label: 'Development Time', value: '4 months' }
        ]
      },
      'e-commerce-platform': {
        he: [
          { label: 'מוצרים', value: '50,000+' },
          { label: 'משתמשים פעילים', value: '25,000+' },
          { label: 'עסקאות חודשיות', value: '100,000+' },
          { label: 'זמן פיתוח', value: '8 חודשים' }
        ],
        en: [
          { label: 'Products', value: '50,000+' },
          { label: 'Active Users', value: '25,000+' },
          { label: 'Monthly Transactions', value: '100,000+' },
          { label: 'Development Time', value: '8 months' }
        ]
      },
      'healthcare-application': {
        he: [
          { label: 'משתמשים פעילים', value: '10,000+' },
          { label: 'ייעוצים חודשיים', value: '5,000+' },
          { label: 'רופאים במערכת', value: '500+' },
          { label: 'זמן פיתוח', value: '6 חודשים' }
        ],
        en: [
          { label: 'Active Users', value: '10,000+' },
          { label: 'Monthly Consultations', value: '5,000+' },
          { label: 'Doctors in System', value: '500+' },
          { label: 'Development Time', value: '6 months' }
        ]
      }
    };
    return stats[slug]?.[lang] || [];
  };

function getProjectImages(slug: string): string[] {
    return [
      `/assets/images/projects/1.png`,
      `/assets/images/projects/2.png`,
      `/assets/images/projects/3.png`
    ].filter((_, index) => index < 3); // Limit to 3 images
  };

function getClient(id: number, lang: string): string {
    const clients: Record<number, Record<string, string>> = {
      1: { he: 'חברת קמעונאות מובילה', en: 'Leading Retail Company' },
      2: { he: 'רשת מרפאות פרטיות', en: 'Private Clinic Network' },
      3: { he: 'חברת טכנולוגיה מתקדמת', en: 'Advanced Technology Company' }
    };
    return clients[id]?.[lang] || '';
  };

function getDuration(id: number, lang: string): string {
    const durations: Record<number, Record<string, string>> = {
      1: { he: '8 חודשים', en: '8 months' },
      2: { he: '6 חודשים', en: '6 months' },
      3: { he: '4 חודשים', en: '4 months' }
    };
    return durations[id]?.[lang] || '';
  };

function getCategory(id: number, lang: string): string {
    const categories: Record<number, Record<string, string>> = {
      1: { he: 'מסחר אלקטרוני', en: 'E-commerce' },
      2: { he: 'בריאות דיגיטלית', en: 'Digital Health' },
      3: { he: 'בינה מלאכותית', en: 'Artificial Intelligence' }
    };
    return categories[id]?.[lang] || '';
  };


