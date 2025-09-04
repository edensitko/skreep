'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import AppButton from './AppButton';
import PhoneDevice from './PhoneDevice';
import { MOBILE_APPS, PHONE_DEVICES, SECTION_CONTENT } from './constants';

/**
 * Mobile Apps section showcasing app development capabilities
 * Features interactive phone mockups and app examples
 */
function MobileAppsSection() {
  return (
    <section 
      className="relative w-full py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-600" 
      dir="rtl"
      role="region"
      aria-label="אפליקציות מובייל"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.3),transparent)]" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
          
          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2 text-right">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl mb-8">
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="#3B82F6" strokeWidth="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {SECTION_CONTENT.title}
            </h2>

            {/* Description */}
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {SECTION_CONTENT.description}
            </p>

            {/* Examples Label */}
            <h3 className="text-xl font-semibold text-white mb-6">
              {SECTION_CONTENT.examplesLabel}
            </h3>

            {/* Example Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              {MOBILE_APPS.map((app) => (
                <AppButton 
                  key={app.id} 
                  app={app} 
                />
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              href={SECTION_CONTENT.ctaHref}
              className="inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label={SECTION_CONTENT.ctaText}
            >
              <span>{SECTION_CONTENT.ctaText}</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M15 6L9 12L15 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Left Side - Mobile Devices */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative flex items-center justify-center">
              {PHONE_DEVICES.map((device) => (
                <PhoneDevice 
                  key={device.id} 
                  device={device} 
                />
              ))}

              {/* Floating Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse" aria-hidden="true"></div>
              <div 
                className="absolute bottom-0 left-0 w-16 h-16 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000" 
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-16 fill-blue-500"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default memo(MobileAppsSection);
