'use client';

import React, { memo } from 'react';
import { BACKGROUND_CONFIG } from './constants';
import { getGridStyles } from './utils';
import type { BackgroundEffectsProps } from './types';

/**
 * Memoized background effects component with grid pattern
 */
const BackgroundEffects = memo<BackgroundEffectsProps>(({ 
  opacity = BACKGROUND_CONFIG.gridOpacity,
  gridSize = BACKGROUND_CONFIG.gridSize,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0" style={{ opacity }}>
        <div 
          className="w-full h-full" 
          style={getGridStyles(opacity, String(gridSize))}
        />
      </div>
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';

export default BackgroundEffects;
