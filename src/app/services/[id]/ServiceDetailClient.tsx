'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHero from '@/components/Layout/PageHero';
import ContactFormSection from '@/components/Sections/ContactFormSection';
import heMessages from '../../../../messages/he.json';
import enMessages from '../../../../messages/en.json';

const TECH_LOGOS = {
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  php: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  openai: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  aws: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  azure: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  gcp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  kubernetes: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  terraform: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
  postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  graphql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  wordpress: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
  elementor: 'https://cdn.worldvectorlogo.com/logos/elementor-1.svg',
  zapier: 'https://cdn.worldvectorlogo.com/logos/zapier-1.svg',
  make: 'https://cdn.worldvectorlogo.com/logos/make-1.svg',
  n8n: 'https://cdn.worldvectorlogo.com/logos/n8n.svg',
  jenkins: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
  github: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
};

interface ServiceDetail {
  technologies: { name: string; logo: string }[];
  fullDescription: { he: string; en: string };
  relatedProjects: string[];
  benefits: { he: string[]; en: string[] };
  whyChooseUs: {
    he: {
      title: string;
      reasons: { title: string; description: string; icon: string }[];
      techExpertise: string;
      experience: string;
    };
    en: {
      title: string;
      reasons: { title: string; description: string; icon: string }[];
      techExpertise: string;
      experience: string;
    };
  };
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'ai-solutions': {
    technologies: [
      { name: 'OpenAI / GPT', logo: TECH_LOGOS.openai },
      { name: 'Python', logo: TECH_LOGOS.python },
      { name: 'Node.js', logo: TECH_LOGOS.nodejs },
      { name: 'TypeScript', logo: TECH_LOGOS.typescript },
      { name: 'AWS', logo: TECH_LOGOS.aws },
      { name: 'MongoDB', logo: TECH_LOGOS.mongodb },
    ],
    fullDescription: {
      he: 'אנו מתמחים בפיתוח פתרונות בינה מלאכותית מותאמים אישית שמשנים את הדרך שבה עסקים פועלים. הצוות שלנו משלב מומחיות טכנולוגית עמוקה עם הבנה עסקית כדי ליצור מערכות AI שמספקות ערך אמיתי.\n\nהפתרונות שלנו כוללים צ\'אטבוטים חכמים שמטפלים בפניות לקוחות 24/7, מערכות המלצות שמגדילות מכירות, ניתוח נתונים אוטומטי שחוסך שעות עבודה, ועיבוד שפה טבעית בעברית ובאנגלית.\n\nאנו עובדים עם הטכנולוגיות המתקדמות ביותר כולל GPT-4, Claude, ומודלים מותאמים אישית.',
      en: 'We specialize in developing customized artificial intelligence solutions that transform how businesses operate. Our team combines deep technological expertise with business understanding to create AI systems that deliver real value.\n\nOur solutions include smart chatbots that handle customer inquiries 24/7, recommendation systems that increase sales, automated data analysis that saves hours of work, and natural language processing in Hebrew and English.\n\nWe work with the most advanced technologies including GPT-4, Claude, and custom models.',
    },
    relatedProjects: ['whatsapp-chatbot-ai', 'ai-chatbot-builder', 'ai-task-organizer'],
    benefits: {
      he: ['חיסכון של עד 70% בזמן עבודה', 'שיפור דיוק קבלת החלטות', 'זמינות 24/7 ללא הפסקה', 'התאמה אישית לכל לקוח'],
      en: ['Save up to 70% work time', 'Improved decision accuracy', '24/7 availability', 'Personalized for each client'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לפתרונות AI?',
        reasons: [
          {
            title: 'מומחיות מוכחת',
            description: 'צוות של מהנדסי AI עם ניסיון של 5+ שנים בפיתוח פתרונות מתקדמים לעסקים בישראל',
            icon: '🎯'
          },
          {
            title: 'טכנולוגיות מובילות',
            description: 'עבודה עם GPT-4, Claude, ומודלים מותאמים אישית. שימוש בכלים המתקדמים ביותר בשוק',
            icon: '🚀'
          },
          {
            title: 'תמיכה בעברית',
            description: 'התמחות בעיבוד שפה טבעית בעברית - הבנה מושלמת של הניואנסים והמורכבות של השפה',
            icon: '🇮🇱'
          },
          {
            title: 'ROI מוכח',
            description: 'הלקוחות שלנו חוסכים בממוצע 40+ שעות עבודה בשבוע ומגדילים הכנסות ב-25%',
            icon: '📈'
          }
        ],
        techExpertise: 'אנו משתמשים בטכנולוגיות המתקדמות ביותר: Python עם TensorFlow ו-PyTorch למודלים מותאמים, OpenAI GPT-4 ו-Claude לעיבוד שפה, Node.js ו-TypeScript לפיתוח מהיר, AWS ו-MongoDB לתשתית ענן מאובטחת.',
        experience: 'פיתחנו מעל 50 פתרונות AI לעסקים בתחומים שונים - מחברות הייטק ועד עסקים קטנים. הניסיון שלנו מאפשר לנו להבין בדיוק מה העסק שלך צריך.'
      },
      en: {
        title: 'Why Choose Us for AI Solutions?',
        reasons: [
          {
            title: 'Proven Expertise',
            description: 'Team of AI engineers with 5+ years experience developing advanced solutions for Israeli businesses',
            icon: '🎯'
          },
          {
            title: 'Leading Technologies',
            description: 'Working with GPT-4, Claude, and custom models. Using the most advanced tools in the market',
            icon: '🚀'
          },
          {
            title: 'Hebrew Support',
            description: 'Specialization in Hebrew natural language processing - perfect understanding of language nuances and complexity',
            icon: '🇮🇱'
          },
          {
            title: 'Proven ROI',
            description: 'Our clients save an average of 40+ work hours per week and increase revenue by 25%',
            icon: '📈'
          }
        ],
        techExpertise: 'We use the most advanced technologies: Python with TensorFlow and PyTorch for custom models, OpenAI GPT-4 and Claude for language processing, Node.js and TypeScript for rapid development, AWS and MongoDB for secure cloud infrastructure.',
        experience: 'We\'ve developed over 50 AI solutions for businesses in various sectors - from high-tech companies to small businesses. Our experience allows us to understand exactly what your business needs.'
      }
    }
  },
  'web-development': {
    technologies: [
      { name: 'React', logo: TECH_LOGOS.react },
      { name: 'Next.js', logo: TECH_LOGOS.nextjs },
      { name: 'TypeScript', logo: TECH_LOGOS.typescript },
      { name: 'Node.js', logo: TECH_LOGOS.nodejs },
      { name: 'WordPress', logo: TECH_LOGOS.wordpress },
      { name: 'Firebase', logo: TECH_LOGOS.firebase },
      { name: 'Python', logo: TECH_LOGOS.python },
      { name: 'PHP', logo: TECH_LOGOS.php },
      { name: 'Tailwind CSS', logo: TECH_LOGOS.tailwind },
      { name: 'PostgreSQL', logo: TECH_LOGOS.postgresql },
    ],
    fullDescription: {
      he: 'אנו בונים אתרים ואפליקציות ווב מתקדמות שמשלבות עיצוב מרהיב עם ביצועים יוצאי דופן. כל פרויקט מתוכנן בקפידה כדי לספק חוויית משתמש מעולה ולהשיג את היעדים העסקיים שלך.\n\nהצוות שלנו מתמחה בטכנולוגיות המובילות כולל React, Next.js, Node.js ו-TypeScript. אנו מקפידים על קוד נקי, ארכיטקטורה מודולרית ותחזוקה קלה לטווח ארוך.\n\nכל אתר שאנו בונים מותאם למובייל, מהיר בטעינה, מאובטח ומותאם ל-SEO.',
      en: 'We build advanced websites and web applications that combine stunning design with exceptional performance. Every project is carefully planned to deliver an excellent user experience and achieve your business goals.\n\nOur team specializes in leading technologies including React, Next.js, Node.js, and TypeScript. We maintain clean code, modular architecture, and easy long-term maintenance.\n\nEvery website we build is mobile-responsive, fast-loading, secure, and SEO-optimized.',
    },
    relatedProjects: ['ai-task-organizer', 'ai-chatbot-builder'],
    benefits: {
      he: ['עיצוב רספונסיבי לכל מכשיר', 'טעינה מהירה ו-SEO מתקדם', 'אבטחה ברמה הגבוהה ביותר', 'תחזוקה ותמיכה שוטפת'],
      en: ['Responsive design for all devices', 'Fast loading & advanced SEO', 'Highest level security', 'Ongoing maintenance & support'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לפיתוח אתרים?',
        reasons: [
          {
            title: 'מומחיות טכנולוגית',
            description: 'שליטה מלאה ב-React, Next.js, TypeScript ו-Node.js. פיתוח עם הטכנולוגיות החדשניות ביותר',
            icon: '⚡'
          },
          {
            title: 'ביצועים מעולים',
            description: 'אתרים שלנו טוענים ב-2 שניות או פחות, עם ציון Google PageSpeed של 95+',
            icon: '🚀'
          },
          {
            title: 'SEO מתקדם',
            description: 'אופטימיזציה מלאה למנועי חיפוש עם התמחות בשוק הישראלי ובחיפושים בעברית',
            icon: '📈'
          },
          {
            title: 'תמיכה מלאה',
            description: 'תחזוקה שוטפת, עדכונים אבטחה, גיבויים אוטומטיים ותמיכה טכנית 24/7',
            icon: '🛡️'
          }
        ],
        techExpertise: 'אנו משתמשים בסטאק טכנולוגי מתקדם: React 18 עם Next.js 14 לביצועים מהירים, TypeScript לקוד בטוח ואמין, Tailwind CSS לעיצוב מודרני, Node.js ו-PostgreSQL לבקאנד חזק, ו-AWS לתשתית ענן מאובטחת.',
        experience: 'פיתחנו מעל 100 אתרים ואפליקציות ווב לעסקים בישראל. מאתרי תדמית ועד פלטפורמות מסחר אלקטרוני מורכבות - יש לנו את הניסיון והכלים.'
      },
      en: {
        title: 'Why Choose Us for Web Development?',
        reasons: [
          {
            title: 'Technical Expertise',
            description: 'Full mastery of React, Next.js, TypeScript, and Node.js. Development with the most innovative technologies',
            icon: '⚡'
          },
          {
            title: 'Excellent Performance',
            description: 'Our websites load in 2 seconds or less, with Google PageSpeed scores of 95+',
            icon: '🚀'
          },
          {
            title: 'Advanced SEO',
            description: 'Full search engine optimization with specialization in the Israeli market and Hebrew searches',
            icon: '📈'
          },
          {
            title: 'Full Support',
            description: 'Ongoing maintenance, security updates, automatic backups, and 24/7 technical support',
            icon: '🛡️'
          }
        ],
        techExpertise: 'We use an advanced technology stack: React 18 with Next.js 14 for fast performance, TypeScript for safe and reliable code, Tailwind CSS for modern design, Node.js and PostgreSQL for robust backend, and AWS for secure cloud infrastructure.',
        experience: 'We\'ve developed over 100 websites and web applications for Israeli businesses. From corporate sites to complex e-commerce platforms - we have the experience and tools.'
      }
    }
  },
  'automation': {
    technologies: [
      { name: 'Zapier', logo: TECH_LOGOS.zapier },
      { name: 'Make', logo: TECH_LOGOS.make },
      { name: 'n8n', logo: TECH_LOGOS.n8n },
      { name: 'Jenkins', logo: TECH_LOGOS.jenkins },
      { name: 'GitHub Actions', logo: TECH_LOGOS.github },
      { name: 'Python', logo: TECH_LOGOS.python },
      { name: 'Node.js', logo: TECH_LOGOS.nodejs },
      { name: 'AWS', logo: TECH_LOGOS.aws },
    ],
    fullDescription: {
      he: 'אנו מתמחים ביצירת פתרונות אוטומציה שמייעלים תהליכים עסקיים ומפחיתים עלויות תפעול. הפתרונות שלנו מאפשרים לעסקים להתמקד במה שחשוב באמת - צמיחה והתפתחות.\n\nאנו מיישמים אוטומציה בכל תחום - מניהול לידים ומכירות, דרך ניהול מלאי והזמנות, ועד יצירת דוחות אוטומטיים.\n\nהכלים שלנו כוללים Zapier, Make, n8n ופתרונות מותאמים אישית.',
      en: 'We specialize in creating automation solutions that streamline business processes and reduce operational costs. Our solutions allow businesses to focus on what really matters - growth and development.\n\nWe implement automation in every area - from lead and sales management, through inventory and order management, to automated report generation.\n\nOur tools include Zapier, Make, n8n, and custom solutions.',
    },
    relatedProjects: ['whatsapp-chatbot-ai', 'ai-task-organizer'],
    benefits: {
      he: ['חיסכון של 10+ שעות בשבוע', 'הפחתת טעויות אנוש', 'שיפור יעילות תפעולית', 'מעקב ובקרה בזמן אמת'],
      en: ['Save 10+ hours per week', 'Reduce human errors', 'Improve operational efficiency', 'Real-time monitoring & control'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לאוטומציה עסקית?',
        reasons: [
          {
            title: 'מומחיות בכלים מובילים',
            description: 'שליטה מלאה ב-Zapier, Make, n8n ו-Jenkins. יכולת לבחור את הכלי המתאים ביותר לכל משימה',
            icon: '🔧'
          },
          {
            title: 'חיסכון מוכח',
            description: 'הלקוחות שלנו חוסכים בממוצע 15 שעות עבודה בשבוע ומפחיתים טעויות ב-90%',
            icon: '💰'
          },
          {
            title: 'אינטגרציות מורכבות',
            description: 'יכולת לחבר בין מערכות שונות - CRM, ERP, מערכות תשלום, ועוד',
            icon: '🔗'
          },
          {
            title: 'תמיכה מתמשכת',
            description: 'מעקב שוטף אחר הביצועים, עדכונים ושיפורים מתמידים',
            icon: '📊'
          }
        ],
        techExpertise: 'אנו עובדים עם מגוון כלי אוטומציה: Zapier ו-Make לאוטומציה ללא קוד, n8n לפתרונות מתקדמים יותר, Python ו-Node.js לסקריפטים מותאמים, Jenkins ו-GitHub Actions ל-CI/CD, ו-AWS לתשתית ענן.',
        experience: 'יישמנו מעל 200 פתרונות אוטומציה לעסקים בישראל. מחברות סטארט-אפ ועד תאגידים גדולים - אנו יודעים איך לחסוך לך זמן וכסף.'
      },
      en: {
        title: 'Why Choose Us for Business Automation?',
        reasons: [
          {
            title: 'Expertise in Leading Tools',
            description: 'Full mastery of Zapier, Make, n8n, and Jenkins. Ability to choose the most suitable tool for each task',
            icon: '🔧'
          },
          {
            title: 'Proven Savings',
            description: 'Our clients save an average of 15 work hours per week and reduce errors by 90%',
            icon: '💰'
          },
          {
            title: 'Complex Integrations',
            description: 'Ability to connect different systems - CRM, ERP, payment systems, and more',
            icon: '🔗'
          },
          {
            title: 'Ongoing Support',
            description: 'Continuous performance monitoring, updates, and constant improvements',
            icon: '📊'
          }
        ],
        techExpertise: 'We work with various automation tools: Zapier and Make for no-code automation, n8n for more advanced solutions, Python and Node.js for custom scripts, Jenkins and GitHub Actions for CI/CD, and AWS for cloud infrastructure.',
        experience: 'We\'ve implemented over 200 automation solutions for Israeli businesses. From startups to large corporations - we know how to save you time and money.'
      }
    }
  },
  'mobile-apps': {
    technologies: [
      { name: 'React Native', logo: TECH_LOGOS.react },
      { name: 'Flutter', logo: TECH_LOGOS.flutter },
      { name: 'TypeScript', logo: TECH_LOGOS.typescript },
      { name: 'Firebase', logo: TECH_LOGOS.firebase },
      { name: 'Figma', logo: TECH_LOGOS.figma },
      { name: 'Node.js', logo: TECH_LOGOS.nodejs },
    ],
    fullDescription: {
      he: 'אנו מפתחים אפליקציות מובייל מתקדמות שמספקות חוויית משתמש יוצאת דופן. בין אם מדובר באפליקציה נטיבית או היברידית, אנו מבטיחים ביצועים גבוהים ועיצוב מרהיב.\n\nהצוות שלנו מתמחה ב-React Native ו-Flutter, מה שמאפשר לנו לפתח אפליקציות לאנדרואיד ו-iOS במקביל.\n\nאנו מלווים את הפרויקט מהרעיון הראשוני ועד הפרסום בחנויות האפליקציות.',
      en: "We develop advanced mobile applications that deliver an exceptional user experience. Whether it's a native or hybrid app, we ensure high performance and stunning design.\n\nOur team specializes in React Native and Flutter, allowing us to develop apps for Android and iOS simultaneously.\n\nWe accompany the project from the initial idea to app store publishing.",
    },
    relatedProjects: ['ai-task-organizer'],
    benefits: {
      he: ['חוויית משתמש מעולה', 'ביצועים גבוהים', 'עבודה אופליין', 'התראות push חכמות'],
      en: ['Excellent user experience', 'High performance', 'Offline capability', 'Smart push notifications'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לפיתוח אפליקציות מובייל?',
        reasons: [
          {
            title: 'פיתוח חוצה פלטפורמות',
            description: 'מומחיות ב-React Native ו-Flutter - אפליקציה אחת שעובדת על iOS ו-Android',
            icon: '📱'
          },
          {
            title: 'עיצוב UX/UI מתקדם',
            description: 'עיצוב אפליקציות עם Figma, התמחות בחוויית משתמש אינטואיטיבית ומרהיבה',
            icon: '🎨'
          },
          {
            title: 'ביצועים מהירים',
            description: 'אפליקציות שלנו טוענות מהר, עובדות חלק ומספקות חוויה כמו אפליקציות נטיביות',
            icon: '⚡'
          },
          {
            title: 'פרסום בחנויות',
            description: 'ליווי מלא בתהליך הפרסום ב-App Store ו-Google Play, כולל אופטימיזציה ASO',
            icon: '🚀'
          }
        ],
        techExpertise: 'אנו משתמשים בטכנולוגיות מובילות: React Native ו-Flutter לפיתוח חוצה פלטפורמות, TypeScript לקוד בטוח, Firebase לבקאנד ומסד נתונים, Figma לעיצוב מקצועי, ו-Node.js לשרתים מותאמים.',
        experience: 'פיתחנו מעל 30 אפליקציות מובייל שפורסמו בחנויות האפליקציות. מאפליקציות עסקיות ועד משחקים - יש לנו את הניסיון לכל סוג פרויקט.'
      },
      en: {
        title: 'Why Choose Us for Mobile App Development?',
        reasons: [
          {
            title: 'Cross-Platform Development',
            description: 'Expertise in React Native and Flutter - one app that works on iOS and Android',
            icon: '📱'
          },
          {
            title: 'Advanced UX/UI Design',
            description: 'App design with Figma, specialization in intuitive and stunning user experience',
            icon: '🎨'
          },
          {
            title: 'Fast Performance',
            description: 'Our apps load quickly, run smoothly, and provide a native-like experience',
            icon: '⚡'
          },
          {
            title: 'App Store Publishing',
            description: 'Full support in the App Store and Google Play publishing process, including ASO optimization',
            icon: '🚀'
          }
        ],
        techExpertise: 'We use leading technologies: React Native and Flutter for cross-platform development, TypeScript for secure code, Firebase for backend and database, Figma for professional design, and Node.js for custom servers.',
        experience: 'We\'ve developed over 30 mobile apps published in app stores. From business apps to games - we have the experience for every type of project.'
      }
    }
  },
  'cloud-solutions': {
    technologies: [
      { name: 'AWS', logo: TECH_LOGOS.aws },
      { name: 'Azure', logo: TECH_LOGOS.azure },
      { name: 'Google Cloud', logo: TECH_LOGOS.gcp },
      { name: 'Firebase', logo: TECH_LOGOS.firebase },
      { name: 'Docker', logo: TECH_LOGOS.docker },
      { name: 'Kubernetes', logo: TECH_LOGOS.kubernetes },
      { name: 'Terraform', logo: TECH_LOGOS.terraform },
    ],
    fullDescription: {
      he: 'אנו מספקים פתרונות ענן מקיפים שמאפשרים לעסקים לפעול בצורה גמישה, מאובטחת וחסכונית. הצוות שלנו מתמחה בהקמה וניהול של תשתיות ענן מתקדמות.\n\nאנו עובדים עם הפלטפורמות המובילות כולל AWS, Azure ו-Google Cloud.\n\nהשירותים שלנו כוללים מיגרציה לענן, ארכיטקטורת Serverless, ניהול קונטיינרים עם Docker ו-Kubernetes.',
      en: 'We provide comprehensive cloud solutions that enable businesses to operate flexibly, securely, and cost-effectively. Our team specializes in setting up and managing advanced cloud infrastructure.\n\nWe work with leading platforms including AWS, Azure, and Google Cloud.\n\nOur services include cloud migration, Serverless architecture, container management with Docker and Kubernetes.',
    },
    relatedProjects: ['ai-chatbot-builder', 'whatsapp-chatbot-ai'],
    benefits: {
      he: ['זמינות 99.9%', 'אבטחה מקסימלית', 'גמישות וסקיילביליות', 'חיסכון בעלויות תשתית'],
      en: ['99.9% uptime', 'Maximum security', 'Flexibility & scalability', 'Infrastructure cost savings'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לפתרונות ענן?',
        reasons: [
          {
            title: 'מומחיות רב-ענן',
            description: 'הסמכות מקצועיות ב-AWS, Azure ו-Google Cloud. יכולת לבחור את הפלטפורמה המתאימה ביותר',
            icon: '☁️'
          },
          {
            title: 'אבטחה מתקדמת',
            description: 'יישום פרוטוקולי אבטחה מתקדמים, הצפנה, גיבויים אוטומטיים ומעקב 24/7',
            icon: '🔒'
          },
          {
            title: 'חיסכון בעלויות',
            description: 'אופטימיזציה של עלויות ענן - הלקוחות שלנו חוסכים בממוצע 40% מעלויות התשתית',
            icon: '💰'
          },
          {
            title: 'זמינות גבוהה',
            description: 'תשתיות עם זמינות של 99.9% ומעלה, עם תוכניות התאוששות מאסונות',
            icon: '🛡️'
          }
        ],
        techExpertise: 'אנו עובדים עם כל הפלטפורמות המובילות: AWS עם EC2, Lambda, RDS ו-S3, Azure עם App Service ו-Cosmos DB, Google Cloud עם Compute Engine ו-BigQuery, Docker ו-Kubernetes לקונטיינרים, ו-Terraform לניהול תשתית כקוד.',
        experience: 'ביצענו מעל 80 פרויקטי מיגרציה לענן ופיתחנו תשתיות ענן לחברות בכל הגדלים. מסטארט-אפים ועד תאגידים - אנו יודעים איך לעשות זאת נכון.'
      },
      en: {
        title: 'Why Choose Us for Cloud Solutions?',
        reasons: [
          {
            title: 'Multi-Cloud Expertise',
            description: 'Professional certifications in AWS, Azure, and Google Cloud. Ability to choose the most suitable platform',
            icon: '☁️'
          },
          {
            title: 'Advanced Security',
            description: 'Implementation of advanced security protocols, encryption, automatic backups, and 24/7 monitoring',
            icon: '🔒'
          },
          {
            title: 'Cost Savings',
            description: 'Cloud cost optimization - our clients save an average of 40% on infrastructure costs',
            icon: '💰'
          },
          {
            title: 'High Availability',
            description: 'Infrastructure with 99.9%+ uptime, with disaster recovery plans',
            icon: '🛡️'
          }
        ],
        techExpertise: 'We work with all leading platforms: AWS with EC2, Lambda, RDS, and S3, Azure with App Service and Cosmos DB, Google Cloud with Compute Engine and BigQuery, Docker and Kubernetes for containers, and Terraform for infrastructure as code.',
        experience: 'We\'ve completed over 80 cloud migration projects and developed cloud infrastructure for companies of all sizes. From startups to corporations - we know how to do it right.'
      }
    }
  },
  'saas-development': {
    technologies: [
      { name: 'React', logo: TECH_LOGOS.react },
      { name: 'Next.js', logo: TECH_LOGOS.nextjs },
      { name: 'Node.js', logo: TECH_LOGOS.nodejs },
      { name: 'PostgreSQL', logo: TECH_LOGOS.postgresql },
      { name: 'Redis', logo: TECH_LOGOS.redis },
      { name: 'AWS', logo: TECH_LOGOS.aws },
    ],
    fullDescription: {
      he: 'אנו מתמחים בפיתוח מערכות SaaS מקצה לקצה - מהרעיון הראשוני ועד למוצר מוכן לשוק. הניסיון שלנו בבניית פלטפורמות ענן מאפשר לנו ליצור מוצרים סקיילביליים ומאובטחים.\n\nכל מערכת SaaS שאנו בונים כוללת ניהול משתמשים מתקדם, מערכת תשלומים ומנויים, דשבורדים אינטראקטיביים.\n\nהטכנולוגיות שלנו כוללות React, Node.js, PostgreSQL, Redis ו-AWS.',
      en: 'We specialize in end-to-end SaaS system development - from the initial idea to a market-ready product. Our experience in building cloud platforms allows us to create scalable and secure products.\n\nEvery SaaS system we build includes advanced user management, payment and subscription systems, interactive dashboards.\n\nOur technologies include React, Node.js, PostgreSQL, Redis, and AWS.',
    },
    relatedProjects: ['ai-chatbot-builder', 'ai-task-organizer'],
    benefits: {
      he: ['סקיילביליות אוטומטית', 'עדכונים רציפים ללא השבתה', 'אבטחה מרובת שכבות', 'אינטגרציות API מתקדמות'],
      en: ['Auto-scaling', 'Continuous updates without downtime', 'Multi-layer security', 'Advanced API integrations'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לפיתוח SaaS?',
        reasons: [
          {
            title: 'ניסיון מוכח ב-SaaS',
            description: 'פיתחנו מעל 15 פלטפורמות SaaS מוצלחות עם אלפי משתמשים פעילים',
            icon: '🏆'
          },
          {
            title: 'ארכיטקטורה מתקדמת',
            description: 'בניית מערכות עם React, Node.js, PostgreSQL ו-Redis לביצועים מהירים וסקיילביליות',
            icon: '🏗️'
          },
          {
            title: 'מערכות תשלום מתקדמות',
            description: 'אינטגרציה עם Stripe, PayPal ומערכות תשלום ישראליות כמו Tranzila',
            icon: '💳'
          },
          {
            title: 'תמיכה מתמשכת',
            description: 'תחזוקה שוטפת, עדכונים, הוספת פיצ\'רים חדשים ותמיכה טכנית 24/7',
            icon: '🔧'
          }
        ],
        techExpertise: 'אנו בונים SaaS עם הטכנולוגיות המתקדמות ביותר: React ו-Next.js לפרונט-אנד מהיר, Node.js ו-Express לבקאנד חזק, PostgreSQL למסד נתונים יציב, Redis לקאשינג מהיר, AWS לתשתית ענן, ו-Docker לפריסה קלה.',
        experience: 'פיתחנו פלטפורמות SaaS בתחומים שונים: CRM, ניהול פרויקטים, מערכות HR, פלטפורמות לימוד, ועוד. אנו יודעים איך לבנות מוצר שמשתמשים אוהבים.'
      },
      en: {
        title: 'Why Choose Us for SaaS Development?',
        reasons: [
          {
            title: 'Proven SaaS Experience',
            description: 'We\'ve developed over 15 successful SaaS platforms with thousands of active users',
            icon: '🏆'
          },
          {
            title: 'Advanced Architecture',
            description: 'Building systems with React, Node.js, PostgreSQL, and Redis for fast performance and scalability',
            icon: '🏗️'
          },
          {
            title: 'Advanced Payment Systems',
            description: 'Integration with Stripe, PayPal, and Israeli payment systems like Tranzila',
            icon: '💳'
          },
          {
            title: 'Ongoing Support',
            description: 'Continuous maintenance, updates, new feature additions, and 24/7 technical support',
            icon: '🔧'
          }
        ],
        techExpertise: 'We build SaaS with the most advanced technologies: React and Next.js for fast frontend, Node.js and Express for robust backend, PostgreSQL for stable database, Redis for fast caching, AWS for cloud infrastructure, and Docker for easy deployment.',
        experience: 'We\'ve developed SaaS platforms in various domains: CRM, project management, HR systems, learning platforms, and more. We know how to build products that users love.'
      }
    }
  },
  'chatbot-development': {
    technologies: [
      { name: 'OpenAI / GPT', logo: TECH_LOGOS.openai },
      { name: 'Python', logo: TECH_LOGOS.python },
      { name: 'Node.js', logo: TECH_LOGOS.nodejs },
      { name: 'TypeScript', logo: TECH_LOGOS.typescript },
      { name: 'Firebase', logo: TECH_LOGOS.firebase },
      { name: 'MongoDB', logo: TECH_LOGOS.mongodb },
    ],
    fullDescription: {
      he: "אנו מתמחים בבניית צ'אטבוטים חכמים שמשנים את הדרך שבה עסקים מתקשרים עם הלקוחות שלהם. הצ'אטבוטים שלנו מבוססים על בינה מלאכותית מתקדמת ומספקים מענה אנושי ומקצועי 24/7.\n\nאנו בונים צ'אטבוטים לכל פלטפורמה - וואטסאפ, פייסבוק מסנג'ר, טלגרם, אתרי אינטרנט ואפליקציות.\n\nהצ'אטבוטים שלנו יכולים לטפל בשירות לקוחות, לקבוע פגישות, לענות על שאלות נפוצות, לבצע מכירות ולאסוף לידים.",
      en: "We specialize in building smart chatbots that transform how businesses communicate with their customers. Our chatbots are powered by advanced AI and provide human-like, professional responses 24/7.\n\nWe build chatbots for every platform - WhatsApp, Facebook Messenger, Telegram, websites, and apps.\n\nOur chatbots can handle customer service, schedule appointments, answer FAQs, make sales, and collect leads.",
    },
    relatedProjects: ['whatsapp-chatbot-ai', 'ai-chatbot-builder'],
    benefits: {
      he: ['שירות לקוחות 24/7', 'חיסכון של 80% בזמן מענה', 'הגדלת מכירות ולידים', 'אינטגרציה עם כל פלטפורמה'],
      en: ['24/7 customer service', '80% response time savings', 'Increase sales & leads', 'Integration with any platform'],
    },
    whyChooseUs: {
      he: {
        title: 'למה לבחור בנו לפיתוח צ\'אטבוטים?',
        reasons: [
          {
            title: 'מומחיות ב-AI מתקדם',
            description: 'שימוש ב-GPT-4, Claude ומודלים מותאמים אישית לשיחות טבעיות ומדויקות',
            icon: '🤖'
          },
          {
            title: 'תמיכה בעברית מושלמת',
            description: 'צ\'אטבוטים שמבינים עברית בצורה מושלמת, כולל סלנג, קיצורים וביטויים מקומיים',
            icon: '🇮🇱'
          },
          {
            title: 'אינטגרציה מלאה',
            description: 'חיבור לוואטסאפ, פייסבוק, טלגרם, אתרים, CRM ומערכות עסקיות',
            icon: '🔗'
          },
          {
            title: 'תוצאות מוכחות',
            description: 'הלקוחות שלנו מגדילים מכירות ב-35% ומפחיתים עלויות שירות ב-60%',
            icon: '📈'
          }
        ],
        techExpertise: 'אנו משתמשים בטכנולוגיות המתקדמות ביותר: OpenAI GPT-4 ו-Claude לשיחות חכמות, Python ו-Node.js לפיתוח מהיר, TypeScript לקוד בטוח, Firebase ו-MongoDB לאחסון נתונים, ו-API של WhatsApp Business לאינטגרציה מלאה.',
        experience: 'פיתחנו מעל 60 צ\'אטבוטים לעסקים בישראל. מחנויות אונליין ועד חברות ביטוח - אנו יודעים איך לבנות בוט שמדבר כמו בן אדם.'
      },
      en: {
        title: 'Why Choose Us for Chatbot Development?',
        reasons: [
          {
            title: 'Advanced AI Expertise',
            description: 'Using GPT-4, Claude, and custom models for natural and accurate conversations',
            icon: '🤖'
          },
          {
            title: 'Perfect Hebrew Support',
            description: 'Chatbots that understand Hebrew perfectly, including slang, abbreviations, and local expressions',
            icon: '🇮🇱'
          },
          {
            title: 'Full Integration',
            description: 'Connection to WhatsApp, Facebook, Telegram, websites, CRM, and business systems',
            icon: '🔗'
          },
          {
            title: 'Proven Results',
            description: 'Our clients increase sales by 35% and reduce service costs by 60%',
            icon: '📈'
          }
        ],
        techExpertise: 'We use the most advanced technologies: OpenAI GPT-4 and Claude for smart conversations, Python and Node.js for rapid development, TypeScript for secure code, Firebase and MongoDB for data storage, and WhatsApp Business API for full integration.',
        experience: 'We\'ve developed over 60 chatbots for Israeli businesses. From online stores to insurance companies - we know how to build bots that talk like humans.'
      }
    }
  },
};

