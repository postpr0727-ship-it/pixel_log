import { NextRequest, NextResponse } from 'next/server';
import { blogLinkService } from '@/lib/supabase';
import { blogLinkFormSchema } from '@/lib/validations';
import { auth } from '@/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

export async function GET() {
  try {
    const session = await auth();
    const isAdmin = session?.user?.email === ADMIN_EMAIL;

    const blogLinks = isAdmin
      ? await blogLinkService.getAllAdmin()
      : await blogLinkService.getAll();

    return NextResponse.json({ data: blogLinks });
  } catch (error: any) {
    console.error('Error fetching blog links:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to fetch blog links', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = blogLinkFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const blogLink = await blogLinkService.create({
      title: data.title,
      url: data.url,
      thumbnail_url: data.thumbnail_url || undefined,
      description: data.description,
      is_published: data.is_published,
      display_order: data.display_order,
    });

    return NextResponse.json(
      { message: 'Blog link created', data: blogLink },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog link:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to create blog link', details: error.message },
      { status: 500 }
    );
  }
}
