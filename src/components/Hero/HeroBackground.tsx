'use client';

import React from 'react';
import { useUserType } from '@/hooks/useGlobalUserType';
import RippleGrid from './RippleGrid';

export default function HeroBackground() {
  const { userType } = useUserType();

  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* <RippleGrid
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor={userType === 'entrepreneurs' ? '#00A36C' : '#00ffff'}
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={userType === 'entrepreneurs' ? 15 : 40}
        /> */}
        <RippleGrid
          beamWidth={2}
          beamHeight={15}
          beamNumber={10}
          lightColor={userType === 'entrepreneurs' ? '#00A36C' : '#00ffff'}
          speed={3}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={40}
        />
      </div>

      {/* Decorative blur elements */}
      <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-cyan-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[150px] h-[150px] bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-black to-transparent z-10"></div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
    </section>
  );
}
