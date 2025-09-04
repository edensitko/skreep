export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

export interface ChatState {
  messages: Message[];
  isActive: boolean;
  isTyping: boolean;
  isLoading: boolean;
}

export type ChatMode = 'input' | 'chat';
