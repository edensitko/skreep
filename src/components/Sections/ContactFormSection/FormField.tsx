import React, { memo } from 'react';
import type { FormFieldProps } from './types';

/**
 * Memoized form input field with accessibility features
 */
const FormField = memo<FormFieldProps>(({ 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  autoComplete,
  'data-testid': testId
}) => {
  const inputId = `form-${name}`;
  const errorId = `${inputId}-error`;
  
  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        data-testid={testId}
        className={`w-full px-6 py-4 bg-white/5 border rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 hover:bg-white/10 ${
          error 
            ? 'border-red-400/50 focus:ring-red-400/50 focus:border-red-400/50' 
            : 'border-white/20'
        }`}
        dir="rtl"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        aria-label={placeholder}
      />
      {error && (
        <p 
          id={errorId}
          className="mt-2 text-red-400 text-sm animate-fadeIn" 
          dir="rtl" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
