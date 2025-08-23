import openai, { OPENAI_CONFIG } from './config';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendChatMessage(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // Prepare messages array with system prompt and conversation history
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: OPENAI_CONFIG.systemPrompt
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: messages,
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      return {
        success: false,
        error: 'לא התקבלה תגובה מהמערכת'
      };
    }

    return {
      success: true,
      message: assistantMessage
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return {
          success: false,
          error: 'שגיאה במפתח API - אנא בדקו את ההגדרות'
        };
      }
      
      if (error.message.includes('rate limit')) {
        return {
          success: false,
          error: 'חרגנו מהמגבלה - אנא נסו שוב בעוד כמה דקות'
        };
      }
    }

    return {
      success: false,
      error: 'שגיאה בחיבור למערכת הבינה המלאכותית'
    };
  }
}
