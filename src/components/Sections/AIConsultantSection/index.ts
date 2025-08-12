// ============================================================================
// AI CONSULTANT SECTION - BARREL EXPORTS
// ============================================================================

export { default } from './AIConsultantSection';
export { default as ChatContainer } from './ChatContainer';
export { default as PromptForm } from './PromptForm';
export type { 
  ChatMessage, 
  ExamplePrompt, 
  ChatContainerProps, 
  PromptFormProps 
} from './types';
export { 
  EXAMPLE_PROMPTS, 
  SECTION_CONTENT, 
  AI_RESPONSE_TEMPLATE, 
  GRID_STYLES 
} from './constants';
export { 
  generateMessageId, 
  createUserMessage, 
  createAIMessage, 
  scrollToBottom 
} from './utils';
