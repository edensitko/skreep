import React, { memo } from 'react';
import type { ChatContainerProps } from './types';
import { SECTION_CONTENT, VISUAL_EFFECTS, ANIMATION_CONFIG } from './constants';

/**
 * Memoized chat container component with messages and typing indicator
 */
const ChatContainer = memo<ChatContainerProps>(({ 
  isOpen, 
  messages, 
  isTyping, 
  onClose, 
  chatContainerRef 
}) => (
  <div 
    className={`overflow-hidden transition-all duration-700 ease-out ${
      isOpen ? 'max-h-[600px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'
    }`}
    style={{
      transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: 'top center'
    }}
  >
    <div className="border-t border-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 pt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
          <h4 className={`text-white text-lg md:text-xl font-bold bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} bg-clip-text text-transparent`}>
            {SECTION_CONTENT.chatTitle}
          </h4>
        </div>
        <button 
          className={`group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm md:text-base transition-all duration-300 hover:scale-105 px-3 py-2 rounded-xl hover:bg-white/5 ${VISUAL_EFFECTS.blur.light}`}
          onClick={onClose}
          aria-label={SECTION_CONTENT.closeText}
        >
          <span>{SECTION_CONTENT.closeText}</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div 
        ref={chatContainerRef} 
        className={`max-h-[350px] md:max-h-[400px] overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-black/60 via-black/40 to-black/20 rounded-3xl border border-white/10 ${VISUAL_EFFECTS.shadows.card} ${VISUAL_EFFECTS.blur.strong} space-y-4 scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-transparent`}
        role="log"
        aria-label="היסטוריית שיחה"
      >
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group`}
            style={{
              animation: isOpen ? 'messageSlideIn 0.6s ease-out forwards' : 'none',
              animationDelay: `${ANIMATION_CONFIG.messageDelay + (index * ANIMATION_CONFIG.staggerDelay)}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            {!message.isUser && (
              <div className="flex-shrink-0 w-8 h-8 mr-3 mt-1">
                <div className={`w-full h-full rounded-full bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} flex items-center justify-center text-white text-sm font-bold`}>
                  🤖
                </div>
              </div>
            )}
            <div 
              className={`max-w-[75%] p-4 md:p-5 rounded-3xl text-sm md:text-base font-medium transition-all duration-300 group-hover:scale-[1.02] ${
                message.isUser 
                  ? `bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} text-white ${VISUAL_EFFECTS.shadows.button} shadow-cyan-400/20` 
                  : `bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white border border-white/20 ${VISUAL_EFFECTS.blur.light} hover:border-white/30`
              }`}
              role={message.isUser ? 'user' : 'assistant'}
            >
              <div className="leading-relaxed">{message.text}</div>
              <div className="text-xs opacity-60 mt-2">
                {message.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {message.isUser && (
              <div className="flex-shrink-0 w-8 h-8 ml-3 mt-1">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-white text-sm font-bold">
                  👤
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div 
            className="flex justify-start group"
            style={{
              animation: isOpen ? 'messageSlideIn 0.6s ease-out forwards' : 'none',
              animationDelay: `${ANIMATION_CONFIG.messageDelay + (messages.length * ANIMATION_CONFIG.staggerDelay)}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            <div className="flex-shrink-0 w-8 h-8 mr-3 mt-1">
              <div className={`w-full h-full rounded-full bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} flex items-center justify-center text-white text-sm font-bold animate-pulse`}>
                🤖
              </div>
            </div>
            <div className={`bg-gradient-to-br from-white/10 via-white/5 to-transparent text-white border border-white/20 p-4 md:p-5 rounded-3xl text-sm md:text-base font-medium ${VISUAL_EFFECTS.blur.light}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-400 font-semibold">AI מקליד</span>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <div className="flex space-x-2" aria-label="AI מקליד">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
));

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
