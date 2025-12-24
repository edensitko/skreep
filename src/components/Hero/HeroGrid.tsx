'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroGridSecond from './HeroGridSecond';
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';
import RippleGrid from './RippleGrid'; // Fix import to match default export

export default function HeroGrid() {
  const { userType, setUserType } = useUserType();
  const { t, language } = useLanguage();
  
  // Get translated tab labels
  const TAB_BUSINESS = t('navigation.business');
  const TAB_ENTREPRENEURS = t('navigation.entrepreneurs');
  
  // Map global user type to local tab type
  const activeTab = userType === 'entrepreneurs' ? TAB_ENTREPRENEURS : TAB_BUSINESS;

  const toggleTab = () => {
    setUserType(userType === 'business' ? 'entrepreneurs' : 'business');
  };

  // If the active tab is entrepreneurs, show the second hero
  if (activeTab === TAB_ENTREPRENEURS) {
    return (
      <>
        {/* Absolute Position Toggle */}
        <div className={`absolute top-32 z-50 animate-in ${
          language === 'he' 
            ? 'right-4 md:right-24' 
            : 'left-4 md:left-24'
        }`} style={{ 
          animationName: language === 'he' ? 'slide-in-right' : 'slide-in-left', 
          animationDuration: '0.6s', 
          animationDelay: '0.3s', 
          animationFillMode: 'both' 
        }}>
          <button 
            type="button" 
            className="bg-black/40 border border-cyan-100/10 rounded-full shadow-style-one px-3 py-2 md:px-5 md:py-3 relative overflow-hidden"
            onClick={toggleTab}
          >
            <div className="flex items-center gap-2 md:gap-4 relative z-10 flex-row">
              <span className={`text-sm transition-all duration-300 ${
                userType === 'business' ? 'text-cyan-400 font-bold' : 'text-white'
              }`}>
                {TAB_BUSINESS}
              </span>
              <div className="relative w-10 h-5 bg-gray-600 rounded-full">
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  language === 'he' 
                    ? (userType === 'business' ? 'right-0.5 translate-x-0' : 'right-0.5 -translate-x-5')
                    : (userType === 'entrepreneurs' ? 'right-0.5 translate-x-0' : 'right-0.5 -translate-x-5')
                }`}></div>
              </div>
              <span className={`text-sm transition-all duration-300 ${
                userType === 'entrepreneurs' ? 'text-green-400 font-bold' : 'text-white'
              }`}>
                {TAB_ENTREPRENEURS}
              </span>
            </div>
          </button>
        </div>
        <HeroGridSecond />
      </>
    );
  }

  // Default case: show business hero
  return (
    <>
      {/* Absolute Position Toggle */}
      <div className={`absolute top-32 z-50 animate-in ${
        language === 'he' 
          ? 'right-4 md:right-24' 
          : 'left-4 md:left-24'
      }`} style={{ 
        animationName: language === 'he' ? 'slide-in-right' : 'slide-in-left', 
        animationDuration: '0.6s', 
        animationDelay: '0.3s', 
        animationFillMode: 'both' 
      }}>
        <button 
          type="button" 
          className="bg-black/40 border border-cyan-100/10 rounded-full shadow-style-one px-3 py-2 md:px-5 md:py-3 relative overflow-hidden"
          onClick={toggleTab}
        >
          <div className="flex items-center gap-2 md:gap-4 relative z-10 flex-row">
            <span className={`text-sm transition-all duration-300 ${
              userType === 'business' ? 'text-cyan-400 font-bold' : 'text-white'
            }`}>
              {TAB_BUSINESS}
            </span>
            <div className="relative w-10 h-5 bg-gray-600 rounded-full">
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                language === 'he' 
                  ? (userType === 'business' ? 'right-0.5 translate-x-0' : 'right-0.5 -translate-x-5')
                  : (userType === 'entrepreneurs' ? 'right-0.5 translate-x-0' : 'right-0.5 -translate-x-5')
              }`}></div>
            </div>
            <span className={`text-sm transition-all duration-300 ${
              userType === 'entrepreneurs' ? 'text-green-400 font-bold' : 'text-white'
            }`}>
              {TAB_ENTREPRENEURS}
            </span>
          </div>
        </button>
      </div>
      
      <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-zinc-900 to-black" dir={language === 'he' ? 'rtl' : 'ltr'}>
        {/* Beams Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <RippleGrid // Fix component usage to match default export
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#00ffff"
            speed={3}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={40}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 mt-16">
            {/* Left Side - Image */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 -mt-20 lg:mt-0">
              <div className="relative">
                <div className="relative w-full h-[500px] flex items-center justify-center">
                  <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full blur-3xl"></div>
                  <Image
                    src="/assets/images/hero/hero1.webp"
                    alt="Hero Laptop"
                    width={600}
                    height={400}
                    className="w-full h-auto relative z-10 lg:mt-30"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className={`w-full lg:w-1/2 order-1 lg:order-2 text-center lg:${language === 'he' ? 'text-right' : 'text-left'}`}>
              {/* Heading */}
              <h2 className={`text-4xl md:text-5xl xl:text-55 text-white/70 font-semibold mb-[35px] pointer-events-auto xl:ml-5 mx-auto text-center lg:${language === 'he' ? 'text-right' : 'text-left'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
                <span>{t(`hero.${userType}.title`)}</span><span className="relative inline-block px-3 font-bold text-white uppercase">
                  <span className="relative z-10">{t(`hero.${userType}.titleHighlight`)}</span>
                  <span className="absolute top-0 left-0 block w-full h-full bg-gradient-to-r from-cyan-400"></span>
                </span>
                <br />
                <span className="italic text-2xl md:text-3xl xl:text-4xl">{t(`hero.${userType}.subtitle`)} </span>
              </h2>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 animate-in justify-center lg:justify-start" style={{ animationName: 'fade-up', animationDuration: '0.8s', animationDelay: '0.6s', animationFillMode: 'both' }}>
                <p className={`text-white/60 bg-white/10 mb-10 p-3 rounded text-xs w-full text-center lg:w-auto ${
                  language === 'he' 
                    ? 'lg:border-r-4 lg:border-blue-500 lg:pr-5 lg:ml-20 lg:rounded-l-2xl lg:text-right' 
                    : 'lg:border-l-4 lg:border-blue-500 lg:pl-5 lg:mr-20 lg:rounded-r-2xl lg:text-left'
                }`} dir={language === 'he' ? 'rtl' : 'ltr'}>
                  {t(`hero.${userType}.description`)}</p>
                <Link href="/services" className="flex items-center justify-center gap-2 bg-transparent border border-cyan-400/30 text-white px-8 py-4 rounded-full hover:bg-cyan-400/10 transition-all">
                  <span>{t(`hero.${userType}.servicesButton`)}</span>
                 
                </Link>
                <Link href="/contact" className="flex items-center justify-center gap-2 border-white/10 gradient-to-r from-cyan-400/40 to-cyan-400/40 bg-cyan-400/40 border-cyan-400/40 text-white px-8 py-4 rounded-full hover:bg-cyan-500/40 transition-all">
                  <span>{t(`hero.${userType}.contactButton`)}</span>
                 
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-3xl"></div>
        {/*blur effect in bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[100px] bg-gradient-to-t from-black via-black/70 to-transparent  z-50"></div>
      </section>
    </>
  );
}
