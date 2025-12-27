'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
// Removed unused Image import
import { useLanguage } from '@/contexts/LanguageContext';
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
  // LANGUAGE CONTEXT
  // ============================================================================
  
  const { language, t } = useLanguage();
  
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
      <section className="w-full py-10 md:py-24 bg-black/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-white/10 h-8 w-64 rounded-3xl mb-4 mx-auto"></div>
          <div className="animate-pulse bg-white/5 h-4 w-96 rounded mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      className="w-[85%] mx-auto py-26 md:py-16 relative overflow-hidden"
      role="region"
      aria-label={t('contactForm.sectionAriaLabel')}
    >
        <div className="text-center mb-6">
            <h2 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out" >
              {t('contactForm.title')}
            </h2>
           
          </div>
      {/* Glass-morphism container matching About section */}
   
      <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-3xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-3xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-3xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out text-white pt-8 md:pt-16 pb-4 md:pb-8">
      <div className="text-center mb-6">
          
            <p className="text-md text-white/70 max-w-2xl mx-auto leading-relaxed text-center">
              {t('contactForm.subtitle')}
            </p>
          </div>
        <div className="container mx-auto px-4 md:px-4 py-4 md:py-4 relative z-10">
          
          <div className="max-w-2xl mx-auto">
          {/* Header */}
       

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
                <span dir={language === 'he' ? 'rtl' : 'ltr'}>
                  {t('common.formSuccess') || (language === 'he' ? 'הטופס נשלח בהצלחה! נחזור אליכם בהקדם' : 'Form submitted successfully! We will get back to you soon')}
                </span>
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
              <span dir={language === 'he' ? 'rtl' : 'ltr'}>{errors.general}</span>
            </div>
          )}

          {/* Contact Form */}
          <div className="px-4">
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-4 "
              noValidate
              aria-label={t('contactForm.formAriaLabel')}
            >
              {/* Full Name */}
              <FormField
                name="fullName"
                type="text"
                placeholder={t('contactForm.fields.fullName.placeholder')}
                value={formData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                required
                autoComplete="name"
                data-testid="fullName-input"
                language={language}
              />

              {/* Email */}
              <FormField
                name="email"
                type="email"
                placeholder={t('contactForm.fields.email.placeholder')}
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
                autoComplete="email"
                data-testid="email-input"
                language={language}
              />

              {/* Phone */}
              <FormField
                name="phone"
                type="tel"
                placeholder={t('contactForm.fields.phone.placeholder')}
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                required
                autoComplete="tel"
                data-testid="phone-input"
                language={language}
              />

              {/* Description */}
              <TextAreaField
                name="description"
                placeholder={t('contactForm.fields.description.placeholder')}
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                data-testid="description-input"
                language={language}
              />

              {/* Business Type */}
              <div className="space-y-1 pt-2">
                <fieldset>
                  <legend className="text-white/70 text-sm mb-2" dir={language === 'he' ? 'rtl' : 'ltr'}>{t('contactForm.businessType.legend')}</legend>
                  <div className="flex flex-col-1 space-y-2" role="radiogroup" aria-required="true">
                    {BUSINESS_TYPES.map((businessType) => (
                      <label 
                        key={businessType.value}
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded transition-colors duration-300" 
                        dir={language === 'he' ? 'rtl' : 'ltr'}
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
                          {t(`contactForm.businessType.options.${businessType.value}`)}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.businessType && (
                    <p 
                      id="businessType-error" 
                      className="mt-2 text-red-400 text-sm animate-fadeIn" 
                      dir={language === 'he' ? 'rtl' : 'ltr'} 
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.businessType}
                    </p>
                  )}
                </fieldset>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
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
                  <span dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {isSubmitting ? t('contactForm.submitButton.submitting') : t('contactForm.submitButton.idle')}
                  </span>
                </button>
              </div>
            </form>
          
            {/* Contact Info */}
            <div className="mt-6 space-x-5 flex">
              {CONTACT_INFO.map((contact, index) => (
                <ContactInfoItem
                  key={index}
                  contact={contact}
                  language={language}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
    </section>
  );
}

// Export memoized component for better performance
export default memo(ContactFormSection);
