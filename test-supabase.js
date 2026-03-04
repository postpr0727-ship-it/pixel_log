
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('--- Environment Check ---');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', url ? 'Present' : 'Missing');
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', key ? 'Present' : 'Missing');
    console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceKey ? 'Present' : 'Missing');
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

    if (!url || !key) {
        console.log('Error: Supabase URL or Anon Key is missing.');
        return;
    }

    const supabase = createClient(url, key);

    console.log('\n--- Testing Public Connection (video_links) ---');
    try {
        const { data, error } = await supabase.from('video_links').select('*').limit(1);
        if (error) {
            console.log('Public fetch failed:', error);
        } else {
            console.log('Public fetch success! Data found:', data.length);
        }
    } catch (err) {
        console.log('Public fetch threw exception:', err);
    }

    if (serviceKey) {
        console.log('\n--- Testing Admin Connection (video_links) ---');
        const adminSupabase = createClient(url, serviceKey);
        try {
            const { data, error } = await adminSupabase.from('video_links').select('*').limit(1);
            if (error) {
                console.log('Admin fetch failed:', error);
            } else {
                console.log('Admin fetch success! Data found:', data.length);
            }
        } catch (err) {
            console.log('Admin fetch threw exception:', err);
        }
    }
}

testSupabase();
