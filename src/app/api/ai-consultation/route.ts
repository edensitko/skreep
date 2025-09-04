import { NextRequest, NextResponse } from 'next/server';
import { getAIConsultation } from '@/lib/openai/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessQuery, companyInfo } = body;

    if (!businessQuery || typeof businessQuery !== 'string') {
      return NextResponse.json(
        { error: 'Business query is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate company info if provided
    const validatedCompanyInfo = companyInfo && typeof companyInfo === 'object' 
      ? {
          industry: typeof companyInfo.industry === 'string' ? companyInfo.industry : undefined,
          size: typeof companyInfo.size === 'string' ? companyInfo.size : undefined,
          currentTech: typeof companyInfo.currentTech === 'string' ? companyInfo.currentTech : undefined,
        }
      : undefined;

    // Get AI consultation response
    const response = await getAIConsultation(businessQuery, validatedCompanyInfo);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI Consultation API Error:', error);
    
    return NextResponse.json(
      { 
        message: 'מצטער, אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר.',
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
