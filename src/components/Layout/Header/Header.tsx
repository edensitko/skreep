'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft } from 'react-icons/fi';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsLargeScreen(window.innerWidth >= 1024);
      }
    };

    if (typeof window !== 'undefined') {
      // Initial check
      handleResize();
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <header className="fixed w-[95%]  mx-[2.5%] z-[9999] mt-4 transition-all duration-300" dir="ltr">
        <div className="w-full h-[80px] flex justify-between items-center  md:px-[50px] border border-transparent bg-black/50 border-t-0 relative rounded-3xl mt-0">
          <div className="flex 2xl:space-x-[100px] xl:space-x-10 justify-center items-center w-full xl:w-auto">
            <div className="flex justify-center items-center">
              <Link href="/" aria-label="logo">
                <img src="/assets/images/logo-1.png" alt="" className="w-[150px] md:w-[150px] pt-3 mr-" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed w-[95%] mx-[2.5%] z-[9999] mt-4 transition-all duration-300">
      <div className="w-full h-[60px] lg:h-[80px] flex justify-between items-center px-4 md:px-[50px] border border-transparent bg-black/50 border-t-0 relative rounded-3xl mt-0" dir={mounted ? (isLargeScreen ? 'ltr' : 'rtl') : 'rtl'}>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          
        >
          <div className="flex flex-col space-y-1" dir={mounted ? (isLargeScreen ? 'ltr' : 'rtl') : 'rtl'}>
            <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`block w-7 h-0.5 bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </div>
        </button>
        
        {/* Logo - Absolutely centered */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link href="/" aria-label="logo">
            <img 
              src={"/assets/images/logo-1.png"} 
              alt="" 
              className="ml-8 w-[100px] md:w-[100px] pt-0 transition-all duration-300"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center w-full " >
          {/* Left side - Search and CTA */}
          <div className="flex items-center gap-4" dir="rtl">
            {/* Expandable Search Button */}
            <div className="relative group">
              <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 group-hover:bg-white/15 overflow-hidden">
                <input 
                  type="text" 
                  placeholder="חיפוש..."
                  className="bg-transparent text-white placeholder-white/60 px-4 py-2 w-0 group-hover:w-48 transition-all duration-300 focus:outline-none focus:w-48 text-right"
                  dir="rtl"
                />
                <button className="text-white hover:text-cyan-400 transition-colors p-2 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* CTA Button */}
            <Link href="/contact" 
              className="bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 text-white border border-white/20 px-6 py-3 rounded-full font-semibold hover:bg-cyan-500 transition-all flex items-center gap-2" 
              dir="ltr"
            >
              <FiArrowLeft size={16} />
              דברו איתנו
            </Link>
          </div>
          
          {/* Right side - Navigation Menu */}
          <div dir="ltr">
            <ul className="flex items-center gap-8 xl:gap-12 flex-row-reverse" >
              <li className="font-semibold text-white hover:underline hover:text-cyan-400 transition-colors">
                <Link href="/">דף הבית</Link>
              </li>
              <li className="font-semibold text-white hover:underline hover:text-cyan-400 transition-colors">
                <Link href="/services">שירותים</Link>
              </li>
              <li className="font-semibold text-white hover:underline hover:text-cyan-400 transition-colors">
                <Link href="/blog-details">בלוג</Link>
              </li>
              <li className="relative group">
                <Link href="#" className="flex items-center gap-2 font-semibold text-white hover:underline hover:text-cyan-400 transition-colors">
                  עמודים
                  <svg className="transition-all duration-300 group-hover:rotate-180" width="10" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 2L9.5 8L17 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </Link>
                
                <div className="absolute px-2 -right-7 h-0 group-hover:h-auto overflow-hidden top-5 transition-all duration-500">
                  <ul className="min-w-[200px] bg-black/90 backdrop-blur-sm border border-white/20 mt-8 transition-all duration-300 overflow-hidden px-5 py-4 rounded-lg shadow-xl">
                    <li className="relative py-1">
                      <Link href="/about" className="relative font-medium leading-5 hover:text-cyan-400 text-white block py-2 transition-colors">
                        אודות
                      </Link>
                    </li>
                    <li className="relative py-1">
                      <Link href="/team" className="relative font-medium leading-5 hover:text-cyan-400 text-white block py-2 transition-colors">
                        הצוות
                      </Link>
                    </li>
                    <li className="relative py-1">
                      <Link href="/contact" className="relative font-medium leading-5 hover:text-cyan-400 text-white block py-2 transition-colors">
                        צור קשר
                      </Link>
                    </li>
                    <li className="relative py-1">
                      <Link href="/portfolio" className="relative font-medium leading-5 hover:text-cyan-400 text-white block py-2 transition-colors">
                        תיק עבודות
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Mobile CTA Button */}
        <Link 
          href="/contact" 
          className="lg:hidden bg-gradient-to-l from-cyan-400/10 via-cyan-400/30 to-cyan-400/60 border border-white/20 text-white px-2 py-2 rounded-full font-semibold hover:bg-cyan-500 transition-all flex items-center gap-2 text-xs" 
          dir="ltr"
        >
          <FiArrowLeft size={14} />
          דברו איתנו
        </Link>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-[9998] transition-all duration-500 ease-out ${
        mobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Background Overlay */}
        <div 
          className={`absolute inset-0 bg-black/10 backdrop-blur-xs transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        {/* Sliding Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-2/3 bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-2xl border-l border-white/40 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transform transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Exit Button */}
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <nav className="relative z-10 p-6 pt-16" dir="rtl">
              <ul className="space-y-6">
                <li>
                  <Link 
                    href="/" 
                    className="block text-white text-lg font-semibold hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    דף הבית
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    className="block text-white text-lg font-semibold hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    שירותים
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog-details" 
                    className="block text-white text-lg font-semibold hover:text-cyan-400 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    בלוג
                  </Link>
                </li>
                <li>
                  <div className="space-y-4">
                    <p className="text-white text-lg font-semibold">עמודים</p>
                    <div className="pr-4 space-y-3">
                      <Link 
                        href="/about" 
                        className="block text-white/80 hover:text-cyan-400 transition-colors py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        אודות
                      </Link>
                      <Link 
                        href="/contact" 
                        className="block text-white/80 hover:text-cyan-400 transition-colors py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        צור קשר
                      </Link>
                      <Link 
                        href="/portfolio" 
                        className="block text-white/80 hover:text-cyan-400 transition-colors py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        תיק עבודות
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
              
              {/* Mobile CTA Button */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <Link 
                  href="/contact" 
                  className="w-full bg-cyan-400 text-black px-6 py-4 rounded-full font-semibold hover:bg-cyan-500 transition-all flex items-center justify-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                  dir="ltr"
                >
                  <FiArrowLeft size={16} />
                  דברו איתנו
                </Link>
              </div>
            </nav>
          </div>
        </div>
    </header>
  );
}
