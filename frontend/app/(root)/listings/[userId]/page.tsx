import { getUserListings } from "@/app/actions/listings/listingActions";
import { auth } from "@clerk/nextjs/server";
import UserListingsClient from "./UserListingsClient";

export default async function UserListingsPage({ params }: { params: { userId: string } }) {
    const { userId: currentUserId } = await auth();
    const listings = await getUserListings(params.userId);
    const isOwnProfile = currentUserId === params.userId;

    return (
        <UserListingsClient
            listings={listings}
            isOwnProfile={isOwnProfile}
        />
    );
}
