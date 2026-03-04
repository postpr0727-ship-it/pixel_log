import { NextResponse } from 'next/server';
import { dashboardService } from '@/lib/supabase';

export async function GET() {
  try {
    const stats = await dashboardService.getStats();
    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: (error as any).message },
      { status: 500 }
    );
  }
}
