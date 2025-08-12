// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  description: string;
  businessType: BusinessType | '';
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  general?: string;
}

export type BusinessType = 'business-owner' | 'startup-founder';

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactInfo {
  type: 'email' | 'phone';
  value: string;
  icon: {
    viewBox: string;
    path: string;
  };
  gradient: string;
  href: string;
}

export interface FormFieldProps {
  type: 'text' | 'email' | 'tel';
  name: keyof FormData;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  'data-testid'?: string;
}

export interface TextAreaFieldProps {
  name: keyof FormData;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  'data-testid'?: string;
}

export interface ContactInfoItemProps {
  contact: ContactInfo;
}
