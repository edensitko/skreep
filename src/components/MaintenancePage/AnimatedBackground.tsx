'use client';

import React, { memo } from 'react';

interface AnimatedBackgroundProps {
  mousePosition: { x: number; y: number };
}

/**
 * Simple dark background with minimal effects
 */
export const AnimatedBackground = memo<AnimatedBackgroundProps>(({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Subtle Mouse Glow */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
        }}
      />

      {/* Minimal Corner Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-900/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-900/5 to-transparent rounded-full blur-3xl" />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';
