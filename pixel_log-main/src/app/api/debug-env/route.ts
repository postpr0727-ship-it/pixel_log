
import { NextResponse } from 'next/server';

export async function GET() {
    const envVars = {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT' : 'MISSING',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'PRESENT' : 'MISSING',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'PRESENT' : 'MISSING',
        ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'PRESENT' : 'MISSING',
        AUTH_SECRET: process.env.AUTH_SECRET ? 'PRESENT' : 'MISSING',
    };

    return NextResponse.json(envVars);
}
