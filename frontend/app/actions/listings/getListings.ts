"use server";
import { prisma } from '@/utils/prisma/client';
import { Listing } from '@/app/types/listing';

// Server action to fetch listings from the database

export async function getListings(): Promise<Listing[]> {

    try {

        const listing = await prisma.listing.findMany({
            where: {
                is_active: true,
                is_featured: true,
            },
        })

        // Check if listing is empty
        if (listing.length === 0) {
            console.log('No listings found');
            return [];
        }

        return listing.map(item => ({
            ...item,
            interestPool: [], // Default or fetched value for interestPool
            clerkId: item.creator_clerkId, // Map creator_clerkId to clerkId
        }));

    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }

}
