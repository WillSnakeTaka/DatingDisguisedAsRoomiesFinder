import { getUserListings } from "@/app/actions/listings/listingActions";
import { auth } from "@clerk/nextjs/server";
import UserListingsClient from "./UserListingsClient";

export default async function UserListingsPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId: currentUserId } = await auth();
    const { userId } = await params;
    const listings = await getUserListings(userId);
    const isOwnProfile = currentUserId === userId;

    return (
        <UserListingsClient
            listings={listings}
            isOwnProfile={isOwnProfile}
        />
    );
}
