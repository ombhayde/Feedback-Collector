import { saveFeedback } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const feedback = await request.json();
    feedback.id = Date.now().toString();
    feedback.timestamp = new Date().toISOString();
    saveFeedback(feedback);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}