import { prisma } from "@/utils/prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clerkId, hobbies } = body;

        // First, delete all existing user hobbies
        await prisma.userHobby.deleteMany({
            where: { user: { clerkId } },
        });

        // Then create new user hobbies
        const userHobbies = await prisma.userHobby.createMany({
            data: hobbies.map((hobbyId: number) => ({
                userId: clerkId,
                hobbyId,
            })),
        });

        return NextResponse.json({ success: true, userHobbies });
    } catch (error) {
        console.error("Error updating user hobbies:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update hobbies" },
            { status: 500 }
        );
    }
} 