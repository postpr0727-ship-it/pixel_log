import { NextRequest, NextResponse } from 'next/server';
import { videoLinkService } from '@/lib/supabase';
import { videoLinkFormSchema } from '@/lib/validations';
import { auth } from '@/auth';
import { getVideoThumbnail } from '@/lib/youtube';

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { data, error } = await (await import('@/lib/supabase')).supabase
            .from('video_links')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Error fetching video link:', error);
        return NextResponse.json(
            { error: 'Video link not found' },
            { status: 404 }
        );
    }
}

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

        const validationResult = videoLinkFormSchema.partial().safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const data = validationResult.data;

        // Auto-generate thumbnail from video URL if URL is provided but thumbnail is not
        if (data.url && (!data.thumbnail_url || data.thumbnail_url === '')) {
            const autoThumbnail = getVideoThumbnail(data.url);
            if (autoThumbnail) {
                data.thumbnail_url = autoThumbnail;
            }
        }

        const videoLink = await videoLinkService.update(id, data);
        return NextResponse.json({ message: 'Video link updated', data: videoLink });
    } catch (error: any) {
        console.error('Error updating video link:', error);
        return NextResponse.json(
            { error: 'Failed to update video link' },
            { status: 500 }
        );
    }
}

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
        await videoLinkService.delete(id);
        return NextResponse.json({ message: 'Video link deleted' });
    } catch (error: any) {
        console.error('Error deleting video link:', error);
        return NextResponse.json(
            { error: 'Failed to delete video link' },
            { status: 500 }
        );
    }
}
