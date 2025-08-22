export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export const BLOG_DATA: BlogPost[] = [
  {
    id: "ai-business-transformation-2024",
    title: "AI Business Transformation in 2024",
    subtitle: "How Artificial Intelligence is Reshaping Modern Business",
    excerpt: "Discover the latest trends in AI adoption and how businesses are leveraging artificial intelligence to drive growth, efficiency, and innovation in 2024.",
    content: "Full blog content here...",
    author: "Dr. Sarah Chen",
    authorImage: "/assets/images/authors/sarah-chen.jpg",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Artificial Intelligence",
    tags: ["AI", "Business", "Technology", "Innovation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center",
    featured: true
  },
  {
    id: "chatbot-customer-service-revolution",
    title: "The Chatbot Revolution in Customer Service",
    subtitle: "24/7 Support That Never Sleeps",
    excerpt: "Learn how intelligent chatbots are transforming customer service, reducing response times, and improving customer satisfaction across industries.",
    content: "Full blog content here...",
    author: "Michael Rodriguez",
    authorImage: "/assets/images/authors/michael-rodriguez.jpg",
    publishDate: "2024-01-10",
    readTime: "6 min read",
    category: "Chatbots",
    tags: ["Chatbots", "Customer Service", "Automation"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop&crop=center",
    featured: true
  },
  {
    id: "data-analytics-business-insights",
    title: "Turning Data into Actionable Business Insights",
    subtitle: "The Power of Advanced Analytics",
    excerpt: "Explore how modern data analytics tools and techniques can help businesses make data-driven decisions and uncover hidden opportunities.",
    content: "Full blog content here...",
    author: "Dr. Emily Watson",
    authorImage: "/assets/images/authors/emily-watson.jpg",
    publishDate: "2024-01-05",
    readTime: "10 min read",
    category: "Data Analytics",
    tags: ["Data", "Analytics", "Business Intelligence", "Insights"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    featured: false
  },
  {
    id: "smart-automation-workflows",
    title: "Smart Automation: Streamlining Your Workflows",
    subtitle: "Efficiency Through Intelligent Automation",
    excerpt: "Discover how smart automation can eliminate repetitive tasks, reduce errors, and free up your team to focus on strategic initiatives.",
    content: "Full blog content here...",
    author: "James Thompson",
    authorImage: "/assets/images/authors/james-thompson.jpg",
    publishDate: "2023-12-28",
    readTime: "7 min read",
    category: "Automation",
    tags: ["Automation", "Workflow", "Efficiency", "Productivity"],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=center",
    featured: false
  },
  {
    id: "ai-integration-existing-systems",
    title: "Seamless AI Integration with Existing Systems",
    subtitle: "Making AI Work for Your Business",
    excerpt: "Learn the best practices for integrating AI solutions with your current business systems without disrupting operations.",
    content: "Full blog content here...",
    author: "Lisa Park",
    authorImage: "/assets/images/authors/lisa-park.jpg",
    publishDate: "2023-12-20",
    readTime: "9 min read",
    category: "Integration",
    tags: ["AI Integration", "Systems", "Implementation", "Technology"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center",
    featured: true
  },
  {
    id: "future-ai-consulting",
    title: "The Future of AI Consulting",
    subtitle: "What to Expect in the Next Decade",
    excerpt: "Get insights into emerging trends in AI consulting and how businesses can prepare for the next wave of technological advancement.",
    content: "Full blog content here...",
    author: "Dr. Robert Kim",
    authorImage: "/assets/images/authors/robert-kim.jpg",
    publishDate: "2023-12-15",
    readTime: "12 min read",
    category: "Consulting",
    tags: ["AI Consulting", "Future", "Trends", "Strategy"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    featured: false
  }
];

export const BLOG_CATEGORIES = [
  "All",
  "Artificial Intelligence",
  "Chatbots",
  "Data Analytics",
  "Automation",
  "Integration",
  "Consulting"
];
