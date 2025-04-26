import { getFeedbacks } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const feedbacks = getFeedbacks();
  return NextResponse.json(feedbacks);
}