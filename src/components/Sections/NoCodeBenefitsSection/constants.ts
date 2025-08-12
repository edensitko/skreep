import type { Benefit } from './types';

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

export const ENTREPRENEURS_BENEFITS: readonly Benefit[] = [
  {
    icon: '1',
    title: 'אפיון ומחקר שוק',
    description: 'הבנת הרעיון, זיהוי קהל היעד, ניתוח מתחרים והגדרת MVP מדויק שיכול לצאת לשוק במהירות.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '2',
    title: 'עיצוב MVP',
    description: 'יצירת עיצוב ראשוני פשוט, ממוקד ומהיר לביצוע שמציג את הרעיון בצורה אטרקטיבית ומובנת.',
    gradient: 'from-cyan-400 to-cyan-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '3',
    title: 'פיתוח ראשוני',
    description: 'בניית גרסה ראשונה של המוצר עם מינימום יכולות (MVP), תוך דגש על זמני פיתוח קצרים.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '4',
    title: 'בדיקות והתנסות',
    description: 'בדיקות תפעוליות מול משתמשים ראשונים, איסוף משוב מהיר והכנה לאיטרציה הבאה.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '5',
    title: 'השקה ואיסוף פידבק',
    description: 'השקת MVP לקהל מצומצם, בדיקת עניין שוק, איסוף דאטה ודיוק הצעת הערך להמשך פיתוח.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  }
] as const;

export const BUSINESS_BENEFITS: readonly Benefit[] = [
  {
    icon: '1',
    title: 'אפיון ומחקר',
    description: 'מיפוי מערכות קיימות, זיהוי צרכים תפעוליים, והגדרת דרישות מדויקות שיתמכו בצמיחה עסקית.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '2',
    title: 'עיצוב חוויית משתמש',
    description: 'עיצוב ממשקים יעילים לעובדים ולקוחות, עם התאמה למיתוג החברה ושמירה על חווית משתמש קלה וברורה.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '3',
    title: 'פיתוח והטמעה',
    description: 'פיתוח מודולים מותאמים, אינטגרציה עם מערכות קיימות, תוך הקפדה על אבטחה, ביצועים וסקלאביליות.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '4',
    title: 'בדיקות ואבטחת איכות',
    description: 'ביצוע בדיקות יסודיות בכל שלב, כולל התאמה למשתמשי קצה, תקינות פונקציונלית והתמודדות עם עומסים.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  },
  {
    icon: '5',
    title: 'עלייה לאוויר וליווי',
    description: 'השקת המערכת בסביבה חיה, ליווי בהטמעה בארגון ותמיכה שוטפת לתקלות והתייעלות.',
    gradient: 'from-cyan-400 to-purple-400',
    bgImage: '/assets/images/img/1.png'
  }
] as const;

export const SECTION_CONTENT = {
  entrepreneursTitle: 'המסע שלכם מרעיון למוצר',
  businessTitle: 'התהליך המקצועי שלנו',
  entrepreneursSubtitle: 'איך אנחנו לוקחים את הרעיון שלכם ומפתחים אותו לפתרון דיגיטלי מוכן לשוק',
  businessSubtitle: 'תהליך מובנה ומקצועי שמבטיח תוצאות איכותיות ועמידה בלוחות זמנים'
} as const;

export const ANIMATION_CONFIG = {
  itemDelay: 200,
  iconDelay: 400,
  throttleDelay: 16, // ~60fps for smooth scrolling
  transitionDuration: 'duration-1000',
  hoverDuration: 'duration-700'
} as const;

export const LAYOUT_CONFIG = {
  timelineWidth: 'w-1',
  iconSize: 'w-12 h-12',
  cardPadding: 'p-4 md:p-8',
  sectionPadding: 'py-12 md:py-20'
} as const;
