import { NextRequest, NextResponse } from 'next/server';
import { consultationService } from '@/lib/supabase';
import { consultationStatusSchema } from '@/lib/validations';
import { auth } from '@/auth';

const ALLOWED_EMAIL = 'postpr0727@gmail.com';

export async function PATCH(
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

    const validationResult = consultationStatusSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { status, admin_notes } = validationResult.data;
    const consultation = await consultationService.updateStatus(id, status, admin_notes);

    return NextResponse.json({ message: 'Status updated', data: consultation });
  } catch (error) {
    console.error('Error updating consultation:', error);
    return NextResponse.json(
      { error: 'Failed to update consultation' },
      { status: 500 }
    );
  }
}
