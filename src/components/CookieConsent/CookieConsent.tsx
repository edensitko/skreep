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
                    className="fixed bottom-0 left-0 right-0 z-[9998] bg-gray-900/98 backdrop-blur-xl border-t border-white/10 py-6 px-4 shadow-2xl"
                    dir={language === 'he' ? 'rtl' : 'ltr'}
                >
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-4xl">🍪</span>
                            <div>
                                <p className="text-white text-base font-medium">
                                    {language === 'he'
                                        ? 'אנו משתמשים בעוגיות לשיפור חווית הגלישה שלך'
                                        : 'We use cookies to enhance your browsing experience'}
                                </p>
                                <p className="text-white/60 text-sm mt-1">
                                    {language === 'he'
                                        ? 'לחץ על "מידע נוסף" לצפייה בפרטים המלאים'
                                        : 'Click "More Info" to view full details'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowPopup(true)}
                                className="px-5 py-2.5 text-white/80 hover:text-white text-sm border border-white/20 hover:border-white/40 rounded-lg transition-colors"
                            >
                                {language === 'he' ? 'מידע נוסף' : 'More Info'}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 bg-white/90 hover:bg-white text-gray-900 text-sm font-semibold rounded-lg transition-all"
                            >
                                {language === 'he' ? 'אישור' : 'Accept'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Full Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPopup(false)} />

                    <div
                        className="relative bg-gray-900 border border-white/20 rounded-2xl p-5 max-w-sm w-full shadow-2xl"
                        dir={language === 'he' ? 'rtl' : 'ltr'}
                    >
                        {/* Header with Cookie Emoji */}
                        <div className="text-center mb-4">
                            <span className="text-4xl">🍪</span>
                            <h2 className="text-lg font-bold text-white mt-2">
                                {language === 'he' ? 'אנחנו משתמשים בעוגיות' : 'We Use Cookies'}
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-white/70 text-sm text-center mb-4 leading-relaxed">
                            {language === 'he' ? (
                                <>
                                    אנו משתמשים בעוגיות לשיפור החוויה שלך ולניתוח תעבורת האתר. באישורך, אתה מסכים לשימוש בעוגיות כמתואר ב
                                    <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                        מדיניות הפרטיות
                                    </Link>
                                    {' '}שלנו.
                                </>
                            ) : (
                                <>
                                    We use cookies to enhance your experience and analyze website traffic. By accepting, you consent to our use of cookies as described in our{' '}
                                    <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </>
                            )}
                        </p>

                        {/* Info Box */}
                        <div className="bg-white/5 rounded-xl p-3 mb-4 space-y-2 border border-white/10">
                            {/* IP */}
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white/50">{language === 'he' ? 'כתובת IP שלך' : 'Your IP'}</span>
                                    {locationData && (
                                        <span className={`text-[9px] px-1 py-0.5 rounded ${locationData.ipVersion === 'IPv6' ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                                            {locationData.ipVersion}
                                        </span>
                                    )}
                                </div>
                                <span className="text-white font-mono text-[11px]">{locationData?.ip || '...'}</span>
                            </div>

                            {/* Location */}
                            {locationData && (
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-white/50">{language === 'he' ? 'מיקום משוער' : 'Est. Location'}:</span>
                                    <span className="text-white/80">
                                        {locationData.city}, {locationData.country} {getFlagEmoji(locationData.countryCode)}
                                    </span>
                                </div>
                            )}

                            {/* Network */}
                            {locationData?.isp && (
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-white/50">{language === 'he' ? 'רשת' : 'Network'}:</span>
                                    <span className="text-white/80 truncate max-w-[180px]">{locationData.isp}</span>
                                </div>
                            )}

                            {/* Date/Time */}
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-white/50">{language === 'he' ? 'תאריך' : 'Date'}:</span>
                                <span className="text-white/80">{currentTime}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mb-3">
                            <button
                                onClick={handleDecline}
                                className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <span>🚫</span>
                                {language === 'he' ? 'דחייה' : 'Decline'}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-2.5 px-4 bg-white/90 hover:bg-white text-gray-900 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                {language === 'he' ? 'אישור' : 'Accept'}
                            </button>
                        </div>

                        {/* Essential Cookies Note */}
                        <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/40">
                            <span className="text-white/50">✓</span>
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
