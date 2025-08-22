// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ProjectSection {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly gradient: string;
  readonly accentColor: string;
  readonly image: string;
}

export interface ProjectCardProps {
  section: ProjectSection;
  index: number;
  language: string;
}

export interface MouseAnimationProps {
  mouseAnimRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export interface ScrollProgressHook {
  scrollProgress: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}
