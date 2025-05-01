import { prisma } from "@/utils/prisma/client";

/**
 * Finds listings that match a user's hobbies.
 */
export async function matchListingsForUser(clerkId: string) {
    // Step 1: Fetch the user's hobby IDs
    const user = await prisma.user.findUnique({
        where: { clerkId },
        include: {
            UserHobby: {
                include: {
                    hobby: true,
                },
            },
        },
    });

    if (!user || user.UserHobby.length === 0) {
        return [];
    }

    const userHobbyIds = user.UserHobby.map((uh) => uh.hobbyId);
    const { min_budget, max_budget, location } = user;

    // Step 2: Find listings that share hobbies
    const listings = await prisma.listing.findMany({
        where: {
            ListingHobby: {
                some: {
                    hobbyId: { in: userHobbyIds },
                },
            },
            is_active: true,
        },
        include: {
            ListingHobby: {
                include: {
                    hobby: true,
                },
            },
            user: true,
        },
    });

    // Optional: Rank by number of matching hobbies
    const rankedListings = listings
        .map(listing => {
            const matchCount = listing.ListingHobby.filter(h =>
                userHobbyIds.includes(h.hobbyId)
            ).length;
            return { ...listing, matchCount };
        })
        .sort((a, b) => b.matchCount - a.matchCount);

    return rankedListings;
}
