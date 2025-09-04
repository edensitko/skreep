// ============================================================================
// CONTACT FORM SECTION - BARREL EXPORTS
// ============================================================================

export { default } from './ContactFormSection';
export { default as FormField } from './FormField';
export { default as TextAreaField } from './TextAreaField';
export { default as ContactInfoItem } from './ContactInfoItem';
export type { 
  FormData, 
  FormErrors, 
  BusinessType, 
  SubmissionStatus, 
  ContactInfo, 
  FormFieldProps, 
  TextAreaFieldProps, 
  ContactInfoItemProps 
} from './types';
export { 
  BUSINESS_TYPES, 
  CONTACT_INFO, 
  INITIAL_FORM_DATA, 
  ERROR_MESSAGES 
} from './constants';
export { 
  validateEmail, 
  validatePhone, 
  validateFullName, 
  validateForm, 
  sanitizeFormData, 
  debounce 
} from './utils';
