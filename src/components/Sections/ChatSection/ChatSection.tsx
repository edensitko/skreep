'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import { Message, ChatState, ChatMode } from './types';
import { TYPING_DELAY } from './constants';
import { ChatMessage as OpenAIChatMessage } from '@/lib/openai/chat';
import RippleGrid from '@/components/Hero/RippleGrid';
import { useUserType } from '@/hooks/useGlobalUserType';

const ChatSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { userType } = useUserType();
  const [mode, setMode] = useState<ChatMode>('input');
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isActive: false,
    isTyping: false,
    isLoading: false
  });

  const [conversationHistory, setConversationHistory] = useState<OpenAIChatMessage[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Intersection Observer for title animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => { if (titleRef.current) observer.unobserve(titleRef.current); };
  }, []);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.closest('.overflow-y-auto');
      if (container) container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (chatState.messages.length > 0 && mode === 'chat') setTimeout(scrollToBottom, 100);
  }, [chatState.messages, scrollToBottom, mode]);

  // Generate bot response using OpenAI API
  const generateBotResponse = useCallback(async (userMessage: string): Promise<string> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      if (!apiKey) {
        return language === 'he'
          ? 'מצטער, שירות הצ\'אט אינו זמין כרגע. אנא צור קשר ישירות.'
          : 'Sorry, chat service is currently unavailable. Please contact us directly.';
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: `You are Skreepy AI, the expert AI consultant for Skreep - advanced artificial intelligence solutions for businesses in Israel.
## Response Guidelines:
- **Language:** ALWAYS respond in the SAME language the user writes in (Hebrew or English)
- **Tone:** Professional, friendly, and helpful
- **Length:** Short and clean responses - up to 3-4 sentences`
            },
            ...conversationHistory,
            { role: 'user', content: userMessage }
          ],
          max_tokens: 1500,
          temperature: 0.7,
        })
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        const assistantMessage = data.choices[0].message.content;
        setConversationHistory(prev => [
          ...prev,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: assistantMessage }
        ]);
        return assistantMessage;
      } else {
        return language === 'he' ? 'מצטער, אירעה שגיאה. אנא נסה שוב.' : 'Sorry, an error occurred. Please try again.';
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      return language === 'he'
        ? 'מצטער, לא הצלחתי להתחבר לשרת. אנא בדוק את החיבור לאינטרנט ונסה שוב.'
        : 'Sorry, I couldn\'t connect to the server. Please check your internet connection and try again.';
    }
  }, [conversationHistory, language]);

  // Handle sending message
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || chatState.isLoading) return;

    const userMessageText = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      timestamp: new Date(),
      isUser: true
    };

    if (mode === 'input') {
      setMode('chat');
      setChatState(prev => ({ ...prev, isActive: true, messages: [userMessage], isLoading: true }));
    } else {
      setChatState(prev => ({ ...prev, messages: [...prev.messages, userMessage], isLoading: true }));
    }

    setInputValue('');
    setTimeout(() => setChatState(prev => ({ ...prev, isTyping: true })), TYPING_DELAY);

    try {
      const botResponseText = await generateBotResponse(userMessageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        timestamp: new Date(),
        isUser: false
      };
      setChatState(prev => ({ ...prev, messages: [...prev.messages, botMessage], isTyping: false, isLoading: false }));
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'מצטער, אירעה שגיאה. אנא נסה שוב.',
        timestamp: new Date(),
        isUser: false
      };
      setChatState(prev => ({ ...prev, messages: [...prev.messages, errorMessage], isTyping: false, isLoading: false }));
    }
  }, [inputValue, mode, generateBotResponse, chatState.isLoading]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  // Different colors based on user type
  const rippleColor = userType === 'entrepreneurs' ? '#22C55E' : '#00ffff';

  return (
    <section className="w-full bg-black relative min-h-[700px]">
      {/* RippleGrid Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <RippleGrid
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor={rippleColor}
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={40}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-[100%] px-6 lg:w-[85%] mx-auto py-20 lg:py-20">
        {/* Glass Card Container */}

        {/* Shadow from top to down */}
        <div className="absolute top-0 left-0 right-0 w-full h-20 bg-gradient-to-b from-black via-black/50 to-transparent z-10 pointer-events-none" />

        <div className=" backdrop-blur-xs  border border-white/10 rounded-2xl lg:rounded-3xl p-6 lg:p-10 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 rounded-2xl lg:rounded-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8">
              <h1
                ref={titleRef}
                className={`font-bold text-center bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight tracking-wide transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                {t('chat.title')}
              </h1>
              <p className="text-white/70 text-md lg:text-xl max-w-xl mx-auto leading-relaxed">
                {t('chat.subtitle')}
              </p>
            </div>

            {/* Chat Container */}
            <div className="max-w-4xl mx-auto">
              {/* Chat Messages Area */}
              {mode === 'chat' && (
                <div className="p-4 lg:p-6 max-h-80 lg:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder={t('chatSection.placeholder')}
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 lg:px-6 py-2 lg:py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-sm lg:text-base"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || chatState.isLoading}
                    className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-medium transition-all duration-300 text-sm lg:text-base flex items-center gap-2 ${inputValue.trim() && !chatState.isLoading
                      ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 hover:scale-105'
                      : 'bg-white/5 text-white/50 border border-white/10 cursor-not-allowed'
                      }`}
                  >
                    {t('chatSection.sendButton')}
                    <svg 
                      className="transition-all duration-300" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d={language === 'he' ? "M19 12H5M12 19L5 12L12 5" : "M5 12H19M12 5L19 12L12 19"}
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Helper Text */}
              {mode === 'input' && (
                <p className="text-center text-white/50 text-sm mt-4">{t('chat.helperText')}</p>
              )}

              {/* Suggestion Buttons */}
              {mode === 'input' && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {language === 'he' ? (
                    <>
                      <button onClick={() => setInputValue('אני רוצה אתר לעסק שלי')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        אני רוצה אתר לעסק שלי
                      </button>
                      <button onClick={() => setInputValue('איך אוכל לשלב AI בעסק שלי?')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        איך אוכל לשלב AI בעסק שלי?
                      </button>
                      <button onClick={() => setInputValue('מה זה MVP ?')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        מה זה MVP ?
                      </button>
                      <button onClick={() => setInputValue('כמה זמן לוקח לפתח אפליקציה?')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        כמה זמן לוקח לפתח אפליקציה?
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setInputValue('I want to develop a website for my business')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        I want to develop a website for my business
                      </button>
                      <button onClick={() => setInputValue('How can I integrate AI into my business?')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        How can I integrate AI into my business?
                      </button>
                      <button onClick={() => setInputValue('What is an MVP?')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        What is an MVP?
                      </button>
                      <button onClick={() => setInputValue('How long does it take to develop an app?')} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs">
                        How long does it take to develop an app?
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Image */}
              <div className="flex justify-center items-center py-6">
                {/* <Image
                  src="/assets/images/img/16.png"
                  alt="AI Chat Assistant"
                  width={200}
                  height={200}
                  className="w-[200px] lg:w-[400px] max-w-md mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;
