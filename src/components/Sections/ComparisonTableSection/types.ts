// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ComparisonRow {
  readonly category: string;
  readonly agencies: string;
  readonly freelancers: string;
  readonly inHouse: string;
  readonly skreep: string;
}

export interface ComparisonRowProps {
  row: ComparisonRow;
  index: number;
}
