'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    alert('הטופס נשלח בהצלחה!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <main className="flex min-h-screen flex-col pt-24 pb-16">
      <section 
        className="w-[95%] mt-8 lg:mt-20 mx-auto bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-2xl lg:rounded-4xl before:absolute before:inset-0 before:rounded-2xl lg:before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-2xl lg:after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out"
        role="region"
        aria-label="צור קשר"
      >
        <div className="mx-auto theme-container container px-4 py-6 lg:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16" dir="rtl">
            <h1 className="font-bold mb-6 lg:mb-10 bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-4xl xl:text-5xl leading-tight tracking-wide transition-all duration-1000 ease-out opacity-100 translate-y-0">
              צור קשר
            </h1>
            <p className="text-white/90 mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-center max-w-3xl mx-auto">
              יש לך שאלות? אנחנו כאן לעזור. מלא את הטופס ונחזור אליך בהקדם.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            {/* Contact Form - Takes 2 columns */}
            <div className="lg:col-span-2 z-10">
              <div className="mx-auto max-w-full">
                <div className="mb-8 lg:mb-12">
                  <h2 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 leading-tight tracking-wide text-center md:text-right" dir="rtl">
                    שלח לנו הודעה
                  </h2>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-right" dir="rtl">
                    נשמח לשמוע ממך ולעזור בכל שאלה או בקשה
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir="rtl">שם מלא</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 text-sm md:text-base"
                        placeholder="הכנס את שמך המלא"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir="rtl">אימייל</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 text-sm md:text-base"
                        placeholder="הכנס את האימייל שלך"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir="rtl">מספר טלפון</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 text-sm md:text-base"
                      placeholder="הכנס את מספר הטלפון שלך"
                      dir="rtl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir="rtl">הודעה</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 resize-none text-sm md:text-base"
                      placeholder="כתוב את ההודעה שלך כאן..."
                      dir="rtl"
                    ></textarea>
                  </div>

                  <div className="flex w-full justify-start pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
                      dir="rtl"
                      aria-label="שלח הודעה"
                    >
                      שלח הודעה
                    </button>
                  </div>
                </form>
              </div>
            
            {/* Contact Information Sidebar - Takes 1 column */}
            <div className="lg:col-span-1 z-10 mt-8 lg:mt-0">
              <div className="mx-auto max-w-full">
                <div className="mb-8 lg:mb-12">
                  <h2 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 leading-tight tracking-wide text-center md:text-right" dir="rtl">
                    פרטי התקשרות
                  </h2>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-right" dir="rtl">
                    דרכים נוספות ליצירת קשר
                  </p>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300" dir="rtl">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">טלפון</h3>
                      <p className="text-white/70 text-sm md:text-base">-</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300" dir="rtl">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">אימייל</h3>
                      <p className="text-white/70 text-sm md:text-base">info@skreep.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300" dir="rtl">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">כתובת</h3>
                      <p className="text-white/70 text-sm md:text-base">תל אביב, ישראל</p>
                    </div>
                  </div>

                  {/* Response Time */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
