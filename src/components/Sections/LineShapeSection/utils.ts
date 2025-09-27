import type { DiagonalLine, LineShapeConfig } from './types';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate diagonal lines configuration for main lines
 */
export const generateMainLines = (config: LineShapeConfig): DiagonalLine[] => {
  return Array.from({ length: config.linesCount }, (_, i) => ({
    id: i,
    width: '2px',
    height: '100%',
    left: `${i * config.spacing}%`,
    rotation: config.baseRotation + i * config.rotationIncrement,
    opacity: 'via-white/10',
    gradient: 'from-transparent via-white/10 to-transparent'
  }));
};

/**
 * Generate diagonal lines configuration for cross lines
 */
export const generateCrossLines = (config: LineShapeConfig): DiagonalLine[] => {
  return Array.from({ length: config.linesCount }, (_, i) => ({
    id: i + config.linesCount,
    width: '1px',
    height: '100%',
    right: `${i * config.spacing}%`,
    rotation: -(config.baseRotation + i * config.rotationIncrement),
    opacity: 'via-white/5',
    gradient: 'from-transparent via-white/5 to-transparent'
  }));
};
