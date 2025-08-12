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
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-black to-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto" dir="rtl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">צור קשר</h1>
            <p className="text-xl text-gray-300">
              יש לך שאלות? אנחנו כאן לעזור. מלא את הטופס ונחזור אליך בהקדם.
            </p>
          </div>

          <div className="bg-black/30 rounded-3xl p-8 border border-cyan/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">שם מלא</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-black/50 text-white border border-cyan/30 rounded-xl focus:outline-none focus:border-cyan"
                    placeholder="הכנס את שמך המלא"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">אימייל</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-black/50 text-white border border-cyan/30 rounded-xl focus:outline-none focus:border-cyan"
                    placeholder="הכנס את האימייל שלך"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-white mb-2">מספר טלפון</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-black/50 text-white border border-cyan/30 rounded-xl focus:outline-none focus:border-cyan"
                  placeholder="הכנס את מספר הטלפון שלך"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">הודעה</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 bg-black/50 text-white border border-cyan/30 rounded-xl focus:outline-none focus:border-cyan"
                  placeholder="כתוב את ההודעה שלך כאן..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-8 py-3 rounded-full font-semibold hover:bg-cyan-500 transition-all"
                >
                  שלח הודעה
                </button>
              </div>
            </form>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/20 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-white text-lg font-medium mb-2">טלפון</h3>
              <p className="text-gray-400">03-1234567</p>
            </div>

            <div className="bg-black/20 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-white text-lg font-medium mb-2">אימייל</h3>
              <p className="text-gray-400">info@qland.co.il</p>
            </div>

            <div className="bg-black/20 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="text-white text-lg font-medium mb-2">כתובת</h3>
              <p className="text-gray-400">רחוב הברזל 38, תל אביב</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
