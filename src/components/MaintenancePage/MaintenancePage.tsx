'use client';

import React, { useState, useEffect, memo, useCallback } from 'react';
import { AnimatedBackground } from './AnimatedBackground';
import { NotifyForm } from './NotifyForm';
import { SocialLinks } from './SocialLinks';
import { MAINTENANCE_CONTENT, VISUAL_EFFECTS } from './constants';

/**
 * Stunning maintenance page with advanced visual effects and CTA
 */
function MaintenancePage() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  }, []);

  const handleNotifySubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isLoading) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  }, [email, isLoading]);

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(2deg); }
            66% { transform: translateY(-10px) rotate(-1deg); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 60px rgba(147, 51, 234, 0.6);
              transform: scale(1.05);
            }
          }
          
          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(60px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInDown {
            0% {
              opacity: 0;
              transform: translateY(-60px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            0% {
              opacity: 0;
              transform: translateX(-60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            0% {
              opacity: 0;
              transform: translateX(60px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradient-shift 4s ease-in-out infinite;
          }
          
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .hover-lift {
            transition: all 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
        `
      }} />

      <div 
        className={`relative min-h-screen bg-gradient-to-br ${VISUAL_EFFECTS.gradients.background} overflow-hidden`}
        onMouseMove={handleMouseMove}
        dir="rtl"
      >
        {/* Animated Background */}
        <AnimatedBackground mousePosition={mousePosition} />

        {/* Interactive Cursor Effect */}
        <div 
          className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, transparent 70%)',
            transition: 'all 0.1s ease'
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
          <div className="max-w-6xl mx-auto text-center">
            
         

            {/* Logo */}
            <div 
              className={`mb-8 mt-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationName: isVisible ? 'slideInUp' : 'none',
                animationDuration: '1.2s',
                animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                animationFillMode: 'forwards',
                animationDelay: '0.3s'
              }}
            >
              <div className="relative group">
                {/* Logo Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 blur-2xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                
                <img 
                  src="./assets/images/logo-1.webp" 
                  alt="Skreep Logo" 
                  className="relative h-8 md:h-12 lg:h-16 w-auto mx-auto filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            </div>


            <div className="mb-2">
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                {MAINTENANCE_CONTENT.subtitle}
              </p>
            </div>


            {/* Maintenance Icon */}
            <div className="mb-2">
              <div className="flex justify-center">
                <div className="relative group">
                  {/* Icon Glow Effect */}
                  <div className="absolute -inset-2 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  <div className="relative w-50 h-50 rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    {/* Custom Maintenance Image */}
                    <img 
                      src="./assets/images/maint.png" 
                      alt="Maintenance" 
                      className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle */}
           
            {/* CTA Section */}
            <div 
              className={`mb-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
              }`}
              style={{
                animationName: isVisible ? 'slideInUp' : 'none',
                animationDuration: '1.0s',
                animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                animationFillMode: 'forwards',
                animationDelay: '0.6s'
              }}
            >
              <div className="relative group max-w-md mx-auto">
                <div className="relative bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="mb-4">
                    <p className="text-base text-white/60">
                      {MAINTENANCE_CONTENT.ctaSubtitle}
                    </p>
                  </div>

                  <NotifyForm
                    email={email}
                    onEmailChange={setEmail}
                    onSubmit={handleNotifySubmit}
                    isLoading={isLoading}
                    isSubmitted={isSubmitted}
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-8">
              <SocialLinks />
            </div>

            {/* Footer Message */}
            <div 
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                animationName: isVisible ? 'slideInUp' : 'none',
                animationDuration: '0.8s',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
                animationDelay: '1.2s'
              }}
            >
              <p className="text-white/60 text-sm md:text-base">
                {MAINTENANCE_CONTENT.footerMessage}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>
    </>
  );
}

export default memo(MaintenancePage);
