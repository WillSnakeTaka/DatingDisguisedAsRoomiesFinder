import { prisma } from "@/utils/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            clerkId,
            firstName,
            lastName,
            email,
            phone,
            gender,
            dateOfBirth,
            bio,
            location,
            cleanliness,
            smoking,
            pets,
            minBudget,
            maxBudget,
        } = body;

        // Update or create user profile
        const user = await prisma.user.upsert({
            where: { clerkId },
            update: {
                firstName,
                lastName,
                email,
                phone,
                gender,
                date_of_birth: new Date(dateOfBirth),
                bio,
                location,
                cleanliness,
                smoking,
                pets,
                min_budget: minBudget,
                max_budget: maxBudget,
            },
            create: {
                clerkId,
                firstName,
                lastName,
                email,
                phone,
                gender,
                date_of_birth: new Date(dateOfBirth),
                bio,
                location,
                cleanliness,
                smoking,
                pets,
                min_budget: minBudget,
                max_budget: maxBudget,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update profile" },
            { status: 500 }
        );
    }
} 