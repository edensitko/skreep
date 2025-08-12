import React, { memo, useEffect, useState } from 'react';
import { PARTICLES_CONFIG } from './constants';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

/**
 * Memoized floating particles component for background animation
 */
const FloatingParticles = memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = (): Particle[] => {
      return Array.from({ length: PARTICLES_CONFIG.count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: PARTICLES_CONFIG.sizes[Math.floor(Math.random() * PARTICLES_CONFIG.sizes.length)],
        color: PARTICLES_CONFIG.colors[Math.floor(Math.random() * PARTICLES_CONFIG.colors.length)],
        duration: PARTICLES_CONFIG.animationDuration[Math.floor(Math.random() * PARTICLES_CONFIG.animationDuration.length)],
        delay: Math.random() * 10
      }));
    };

    setParticles(generateParticles());
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-20px) translateX(15px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
});

FloatingParticles.displayName = 'FloatingParticles';

export default FloatingParticles;
