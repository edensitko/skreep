'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LightPillar from './LightPillar';
import { useUserType } from '@/hooks/useGlobalUserType';
import { useLanguage } from '@/contexts/LanguageContext';

const SecondHeroSection: React.FC = () => {
    const { userType, setUserType } = useUserType();
    const { t, language } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Get translated tab labels
    const TAB_BUSINESS = t('navigation.business');
    const TAB_ENTREPRENEURS = t('navigation.entrepreneurs');

    const toggleTab = () => {
        setUserType(userType === 'business' ? 'entrepreneurs' : 'business');
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Different colors based on user type
    const pillarColors = {
        business: {
            topColor: '#094744',
            bottomColor: '#d2f4ff'
        },
        entrepreneurs: {
            topColor: '#0a4706',
            bottomColor: '#0f6903'
        }
    };

    const colors = pillarColors[userType] || pillarColors.business;

    return (
        <section ref={sectionRef} className="relative w-full min-h-[600px] overflow-hidden bg-black" dir={language === 'he' ? 'rtl' : 'ltr'}>
            {/* Toggle Button */}
            <div className="absolute top-36 z-50 animate-in left-1/2 -translate-x-1/2" style={{
                animationName: 'fade-up',
                animationDuration: '0.6s',
                animationDelay: '0.3s',
                animationFillMode: 'both'
            }}>
                <button
                    type="button"
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 md:px-3 md:py-2 relative overflow-hidden hover:bg-white/10 transition-all"
                    onClick={toggleTab}
                >
                    <div className="flex items-center gap-1.5 md:gap-2 relative z-10 flex-row">
                        <span className={`text-xs transition-all duration-300 ${userType === 'business' ? 'text-cyan-400 font-semibold' : 'text-white/60'
                            }`}>
                            {TAB_BUSINESS}
                        </span>
                        <div className="relative w-8 h-4 bg-white/10 rounded-full border border-white/20">
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full transition-transform duration-300 ${userType === 'business' ? 'bg-cyan-400' : 'bg-green-400'} ${language === 'he'
                                ? (userType === 'business' ? 'right-0.5 translate-x-0' : 'right-0.5 -translate-x-4')
                                : (userType === 'entrepreneurs' ? 'right-0.5 translate-x-0' : 'right-0.5 -translate-x-4')
                                }`}></div>
                        </div>
                        <span className={`text-xs transition-all duration-300 ${userType === 'entrepreneurs' ? 'text-green-400 font-semibold' : 'text-white/60'
                            }`}>
                            {TAB_ENTREPRENEURS}
                        </span>
                    </div>
                </button>
            </div>

            {/* LightPillar Background */}
            <div className="absolute inset-0 z-0">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <LightPillar
                        topColor={colors.topColor}
                        bottomColor={colors.bottomColor}
                        intensity={isMobile ? 0.2 : 0.4} // Reduced intensity
                        rotationSpeed={0.5} // Reduced rotation speed
                        glowAmount={0.003} // Reduced glow
                        pillarWidth={isMobile ? 2.5 : 2.8} // Reduced pillar width
                        pillarHeight={isMobile ? 0.3 : 0.35} // Reduced pillar height
                        noiseIntensity={0.2} // Reduced noise
                        pillarRotation={isMobile ? 15 : 30} // Reduced rotation
                        interactive={!isMobile} // Disable interaction on mobile
                        mixBlendMode="screen"
                        parentRef={sectionRef}
                    />
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto px-1 pt-54 pb-20 lg:pt-58 lg:pb-36">
                <div className="flex flex-col items-center justify-center gap-10">
                    {/* Content Side */}
                    <div className="w-full max-w-3xl text-center">
                        <h2 className="text-4xl md:text-5xl xl:text-6xl italic text-white/90 font-semilight mb-6 text-center">
                            <span>{t(`hero.${userType}.title`)}</span>
                            <span className={`relative inline-block px-1 font-semilight italic text-white uppercase mx-1 ${userType === 'entrepreneurs' ? 'bg-gradient-to-r from-green-400' : 'bg-gradient-to-r from-cyan-400'
                                }`}>
                                <span className="relative z-10">{t(`hero.${userType}.titleHighlight`)}</span>
                            </span>
                        </h2>

                        <p className="text-white/70 text-lg md:text-xl italic mb-6 text-center">
                            {t(`hero.${userType}.subtitle`)}
                        </p>

                        <p className={`text-white/60 text-sm md:text-base mb-8 px-10 text-center max-w-xl mx-auto`}>
                            {t(`hero.${userType}.description`)}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/services"
                                className={`flex items-center justify-center gap-2 bg-white/5 backdrop-blur-xl border text-white px-6 py-3 rounded-full transition-all hover:bg-white/10 ${userType === 'entrepreneurs'
                                    ? 'border-green-400/30 hover:border-green-400/50'
                                    : 'border-cyan-400/30 hover:border-cyan-400/50'
                                    }`}
                            >
                                <span>{t(`hero.${userType}.servicesButton`)}</span>
                            </Link>
                            <Link
                                href="/contact"
                                className={`flex items-center justify-center gap-2 backdrop-blur-xl border text-white px-6 py-3 rounded-full transition-all ${userType === 'entrepreneurs'
                                    ? 'bg-green-400/20 border-green-400/30 hover:bg-green-400/30'
                                    : 'bg-cyan-400/20 border-cyan-400/30 hover:bg-cyan-400/30'
                                    }`}
                            >
                                <span>{t(`hero.${userType}.contactButton`)}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Image Section - Below Content */}
                    <div className="w-full max-w-xs md:max-w-md">
                        <div className="relative w-full h-[220px] md:h-[400px] flex items-center justify-center p-4 pt-16">
                            <div className={`absolute w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-full blur-3xl ${userType === 'entrepreneurs' ? 'bg-green-400/20' : 'bg-cyan-400/20'
                                }`}></div>
                            <Image
                                src={userType === 'entrepreneurs' ? '/assets/images/hero/hero2.webp' : '/assets/images/hero/hero1.webp'}
                                alt="Hero Image"
                                width={500}
                                height={350}
                                className="w-full h-auto relative z-10 animate-float max-w-[280px] md:max-w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black to-transparent z-20"></div>
        </section>
    );
};

export default SecondHeroSection;
