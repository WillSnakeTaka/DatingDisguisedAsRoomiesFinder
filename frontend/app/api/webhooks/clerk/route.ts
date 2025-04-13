import { NextRouter, NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supaBase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This route handles Clerk webhook events
// It is triggered by the Clerk webhook and processes the event data
export async function POST(req: NextRequest) {
    const payload = await req.json();

    const { id, email_addresses, first_name, last_name, username } = payload;
    const email = email_addresses?.[0]?.email_address;

    const { error } = await supaBase.from('users').insert({
        clerk_id: id,
        email: email,
        first_name,
        last_name,
        username,
        created_at: new Date(),
    })

    if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json({ error: 'Failed to insert user into Supabase' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User inserted successfully' }, { status: 200 });
}