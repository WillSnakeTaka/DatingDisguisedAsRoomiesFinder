import { prisma } from "@/utils/prisma/client";
import { CreateListingData, UpdateListingData } from "@/types"; // Adjust path as needed

export async function createListing(listingData: CreateListingData) {
    try {
        const newListing = await prisma.listing.create({
            data: {
                title: listingData.title,
                description: listingData.description,
                price: listingData.price,
                image_url: listingData.image_url,
                location: listingData.location,
                category: listingData.category,
                is_active: listingData.is_active ?? true,
                is_featured: listingData.is_featured ?? false,
                creator_clerkId: listingData.clerkId,
                ListingHobby: {
                    create: listingData.hobbyIds.map((hobbyId) => ({
                        hobbyId,
                    })),
                },
            },
            include: {
                ListingHobby: {
                    include: {
                        hobby: true,
                    },
                },
            },
        });

        return newListing;
    } catch (error) {
        console.error("Error creating listing:", error);
        throw error;
    }
}

export async function updateListing(id: number, listingData: UpdateListingData) {
    try {
        const { hobbyIds, ...rest } = listingData;

        const updatedListing = await prisma.listing.update({
            where: { id },
            data: {
                ...rest,
                ...(hobbyIds && {
                    ListingHobby: {
                        deleteMany: {},
                        create: hobbyIds.map((hobbyId) => ({ hobbyId })),
                    },
                }),
            },
            include: {
                ListingHobby: {
                    include: {
                        hobby: true,
                    },
                },
            },
        });

        return updatedListing;
    } catch (error) {
        console.error("Error updating listing:", error);
        throw error;
    }
}
