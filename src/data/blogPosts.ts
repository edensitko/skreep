export interface BlogPost {
  id: string;
  slug: string;
  title: {
    he: string;
    en: string;
  };
  excerpt: {
    he: string;
    en: string;
  };
  content: {
    he: string;
    en: string;
  };
  category: {
    he: string;
    en: string;
  };
  date: string;
  readTime: {
    he: string;
    en: string;
  };
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ai-business-transformation-2024',
    title: {
      he: 'טרנספורמציה עסקית עם AI ב-2024',
      en: 'Business Transformation with AI in 2024'
    },
    excerpt: {
      he: 'גלו את המגמות האחרונות באימוץ AI וכיצד עסקים ממנפים בינה מלאכותית להניע צמיחה, יעילות וחדשנות ב-2024.',
      en: 'Discover the latest trends in AI adoption and how businesses are leveraging artificial intelligence to drive growth, efficiency, and innovation in 2024.'
    },
    category: {
      he: 'בינה מלאכותית',
      en: 'Artificial Intelligence'
    },
    date: '2024-01-15',
    readTime: {
      he: '12 דקות קריאה',
      en: '12 min read'
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    author: {
      name: 'Skreep Team',
      avatar: '/assets/images/logo-1.webp'
    },
    content: {
      he: '',
      en: ''
    }
  },
  {
    id: '2',
    slug: 'chatbot-revolution-customer-service',
    title: {
      he: 'מהפכת הצ׳אטבוטים בשירות לקוחות',
      en: 'The Chatbot Revolution in Customer Service'
    },
    excerpt: {
      he: 'למדו כיצד צ׳אטבוטים חכמים משנים את שירות הלקוחות, מקצרים זמני תגובה ומשפרים את שביעות רצון הלקוחות.',
      en: 'Learn how smart chatbots are transforming customer service, reducing response times and improving customer satisfaction.'
    },
    category: {
      he: 'צ׳אטבוטים',
      en: 'Chatbots'
    },
    date: '2024-01-10',
    readTime: {
      he: '10 דקות קריאה',
      en: '10 min read'
    },
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    author: {
      name: 'Skreep Team',
      avatar: '/assets/images/logo-1.webp'
    },
    content: {
      he: '',
      en: ''
    }
  },
  {
    id: '3',
    slug: 'whatsapp-business-automation',
    title: {
      he: 'אוטומציה עסקית בוואטסאפ - המדריך המלא',
      en: 'WhatsApp Business Automation - The Complete Guide'
    },
    excerpt: {
      he: 'המדריך המקיף לאוטומציה עסקית בוואטסאפ: איך להגדיל מכירות, לשפר שירות לקוחות ולחסוך זמן עם בוטים חכמים.',
      en: 'The comprehensive guide to WhatsApp business automation: how to increase sales, improve customer service and save time with smart bots.'
    },
    category: {
      he: 'וואטסאפ',
      en: 'WhatsApp'
    },
    date: '2024-01-05',
    readTime: {
      he: '15 דקות קריאה',
      en: '15 min read'
    },
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
    author: {
      name: 'Skreep Team',
      avatar: '/assets/images/logo-1.webp'
    },
    content: {
      he: '',
      en: ''
    }
  },
  {
    id: '4',
    slug: 'business-process-automation',
    title: {
      he: 'אוטומציה של תהליכים עסקיים - חיסכון של 70% בזמן',
      en: 'Business Process Automation - Save 70% of Your Time'
    },
    excerpt: {
      he: 'גלו כיצד אוטומציה של תהליכים עסקיים יכולה לחסוך לעסק שלכם עד 70% מהזמן ולהגדיל את הרווחיות באופן משמעותי.',
      en: 'Discover how business process automation can save your business up to 70% of time and significantly increase profitability.'
    },
    category: {
      he: 'אוטומציה',
      en: 'Automation'
    },
    date: '2023-12-28',
    readTime: {
      he: '11 דקות קריאה',
      en: '11 min read'
    },
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
    author: {
      name: 'Skreep Team',
      avatar: '/assets/images/logo-1.webp'
    },
    content: {
      he: '',
      en: ''
    }
  },
  {
    id: '5',
    slug: 'ai-marketing-strategies',
    title: {
      he: 'אסטרטגיות שיווק מבוססות AI לעסקים קטנים ובינוניים',
      en: 'AI-Based Marketing Strategies for Small and Medium Businesses'
    },
    excerpt: {
      he: 'למדו כיצד עסקים קטנים ובינוניים יכולים להשתמש בבינה מלאכותית כדי לשפר את השיווק שלהם ולהתחרות בגדולים.',
      en: 'Learn how small and medium businesses can use artificial intelligence to improve their marketing and compete with the big players.'
    },
    category: {
      he: 'שיווק דיגיטלי',
      en: 'Digital Marketing'
    },
    date: '2023-12-20',
    readTime: {
      he: '13 דקות קריאה',
      en: '13 min read'
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    author: {
      name: 'Skreep Team',
      avatar: '/assets/images/logo-1.webp'
    },
    content: {
      he: '',
      en: ''
    }
  },
  {
    id: '6',
    slug: 'future-of-work-ai-automation',
    title: {
      he: 'עתיד העבודה: AI ואוטומציה בעולם העסקי',
      en: 'The Future of Work: AI and Automation in Business'
    },
    excerpt: {
      he: 'מה צופן העתיד לעולם העבודה? סקירה מקיפה על השפעת הבינה המלאכותית והאוטומציה על שוק העבודה והעסקים.',
      en: 'What does the future hold for the world of work? A comprehensive review of the impact of AI and automation on the job market and businesses.'
    },
    category: {
      he: 'עתיד העבודה',
      en: 'Future of Work'
    },
    date: '2023-12-15',
    readTime: {
      he: '14 דקות קריאה',
      en: '14 min read'
    },
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    author: {
      name: 'Skreep Team',
      avatar: '/assets/images/logo-1.webp'
    },
    content: {
      he: '',
      en: ''
    }
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getAllPostSlugs = (): string[] => {
  return blogPosts.map(post => post.slug);
};
