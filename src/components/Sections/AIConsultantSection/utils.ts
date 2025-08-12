import type { ChatMessage } from './types';
import { AI_RESPONSE_TEMPLATE } from './constants';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate unique message ID
 */
export const generateMessageId = (type: 'user' | 'ai', counter: number): string => {
  return `${type}-${counter}`;
};

/**
 * Create user message
 */
export const createUserMessage = (text: string, counter: number): ChatMessage => ({
  id: generateMessageId('user', counter),
  text: text.trim(),
  isUser: true,
  timestamp: new Date()
});

/**
 * Create AI response message
 */
export const createAIMessage = (userText: string, counter: number): ChatMessage => ({
  id: generateMessageId('ai', counter),
  text: AI_RESPONSE_TEMPLATE(userText),
  isUser: false,
  timestamp: new Date()
});

/**
 * Auto-scroll chat container to bottom
 */
export const scrollToBottom = (containerRef: React.RefObject<HTMLDivElement | null>): void => {
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
};
