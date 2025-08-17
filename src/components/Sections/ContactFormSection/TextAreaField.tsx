import React, { memo } from 'react';
import type { TextAreaFieldProps } from './types';

/**
 * Memoized textarea field component
 */
const TextAreaField = memo<TextAreaFieldProps>(({ 
  name, 
  placeholder, 
  value, 
  onChange, 
  rows = 3,
  'data-testid': testId,
  language
}) => {
  const textareaId = `form-${name}`;
  
  return (
    <div className="relative">
      <label htmlFor={textareaId} className="sr-only">
        {placeholder}
      </label>
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        data-testid={testId}
        className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 hover:bg-white/10 resize-none"
        dir={language === 'he' ? 'rtl' : 'ltr'}
        aria-label={placeholder}
      />
    </div>
  );
});

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
