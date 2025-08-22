'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 3,
    slug: 'whatsapp-chatbot-ai',
    title: 'צ\'אטבוט AI לוואטסאפ',
    subtitle: '24/7 שירות לקוחות אוטומטי',
    description: 'צ\'אטבוט חכם המשולב בוואטסאפ עם בינה מלאכותית מתקדמת לטיפול בפניות לקוחות.',
    image: '/assets/images/servicesimg/1.png',
    gradient: 'from-blue-400/20 to-purple-500/20',
    accentColor: 'blue-400',
    category: 'בינה מלאכותית'
  },
  {
    id: 1,
    slug: 'e-commerce-platform',
    title: 'פלטפורמת E-commerce',
    subtitle: '50,000+ מוצרים',
    description: 'פלטפורמת מסחר מלאה עם תשלומים מאובטחים, ניהול מלאי חכם ומערכת המלצות AI.',
    image: '/assets/images/servicesimg/2.png',
    gradient: 'from-cyan-400/20 to-blue-500/20',
    accentColor: 'cyan-400',
    category: 'מסחר אלקטרוני'
  },
  {
    id: 2,
    slug: 'healthcare-application',
    title: 'אפליקציית בריאות',
    subtitle: '10,000+ משתמשים פעילים',
    description: 'אפליקציה לבריאות דיגיטלית עם וידאו קונפרנס מאובטח ומערכת תורים חכמה.',
    image: '/assets/images/servicesimg/3.png',
    gradient: 'from-purple-400/20 to-pink-500/20',
    accentColor: 'purple-400',
    category: 'בריאות דיגיטלית'
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-16">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20" dir="rtl">
          <h1 className="font-bold bg-gradient-to-br from-white via-white/60 to-white/20 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            הפרויקטים שלנו
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-4xl mx-auto">
            פתרונות דיגיטליים מתקדמים שיצרנו עבור לקוחותינו
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block"
            >
              <div className={`bg-gradient-to-br ${project.gradient} border border-white/10 rounded-2xl p-6 lg:p-8 relative h-[500px] hover:border-white/20 transition-all duration-300 cursor-pointer`}>
                {/* Glass morphism effect */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  {/* Image */}
                  <div className="flex justify-center mb-6">
                    <div className="w-full h-48 rounded-lg overflow-hidden">
                      <Image 
                        src={project.image}
                        alt={`${project.title} project showcase`}
                        width={400}
                        height={200}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4" dir="rtl">
                    {/* Category */}
                    <span className={`inline-block px-3 py-1 text-sm bg-${project.accentColor}/20 text-${project.accentColor} rounded-full font-medium`}>
                      {project.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-white font-bold text-xl lg:text-2xl leading-tight">
                      {project.title}
                    </h2>

                    {/* Subtitle */}
                    <h3 className="text-white/80 font-semibold text-base">
                      {project.subtitle}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* View Details Button */}
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-l from-${project.accentColor}/10 via-${project.accentColor}/30 to-${project.accentColor}/60 text-white border border-white/20 px-4 py-2 rounded-full font-semibold text-sm group-hover:bg-${project.accentColor}/20 transition-all duration-300 mt-auto`}>
                      צפה בפרטים
                      <svg 
                        className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20" dir="rtl">
          <div className="bg-gradient-to-br from-blue-400/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              מעוניינים בפרויקט דומה?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              צרו איתנו קשר ונגשים את החזון שלכם למציאות דיגיטלית
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-l from-blue-400/10 via-blue-400/30 to-blue-400/60 text-white border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-blue-400/20 transition-all duration-300"
            >
              צרו קשר
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
