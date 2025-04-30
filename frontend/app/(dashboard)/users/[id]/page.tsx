import { auth } from "@clerk/nextjs/server";

interface PageProps {
    params: {
        id: string; // The `id` param from the dynamic URL
    };
}

export default async function UserPage({ params }: PageProps) {
    const { userId } = await auth(); // Get the current logged-in user's ID from Clerk

    if (!userId) {
        return <div>Not signed in</div>;
    }

    const isOwnProfile = userId === params.id; // Check if the current user's ID matches the `id` param

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
                <h1 className="text-2xl font-bold">Viewing Profile: {params.id}</h1>
                <p>This is a public profile page.</p>
                {/* Add public information about the other user */}
            </div>
        );
    }
}
