import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/lib/supabase';
import { portfolioFormSchema } from '@/lib/validations';
import { auth } from '@/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

// Public GET - fetch published portfolios
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const isAdmin = session?.user?.email === ADMIN_EMAIL;
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const portfolios = isAdmin
      ? await portfolioService.getAllAdmin()
      : await portfolioService.getAll(category || undefined);

    return NextResponse.json({ data: portfolios });
  } catch (error: any) {
    console.error('Error fetching portfolios:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to fetch portfolios', details: error.message },
      { status: 500 }
    );
  }
}

// Admin POST - create new portfolio
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validationResult = portfolioFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const portfolio = await portfolioService.create({
      title: data.title,
      category: data.category,
      thumbnail_url: data.thumbnail_url || '',
      images: data.images,
      description: data.description || '',
      client_name: data.client_name,
      project_date: data.project_date,
      affiliation: data.affiliation || undefined,
      link_url: data.link_url || undefined,
      is_published: data.is_published,
      display_order: 0,
    });

    return NextResponse.json(
      { message: 'Portfolio created successfully', data: portfolio },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating portfolio:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to create portfolio', details: error.message },
      { status: 500 }
    );
  }
}
