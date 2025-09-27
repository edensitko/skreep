import type { BusinessType, ContactInfo, FormData } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const BUSINESS_TYPES: ReadonlyArray<{ value: BusinessType; label: string }> = [
  { value: 'business-owner', label: 'בעל עסק' },
  { value: 'startup-founder', label: 'מקים סטרט-אפ' }
] as const;

export const CONTACT_INFO: ReadonlyArray<ContactInfo> = [
  {
    type: 'email',
    value: 'info@skreep.com',
    href: 'mailto:info@skreep.com',
    icon: {
      viewBox: '0 0 20 20',
      path: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'
    },
    gradient: 'from-cyan-400 to-purple-400'
  },
  {
    type: 'phone',
    value: '0585887744',
    href: 'tel:+972585887744',
    icon: {
      viewBox: '0 0 20 20',
      path: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z'
    },
    gradient: 'from-purple-400 to-pink-400'
  }
] as const;

export const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  email: '',
  phone: '',
  description: '',
  businessType: ''
};

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'שדה זה נדרש',
  INVALID_EMAIL: 'אימייל לא תקין',
  INVALID_PHONE: 'מספר טלפון לא תקין',
  SUBMISSION_ERROR: 'אירעה שגיאה, אנא נסו שוב',
  NETWORK_ERROR: 'בעיית רשת, אנא בדקו את החיבור'
} as const;
