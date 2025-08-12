// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ServiceCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly longDescription: string;
  readonly features: readonly string[];
  readonly color: string;
  readonly imageBg: string;
}

export interface ServiceCardProps {
  service: ServiceCard;
  isSelected: boolean;
  onSelect: (service: ServiceCard) => void;
  className?: string;
}

export interface ServiceDetailsProps {
  service: ServiceCard;
  className?: string;
}

export interface ScrollControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  className?: string;
}

export interface ShowcaseState {
  readonly selectedService: ServiceCard | null;
  readonly canScrollLeft: boolean;
  readonly canScrollRight: boolean;
  readonly isVisible: boolean;
}

export interface ScrollPosition {
  readonly scrollLeft: number;
  readonly scrollWidth: number;
  readonly clientWidth: number;
}
