'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import PageSEO from '@/components/SEO/PageSEO';
import { Message, ChatState } from '@/components/Sections/ChatSection/types';
import { ChatMessage as OpenAIChatMessage } from '@/lib/openai/chat';

interface PhoneChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const AIConsultantPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<PhoneChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<OpenAIChatMessage[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, scrollToBottom]);

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
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    const userMessage: PhoneChatMessage = {
      id: Date.now().toString(),
      text: userMessageText,
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    setTimeout(() => setIsTyping(true), 500);

    try {
      const botResponseText = await generateBotResponse(userMessageText);
      const botMessage: PhoneChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        timestamp: new Date(),
        isUser: false
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: PhoneChatMessage = {
        id: (Date.now() + 1).toString(),
        text: language === 'he' ? 'מצטער, אירעה שגיאה. אנא נסה שוב.' : 'Sorry, an error occurred. Please try again.',
        timestamp: new Date(),
        isUser: false
      };
      setIsTyping(false);
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  }, [inputValue, isLoading, generateBotResponse, language]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <PageSEO
        title={language === 'he' ? 'יועץ AI | Skreep' : 'AI Consultant | Skreep'}
        description={language === 'he' 
          ? 'שוחח עם יועץ הבינה המלאכותית שלנו וקבל ייעוץ מקצועי לעסק שלך'
          : 'Chat with our AI consultant and get professional advice for your business'
        }
        pageType="ai-consultant"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 mt-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
              {language === 'he' ? 'יועץ AI' : 'AI Consultant'}
            </h1>
            <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
              {language === 'he' 
                ? 'שוחח עם יועץ הבינה המלאכותית המתקדם שלנו וקבל ייעוץ מקצועי מותאם אישית לפיתוח העסק שלך'
                : 'Chat with our advanced AI consultant and get personalized professional advice for developing your business'
              }
            </p>
          </div>

          <div className="flex justify-center items-center">
            {/* Phone Container */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[380px] h-[720px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-2 border-gray-600">
                {/* Phone Screen */}
                <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative flex flex-col">
                  {/* Status Bar */}
                  <div className="bg-gray-900 px-6 py-3 flex justify-center items-center text-white text-sm">
                    <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {language === 'he' ? 'יועץ AI' : 'AI Consultant'}
                    </span>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-950">
                    {messages.length === 0 && (
                      <div className="text-center py-8">
                        <h3 className="text-white font-semibold text-lg mb-4">
                          {language === 'he' ? 'ברוכים הבאים!' : 'Welcome!'}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                          {language === 'he' 
                            ? 'שלח הודעה כדי להתחיל שיחה עם יועץ הבינה המלאכותית שלנו'
                            : 'Send a message to start chatting with our AI consultant'
                          }
                        </p>
                        
                        {/* Quick Questions inside chat */}
                        <div className="space-y-2">
                          <p className="text-white/50 text-xs mb-3">
                            {language === 'he' ? 'שאלות מהירות:' : 'Quick questions:'}
                          </p>
                          {language === 'he' ? (
                            <>
                              <button 
                                onClick={() => setInputValue('אני רוצה אתר לעסק שלי')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs mb-2"
                              >
                                אני רוצה אתר לעסק שלי
                              </button>
                              <button 
                                onClick={() => setInputValue('איך אוכל לשלב AI בעסק שלי?')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs mb-2"
                              >
                                איך אוכל לשלב AI בעסק שלי?
                              </button>
                              <button 
                                onClick={() => setInputValue('מה זה MVP?')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs mb-2"
                              >
                                מה זה MVP?
                              </button>
                              <button 
                                onClick={() => setInputValue('כמה זמן לוקח לפתח אפליקציה?')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs"
                              >
                                כמה זמן לוקח לפתח אפליקציה?
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                onClick={() => setInputValue('I want a website for my business')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs mb-2"
                              >
                                I want a website for my business
                              </button>
                              <button 
                                onClick={() => setInputValue('How can I integrate AI into my business?')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs mb-2"
                              >
                                How can I integrate AI into my business?
                              </button>
                              <button 
                                onClick={() => setInputValue('What is an MVP?')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs mb-2"
                              >
                                What is an MVP?
                              </button>
                              <button 
                                onClick={() => setInputValue('How long does it take to develop an app?')} 
                                className="block w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs"
                              >
                                How long does it take to develop an app?
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            message.isUser
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-md'
                              : 'bg-gray-800 text-white rounded-bl-md'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.isUser ? 'text-white/80' : 'text-gray-400'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 rounded-2xl rounded-bl-md px-5 py-4">
                          <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area - Fixed at bottom */}
                  <div className="bg-gray-900 p-6 border-t border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-4">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder={language === 'he' ? 'כתוב הודעה...' : 'Type a message...'}
                        className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 text-sm"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                          inputValue.trim() && !isLoading
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={language === 'he' ? "M19 12H5M12 19L5 12L12 5" : "M5 12H19M12 5L19 12L12 19"}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIConsultantPage;