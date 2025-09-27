// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface CTAButtonProps {
  readonly onClick?: () => void;
  readonly isHovered?: boolean;
  readonly onHover?: (hovered: boolean) => void;
  readonly className?: string;
  readonly disabled?: boolean;
}

export interface AnimationState {
  readonly isVisible: boolean;
  readonly mounted: boolean;
  readonly isHovered: boolean;
}

export interface BackgroundEffectsProps {
  readonly opacity?: number;
  readonly gridSize?: string;
  readonly className?: string;
}
