'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
import FormField from './FormField';
import TextAreaField from './TextAreaField';
import ContactInfoItem from './ContactInfoItem';
import { validateForm, sanitizeFormData, debounce } from './utils';
import { BUSINESS_TYPES, CONTACT_INFO, INITIAL_FORM_DATA, ERROR_MESSAGES } from './constants';
import type { FormData, FormErrors, BusinessType, SubmissionStatus } from './types';

/**
 * Contact form section with comprehensive validation and accessibility
 * Features form validation, sanitization, debounced input, and loading states
 */
function ContactFormSection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [mounted, setMounted] = useState(false);
  
  // Refs for form management
  const formRef = useRef<HTMLFormElement>(null);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  const isSubmitting = submissionStatus === 'submitting';
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  // ============================================================================
  // FORM HANDLERS
  // ============================================================================

  /**
   * Debounced validation to improve performance
   */
  const debouncedValidation = useMemo(
    () => debounce((data: FormData) => {
      const validationErrors = validateForm(data);
      setErrors(validationErrors);
    }, 300),
    []
  );

  /**
   * Handle input changes with immediate error clearing and debounced validation
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = value.trim();
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: sanitizedValue
      };
      
      // Trigger debounced validation
      debouncedValidation(newData);
      return newData;
    });
    
    // Clear specific field error immediately
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  }, [errors, debouncedValidation]);

  /**
   * Handle business type selection
   */
  const handleBusinessTypeChange = useCallback((businessType: BusinessType) => {
    setFormData(prev => ({ ...prev, businessType }));
    
    // Clear business type error immediately
    if (errors.businessType) {
      setErrors(prev => ({ ...prev, businessType: undefined }));
    }
  }, [errors.businessType]);

  /**
   * Simulate form submission with network call
   */
  const simulateFormSubmission = useCallback(async (data: FormData): Promise<void> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random network errors for testing (10% chance)
    if (Math.random() < 0.1) {
      throw new Error('Network error');
    }
    
    console.log('Form submitted:', data);
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Sanitize and validate form data
    const sanitizedData = sanitizeFormData(formData);
    const validationErrors = validateForm(sanitizedData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Focus on first error field
      const firstErrorField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement;
      firstErrorField?.focus();
      return;
    }
    
    setSubmissionStatus('submitting');
    setErrors({});
    
    try {
      await simulateFormSubmission(sanitizedData);
      setSubmissionStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData(INITIAL_FORM_DATA);
        setSubmissionStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
      setErrors({
        general: error instanceof Error && error.message.includes('Network') 
          ? ERROR_MESSAGES.NETWORK_ERROR 
          : ERROR_MESSAGES.SUBMISSION_ERROR
      });
      
      // Reset status after showing error
      setTimeout(() => {
        setSubmissionStatus('idle');
      }, 5000);
    }
  }, [formData, isSubmitting, simulateFormSubmission]);

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <section className="w-full py-16 md:py-24 bg-black/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-white/10 h-8 w-64 rounded mb-4 mx-auto"></div>
          <div className="animate-pulse bg-white/5 h-4 w-96 rounded mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      className="w-full py-16 md:py-24 bg-black/30 relative overflow-hidden"
      role="region"
      aria-label="טופס יצירת קשר"
    >
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority={false}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              בואו נתחיל לעבוד
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              מוכנים להפוך את החזון שלכם למציאות? צרו איתנו קשר ונתחיל לתכנן את הפרויקט הבא שלכם
            </p>
          </div>

          {/* Success Message */}
          {submissionStatus === 'success' && (
            <div 
              className="mb-8 p-6 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 text-center animate-fadeIn"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span dir="rtl">הטופס נשלח בהצלחה! נחזור אליכם בהקדם</span>
              </div>
            </div>
          )}

          {/* General Error Message */}
          {errors.general && (
            <div 
              className="mb-8 p-6 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-center animate-fadeIn"
              role="alert"
              aria-live="polite"
            >
              <span dir="rtl">{errors.general}</span>
            </div>
          )}

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-6"
              noValidate
              aria-label="טופס יצירת קשר"
            >
              {/* Full Name */}
              <FormField
                type="text"
                name="fullName"
                placeholder="שם מלא *"
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                required
                autoComplete="name"
                data-testid="fullName-input"
              />

              {/* Email */}
              <FormField
                type="email"
                name="email"
                placeholder="כתובת אימייל *"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
                autoComplete="email"
                data-testid="email-input"
              />

              {/* Phone */}
              <FormField
                type="tel"
                name="phone"
                placeholder="מספר טלפון *"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
                autoComplete="tel"
                data-testid="phone-input"
              />

              {/* Description */}
              <TextAreaField
                name="description"
                placeholder="ספרו לנו על הפרויקט שלכם"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                data-testid="description-input"
              />

              {/* Business Type */}
              <div className="space-y-3 pt-2">
                <fieldset>
                  <legend className="text-white/70 text-sm mb-3" dir="rtl">אני:</legend>
                  <div className="flex flex-col space-y-2" role="radiogroup" aria-required="true">
                    {BUSINESS_TYPES.map((businessType) => (
                      <label 
                        key={businessType.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors duration-300" 
                        dir="rtl"
                      >
                        <input
                          type="radio"
                          name="businessType"
                          value={businessType.value}
                          checked={formData.businessType === businessType.value}
                          onChange={() => handleBusinessTypeChange(businessType.value)}
                          className="w-4 h-4 text-cyan-400 border-white/30 focus:ring-cyan-400 focus:ring-2 bg-transparent"
                          aria-describedby={errors.businessType ? 'businessType-error' : undefined}
                        />
                        <span className="text-white/90 hover:text-white transition-colors duration-300">
                          {businessType.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.businessType && (
                    <p 
                      id="businessType-error" 
                      className="mt-2 text-red-400 text-sm animate-fadeIn" 
                      dir="rtl" 
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.businessType}
                    </p>
                  )}
                </fieldset>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || hasErrors}
                  className={`w-full py-4 px-8 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting || hasErrors
                      ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed border-gray-600/30'
                      : 'bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 hover:from-cyan-400/20 hover:via-cyan-400/40 hover:to-cyan-400/70 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  aria-describedby={hasErrors ? 'form-errors' : undefined}
                >
                  {isSubmitting && (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span dir="rtl">
                    {isSubmitting ? 'שולח...' : 'שליחה'}
                  </span>
                </button>
              </div>
            </form>
          
            {/* Contact Info */}
            <div className="mt-12 space-y-4">
              {CONTACT_INFO.map((contact, index) => (
                <ContactInfoItem
                  key={index}
                  contact={contact}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Export memoized component for better performance
export default memo(ContactFormSection);
