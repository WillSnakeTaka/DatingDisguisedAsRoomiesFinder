"use server"
import { prisma } from '@/utils/prisma/client';
import { User } from '@/app/types/user';

export default async function saveUser(userData: User) {

    try {

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userData.clerkId,
            },
        });
        if (existingUser) {
            console.log('User already exists:', existingUser);
            return existingUser;
        }
        const newUser = await prisma.user.create({
            data: {
                clerkId: userData.clerkId,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                hobbies: {
                    connectOrCreate: userData.hobbies.map(hobby => ({
                        where: { name: hobby },
                        create: { name: hobby },
                    })),
                },
            },
        });
        console.log('New user created:', newUser);
        return newUser;

    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
}
