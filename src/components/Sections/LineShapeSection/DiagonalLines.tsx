import React, { memo } from 'react';
import type { DiagonalLine } from './types';

interface DiagonalLinesProps {
  lines: DiagonalLine[];
  direction: 'left' | 'right';
}

/**
 * Memoized diagonal lines component
 */
const DiagonalLines = memo<DiagonalLinesProps>(({ lines, direction }) => (
  <div className={`absolute top-0 ${direction}-0 w-full h-full`}>
    {lines.map((line) => (
      <div
        key={line.id}
        className={`absolute bg-gradient-to-r ${line.gradient}`}
        style={{
          width: line.width,
          height: line.height,
          ...(line.left && { left: line.left }),
          ...(line.right && { right: line.right }),
          transform: `rotate(${line.rotation}deg)`,
          transformOrigin: `top ${direction}`
        }}
      />
    ))}
  </div>
));

DiagonalLines.displayName = 'DiagonalLines';

export default DiagonalLines;
