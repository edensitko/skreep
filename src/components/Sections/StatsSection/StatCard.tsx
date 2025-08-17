import React, { memo } from 'react';

type Language = 'he' | 'en';

interface Stat {
  number: string;
  suffix: string;
  label: string;
}

interface StatCardProps {
  stat: Stat;
  language: Language;
  cardAriaLabel: string;
}

/**
 * Memoized statistics card component with hover effects
 */
const StatCard = memo<StatCardProps>(({ stat, language, cardAriaLabel }) => (
  <div 
    className="rounded-[20px] w-full h-[130px] md:h-[178px] border-b border-r border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-black/30 backdrop-blur-lg overflow-hidden group transition-all duration-2000 md:duration-500 hover:backdrop-blur-2xl hover:border-white/30 hover:bg-gradient-to-br hover:from-black/40 hover:via-black/20 hover:to-white/10 active:backdrop-blur-3xl active:bg-gradient-to-br active:from-black/30 active:via-black/10 active:to-white/20 active:border-white/40 focus:backdrop-blur-3xl focus:bg-gradient-to-br focus:from-black/30 focus:via-black/10 focus:to-white/20 focus:border-white/40 relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-black/10 before:opacity-40 before:transition-all before:duration-2000 md:before:duration-500 hover:before:opacity-70 hover:before:from-white/15 hover:before:via-white/5 hover:before:to-transparent active:before:opacity-90 active:before:from-white/20 active:before:via-white/10 active:before:to-transparent focus:before:opacity-90 focus:before:from-white/20 focus:before:via-white/10 focus:before:to-transparent after:absolute after:inset-0 after:bg-gradient-to-tl after:from-cyan-400/5 after:via-transparent after:to-purple-400/5 after:opacity-0 after:transition-all after:duration-2000 md:after:duration-500 hover:after:opacity-30 active:after:opacity-50 focus:after:opacity-50 cursor-pointer touch-manipulation"
    role="button"
    tabIndex={0}
    aria-label={`${cardAriaLabel}: ${stat.number}${stat.suffix} ${stat.label}`}
  >
    <div className="relative flex items-center justify-center p-4 md:p-8 h-full z-10">
      <div className="relative z-10 flex flex-col items-center justify-center space-y-2 md:space-y-4">
        <p className="font-bold text-center text-2xl md:text-4xl lg:text-5xl text-white/90 group-hover:text-white group-active:text-white group-focus:text-white transition-colors duration-700 md:duration-300" dir="ltr">
          <span>{stat.number}</span>{stat.suffix}
        </p>
        <hr className="border-[1px] border-cyan-400/60 w-full group-hover:border-cyan-400/80 group-active:border-cyan-400 group-focus:border-cyan-400 transition-colors duration-700 md:duration-300" />
        <p className="text-white/70 text-center text-xs md:text-sm font-medium group-hover:text-white/90 group-active:text-white group-focus:text-white transition-colors duration-700 md:duration-300" dir={language === 'he' ? 'rtl' : 'ltr'}>
          {stat.label}
        </p>
      </div>
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

export default StatCard;
