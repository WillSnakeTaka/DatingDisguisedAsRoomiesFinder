import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma/client";
import ProfileClient from "./ProfileClient";

interface Props {
    params: {
        userId: string;
    };
}

export default async function ProfilePage({ params }: Props) {
    const { userId: currentUserId } = await auth();
    const userId = params.userId;
    const isOwnProfile = currentUserId === userId;

    // Fetch user data
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            UserHobby: {
                include: {
                    hobby: true
                }
            }
        }
    });

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">User not found</div>
            </div>
        );
    }

    return (
        <ProfileClient
            user={user}
            isOwnProfile={isOwnProfile}
        />
    );
} 