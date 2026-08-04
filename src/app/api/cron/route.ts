import { NextResponse } from 'next/server';
import { runScraper } from '@/lib/scraper';

// This API route is intended to be hit by a cron job scheduler (like Vercel Cron)
export async function GET(request: Request) {
  // Simple security check to prevent unauthorized triggering
  const authHeader = request.headers.get('authorization');
  
  // In production, CRON_SECRET would be set in Vercel to match the header
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runScraper();
  
  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}
