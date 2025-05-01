'use server';

import { prisma } from "@/utils/prisma/client";

export async function getAllListings() {
    try {
        const listings = await prisma.listing.findMany({
            include: {
                ListingHobby: {
                    include: {
                        hobby: true
                    }
                }
            }
        });
        return listings;
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw new Error("Failed to fetch listings");
    }
} 