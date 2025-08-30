// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ComparisonRow {
  readonly category: string;
  readonly agencies?: string;
  readonly competitors?: string;
  readonly freelancers: string;
  readonly inHouse?: string;
  readonly software?: string;
  readonly skreep: string;
}

export interface ComparisonRowProps {
  row: ComparisonRow;
  index: number;
  language: string;
}
