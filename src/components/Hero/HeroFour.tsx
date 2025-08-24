'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';

export default function HeroFour() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    
    // Open chat if not already open
    if (!chatOpen) {
      setChatOpen(true);
    }
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      setMessages([...newMessages, { 
        text: "תודה על הפנייה! אני אשמח לעזור לך עם הרעיון שלך. האם תוכל/י לספר לי עוד פרטים?", 
        sender: 'ai' 
      }]);
    }, 1000);
  };

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <section id="banner" className="relative w-full bg-black/50">
        
        <div className="absolute top-0 z-0 left-32">
          <Image 
            src="/assets/images/logo-1.png" 
            alt="" 
            width={200}
            height={200}
          />
        </div>
        <div className="relative w-full hero-section-wrapper rounded-3xl overflow-hidden">
          
          <div className="relative z-10 mx-auto container px-4">
            <div className="flex justify-center p-5 rounded-3xl mt-10">
              <div>
                
                <h1 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-xl sm:text-xl text-center mb-7 md:mb-[60px] w-full max-w-[844px] mx-auto transition-all duration-1000 ease-out" dir="rtl">
                  <span>יועץ הבינה מלאכותית שלך</span>
                  <span className="text-cyan"> שוחחו על הרעיון שלכם עם עוזר הבינה המלאכותית כדי להתחיל.</span>
                </h1>
                <div className="flex justify-center mb-5 w-full">
                  <p className="text-white sm:text-lg font-medium text-center w-full max-w-[750px]" dir="rtl">
                    מציגים את תוכנת הבינה המלאכותית פורצת הדרך שלנו, שתוכננה לחולל מהפכה באופן שבו עסקים פועלים בעידן הדיגיטלי.
                    התוכנה שלנו משלבת אלגוריתמים מתקדמים ביותר
                  </p>
                </div>
                <div className="flex justify-center">
                 
                </div>
                <div
                  id="hero-banner"
                  ref={bannerRef}
                  className="hero-banner flex justify-center w-full min-h-[350px]"
                >
                  <div className="relative w-full max-w-[800px]">
                    <div className={`bg-black/80 p-8 rounded-3xl border border-cyan/20 shadow-lg transition-all duration-300 ${chatOpen ? 'h-[500px] flex flex-col' : ''}`}>
                      <h3 className="text-white text-2xl mb-4 text-center" dir="rtl">הזן את הפרומפט שלך לבינה מלאכותית</h3>
                      
                      {chatOpen && (
                        <div className="flex-1 overflow-y-auto mb-4 p-2 bg-black/30 rounded-2xl">
                          {messages.map((msg, index) => (
                            <div 
                              key={index} 
                              className={`mb-3 p-3 rounded-2xl max-w-[80%] ${
                                msg.sender === 'user' 
                                  ? 'bg-cyan/20 text-white mr-auto' 
                                  : 'bg-cyan text-black ml-auto'
                              }`}
                              dir="rtl"
                            >
                              {msg.text}
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                      
                      <form onSubmit={handleSubmit} className="flex">
                        <input 
                          type="text" 
                          className="w-full p-4 rounded-l-2xl bg-black/50 text-white border border-cyan/30 focus:outline-none focus:border-cyan"
                          placeholder="הקלד את הפרומפט שלך כאן..."
                          dir="rtl"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button 
                          type="submit" 
                          className="bg-cyan text-black px-6 py-4 rounded-r-2xl hover:bg-opacity-80 transition-all"
                        >
                          שלח
                        </button>
                      </form>
                      
                      {!chatOpen && (
                        <div className="mt-6 text-white/70 text-sm text-center" dir="rtl">
                          דוגמאות: &quot;כתוב תוכנית עסקית&quot;, &quot;צור תוכן לרשתות חברתיות&quot;, &quot;עזור לי עם קוד&quot;
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full pt-10 md:pt-32">
                  <h1 className="w-full font-medium text-center text-white" dir="rtl">
                    יותר מ-30+ לקוחות שעבדנו איתם
                  </h1>
                  <div className="mt-11 rounded-2xl overflow-hidden">
                    <Swiper
                      modules={[Autoplay]}
                      slidesPerView={3}
                      spaceBetween={30}
                      loop={true}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      breakpoints={{
                        640: {
                          slidesPerView: 4,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 5,
                          spaceBetween: 30,
                        },
                        1024: {
                          slidesPerView: 6,
                          spaceBetween: 30,
                        },
                      }}
                      className="partner-slider"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <SwiperSlide key={num}>
                          <div className="p-4 flex justify-center items-center">
                            <Image
                              src={`/assets/images/partner-${num}.svg`}
                              alt="partner logo"
                              width={120}
                              height={40}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-[137px] top-[260px]">
            <Image 
              src="/assets/images/hero-shape-3.svg" 
              alt="" 
              width={200}
              height={200}
            />
          </div>
        </div>
        
      </section>
    </>
  );
}
