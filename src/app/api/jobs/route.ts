import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Optional filtering parameters
  const type = searchParams.get('type');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const jobs = await prisma.job.findMany({
      where: type ? { type } : undefined,
      orderBy: { postedAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
