import { prisma } from "@/utils/prisma/client";

// Assuming you have hobby IDs that you want to associate with the listing
export async function postListing(listingData: any) {
    const { title, description, price, image_url, location, category, is_active, is_featured, clerkId, hobbyIds } = listingData;

    try {
        // Create the listing first
        const newListing = await prisma.listing.create({
            data: {
                title,
                description,
                price,
                image_url,
                location,
                category,
                is_active,
                is_featured,
                creator_clerkId: clerkId,
                // Create relationships for hobbies
                ListingHobby: {
                    create: hobbyIds.map((hobbyId: number) => ({
                        hobbyId,
                    })),
                },
            },
        });

        console.log("New listing created:", newListing);
        return newListing;
    } catch (error) {
        console.error("Error creating listing:", error);
        throw error;
    }
}
