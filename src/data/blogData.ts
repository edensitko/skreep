export interface BlogPost {
  id: string;
  title: { he: string; en: string };
  subtitle: { he: string; en: string };
  excerpt: { he: string; en: string };
  content: { he: string; en: string };
  author: { he: string; en: string };
  authorImage: string;
  publishDate: string;
  readTime: { he: string; en: string };
  category: { he: string; en: string };
  tags: { he: string[]; en: string[] };
  image: string;
  featured: boolean;
}

export const BLOG_DATA: BlogPost[] = [
  {
    id: "ai-business-transformation-2024",
    title: {
      he: "טרנספורמציה עסקית עם AI ב-2024",
      en: "AI Business Transformation in 2024"
    },
    subtitle: {
      he: "איך בינה מלאכותית משנה את עולם העסקים המודרני",
      en: "How Artificial Intelligence is Reshaping Modern Business"
    },
    excerpt: {
      he: "גלו את המגמות האחרונות באימוץ AI וכיצד עסקים ממנפים בינה מלאכותית להניע צמיחה, יעילות וחדשנות ב-2024.",
      en: "Discover the latest trends in AI adoption and how businesses are leveraging artificial intelligence to drive growth, efficiency, and innovation in 2024."
    },
    content: {
      he: "תוכן המאמר המלא כאן...",
      en: "Full blog content here..."
    },
    author: {
      he: "ד״ר שרה כהן",
      en: "Dr. Sarah Chen"
    },
    authorImage: "/assets/images/authors/sarah-chen.jpg",
    publishDate: "2024-01-15",
    readTime: { he: "8 דקות קריאה", en: "8 min read" },
    category: { he: "בינה מלאכותית", en: "Artificial Intelligence" },
    tags: {
      he: ["AI", "עסקים", "טכנולוגיה", "חדשנות"],
      en: ["AI", "Business", "Technology", "Innovation"]
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
    featured: true
  },
  {
    id: "chatbot-customer-service-revolution",
    title: {
      he: "מהפכת הצ׳אטבוטים בשירות לקוחות",
      en: "The Chatbot Revolution in Customer Service"
    },
    subtitle: {
      he: "תמיכה 24/7 שלא נחה לרגע",
      en: "24/7 Support That Never Sleeps"
    },
    excerpt: {
      he: "למדו כיצד צ׳אטבוטים חכמים משנים את שירות הלקוחות, מקצרים זמני תגובה ומשפרים את שביעות רצון הלקוחות בכל התעשיות.",
      en: "Learn how intelligent chatbots are transforming customer service, reducing response times, and improving customer satisfaction across industries."
    },
    content: {
      he: "תוכן המאמר המלא כאן...",
      en: "Full blog content here..."
    },
    author: {
      he: "מיכאל רודריגז",
      en: "Michael Rodriguez"
    },
    authorImage: "/assets/images/authors/michael-rodriguez.jpg",
    publishDate: "2024-01-10",
    readTime: { he: "6 דקות קריאה", en: "6 min read" },
    category: { he: "צ׳אטבוטים", en: "Chatbots" },
    tags: {
      he: ["צ׳אטבוטים", "שירות לקוחות", "אוטומציה"],
      en: ["Chatbots", "Customer Service", "Automation"]
    },
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop&crop=center",
    featured: true
  },
  {
    id: "data-analytics-business-insights",
    title: {
      he: "הפיכת נתונים לתובנות עסקיות פעילות",
      en: "Turning Data into Actionable Business Insights"
    },
    subtitle: {
      he: "העוצמה של אנליטיקה מתקדמת",
      en: "The Power of Advanced Analytics"
    },
    excerpt: {
      he: "גלו כיצד כלי וטכניקות אנליטיקה מודרניים יכולים לעזור לעסקים לקבל החלטות מבוססות נתונים ולחשוף הזדמנויות נסתרות.",
      en: "Explore how modern data analytics tools and techniques can help businesses make data-driven decisions and uncover hidden opportunities."
    },
    content: {
      he: "תוכן המאמר המלא כאן...",
      en: "Full blog content here..."
    },
    author: {
      he: "ד״ר אמילי ווטסון",
      en: "Dr. Emily Watson"
    },
    authorImage: "/assets/images/authors/emily-watson.jpg",
    publishDate: "2024-01-05",
    readTime: { he: "10 דקות קריאה", en: "10 min read" },
    category: { he: "אנליטיקת נתונים", en: "Data Analytics" },
    tags: {
      he: ["נתונים", "אנליטיקה", "בינה עסקית", "תובנות"],
      en: ["Data", "Analytics", "Business Intelligence", "Insights"]
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    featured: false
  },
  {
    id: "smart-automation-workflows",
    title: {
      he: "אוטומציה חכמה: ייעול תהליכי העבודה שלכם",
      en: "Smart Automation: Streamlining Your Workflows"
    },
    subtitle: {
      he: "יעילות באמצעות אוטומציה אינטליגנטית",
      en: "Efficiency Through Intelligent Automation"
    },
    excerpt: {
      he: "גלו כיצד אוטומציה חכמה יכולה לבטל משימות חוזרות, להפחית שגיאות ולשחרר את הצוות שלכם להתמקד ביוזמות אסטרטגיות.",
      en: "Discover how smart automation can eliminate repetitive tasks, reduce errors, and free up your team to focus on strategic initiatives."
    },
    content: {
      he: "תוכן המאמר המלא כאן...",
      en: "Full blog content here..."
    },
    author: {
      he: "ג׳יימס תומפסון",
      en: "James Thompson"
    },
    authorImage: "/assets/images/authors/james-thompson.jpg",
    publishDate: "2023-12-28",
    readTime: { he: "7 דקות קריאה", en: "7 min read" },
    category: { he: "אוטומציה", en: "Automation" },
    tags: {
      he: ["אוטומציה", "תהליכי עבודה", "יעילות", "פרודוקטיביות"],
      en: ["Automation", "Workflow", "Efficiency", "Productivity"]
    },
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=center",
    featured: false
  },
  {
    id: "ai-integration-existing-systems",
    title: {
      he: "שילוב AI חלק עם מערכות קיימות",
      en: "Seamless AI Integration with Existing Systems"
    },
    subtitle: {
      he: "להפוך את ה-AI לעובד בשבילכם",
      en: "Making AI Work for Your Business"
    },
    excerpt: {
      he: "למדו את השיטות המומלצות לשילוב פתרונות AI עם המערכות העסקיות הנוכחיות שלכם מבלי לשבש את הפעילות.",
      en: "Learn the best practices for integrating AI solutions with your current business systems without disrupting operations."
    },
    content: {
      he: "תוכן המאמר המלא כאן...",
      en: "Full blog content here..."
    },
    author: {
      he: "ליסה פארק",
      en: "Lisa Park"
    },
    authorImage: "/assets/images/authors/lisa-park.jpg",
    publishDate: "2023-12-20",
    readTime: { he: "9 דקות קריאה", en: "9 min read" },
    category: { he: "אינטגרציה", en: "Integration" },
    tags: {
      he: ["שילוב AI", "מערכות", "יישום", "טכנולוגיה"],
      en: ["AI Integration", "Systems", "Implementation", "Technology"]
    },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center",
    featured: true
  },
  {
    id: "future-ai-consulting",
    title: {
      he: "עתיד הייעוץ בתחום ה-AI",
      en: "The Future of AI Consulting"
    },
    subtitle: {
      he: "מה לצפות בעשור הקרוב",
      en: "What to Expect in the Next Decade"
    },
    excerpt: {
      he: "קבלו תובנות על מגמות מתפתחות בייעוץ AI וכיצד עסקים יכולים להתכונן לגל הבא של התקדמות טכנולוגית.",
      en: "Get insights into emerging trends in AI consulting and how businesses can prepare for the next wave of technological advancement."
    },
    content: {
      he: "תוכן המאמר המלא כאן...",
      en: "Full blog content here..."
    },
    author: {
      he: "ד״ר רוברט קים",
      en: "Dr. Robert Kim"
    },
    authorImage: "/assets/images/authors/robert-kim.jpg",
    publishDate: "2023-12-15",
    readTime: { he: "12 דקות קריאה", en: "12 min read" },
    category: { he: "ייעוץ", en: "Consulting" },
    tags: {
      he: ["ייעוץ AI", "עתיד", "מגמות", "אסטרטגיה"],
      en: ["AI Consulting", "Future", "Trends", "Strategy"]
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    featured: false
  }
];

export const BLOG_CATEGORIES = {
  he: ["הכל", "בינה מלאכותית", "צ׳אטבוטים", "אנליטיקת נתונים", "אוטומציה", "אינטגרציה", "ייעוץ"],
  en: ["All", "Artificial Intelligence", "Chatbots", "Data Analytics", "Automation", "Integration", "Consulting"]
};
