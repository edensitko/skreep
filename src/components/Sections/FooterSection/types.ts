// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FooterLink {
  readonly href: string;
  readonly text: string;
  readonly ariaLabel?: string;
}

export interface ScrollButtonProps {
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export interface SocialButtonProps {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  className?: string;
}
