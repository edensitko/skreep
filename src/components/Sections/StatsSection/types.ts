// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Stat {
  readonly number: string;
  readonly suffix: string;
  readonly label: string;
  readonly color: string;
}

export interface StatCardProps {
  stat: Stat;
}

export interface StatsInfoProps {
  description: string;
  buttonText: string;
  buttonHref: string;
}
