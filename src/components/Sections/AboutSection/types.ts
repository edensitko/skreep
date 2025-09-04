// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface AboutContent {
  readonly title: string;
  readonly heading: string;
  readonly description: string;
  readonly buttonText: string;
}

export interface AboutImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}
