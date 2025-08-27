'use client';

import React, { memo } from 'react';
import { MAINTENANCE_CONTENT, VISUAL_EFFECTS } from './constants';

interface NotifyFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isSubmitted: boolean;
}

/**
 * Email notification form with stunning animations and effects
 */
export const NotifyForm = memo<NotifyFormProps>(({
  email,
  onEmailChange,
  onSubmit,
  isLoading,
  isSubmitted
}) => {
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div 
          className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-teal-600/20 border border-green-400/30 text-green-300"
          style={{
            animation: 'slideInUp 0.6s ease-out forwards'
          }}
        >
          <div className="text-2xl animate-bounce">✅</div>
          <span className="font-semibold text-lg">
            {MAINTENANCE_CONTENT.successMessage}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto">
      <div className="relative group">
        {/* Input Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
        
        <div className="relative flex flex-row gap-2 sm:gap-3">
          {/* Email Input */}
          <div className="relative flex-1">
            <input
              id="maintenance-email"
              name="notificationEmail"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder={MAINTENANCE_CONTENT.emailPlaceholder}
              className="w-full px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-black/60 via-black/40 to-black/20 backdrop-blur-2xl border border-white/20 focus:border-cyan-400/60 rounded-xl sm:rounded-2xl text-white placeholder-white/60 focus:outline-none transition-all duration-300 text-sm sm:text-base"
              required
              disabled={isLoading}
              dir="rtl"
            />
            
            {/* Input Border Animation */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" 
                 style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!email.trim() || isLoading}
            className={`relative px-3 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg sm:rounded-2xl font-bold transition-all duration-300 hover:scale-105 disabled:hover:scale-100 ${VISUAL_EFFECTS.shadows.button} hover:shadow-cyan-400/40 disabled:shadow-none min-w-[80px] sm:min-w-[140px] group flex-shrink-0`}
          >
            {isLoading ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">{MAINTENANCE_CONTENT.submitLoadingText}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm sm:text-base">{MAINTENANCE_CONTENT.submitText}</span>
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            )}
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 rounded-lg sm:rounded-2xl bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Form Description */}
      <p className="text-center text-white/60 text-xs mt-4">
        לא נשלח לכם ספאם, רק עדכון חד פעמי כשהאתר יהיה מוכן
      </p>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </form>
  );
});

NotifyForm.displayName = 'NotifyForm';
