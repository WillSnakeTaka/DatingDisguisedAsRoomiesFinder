import { prisma } from '@/utils/prisma/client';

interface UserData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    clerkId: string;
    hobbies: string[]; // Array of hobby names
}

/**
 * Saves a user to the database.
 * @param {UserData} userData - The user data to save.
 * @returns {Promise<User>} The created user object.
 * @throws {Error} If there is an error creating the user.
 */

export async function saveUser(userData: UserData) {

    try {
        const user = await prisma.user.create({
            data: {
                clerkId: userData.clerkId,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                hobbies: {
                    connectOrCreate: userData.hobbies.map((hobby) => ({
                        where: { name: hobby },  // Check if the hobby exists by name
                        create: { name: hobby }, // If not, create it
                    })),
                },
            },
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}