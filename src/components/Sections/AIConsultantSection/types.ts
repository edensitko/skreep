// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ChatMessage {
  readonly id: string;
  readonly text: string;
  readonly isUser: boolean;
  readonly timestamp: Date;
}

export interface ExamplePrompt {
  readonly id: number;
  readonly text: string;
  readonly category: string;
  readonly icon: string;
}

export interface ChatContainerProps {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  onClose: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
}

export interface PromptFormProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onExampleClick: (text: string) => void;
  examples: readonly ExamplePrompt[];
}
