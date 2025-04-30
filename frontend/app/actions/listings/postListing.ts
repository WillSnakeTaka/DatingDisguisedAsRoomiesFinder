'use server';
import { prisma } from '@/utils/prisma/client';
import { Listing as PrismaListing } from '@prisma/client';

export interface ListingInput {
    title: string;
    description: string;
    interestPool: string[]; // Interests like "music", "cooking", etc.
    price: number; // price for the listing
    image_url: string | null; // image_url for the listing
    location: string | null; // location for the listing
    category: string | null; // type of listing like apartment, house, etc.
    is_active: boolean; // if the listing is active or not
    is_featured: boolean; // if the listing is featured or not
    clerkId: string, // Clerk ID, references User.clerkId
}

export async function postListing(listingData: ListingInput): Promise<PrismaListing | null> {
    try {
        const { clerkId, ...rest } = listingData;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { clerkId: clerkId },
        });

        // If the user doesn't exist, return null or handle accordingly
        if (!user) {
            console.error('User with the provided clerkId does not exist');
            return null;
        }

        // Proceed with creating the listing since the user exists
        const newListing = await prisma.listing.create({
            data: {
                ...rest,
                clerkId: clerkId, // Since the listing references the clerkId, directly set it here
            },
        });

        console.log('New listing created:', newListing);
        return newListing;
    } catch (error) {
        console.error('Error creating listing:', error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}
