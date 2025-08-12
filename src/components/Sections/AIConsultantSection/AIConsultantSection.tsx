'use client';

import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import ChatContainer from './ChatContainer';
import PromptForm from './PromptForm';
import FloatingParticles from './FloatingParticles';
import { EXAMPLE_PROMPTS, SECTION_CONTENT, GRID_STYLES, VISUAL_EFFECTS, ANIMATION_CONFIG } from './constants';
import { createUserMessage, createAIMessage, scrollToBottom } from './utils';
import type { ChatMessage } from './types';

/**
 * AI Consultant section with interactive chat functionality
 * Features real-time messaging simulation and example prompts
 */
function AIConsultantSection() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [prompt, setPrompt] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageCounter, setMessageCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const currentCounter = messageCounter;
    const userMessage = createUserMessage(prompt, currentCounter);

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsChatOpen(true);
    setIsTyping(true);
    setMessageCounter(prev => prev + 1);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = createAIMessage(userMessage.text, currentCounter + 1);
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      setMessageCounter(prev => prev + 1);
    }, SECTION_CONTENT.typingDelay);
  }, [prompt, messageCounter]);

  const handleExampleClick = useCallback((exampleText: string) => {
    setPrompt(exampleText);
  }, []);

  const closeChatView = useCallback(() => {
    setIsChatOpen(false);
    setMessages([]);
    setMessageCounter(0);
  }, []);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollToBottom(chatContainerRef);
  }, [messages]);

  // Intersection observer for title animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentTitleRef = titleRef.current;
    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes messageSlideIn {
            0% {
              transform: translateY(30px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes titleGlow {
            0%, 100% {
              text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
            }
            50% {
              text-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(147, 51, 234, 0.6);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
            }
            50% {
              box-shadow: 0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(147, 51, 234, 0.4);
            }
          }
        `
      }} />
      
      <section 
        className={`relative w-full bg-gradient-to-br ${VISUAL_EFFECTS.gradients.background} overflow-hidden transition-all duration-700 ease-out`}
        dir="rtl"
        role="region"
        aria-label="יועץ AI חכם"
      >
        {/* Background Elements */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Enhanced Grid Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full" style={GRID_STYLES} />
          </div>
          
          {/* Floating Particles */}
          <FloatingParticles />

          {/* Enhanced Decorative shapes */}
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse" style={{animation: 'float 6s ease-in-out infinite'}}></div>
          <div className="absolute top-3/4 left-1/3 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-40 animate-pulse" style={{animation: 'float 8s ease-in-out infinite', animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 animate-pulse" style={{animation: 'float 7s ease-in-out infinite', animationDelay: '4s'}}></div>
          <div className="absolute top-1/6 left-1/4 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse" style={{animation: 'float 5s ease-in-out infinite', animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/6 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-50 animate-pulse" style={{animation: 'float 9s ease-in-out infinite', animationDelay: '3s'}}></div>
          
          {/* Ambient light effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                {/* Enhanced Title */}
                <div className="relative mb-6 md:mb-8">
                  <h1 
                    ref={titleRef}
                    className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} bg-clip-text text-transparent transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      animation: isVisible ? 'titleGlow 3s ease-in-out infinite' : 'none'
                    }}
                  >
                    {SECTION_CONTENT.title}
                  </h1>
                  <div className={`absolute -inset-4 bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} opacity-20 blur-2xl rounded-full transition-opacity duration-1000 ${
                    isVisible ? 'opacity-20' : 'opacity-0'
                  }`} />
                </div>
                
                {/* Enhanced Subtitle */}
                <div className="relative">
                  <p 
                    className={`text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    {SECTION_CONTENT.subtitle}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className={`w-24 h-1 bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} rounded-full transition-all duration-1000 delay-500 ${
                      isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`} />
                  </div>
                </div>
              </div>

              {/* Enhanced Interactive Section */}
              <div className="relative group">
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} rounded-4xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} style={{animation: 'pulse-glow 4s ease-in-out infinite'}} />
                
                <div className={`relative bg-gradient-to-br ${VISUAL_EFFECTS.gradients.card} ${VISUAL_EFFECTS.blur.backdrop} border border-white/20 hover:border-white/30 rounded-4xl p-8 md:p-10 lg:p-14 ${VISUAL_EFFECTS.shadows.card} transition-all duration-500 hover:scale-[1.02]`}>
                  <PromptForm
                    prompt={prompt}
                    onPromptChange={setPrompt}
                    onSubmit={handleSubmit}
                    onExampleClick={handleExampleClick}
                    examples={EXAMPLE_PROMPTS}
                  />

                  <ChatContainer
                    isOpen={isChatOpen}
                    messages={messages}
                    isTyping={isTyping}
                    onClose={closeChatView}
                    chatContainerRef={chatContainerRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom blur effect */}
        <div className={`absolute bottom-0 left-0 w-full h-[100px] md:h-[120px] bg-gradient-to-t from-black via-black/80 to-transparent ${VISUAL_EFFECTS.blur.backdrop} z-50`} aria-hidden="true">
          <div className={`absolute bottom-0 left-0 w-full h-[50px] bg-gradient-to-r ${VISUAL_EFFECTS.gradients.primary} opacity-10 blur-2xl`} />
        </div>
      </section>
    </>
  );
}

export default memo(AIConsultantSection);