interface ServiceDetailClientProps {
  serviceId: string;
}

export default function ServiceDetailClient({ serviceId }: ServiceDetailClientProps) {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const messages = isRTL ? heMessages : enMessages;

  const serviceDetails = SERVICE_DETAILS[serviceId];

  // Find service data from messages array
  const serviceData = (messages.interactiveServices?.items as Array<{ id: string; title: string; description: string; longDescription?: string }>)?.find(
    (item) => item.id === serviceId
  );

  const serviceTitle = serviceData?.title || serviceId;
  const serviceDescription = serviceData?.description || '';

  const fullDescription =
    serviceDetails?.fullDescription?.[isRTL ? 'he' : 'en'] || serviceData?.longDescription || serviceDescription;

  return (
    <div className="min-h-screen bg-black">
      <PageHero title={serviceTitle} subtitle={serviceDescription} />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Full Description */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-black/30 via-black/20 to-black/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 relative shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent relative z-10">
              {isRTL ? 'אודות השירות' : 'About This Service'}
            </h2>
            <div className="text-white/85 leading-relaxed whitespace-pre-line text-sm md:text-base relative z-10">
              {fullDescription}
            </div>
          </div>
        </section>

        {/* Technologies */}
        {serviceDetails?.technologies && serviceDetails.technologies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              {isRTL ? 'טכנולוגיות' : 'Technologies'}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {serviceDetails.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center hover:border-cyan-400/30 hover:bg-white/5 transition-all duration-300 group"
                >
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="w-10 h-10 md:w-12 md:h-12 mb-3 object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                  <span className="text-white/75 text-xs md:text-sm text-center group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Benefits */}
        {serviceDetails?.benefits && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
              {isRTL ? 'יתרונות' : 'Benefits'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {(serviceDetails.benefits[isRTL ? 'he' : 'en'] || []).map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-cyan-400/5 via-black/20 to-purple-400/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 md:p-6 hover:border-cyan-400/30 transition-all duration-300 group relative"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/5 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-white/85 text-sm md:text-base leading-relaxed relative z-10">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        {serviceDetails?.whyChooseUs && (
          <section className="mb-12">
            <div className="bg-gradient-to-br from-black/40 via-black/30 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 relative shadow-xl overflow-hidden">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/10 to-green-400/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
                  {serviceDetails.whyChooseUs[isRTL ? 'he' : 'en'].title}
                </h2>
                
                {/* Reasons Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {serviceDetails.whyChooseUs[isRTL ? 'he' : 'en'].reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          {reason.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {reason.title}
                          </h3>
                          <p className="text-white/75 text-sm leading-relaxed">
                            {reason.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Technical Expertise */}
                <div className="bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl p-6 mb-6" dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">⚙️</span>
                    {isRTL ? 'המומחיות הטכנולוגית שלנו' : 'Our Technical Expertise'}
                  </h3>
                  <p className="text-white/85 text-sm leading-relaxed">
                    {serviceDetails.whyChooseUs[isRTL ? 'he' : 'en'].techExpertise}
                  </p>
                </div>
                
                {/* Experience */}
                <div className="bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-xl p-6" dir={isRTL ? 'rtl' : 'ltr'}>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    {isRTL ? 'הניסיון שלנו' : 'Our Experience'}
                  </h3>
                  <p className="text-white/85 text-sm leading-relaxed">
                    {serviceDetails.whyChooseUs[isRTL ? 'he' : 'en'].experience}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Back to Services */}
        <div className="flex justify-center">
          <Link
            href="/services"
            className={`inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white hover:scale-105 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <svg
              className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {isRTL ? 'חזרה לכל השירותים' : 'Back to All Services'}
          </Link>
        </div>
      </div>

      <ContactFormSection />
    </div>
  );
}
