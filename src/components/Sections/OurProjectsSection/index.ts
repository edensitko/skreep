// ============================================================================
// OUR PROJECTS SECTION - BARREL EXPORTS
// ============================================================================

export { default } from './OurProjectsSection';
export { default as ProjectCard } from './ProjectCard';
export type { 
  ProjectSection, 
  ProjectCardProps, 
  MouseAnimationProps, 
  ScrollProgressHook 
} from './types';
export { 
  PROJECT_SECTIONS, 
  SECTION_TITLE, 
  SECTION_SUBTITLE, 
  VIEW_MORE_TEXT, 
  VIEW_MORE_PROJECTS_TEXT, 
} from './constants';
export { 
  useScrollProgress, 
  useMouseAnimation, 
  useIntersectionAnimation 
} from './hooks';
