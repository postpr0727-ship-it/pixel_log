import { NextRequest, NextResponse } from 'next/server';
import { videoLinkService } from '@/lib/supabase';
import { videoLinkFormSchema } from '@/lib/validations';
import { auth } from '@/auth';
import { getVideoThumbnail } from '@/lib/youtube';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

export async function GET() {
  try {
    const session = await auth();
    const isAdmin = session?.user?.email === ADMIN_EMAIL;

    const videoLinks = isAdmin
      ? await videoLinkService.getAllAdmin()
      : await videoLinkService.getAll();

    return NextResponse.json({ data: videoLinks });
  } catch (error: any) {
    console.error('Error fetching video links:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to fetch video links', details: error.message },
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
    const validationResult = videoLinkFormSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Video link validation failed:', validationResult.error.format());
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Auto-generate thumbnail from video URL if not provided
    let thumbnailUrl = data.thumbnail_url;
    if (!thumbnailUrl || thumbnailUrl === '') {
      const autoThumbnail = getVideoThumbnail(data.url);
      if (autoThumbnail) {
        thumbnailUrl = autoThumbnail;
      }
    }

    const videoLink = await videoLinkService.create({
      title: data.title,
      url: data.url,
      thumbnail_url: thumbnailUrl || undefined,
      description: data.description,
      video_type: data.video_type,
      is_published: data.is_published,
      display_order: data.display_order,
    });

    return NextResponse.json(
      { message: 'Video link created', data: videoLink },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating video link:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Failed to create video link', details: error.message },
      { status: 500 }
    );
  }
}
