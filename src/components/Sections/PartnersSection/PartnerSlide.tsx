import React, { memo } from 'react';
import LazyImage from '@/components/ui/LazyImage';
import type { PartnerSlideProps } from './types';

/**
 * Memoized partner slide component with interactive effects
 */
const PartnerSlide = memo<PartnerSlideProps>(({ partner, isActive, onTap }) => (
  <div 
    className="flex items-center justify-center p-4 rounded-xl backdrop-blur-sm transition-all duration-300 group cursor-pointer"
    onClick={(e) => onTap(partner.id, e)}
    onTouchStart={(e) => onTap(partner.id, e)}
    role="button"
    tabIndex={0}
    aria-label={`שותף ${partner.id}: ${partner.alt}`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Simulate a click event for keyboard interaction
        const target = e.currentTarget;
        target.click();
      }
    }}
  >
    <LazyImage
      src={partner.src}
      alt={partner.alt}
      className={`max-w-full max-h-[60px] h-auto transition-all duration-300 filter touch-manipulation ${
        isActive 
          ? 'opacity-100 grayscale-0 brightness-0 saturate-50 invert hue-rotate-[200deg] drop-shadow-[0_0_15px_rgba(135,206,250,0.8)]'
          : 'opacity-100 grayscale hover:opacity-100 hover:grayscale-0 hover:brightness-0 hover:saturate-100 hover:invert hover:hue-rotate-[200deg] group-hover:drop-shadow-[0_0_15px_rgba(135,206,250,0.8)]'
      }`}
    />
  </div>
));

PartnerSlide.displayName = 'PartnerSlide';

export default PartnerSlide;
