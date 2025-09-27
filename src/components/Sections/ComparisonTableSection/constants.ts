import type { ComparisonRow } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const COMPARISON_DATA: ReadonlyArray<ComparisonRow> = [
  {
    category: "איכות",
    agencies: "איכות טובה בד\"כ",
    freelancers: "מגוון רמות",
    inHouse: "מגוון רמות",
    skreep: "האיכות הגבוהה ביותר, ללא פשרות"
  },
  {
    category: "עלות",
    agencies: "עלויות גבוהות",
    freelancers: "משתנה לפי הרמה",
    inHouse: "עלויות גבוהות להחזקת צוות קבוע",
    skreep: "מחיר השקעה נמוך יחסית הודות למודל עבודה יעיל וחדשני"
  },
  {
    category: "זמן פיתוח וגיוס",
    agencies: "קצב פיתוח איטי",
    freelancers: "קצב פיתוח איטי",
    inHouse: "קצב פיתוח מהיר",
    skreep: "זמן פיתוח מהיר מאוד הודות לשימוש בטכנולוגיות ופלטפורמות חדשניות"
  },
  {
    category: "משאבים",
    agencies: "משתנה",
    freelancers: "מוגבלים",
    inHouse: "מוגבלים",
    skreep: "משתנה ומותאם לצרכים שלך"
  },
  {
    category: "שירות וזמינות",
    agencies: "שירות לקוחות טוב",
    freelancers: "זמינות נמוכה - קשה לתאם זמנים",
    inHouse: "תלוי במשאבים",
    skreep: "שירות לקוחות מעולה ומענה מהיר"
  }
] as const;
