'use client';

import React, { useState } from 'react';
import Header from '@/components/Layout/Header/Header';
import Footer from '@/components/Layout/Footer/Footer';
import PageHero from '@/components/Layout/PageHero';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { language } = useLanguage();
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
    alert(language === 'he' ? 'הטופס נשלח בהצלחה!' : 'Form submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section with RippleGrid */}
      <PageHero 
        title={language === 'he' ? 'צור קשר' : 'Contact Us'}
        subtitle={language === 'he' 
          ? 'יש לך שאלות? אנחנו כאן לעזור. מלא את הטופס ונחזור אליך בהקדם.'
          : 'Have questions? We\'re here to help. Fill out the form and we\'ll get back to you soon.'
        }
        language={language as 'he' | 'en'}
      />

      {/* Contact Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-black/40 via-black/20 to-black/10 backdrop-blur-xl border border-white/20 rounded-3xl relative overflow-hidden p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"></div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start relative z-10">
              {/* Contact Form - Takes 2 columns */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl mb-4 leading-tight tracking-wide text-center md:text-right" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {language === 'he' ? 'שלח לנו הודעה' : 'Send us a message'}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-right" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {language === 'he' ? 'נשמח לשמוע ממך ולעזור בכל שאלה או בקשה' : 'We\'d love to hear from you and help with any question or request'}
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir={language === 'he' ? 'rtl' : 'ltr'}>{language === 'he' ? 'שם מלא' : 'Full Name'}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 text-sm md:text-base"
                        placeholder={language === 'he' ? 'הכנס את שמך המלא' : 'Enter your full name'}
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir={language === 'he' ? 'rtl' : 'ltr'}>{language === 'he' ? 'אימייל' : 'Email'}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 text-sm md:text-base"
                        placeholder={language === 'he' ? 'הכנס את האימייל שלך' : 'Enter your email'}
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir={language === 'he' ? 'rtl' : 'ltr'}>{language === 'he' ? 'מספר טלפון' : 'Phone Number'}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 text-sm md:text-base"
                      placeholder={language === 'he' ? 'הכנס את מספר הטלפון שלך' : 'Enter your phone number'}
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-white/90 text-sm md:text-base font-medium mb-2" dir={language === 'he' ? 'rtl' : 'ltr'}>{language === 'he' ? 'הודעה' : 'Message'}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-3 md:p-4 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-300 backdrop-blur-sm placeholder-white/40 resize-none text-sm md:text-base"
                      placeholder={language === 'he' ? 'כתוב את ההודעה שלך כאן...' : 'Write your message here...'}
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                    ></textarea>
                  </div>

                  <div className="flex w-full justify-start pt-4">
                    <button
                      type="submit"
                      className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 text-sm md:text-base"
                      dir={language === 'he' ? 'rtl' : 'ltr'}
                      aria-label={language === 'he' ? 'שלח הודעה' : 'Send message'}
                    >
                      {language === 'he' ? 'שלח הודעה' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            
              {/* Contact Information Sidebar - Takes 1 column */}
              <div className="lg:col-span-1">
                <div className="mb-8">
                  <h2 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/40 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl mb-4 leading-tight tracking-wide text-center md:text-right" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {language === 'he' ? 'פרטי התקשרות' : 'Contact Details'}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-right" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    {language === 'he' ? 'דרכים נוספות ליצירת קשר' : 'Other ways to reach us'}
                  </p>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  {/* Phone */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">{language === 'he' ? 'טלפון' : 'Phone'}</h3>
                      <p className="text-white/70 text-sm md:text-base">-</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">{language === 'he' ? 'אימייל' : 'Email'}</h3>
                      <p className="text-white/70 text-sm md:text-base">info@skreep.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/10 hover:border-cyan-400/30 transition-all duration-300" dir={language === 'he' ? 'rtl' : 'ltr'}>
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">{language === 'he' ? 'כתובת' : 'Address'}</h3>
                      <p className="text-white/70 text-sm md:text-base">{language === 'he' ? 'תל אביב, ישראל' : 'Tel Aviv, Israel'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
