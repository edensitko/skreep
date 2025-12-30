'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface LocationData {
    ip: string;
    ipVersion: 'IPv4' | 'IPv6';
    city: string;
    region: string;
    country: string;
    countryCode: string;
    isp: string;
}

function getIPVersion(ip: string): 'IPv4' | 'IPv6' {
    return ip.includes(':') ? 'IPv6' : 'IPv4';
}

function getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const COOKIE_CONSENT_KEY = 'cookie_consent_accepted';

const CookieConsent: React.FC = () => {
    const { language } = useLanguage();
    const [showBanner, setShowBanner] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const hasAccepted = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!hasAccepted) {
            setShowBanner(true);
            fetchIPLocation();
            setCurrentTime(new Date().toLocaleString());
        }
    }, []);

    const fetchIPLocation = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const result = await response.json();
                if (!result.error) {
                    setLocationData({
                        ip: result.ip,
                        ipVersion: getIPVersion(result.ip),
                        city: result.city,
                        region: result.region,
                        country: result.country_name,
                        countryCode: result.country_code,
                        isp: result.org || result.asn
                    });
                }
            }
        } catch {
            try {
                const response = await fetch('http://ip-api.com/json/?fields=query,city,regionName,country,countryCode,isp');
                if (response.ok) {
                    const result = await response.json();
                    setLocationData({
                        ip: result.query,
                        ipVersion: getIPVersion(result.query),
                        city: result.city,
                        region: result.regionName,
                        country: result.country,
                        countryCode: result.countryCode,
                        isp: result.isp
                    });
                }
            } catch (err) {
                console.error('Error fetching IP:', err);
            }
        }
    };

    const handleAccept = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        setShowBanner(false);
        setShowPopup(false);
    };

    const handleDecline = () => {
        setShowBanner(false);
        setShowPopup(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Bottom Banner */}
            {!showPopup && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-[9998] bg-black/20 backdrop-blur-xl border-t border-white/10 py-4 px-4 shadow-2xl"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                    <div className=" mx-auto">
                        {/* Mobile Layout - Full Content */}
                        <div className="flex md:hidden flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl flex-shrink-0">🍪</span>
                                <div className="flex-1">
                                    <p className="text-white text-md font-medium">
                                        {language === 'he'
                                            ? 'גם אנחנו אוהבים עוגיות 🍪'
                                            : 'We love cookies too 🍪'}
                                    </p>
                                    <p className="text-white/70 text-xs mt-1 leading-relaxed">
                                        {language === 'he' ? (
                                            <>
                                                אנחנו משתמשים בעוגיות כדי לשפר את האתר ולשמור מידע על אופן השימוש בו. המידע נשמר בצורה מאובטחת ובהתאם{' '}
                                                <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                                    למדיניות הפרטיות שלנו
                                                </Link>
                                                .
                                            </>
                                        ) : (
                                            <>
                                                We use cookies to improve our website and store information about how you use it. The information is stored securely and in accordance with our{' '}
                                                <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 justify-end">
                                <button
                                    onClick={() => setShowPopup(true)}
                                    className="px-5 py-2.5 text-white/80 hover:text-white text-xs border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 backdrop-blur-sm"
                                >
                                    {language === 'he' ? 'מידע נוסף' : ' More Info'}
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xs font-semibold rounded-lg transition-all duration-300 shadow-lg"
                                >
                                    {language === 'he' ? 'אישור' : 'Accept'}
                                </button>
                            </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">🍪</span>
                                <div>
                                    <p className="text-white text-base font-medium">
                                        {language === 'he'
                                            ? 'גם אנחנו אוהבים עוגיות 🍪'
                                            : 'We love cookies too 🍪'}
                                    </p>
                                    <p className="text-white/70 text-sm mt-1 leading-relaxed">
                                        {language === 'he' ? (
                                            <>
                                                אנחנו משתמשים בעוגיות כדי לשפר את האתר ולשמור מידע על אופן השימוש בו. המידע נשמר בצורה מאובטחת ובהתאם{' '}
                                                <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                                    למדיניות הפרטיות שלנו
                                                </Link>
                                                .
                                            </>
                                        ) : (
                                            <>
                                                We use cookies to improve our website and store information about how you use it. The information is stored securely and in accordance with our{' '}
                                                <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowPopup(true)}
                                    className="px-5 py-2.5 text-white/80 hover:text-white text-sm border border-white/20 hover:border-white/40 rounded-lg transition-all duration-300 backdrop-blur-sm"
                                >
                                    {language === 'he' ? 'מידע נוסף' : 'More Info'}
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg"
                                >
                                    {language === 'he' ? 'אישור' : 'Accept'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPopup(false)} />

                    <div
                        className="relative bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                        {/* Header with Cookie Emoji */}
                 

                        {/* Description */}
                        <div className="text-center mb-5">
                            <p className="text-white text-base font-medium mb-3">
                                {language === 'he' ? 'גם אנחנו אוהבים עוגיות 🍪' : 'We love cookies too 🍪'}
                            </p>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {language === 'he' ? (
                                    <>
                                        אנו משתמשים בעוגיות כדי לשפר את האתר ולשמור מידע על אופן השימוש בו. המידע נשמר בצורה מאובטחת ובהתאם ל
                                        <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline ml-1">
                                            מדיניות הפרטיות
                                        </Link>
                                        {' '}שלנו.
                                    </>
                                ) : (
                                    <>
                                        We use cookies to improve our website and store information about how you use it. The information is stored securely and in accordance with our{' '}
                                        <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                            Privacy Policy
                                        </Link>
                                        .
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Info Box */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-5 space-y-3 border border-white/20">
                            {/* IP */}
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-white/60">{language === 'he' ? 'כתובת IP שלך' : 'Your IP'}</span>
                                    {locationData && (
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full ${locationData.ipVersion === 'IPv6' ? 'bg-purple-500/30 text-purple-300' : 'bg-cyan-500/30 text-cyan-300'}`}>
                                            {locationData.ipVersion}
                                        </span>
                                    )}
                                </div>
                                <span className="text-white font-mono text-[11px]">{locationData?.ip || '...'}</span>
                            </div>

                            {/* Location */}
                            {locationData && (
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-white/60">{language === 'he' ? 'מיקום משוער' : 'Est. Location'}:</span>
                                    <span className="text-white/90">
                                        {locationData.city}, {locationData.country} {getFlagEmoji(locationData.countryCode)}
                                    </span>
                                </div>
                            )}

                            {/* Network */}
                            {locationData?.isp && (
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-white/60">{language === 'he' ? 'רשת' : 'Network'}:</span>
                                    <span className="text-white/90 truncate max-w-[180px]">{locationData.isp}</span>
                                </div>
                            )}

                            {/* Date/Time */}
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-white/60">{language === 'he' ? 'תאריך' : 'Date'}:</span>
                                <span className="text-white/90">{currentTime}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={handleDecline}
                                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
                            >
                                <span>🚫</span>
                                {language === 'he' ? 'דחייה' : 'Decline'}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                            >
                                {language === 'he' ? 'אישור' : 'Accept'}
                            </button>
                        </div>

                        {/* Essential Cookies Note */}
                        <div className="flex items-center justify-center gap-2 text-[11px] text-white/50">
                            <span className="text-green-400">✓</span>
                            <span>
                                {language === 'he'
                                    ? 'עוגיות חיוניות תמיד מופעלות'
                                    : 'Essential cookies are always enabled'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookieConsent;
