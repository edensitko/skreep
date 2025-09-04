import type { DecorativeElement, LineShapeConfig } from './types';

// ============================================================================
// CONSTANTS
// ============================================================================

export const LINE_SHAPE_CONFIG: LineShapeConfig = {
  linesCount: 20,
  baseRotation: 15,
  rotationIncrement: 2,
  spacing: 5
} as const;

export const DECORATIVE_ELEMENTS: ReadonlyArray<DecorativeElement> = [
  {
    id: 1,
    position: "top-1/4 right-1/4",
    size: "w-2 h-2",
    color: "bg-cyan-400",
    opacity: "opacity-60"
  },
  {
    id: 2,
    position: "top-3/4 left-1/3",
    size: "w-3 h-3",
    color: "bg-purple-400",
    opacity: "opacity-40"
  },
  {
    id: 3,
    position: "top-1/2 right-1/3",
    size: "w-1 h-1",
    color: "bg-white",
    opacity: "opacity-80"
  }
] as const;

export const SECTION_CONTENT = {
  text: "יותר מ-111+ לקוחות שעבדנו איתם",
  height: "h-[700px]"
} as const;

export const GRID_STYLES = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px'
} as const;
