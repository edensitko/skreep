import type { Testimonial, SliderConfig } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const SLIDER_CONFIG: SliderConfig = {
  slideWidth: 398,
  slideMargin: 30,
  animationSpeed: 0.5
} as const;

export const TESTIMONIALS_DATA_HE: ReadonlyArray<Testimonial> = [
  {
    id: 1,
    name: "מתיו ב. לאו",
    title: "מנהל ומייסד",
    company: "טכנולוגיות חדשניות",
    image: "👤",
    rating: 5,
    text: "העבודה עם \"סקריפ\" הייתה פריצת דרך עבור המותג שלנו. הגישה החדשנית שלהם עזרה לנו לשדרג את השיווק באופן משמעותי."
  },
  {
    id: 2,
    name: "שרה כהן",
    title: "מנהלת מוצר",
    company: "סטארט-אפ טק",
    image: "👩",
    rating: 5,
    text: "הפתרונות של סקריפ חסכו לנו חודשים של פיתוח. הצוות המקצועי הפך את החלום שלנו למציאות."
  },
  {
    id: 3,
    name: "דוד לוי",
    title: "מייסד",
    company: "חברת ייעוץ",
    image: "👨",
    rating: 5,
    text: "התוצאות מדברות בעד עצמן - עלייה של 300% בהמרות ושיפור בחוויית המשתמש. מומלץ בחום!"
  },
  {
    id: 4,
    name: "רחל אברהם",
    title: "מנהלת שיווק",
    company: "חברת סחר אלקטרוני",
    image: "👩‍💼",
    rating: 5,
    text: "הגישה המותאמת אישית של סקריפ הפכה אותם לשותף אסטרטגי חיוני עבורנו."
  },
  {
    id: 5,
    name: "יוסי מזרחי",
    title: "מנכ\"ל",
    company: "חברת פינטק",
    image: "👨‍💼",
    rating: 5,
    text: "בזכות סקריפ הצלחנו להשיק את המוצר 50% מהר יותר מהמתוכנן, עם איכות מעולה."
  },
  {
    id: 6,
    name: "מיכל גרין",
    title: "מנהלת פרויקטים",
    company: "חברת הייטק",
    image: "👩‍💻",
    rating: 5,
    text: "השירות המקצועי והיכולת לספק פתרונות יצירתיים הפכו את סקריפ לבחירה הראשונה שלנו."
  },
  {
    id: 7,
    name: "אבי שמואל",
    title: "מייסד שותף",
    company: "סטודיו עיצוב",
    image: "🧑‍💻",
    rating: 5,
    text: "הצוות של סקריפ מבין טכנולוגיה, עיצוב וחוויית משתמש. השילוב יצר תוצאה מושלמת."
  }
] as const;

export const TESTIMONIALS_DATA_EN: ReadonlyArray<Testimonial> = [
  {
    id: 1,
    name: "Alex Chen",
    title: "Operations Director",
    company: "TechFlow Solutions",
    image: "👤",
    rating: 5,
    text: "The AI chatbot they built for us handles 70% of our customer inquiries automatically. Our response time improved dramatically and customer satisfaction is up 40%."
  },
  {
    id: 2,
    name: "Maya Rodriguez",
    title: "Founder",
    company: "GreenLeaf Organics",
    image: "👩",
    rating: 5,
    text: "Their e-commerce platform with AI recommendations increased our average order value by 35%. The automated inventory management saves us 10 hours per week."
  },
  {
    id: 3,
    name: "David Kim",
    title: "CEO",
    company: "MedConnect",
    image: "👨",
    rating: 5,
    text: "The custom web application streamlined our patient management process. What used to take 30 minutes now takes 5 minutes. ROI was achieved in just 3 months."
  },
  {
    id: 4,
    name: "Lisa Thompson",
    title: "Marketing Head",
    company: "Urban Fitness",
    image: "👩‍💼",
    rating: 5,
    text: "The mobile app they developed has 4.8 stars on app stores. Member engagement increased by 60% and our retention rate improved significantly."
  },
  {
    id: 5,
    name: "Michael Brown",
    title: "CTO",
    company: "DataSync Pro",
    image: "👨‍💼",
    rating: 5,
    text: "Their cloud migration and automation solution reduced our operational costs by 45%. The system handles complex data processing that would require 3 full-time employees."
  },
  {
    id: 6,
    name: "Sarah Wilson",
    title: "Product Owner",
    company: "EduTech Innovations",
    image: "👩‍💻",
    rating: 5,
    text: "The AI-powered learning platform they built adapts to each student's pace. Test scores improved by 25% and student engagement doubled."
  },
  {
    id: 7,
    name: "James Martinez",
    title: "Business Owner",
    company: "Local Services Hub",
    image: "🧑‍💻",
    rating: 5,
    text: "The website and booking system transformed our business. Online bookings increased 300% and we can now serve twice as many customers with the same staff."
  }
] as const;

// Default export for backward compatibility
export const TESTIMONIALS_DATA = TESTIMONIALS_DATA_HE;
