import type { ExamplePrompt } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const EXAMPLE_PROMPTS: ReadonlyArray<ExamplePrompt> = [
  {
    id: 1,
    text: "איך אני יכול לשפר את האתר שלי?",
    category: "web",
    icon: "🌐"
  },
  {
    id: 2,
    text: "אני צריך עזרה עם אפליקציה",
    category: "mobile",
    icon: "📱"
  },
  {
    id: 3,
    text: "איך לבנות חנות אונליין?",
    category: "ecommerce",
    icon: "🛒"
  },
  {
    id: 4,
    text: "מה זה בינה מלאכותית?",
    category: "ai",
    icon: "🤖"
  },
  {
    id: 5,
    text: "איך לשפר ביצועי האתר?",
    category: "performance",
    icon: "⚡"
  }
] as const;

export const SECTION_CONTENT = {
  title: "יועץ AI חכם",
  subtitle: "קבל ייעוץ מקצועי ומותאם אישית לכל שאלה בתחום הפיתוח הדיגיטלי",
  placeholder: "כתוב כאן את השאלה שלך ואקבל תשובה מקצועית...",
  submitText: "שלח",
  chatTitle: "שיחה עם היועץ",
  closeText: "סגור",
  typingDelay: 1500,
  examplesTitle: "שאלות פופולריות:"
} as const;

// Animation configurations
export const ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  slideInDuration: 0.6,
  scaleHoverDuration: 0.2,
  chatOpenDuration: 0.7,
  messageDelay: 0.3
} as const;

// Visual effects configuration
export const VISUAL_EFFECTS = {
  gradients: {
    primary: 'from-cyan-400 via-blue-500 to-purple-600',
    secondary: 'from-purple-400 via-pink-500 to-red-500',
    background: 'from-black via-gray-900 to-black',
    card: 'from-black/40 via-black/20 to-transparent'
  },
  shadows: {
    glow: 'shadow-[0_0_50px_rgba(6,182,212,0.3)]',
    card: 'shadow-[0_20px_60px_rgba(0,0,0,0.4)]',
    button: 'shadow-[0_10px_30px_rgba(6,182,212,0.2)]'
  },
  blur: {
    backdrop: 'backdrop-blur-3xl',
    strong: 'backdrop-blur-2xl',
    light: 'backdrop-blur-xl'
  }
} as const;

export const AI_RESPONSE_TEMPLATE = (userText: string): string => 
  `תודה על השאלה שלך! אני כאן לעזור לך עם "${userText}". אני יכול להציע לך פתרונות מותאמים אישית ולהדריך אותך בתהליך. איך תרצה להמשיך?`;

export const GRID_STYLES = {
  backgroundImage: `
    radial-gradient(circle at 25% 25%, rgba(6,182,212,0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(147,51,234,0.1) 0%, transparent 50%),
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
  `,
  backgroundSize: '400px 400px, 400px 400px, 60px 60px, 60px 60px'
} as const;

// Floating particles configuration
export const PARTICLES_CONFIG = {
  count: 20,
  colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'],
  sizes: [2, 3, 4],
  animationDuration: [15, 25, 35]
} as const;
