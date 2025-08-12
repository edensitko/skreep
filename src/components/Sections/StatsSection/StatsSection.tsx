'use client';

import React, { memo } from 'react';
import StatCard from './StatCard';
import StatsInfo from './StatsInfo';
import { STATS_DATA, STATS_INFO } from './constants';

/**
 * Statistics section with performance metrics and company info
 * Features responsive grid layout and interactive cards
 */
function StatsSection() {
  return (
    <section 
      className="w-[95%] mt-5 mb-10 mx-auto relative"
      role="region"
      aria-label="סטטיסטיקות החברה"
    >
      <div className="mx-0 theme-container container">
        <div className="grid xl:grid-cols-2 grid-cols-1">
          {/* Left side - Description and CTA */}
          <StatsInfo
            description={STATS_INFO.description}
            buttonText={STATS_INFO.buttonText}
            buttonHref={STATS_INFO.buttonHref}
          />
          
          {/* Right side - Statistics Cards */}
          <div className="m-2 lg:mr-20"> 
            <div className="grid grid-cols-3 gap-2 lg:mt-0 mt-10">
              {STATS_DATA.map((stat, index) => (
                <StatCard 
                  key={`${stat.number}-${stat.label}`}
                  stat={stat} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
}

export default memo(StatsSection);
