import React, { memo } from 'react';

type Language = 'he' | 'en';

interface StatsInfoProps {
  description: string;
  buttonText: string;
  buttonHref: string;
  language: Language;
}

/**
 * Memoized stats information component with description and CTA button
 */
const StatsInfo = memo<StatsInfoProps>(({ description, buttonText, buttonHref, language }) => (
  <div className="w-full">
    <div className="bg-gradient-to-br from-black/25 via-black/15 to-black/5 backdrop-blur-3xl border border-white/30 rounded-l-4xl rounded-r-4xl before:absolute before:inset-0 before:rounded-4xl before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent before:opacity-60 after:absolute after:inset-0 after:rounded-4xl after:bg-gradient-to-tl after:from-cyan-400/10 after:via-transparent after:to-purple-400/10 after:opacity-50 relative overflow-hidden transition-all duration-700 ease-out hover:backdrop-blur-[10px] hover:bg-gradient-to-br hover:from-black/40 hover:via-black/25 hover:to-black/10 hover:before:opacity-80 hover:after:opacity-70 active:backdrop-blur-[80px] group cursor-pointer">
      <p className={`text-white/60 bg-white/10 m-6 ${language === 'he' ? 'pr-5 border-r-[3px]' : 'pl-5 border-l-[3px]'} border-cyan-400 p-5 rounded ${language === 'he' ? 'rounded-l-2xl' : 'rounded-r-2xl'} text-sm`} dir={language === 'he' ? 'rtl' : 'ltr'}>
        {description}
      </p>
      <a href={buttonHref} className="inline-block">
        <div className="w-[150px] h-[50px] m-3 rounded-full border border-gray-300/20 flex justify-center items-center hover:border-cyan-400 transition-all duration-300 group">
          <div className="flex space-x-reverse space-x-2.5 items-center text-cyan-400 group-hover:text-cyan-300">
            <span className="text-base font-medium" dir={language === 'he' ? 'rtl' : 'ltr'}>{buttonText}</span>
            <span>
              <svg 
                width="7" 
                height="12" 
                viewBox="0 0 7 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className={`transition-transform group-hover:translate-x-1 ${language === 'he' ? 'transform scale-x-[-1]' : ''}`}
              >
                <path 
                  d="M1 10.5L4.79289 6.70711C5.12623 6.37377 5.29289 6.20711 5.29289 6C5.29289 5.79289 5.12623 5.62623 4.79289 5.29289L1 1.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  </div>
));

StatsInfo.displayName = 'StatsInfo';

export default StatsInfo;
