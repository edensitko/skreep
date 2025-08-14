'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'מערכת צ\'אט בינה מלאכותית',
    description: 'מערכת צ\'אט חכמה המבוססת על בינה מלאכותית לעזרה בשירות לקוחות',
    image: '/assets/images/project-1.svg',
    category: 'בינה מלאכותית'
  },
  {
    id: 2,
    title: 'אפליקציית ניהול משימות',
    description: 'אפליקציה חכמה לניהול משימות ופרויקטים עם יכולות בינה מלאכותית',
    image: '/assets/images/project-2.svg',
    category: 'פיתוח תוכנה'
  },
  {
    id: 3,
    title: 'מערכת המלצות מותאמת אישית',
    description: 'מערכת המלצות חכמה המבוססת על אלגוריתמים מתקדמים של למידת מכונה',
    image: '/assets/images/project-3.svg',
    category: 'למידת מכונה'
  },
  {
    id: 4,
    title: 'פלטפורמת אנליטיקה עסקית',
    description: 'פלטפורמה לניתוח נתונים עסקיים והפקת תובנות בזמן אמת',
    image: '/assets/images/project-4.svg',
    category: 'אנליטיקה'
  },
];

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-black to-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" dir="rtl">
          <h1 className="text-4xl font-bold text-white mb-4">הפרויקטים שלנו</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            אנו מתמחים בפיתוח פתרונות בינה מלאכותית מתקדמים המותאמים לצרכים הייחודיים של העסק שלך
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir="rtl">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-black/30 rounded-3xl overflow-hidden border border-cyan/20 hover:border-cyan transition-all duration-300"
            >
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan/10 to-cyan/5 flex items-center justify-center text-4xl font-bold text-white">
                  {project.title.substring(0, 2)}
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-sm bg-cyan/10 text-cyan rounded-full mb-4">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <Link 
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-cyan hover:underline"
                >
                  קרא עוד
                  <svg className="w-4 h-4 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
