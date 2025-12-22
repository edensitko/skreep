import openai, { OPENAI_CONFIG } from './config';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}

/**
 * Send a message to OpenAI and get AI response
 */
export async function sendChatMessage(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // Check if API key is available
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey || apiKey === 'dummy-key-for-build') {
      return {
        message: 'מצטער, שירות הצ\'אט זמנית לא זמין. אנא צור קשר ישירות בטלפון  או במייל info@skreep.com',
        error: 'OpenAI API key not configured',
      };
    }

    // Prepare messages array with system prompt and conversation history
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: OPENAI_CONFIG.systemPrompt,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: OPENAI_CONFIG.model,
      messages: messages,
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: OPENAI_CONFIG.temperature,
    });

    const aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response received from OpenAI');
    }

    return {
      message: aiResponse,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    return {
      message: 'מצטער, אירעה שגיאה בתקשורת עם השרת. אנא נסה שוב מאוחר יותר.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get AI consultation response for business queries
 */
export async function getAIConsultation(
  businessQuery: string,
  companyInfo?: {
    industry?: string;
    size?: string;
    currentTech?: string;
  }
): Promise<ChatResponse> {
  try {
    let enhancedPrompt = businessQuery;

    if (companyInfo) {
      enhancedPrompt = `
Company Context:
- Industry: ${companyInfo.industry || 'Not specified'}
- Company Size: ${companyInfo.size || 'Not specified'}
- Current Technology: ${companyInfo.currentTech || 'Not specified'}

Business Query: ${businessQuery}

Please provide specific AI recommendations based on this context.
      `.trim();
    }

    return await sendChatMessage(enhancedPrompt);
  } catch (error) {
    console.error('AI Consultation Error:', error);
    
    return {
      message: 'מצטער, אירעה שגיאה בקבלת ייעוץ AI. אנא נסה שוב מאוחר יותר.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
