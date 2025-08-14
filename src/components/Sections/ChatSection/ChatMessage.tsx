import React from 'react';
import { Message } from './types';

type Language = 'he' | 'en';

interface ChatMessageProps {
  message: Message;
  language: Language;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, language }) => {
  return (
    <div
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.isUser
            ? 'bg-gradient-to-l from-cyan-400/20 to-cyan-400/40 text-white border border-cyan-400/30'
            : 'bg-white/10 text-white/90 border border-white/20'
        } animate-fadeIn`}
      >
        <p className="text-sm leading-relaxed text-center">{message.text}</p>
        <span className="text-xs text-white/60 mt-1 block text-center">
          {message.timestamp.toLocaleTimeString(language === 'he' ? 'he-IL' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
