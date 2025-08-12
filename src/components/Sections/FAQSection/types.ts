// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface FAQ {
  readonly id: number;
  readonly question: string;
  readonly answer: string;
}

export interface FAQItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

export type UserType = 'entrepreneur' | 'business';
