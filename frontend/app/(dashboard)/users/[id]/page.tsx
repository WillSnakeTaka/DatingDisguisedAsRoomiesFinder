import { auth } from "@clerk/nextjs/server";

// Define the shape of the PageProps
interface PageProps {
    params: Promise<{
        id: string; // The `id` param from the dynamic URL
    }>;
    _searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // The query parameters
}

export default async function UserPage({ params, _searchParams }: PageProps) {
    // Await the params to get the id
    const { id: profileId } = await params;

    // Await searchParams if needed
    // const searchParamsData = await searchParams;

    // Await to get the current logged-in user's ID from Clerk
    const { userId } = await auth();

    if (!userId) {
        return <div>Not signed in</div>;
    }

    //TODO:: Check if the userId is valid and exists in the database

    const isOwnProfile = userId === profileId; // Check if the current user's ID matches the profile ID

    if (isOwnProfile) {
        // Render personal dashboard for the logged-in user
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
                <p>Your Clerk ID: {userId}</p>
                {/* Add more private information here */}
            </div>
        );
    } else {
        // Render public profile for another user
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Viewing Profile: {profileId}</h1>
                <p>This is a public profile page.</p>
                {/* Add public information about the other user */}
            </div>
        );
    }
}