import { NextRequest, NextResponse } from 'next/server';
import { blogLinkService } from '@/lib/supabase';
import { blogLinkFormSchema } from '@/lib/validations';
import { auth } from '@/auth';

const ALLOWED_EMAIL = process.env.ADMIN_EMAIL || 'postpr0727@gmail.com';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { data, error } = await (await import('@/lib/supabase')).supabase
            .from('blog_links')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (error: any) {
        console.error('Error fetching blog link:', error);
        return NextResponse.json(
            { error: 'Blog link not found' },
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

        const validationResult = blogLinkFormSchema.partial().safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const blogLink = await blogLinkService.update(id, validationResult.data);
        return NextResponse.json({ message: 'Blog link updated', data: blogLink });
    } catch (error: any) {
        console.error('Error updating blog link:', error);
        return NextResponse.json(
            { error: 'Failed to update blog link' },
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
        await blogLinkService.delete(id);
        return NextResponse.json({ message: 'Blog link deleted' });
    } catch (error: any) {
        console.error('Error deleting blog link:', error);
        return NextResponse.json(
            { error: 'Failed to delete blog link' },
            { status: 500 }
        );
    }
}
