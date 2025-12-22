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
            bottomColor: '#048c85'
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

            {/* LightPillar Background */}
            <div className="absolute inset-0 z-0">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <LightPillar
                        topColor={colors.topColor}
                        bottomColor={colors.bottomColor}
                        intensity={isMobile ? 0.3 : 0.5}
                        rotationSpeed={0.3}
                        glowAmount={0.005}
                        pillarWidth={isMobile ? 3 : 3.0}
                        pillarHeight={isMobile ? 0.5 : 0.4}
                        noiseIntensity={0.5}
                        pillarRotation={isMobile ? 20 : 40}
                        interactive={true}
                        mixBlendMode="normal"
                        parentRef={sectionRef}
                    />
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto px-4 py-48 lg:py-36">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                    {/* Content Side */}
                    <div className={`w-full lg:w-1/2 ${language === 'he' ? 'text-right' : 'text-left'}`}>
                        <h2 className={`text-3xl md:text-4xl xl:text-5xl text-white/90 font-semibold mb-6`}>
                            <span>{t(`hero.${userType}.title`)}</span>
                            <span className={`relative inline-block px-3 font-bold text-white uppercase mx-2 ${userType === 'entrepreneurs' ? 'bg-gradient-to-r from-green-400' : 'bg-gradient-to-r from-cyan-400'
                                }`}>
                                <span className="relative z-10">{t(`hero.${userType}.titleHighlight`)}</span>
                            </span>
                        </h2>

                        <p className="text-white/70 text-lg md:text-xl italic mb-8">
                            {t(`hero.${userType}.subtitle`)}
                        </p>

                        <p className={`text-white/60 bg-white/10 backdrop-blur-sm p-4 rounded-xl text-sm md:text-base mb-8 ${language === 'he'
                            ? 'border-r-4 pr-5 text-right'
                            : 'border-l-4 pl-5 text-left'
                            } ${userType === 'entrepreneurs' ? 'border-green-500' : 'border-cyan-500'}`}>
                            {t(`hero.${userType}.description`)}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/services"
                                className={`flex items-center gap-2 bg-transparent border text-white px-6 py-3 rounded-full transition-all ${userType === 'entrepreneurs'
                                    ? 'border-green-400/30 hover:bg-green-400/10'
                                    : 'border-cyan-400/30 hover:bg-cyan-400/10'
                                    }`}
                            >
                                <span>{t(`hero.${userType}.servicesButton`)}</span>
                            </Link>
                            <Link
                                href="/contact"
                                className={`flex items-center gap-2 text-white px-6 py-3 rounded-full transition-all ${userType === 'entrepreneurs'
                                    ? 'bg-green-400/40 hover:bg-green-500/40'
                                    : 'bg-cyan-400/40 hover:bg-cyan-500/40'
                                    }`}
                            >
                                <span>{t(`hero.${userType}.contactButton`)}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative w-full h-[400px] flex items-center justify-center">
                            <div className={`absolute w-[250px] h-[250px] rounded-full blur-3xl ${userType === 'entrepreneurs' ? 'bg-green-400/20' : 'bg-cyan-400/20'
                                }`}></div>
                            <Image
                                src={userType === 'entrepreneurs' ? '/assets/images/hero/hero2.webp' : '/assets/images/hero/hero1.webp'}
                                alt="Hero Image"
                                width={500}
                                height={350}
                                className="w-full h-auto relative z-10 max-w-md"
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
