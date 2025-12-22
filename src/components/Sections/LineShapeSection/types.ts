// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface DiagonalLine {
  readonly id: number;
  readonly width: string;
  readonly height: string;
  readonly left?: string;
  readonly right?: string;
  readonly rotation: number;
  readonly opacity: string;
  readonly gradient: string;
}

export interface DecorativeElement {
  readonly id: number;
  readonly position: string;
  readonly size: string;
  readonly color: string;
  readonly opacity: string;
}

export interface LineShapeConfig {
  readonly linesCount: number;
  readonly baseRotation: number;
  readonly rotationIncrement: number;
  readonly spacing: number;
}
