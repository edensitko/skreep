import { NextRequest, NextResponse } from 'next/server';
import { sendChatMessage, ChatMessage } from '@/lib/openai/chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate conversation history format
    const history: ChatMessage[] = Array.isArray(conversationHistory) 
      ? conversationHistory.filter((msg: unknown) => {
          const message = msg as Record<string, unknown>;
          return message && 
            typeof message.role === 'string' && 
            typeof message.content === 'string' &&
            ['user', 'assistant', 'system'].includes(message.role);
        })
      : [];

    // Get AI response
    const response = await sendChatMessage(message, history);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    
    return NextResponse.json(
      { 
        message: 'מצטער, אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר.',
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
