import { prisma } from '@/utils/prisma/client';

// Example to create a user
async function createUser() {
    try {
        const newUser = await prisma.user.create({
            data: {
                clerkId: 'clerk_123456',
                email: 'user@example.com',
                firstName: 'John',
                lastName: 'Doe',
            },
        });

        console.log('New user created:', newUser);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Example to fetch user
async function getUser() {
    const user = await prisma.user.findUnique({
        where: { clerkId: 'clerk_123456' },
    });
    console.log(user);
}

createUser();

