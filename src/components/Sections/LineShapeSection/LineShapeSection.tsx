'use client';

import React, { memo } from 'react';
import DiagonalLines from './DiagonalLines';
import { LINE_SHAPE_CONFIG, DECORATIVE_ELEMENTS, SECTION_CONTENT, GRID_STYLES } from './constants';
import { generateMainLines, generateCrossLines } from './utils';

/**
 * Line Shape section with animated diagonal lines and decorative elements
 * Creates a dynamic visual background pattern
 */
function LineShapeSection() {
  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================
  
  const mainLines = generateMainLines(LINE_SHAPE_CONFIG);
  const crossLines = generateCrossLines(LINE_SHAPE_CONFIG);

  return (
    <section 
      className="relative w-full bg-black overflow-hidden"
      role="region"
      aria-label="רקע דקורטיבי"
    >
      {/* Line Shape Container */}
      <div className={`line-shape w-full ${SECTION_CONTENT.height} relative`}>
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div 
            className="w-full h-full"
            style={GRID_STYLES}
          />
        </div>

        {/* Diagonal Lines */}
        <div className="absolute inset-0" aria-hidden="true">
          {/* Main diagonal lines */}
          <DiagonalLines lines={mainLines} direction="left" />

          {/* Cross diagonal lines */}
          <DiagonalLines lines={crossLines} direction="right" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0" aria-hidden="true">
          {DECORATIVE_ELEMENTS.map((element) => (
            <div
              key={element.id}
              className={`absolute ${element.position} ${element.size} ${element.color} rounded-full ${element.opacity}`}
            />
          ))}
        </div>

        {/* Central Content Area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/60">
            <p className="text-lg font-medium" dir="rtl">
              {SECTION_CONTENT.text}
            </p>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" aria-hidden="true"></div>
      </div>
    </section>
  );
}

export default memo(LineShapeSection);
