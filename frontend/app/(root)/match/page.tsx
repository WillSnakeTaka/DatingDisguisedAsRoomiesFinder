import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma/client";
import MatchClient from "./MatchClient";

export default async function MatchPage() {
    const { userId } = await auth();

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">Please sign in to view matches</div>
            </div>
        );
    }

    // Get current user's preferences and hobbies
    const currentUser = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            UserHobby: {
                include: {
                    hobby: true
                }
            }
        }
    });

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">User not found</div>
            </div>
        );
    }

    // Get potential matches based on preferences and hobbies
    const matches = await prisma.user.findMany({
        where: {
            clerkId: { not: userId }, // Exclude current user
            // Match on preferences
            OR: [
                { cleanliness: currentUser.cleanliness },
                { smoking: currentUser.smoking },
                { pets: currentUser.pets },
                // Budget range overlap
                {
                    AND: [
                        { min_budget: { lte: currentUser.max_budget } },
                        { max_budget: { gte: currentUser.min_budget } }
                    ]
                }
            ],
            // Match on hobbies
            UserHobby: {
                some: {
                    hobby: {
                        id: {
                            in: currentUser.UserHobby.map(uh => uh.hobbyId)
                        }
                    }
                }
            }
        },
        include: {
            UserHobby: {
                include: {
                    hobby: true
                }
            }
        }
    });

    return (
        <MatchClient
            currentUser={currentUser}
            matches={matches}
        />
    );
}