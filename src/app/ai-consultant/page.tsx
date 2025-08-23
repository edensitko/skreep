'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageSEO from '@/components/SEO/PageSEO';
import LocalSEO from '@/components/SEO/LocalSEO';
import SEOMeta from '@/components/SEO/SEOMeta';

export default function AIConsultantPage() {
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  // Ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      text: language === 'he' 
        ? 'שלום! אני היועץ הדיגיטלי של סקריפ. איך אני יכול לעזור לך היום בנושאי בינה מלאכותית ופתרונות טכנולוגיים?'
        : 'Hello! I\'m Skreep\'s AI consultant. How can I help you today with AI and technology solutions?',
      isUser: false
    };
    setMessages([welcomeMessage]);
  }, [language]);

  // Generate bot response using OpenAI API
  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessQuery: userMessage,
          language: language
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', data);
        return data.error || (language === 'he' ? 'מצטער, אירעה שגיאה. אנא נסה שוב.' : 'Sorry, an error occurred. Please try again.');
      }
      
      if (data.message) {
        return data.message;
      } else {
        return data.error || (language === 'he' ? 'מצטער, אירעה שגיאה. אנא נסה שוב.' : 'Sorry, an error occurred. Please try again.');
      }
    } catch (error) {
      console.error('AI Consultation API Error:', error);
      return language === 'he' 
        ? 'מצטער, לא הצלחתי להתחבר לשרת. אנא בדוק את החיבור לאינטרנט ונסה שוב.'
        : 'Sorry, I couldn\'t connect to the server. Please check your internet connection and try again.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const currentInput = inputMessage.trim();
    const userMessageId = Date.now();
    
    const userMessage = {
      id: userMessageId,
      text: currentInput,
      isUser: true
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Get AI response from OpenAI API
    try {
      const botResponseText = await generateBotResponse(currentInput);
      
      const aiResponse = {
        id: Date.now() + Math.random(), // Ensure unique ID
        text: botResponseText,
        isUser: false
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: Date.now() + Math.random(),
        text: language === 'he' ? 'מצטער, אירעה שגיאה. אנא נסה שוב.' : 'Sorry, an error occurred. Please try again.',
        isUser: false
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // FAQ data for SEO
  const faqData = React.useMemo(() => [
    {
      question: language === 'he' ? "איך עובד היועץ הדיגיטלי של סקריפ?" : "How does Skreep's AI consultant work?",
      answer: language === 'he' ? "היועץ הדיגיטלי שלנו משתמש בטכנולוגיית בינה מלאכותית מתקדמת כדי לספק ייעוץ מותאם אישית בנושאי AI ופתרונות טכנולוגיים" : "Our AI consultant uses advanced artificial intelligence technology to provide personalized advice on AI and technology solutions"
    },
    {
      question: language === 'he' ? "האם השירות זמין 24/7?" : "Is the service available 24/7?",
      answer: language === 'he' ? "כן, היועץ הדיגיטלי זמין 24 שעות ביממה, 7 ימים בשבוע לענות על השאלות שלכם" : "Yes, the AI consultant is available 24 hours a day, 7 days a week to answer your questions"
    }
  ], [language]);

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Components */}
      <SEOMeta 
        title={language === 'he' ? "יועץ AI דיגיטלי - צ'אטבוט חכם | Skreep" : "AI Digital Consultant - Smart Chatbot | Skreep"}
        description={language === 'he' ? "שוחח עם היועץ הדיגיטלי החכם של סקריפ. קבל ייעוץ מקצועי בנושאי בינה מלאכותית ופתרונות טכנולוגיים 24/7" : "Chat with Skreep's smart AI consultant. Get professional advice on artificial intelligence and technology solutions 24/7"}
        keywords={language === 'he' ? ["יועץ AI", "צ'אטבוט", "בינה מלאכותית", "ייעוץ טכנולוגי", "סקריפ"] : ["AI consultant", "chatbot", "artificial intelligence", "technology consulting", "skreep"]}
        image="/assets/images/ai-consultant-og.jpg"
        canonical="https://skreep.com/ai-consultant"
      />
      
      <PageSEO 
        pageType="services"
        title={language === 'he' ? "יועץ AI דיגיטלי - צ'אטבוט חכם" : "AI Digital Consultant - Smart Chatbot"}
        description={language === 'he' ? "יועץ דיגיטלי חכם לייעוץ בנושאי AI" : "Smart digital consultant for AI advice"}
        faqs={faqData}
      />
      
      <LocalSEO showMap={false} />

      <Header />
      
      {/* Main AI Consultant Section */}
      <section className="pt-32 lg:pt-40 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 
              ref={titleRef}
              className={`font-bold mb-6 bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide text-center transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {language === 'he' ? 'יועץ AI דיגיטלי' : 'AI Digital Consultant'}
            </h1>
            <p 
              className={`text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              {language === 'he' 
                ? 'שוחח עם היועץ הדיגיטלי החכם שלנו וקבל ייעוץ מקצועי בנושאי בינה מלאכותית ופתרונות טכנולוגיים'
                : 'Chat with our smart AI consultant and get professional advice on artificial intelligence and technology solutions'
              }
            </p>
          </div>

          {/* Chat Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {/* Chat Container */}
            <div className="order-1 lg:order-1">
              <div className="">
                
                {/* Chat Messages */}
                <div className="h-80 md:h-96 lg:h-[500px] overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[280px] md:max-w-md lg:max-w-lg px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-cyan-400/20 text-white ml-2 md:ml-4'
                          : 'bg-white/10 text-white/90 mr-2 md:mr-4'
                      }`}
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                      <p className="text-sm md:text-base leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 text-white/90 px-3 md:px-4 py-2 md:py-3 rounded-2xl mr-2 md:mr-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="border-t border-white/20 p-2 md:p-6">
                  <div className="flex gap-1 md:gap-4">
                  {isMounted ? (
                    <textarea
                      key="chat-input"
                      value={inputMessage}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log('Input changed:', newValue);
                        setInputMessage(newValue);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder={language === 'he' ? 'כתוב את השאלה שלך כאן...' : 'Type your question here...'}
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 resize-none text-sm md:text-base"
                      rows={2}
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                      autoComplete="off"
                    />
                  ) : (
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white/50 h-[60px] md:h-[68px] flex items-center text-sm md:text-base">
                      Loading...
                    </div>
                  )}
                  <button
                    onClick={() => {
                      console.log('Button clicked, input:', inputMessage);
                      handleSendMessage();
                    }}
                    disabled={!inputMessage.trim() || isLoading || !isMounted}
                    className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60  text-white text-xs border border-white/20 px-2 md:px-4 py-2 rounded-xl  transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed md:text-sm"
                    type="button"
                  >
                    {language === 'he' ? 'שלח' : 'Send'}
                  </button>
                  </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-purple-400/5 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>

            {/* AI Consultant Image */}
       
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent text-center">
            {language === 'he' ? 'מה היועץ יכול לעזור לך' : 'How Our AI Consultant Can Help'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🤖",
                title: language === 'he' ? "ייעוץ AI" : "AI Consulting",
                description: language === 'he' ? "קבל ייעוץ מקצועי על פתרונות בינה מלאכותית המתאימים לעסק שלך" : "Get professional advice on AI solutions suitable for your business"
              },
              {
                icon: "💡",
                title: language === 'he' ? "רעיונות חדשניים" : "Innovative Ideas",
                description: language === 'he' ? "גלה רעיונות חדשניים לשיפור התהליכים העסקיים שלך באמצעות טכנולוגיה" : "Discover innovative ideas to improve your business processes through technology"
              },
              {
                icon: "🔧",
                title: language === 'he' ? "פתרונות טכניים" : "Technical Solutions",
                description: language === 'he' ? "קבל המלצות על כלים וטכנולוגיות שיעזרו לך להשיג את המטרות שלך" : "Get recommendations on tools and technologies to help you achieve your goals"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 
                  className="text-lg md:text-xl font-bold mb-3 bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent"
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-white/80 leading-relaxed text-sm"
                  dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
