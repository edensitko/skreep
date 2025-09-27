'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ScrollVelocity from './ScrollVelocity';

const InnovationSection = () => {
 
  const velocity = 20;

  
  return (
    <section 
      className="w-full bg-black relative overflow-hidden border-t border-b border-white/50"
    >
      <div className="w-[100%]  mx-auto ">
        <div className="relative z-10">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-600/10 animate-pulse"></div>
        
       

        {/* Large blur effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

  
            {/* Add ScrollVelocity component */}
            <ScrollVelocity
              texts={['חדשנות וטכונולוגיה', 'משנים את כללי המשחק']} 
              velocity={velocity} 
              className="custom-scroll-text"
            />
          </div>
        </div>
     
    </section>
  );
};

export default InnovationSection;
