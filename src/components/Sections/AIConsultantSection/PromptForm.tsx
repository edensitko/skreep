import React, { memo } from 'react';
import type { PromptFormProps } from './types';
import { SECTION_CONTENT, ANIMATION_CONFIG, VISUAL_EFFECTS } from './constants';

/**
 * Memoized prompt form component with examples and input
 */
const PromptForm = memo<PromptFormProps>(({ 
  prompt, 
  onPromptChange, 
  onSubmit, 
  onExampleClick, 
  examples 
}) => (
  <>
    {/* Example Prompts */}
    <div className="mb-8 md:mb-12">
      <h3 className="text-center text-white/80 text-sm md:text-base font-medium mb-4 md:mb-6">
        {SECTION_CONTENT.examplesTitle}
      </h3>
      <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
        {examples.map((example, index) => (
          <button
            key={example.id}
            onClick={() => onExampleClick(example.text)}
            className={`group relative bg-gradient-to-r ${VISUAL_EFFECTS.gradients.card} hover:from-cyan-400/20 hover:via-blue-500/20 hover:to-purple-600/20 border border-white/10 hover:border-cyan-400/40 text-white text-xs md:text-sm px-4 md:px-6 py-3 md:py-4 rounded-2xl transition-all duration-500 hover:scale-105 ${VISUAL_EFFECTS.shadows.button} hover:shadow-cyan-400/30 ${VISUAL_EFFECTS.blur.light}`}
            style={{
              animation: `slideInUp ${ANIMATION_CONFIG.slideInDuration}s ease-out forwards`,
              animationDelay: `${index * ANIMATION_CONFIG.staggerDelay}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
            aria-label={`דוגמה: ${example.text}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                {example.icon}
              </span>
              <span className="font-medium">{example.text}</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>
    </div>

    {/* Input Form */}
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder={SECTION_CONTENT.placeholder}
            className={`w-full h-24 md:h-28 p-6 md:p-8 pr-20 md:pr-24 bg-gradient-to-br from-black/60 via-black/40 to-black/20 ${VISUAL_EFFECTS.blur.strong} border border-white/20 focus:border-cyan-400/60 rounded-3xl text-white placeholder-white/60 resize-none focus:outline-none focus:bg-gradient-to-br focus:from-black/70 focus:via-black/50 focus:to-black/30 transition-all duration-500 text-sm md:text-base leading-relaxed ${VISUAL_EFFECTS.shadows.card}`}
            dir="rtl"
            rows={3}
            aria-label={SECTION_CONTENT.placeholder}
          />
          <button
            type="submit"
            disabled={!prompt.trim()}
            className={`absolute left-4 md:left-6 bottom-4 md:bottom-6 bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold transition-all duration-300 text-sm md:text-base hover:scale-105 disabled:hover:scale-100 ${VISUAL_EFFECTS.shadows.button} hover:shadow-cyan-400/40 disabled:shadow-none`}
            aria-label={SECTION_CONTENT.submitText}
          >
            <div className="flex items-center gap-2">
              <span>{SECTION_CONTENT.submitText}</span>
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </form>
    
    <style dangerouslySetInnerHTML={{
      __html: `
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `
    }} />
  </>
));

PromptForm.displayName = 'PromptForm';

export default PromptForm;
