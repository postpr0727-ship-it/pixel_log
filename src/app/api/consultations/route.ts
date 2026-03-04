import { NextRequest, NextResponse } from 'next/server';
import { consultationService } from '@/lib/supabase';
import { contactFormSchema } from '@/lib/validations';
import { sendConsultationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Save to database
    const consultation = await consultationService.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service_type: data.service_type,
      budget: data.budget,
      message: data.message,
    });

    // Send email notifications
    try {
      await sendConsultationEmail(consultation);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      { message: 'Consultation request submitted successfully', data: consultation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // This endpoint is protected by middleware
  // Only admin can access
  try {
    const consultations = await consultationService.getAllAdmin();
    return NextResponse.json({ data: consultations });
  } catch (error: any) {
    console.error('Error fetching consultations:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to fetch consultations', details: error.message },
      { status: 500 }
    );
  }
}
