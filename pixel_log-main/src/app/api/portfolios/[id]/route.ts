import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/lib/supabase';
import { portfolioFormSchema } from '@/lib/validations';
import { auth } from '@/auth';

const ALLOWED_EMAIL = 'postpr0727@gmail.com';

// GET single portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolio = await portfolioService.getById(id);
    return NextResponse.json({ data: portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Portfolio not found' },
      { status: 404 }
    );
  }
}

// PUT update portfolio
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.email !== ALLOWED_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const validationResult = portfolioFormSchema.partial().safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const portfolio = await portfolioService.update(id, validationResult.data);
    return NextResponse.json({ message: 'Portfolio updated', data: portfolio });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

// DELETE portfolio
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.email !== ALLOWED_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await portfolioService.delete(id);
    return NextResponse.json({ message: 'Portfolio deleted' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}
