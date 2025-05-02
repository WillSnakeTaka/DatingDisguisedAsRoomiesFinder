import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/utils/prisma/client";
import OnboardClient from "./OnboardClient";

export default async function OnboardPage() {
    const { userId } = await auth();

    if (!userId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">Please sign in to access onboarding</div>
            </div>
        );
    }

    // Get all hobbies for the form
    const hobbies = await prisma.hobby.findMany();

    return (
        <OnboardClient
            userId={userId}
            hobbies={hobbies}
        />
    );
}