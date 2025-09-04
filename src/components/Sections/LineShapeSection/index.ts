// ============================================================================
// LINE SHAPE SECTION - BARREL EXPORTS
// ============================================================================

export { default } from './LineShapeSection';
export { default as DiagonalLines } from './DiagonalLines';
export type { 
  DiagonalLine, 
  DecorativeElement, 
  LineShapeConfig 
} from './types';
export { 
  LINE_SHAPE_CONFIG, 
  DECORATIVE_ELEMENTS, 
  SECTION_CONTENT, 
  GRID_STYLES 
} from './constants';
export { generateMainLines, generateCrossLines } from './utils';
