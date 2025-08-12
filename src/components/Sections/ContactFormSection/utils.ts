import type { FormData, FormErrors } from './types';
import { ERROR_MESSAGES } from './constants';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validates email format using RFC 5322 compliant regex
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates Israeli phone number format (10 digits)
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  const cleanPhone = phone.replace(/[\s-()]/g, '');
  const phoneRegex = /^0[2-9]\d{8}$|^\+972[2-9]\d{8}$/;
  return phoneRegex.test(cleanPhone);
};

/**
 * Validates full name (at least 2 characters, no numbers)
 */
export const validateFullName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && !/\d/.test(trimmedName);
};

/**
 * Comprehensive form validation with detailed error messages
 */
export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Full name validation
  if (!data.fullName?.trim()) {
    errors.fullName = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!validateFullName(data.fullName)) {
    errors.fullName = 'שם מלא חייב להכיל לפחות 2 תווים ללא מספרים';
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!validateEmail(data.email)) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Phone validation
  if (!data.phone?.trim()) {
    errors.phone = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (!validatePhone(data.phone)) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE;
  }

  // Business type validation
  if (!data.businessType) {
    errors.businessType = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  return errors;
};

/**
 * Sanitizes form data to prevent XSS attacks
 */
export const sanitizeFormData = (data: FormData): FormData => {
  return {
    fullName: data.fullName?.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') || '',
    email: data.email?.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') || '',
    phone: data.phone?.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') || '',
    description: data.description?.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') || '',
    businessType: data.businessType
  };
};

/**
 * Debounce utility for performance optimization
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
