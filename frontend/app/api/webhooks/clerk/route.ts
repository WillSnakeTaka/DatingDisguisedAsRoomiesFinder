import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/utils/prisma/client';

// Handles Clerk webhook events
// Handles Clerk "user.created" webhook event

const checkExistingUser = async (clerkId: string) => {

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
        where: { clerkId },
    });

    return existingUser;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body.data;

        // Check if the user already exists
        checkExistingUser(data.id).then(existingUser => {
            if (existingUser) {
                // If user already exists, you can return early or update the user.
                console.log("User already exists:", data.id);
                return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
            }
        })


        console.log('Received webhook data:', data);

        //if (data.type !== 'user.created') return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });

        // Destructure required values safely
        const clerkId = data.id;
        const email = data.email_addresses?.[0]?.email_address;
        const firstName = data.first_name || null;
        const lastName = data.last_name || null;
        const username = data.username || null;
        const phone = data.phone_numbers?.[0]?.phone_number || null;

        // Validate required fields
        if (!clerkId || !email) {
            return NextResponse.json({ error: 'Missing clerkId or email' }, { status: 400 });
        }

        // Insert user into the database
        await prisma.user.create({
            data: {
                clerkId,
                email,
                firstName,
                lastName,
                username,
                phone,
                date_of_birth: new Date(),
                min_budget: 0,             // placeholder value
                max_budget: 1000           // placeholder value
            },
        });

        return NextResponse.json({ message: 'User inserted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error inserting user:', error);
        return NextResponse.json({ error: 'Failed to insert user' }, { status: 500 });
    }
}

// Handles Clerk "user.updated" webhook event
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const data = body.data;
        if (data.type !== 'user.updated') return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
        // Destructure required values safely
        const clerkId = data.id;
        const email = data.email_addresses?.[0]?.email_address;
        const firstName = data.first_name || null;
        const lastName = data.last_name || null;
        const username = data.username || null;
        const phone = data.phone_numbers?.[0]?.phone_number || null;
        // Validate required fields
        if (!clerkId || !email) {
            return NextResponse.json({ error: 'Missing clerkId or email' }, { status: 400 });
        }
        // Update user in the database
        await prisma.user.update({
            where: { clerkId },
            data: {
                email,
                firstName,
                lastName,
                username,
                phone,
            },
        });
        return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

// Handles Clerk "user.deleted" webhook event


// GET: (Example) Return all users
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('GET users error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

}