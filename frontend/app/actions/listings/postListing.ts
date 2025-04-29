'use server';
import { prisma } from '@/utils/prisma/client';

export interface Listing {
    title: string;
    description: string;
    interestPool: string[]; // Interests like "music", "cooking", etc.
    price: number; // price for the listing
    image_url: string | null; // image_url for the listing
    location: string | null; // location for the listing
    category: string | null; // type of listing like apartment, house, etc.
    is_active: boolean; // if the listing is active or not
    is_featured: boolean; // if the listing is featured or not
}

export async function postListing(ListingData: Listing) {
    const {
        title,
        description,
        interestPool,
        price,
        image_url,
        location,
        category,
        is_active,
        is_featured,
    } = ListingData;

    try {
        // Creating a new listing in the database using Prisma
        const newListing = await prisma.listing.create({
            data: {
                title,
                description,
                interestPool,
                price,
                image_url,
                location,
                category,
                is_active,
                is_featured,
            },
        });

        console.log('New listing created:', newListing);

        return newListing; // Return the created listing
    } catch (error) {
        console.error('Error creating listing:', error);
        return null;
    } finally {
        // Always disconnect Prisma Client to avoid hanging connections
        await prisma.$disconnect();
    }
}
