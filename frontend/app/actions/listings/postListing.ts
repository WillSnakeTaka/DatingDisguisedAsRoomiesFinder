import { prisma } from "@/utils/prisma/client";
import { CreateListingFormData } from './listings';

export async function postListing(data: CreateListingFormData) {
    const { title, description, price, image_url, location, category, creator_clerkId, hobbies } = data;

    try {
        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                price,
                image_url: image_url || null,
                location: location || null,
                category: category || null,
                is_active: true,
                is_featured: false,
                creator_clerkId,
                ListingHobby: {
                    create: (hobbies || []).map(hobbyId => ({
                        hobby: {
                            connect: { id: hobbyId }
                        }
                    }))
                }
            },
            include: {
                ListingHobby: {
                    include: {
                        hobby: true
                    }
                }
            }
        });

        return { success: true, listing };
    } catch (error) {
        console.error('Error creating listing:', error);
        return { success: false, error: 'Failed to create listing' };
    }
}
