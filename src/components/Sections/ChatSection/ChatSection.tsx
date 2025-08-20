'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { Message, ChatState, ChatMode } from './types';
import { TYPING_DELAY, RESPONSE_DELAY } from './constants';

const ChatSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [mode, setMode] = useState<ChatMode>('input');
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isActive: false,
    isTyping: false,
    isLoading: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive (only within messages container)
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      const messagesContainer = messagesEndRef.current.closest('.overflow-y-auto');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    if (chatState.messages.length > 0 && mode === 'chat') {
      // Small delay to ensure DOM is updated
      setTimeout(scrollToBottom, 100);
    }
  }, [chatState.messages, scrollToBottom, mode]);

  // Generate bot response
  const generateBotResponse = useCallback((): string => {
    const botResponses = t('chat.botResponses');
    if (Array.isArray(botResponses)) {
      return botResponses[Math.floor(Math.random() * botResponses.length)];
    }
    return t('chat.botResponses');
  }, [t]);

  // Handle sending message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      timestamp: new Date(),
      isUser: true
    };

    // If this is the first message, switch to chat mode
    if (mode === 'input') {
      setMode('chat');
      setChatState(prev => ({
        ...prev,
        isActive: true,
        messages: [userMessage]
      }));
    } else {
      // Add user message to existing chat
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage]
      }));
    }

    setInputValue('');

    // Show typing indicator after delay
    setTimeout(() => {
      setChatState(prev => ({ ...prev, isTyping: true }));
    }, TYPING_DELAY);

    // Add bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(),
        timestamp: new Date(),
        isUser: false
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false
      }));
    }, RESPONSE_DELAY);
  }, [inputValue, mode, generateBotResponse]);

  // Handle input key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <section className="w-full bg-black ">
      <div className="relative pt-16 rounded-t-[100px] lg:py-20 bg-white/5 shadow-b-xl shadow-white/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-600/5" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      
      <div className=" z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 relative items-center">
        {/* Header */}
        <div className="text-center mb-4 lg:mb-6 ">
          <h1 className="font-bold text-center bg-gradient-to-br from-white via-white-60 to-white/20 bg-clip-text text-transparent text-2xl md:text-4xl lg:text-5xl mb-6 leading-tight tracking-wide transition-all duration-1000 ease-out mx-auto" >
            {t('chat.title')}
          </h1>
          <p className="text-white/70 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed" >
            {t('chat.subtitle')}
          </p>
          <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 text-white/60">
          </div>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            
            {/* Chat Messages Area - Only visible in chat mode */}
            {mode === 'chat' && (
              <div className="p-6 lg:p-8 max-h-80 lg:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {chatState.messages.map((message) => (
                  <ChatMessage key={message.id} message={message} language={language} />
                ))}
                {chatState.isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area */}
            <div className={`p-4 lg:p-6 ${mode === 'chat' ? 'border-t border-white/10' : ''}`}>
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t('chatSection.placeholder')}
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 lg:px-6 py-2 lg:py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 text-sm lg:text-base"
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || chatState.isLoading}
                  className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 text-sm lg:text-base ${
                    inputValue.trim() && !chatState.isLoading
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 hover:scale-105'
                      : 'bg-white/10 text-white/50 border border-white/20 cursor-not-allowed'
                  }`}
                >
                  <span dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {t('chatSection.sendButton')}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Helper Text - Only visible in input mode */}
          {mode === 'input' && (
            <p className="text-center text-white/50 text-sm mt-4 animate-fadeIn" dir={language === 'he' ? 'rtl' : 'ltr'}>
              {t('chat.helperText')}
            </p>
          )}

          {/* Image under chat */}
          <div className="flex justify-center items-center ">
            <Image
              src="/assets/images/img/15.png"
              alt="AI Chat Assistant"
              width={800}
              height={800}
              className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              priority={false}
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ChatSection;
