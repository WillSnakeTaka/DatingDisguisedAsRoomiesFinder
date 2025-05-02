"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, UserHobby, Hobby } from "@prisma/client";

interface MatchClientProps {
    currentUser: User & {
        UserHobby: (UserHobby & {
            hobby: Hobby;
        })[];
    };
    matches: (User & {
        UserHobby: (UserHobby & {
            hobby: Hobby;
        })[];
    })[];
}

export default function MatchClient({ currentUser, matches }: MatchClientProps) {
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

    const currentMatch = matches[currentMatchIndex];

    const handleNext = () => {
        setCurrentMatchIndex((prev) => (prev + 1) % matches.length);
    };

    const handlePrevious = () => {
        setCurrentMatchIndex((prev) => (prev - 1 + matches.length) % matches.length);
    };

    if (matches.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No Matches Found</h1>
                    <p className="text-gray-600 mb-4">
                        We couldn't find any potential roommates that match your preferences.
                    </p>
                    <Link
                        href="/profile/hobbies"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Update Your Preferences
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Potential Matches</h1>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-4xl text-gray-400">
                                {(currentMatch.firstName?.[0] || "U").toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {currentMatch.firstName} {currentMatch.lastName}
                            </h2>
                            <p className="text-gray-600">{currentMatch.email}</p>
                            {currentMatch.location && (
                                <p className="text-gray-500">{currentMatch.location}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="font-semibold text-gray-700">Preferences</h3>
                            <div className="space-y-2 mt-2">
                                <p>
                                    <span className="text-gray-600">Cleanliness:</span>{" "}
                                    {currentMatch.cleanliness || "Not specified"}
                                </p>
                                <p>
                                    <span className="text-gray-600">Smoking:</span>{" "}
                                    {currentMatch.smoking || "Not specified"}
                                </p>
                                <p>
                                    <span className="text-gray-600">Pets:</span>{" "}
                                    {currentMatch.pets || "Not specified"}
                                </p>
                                <p>
                                    <span className="text-gray-600">Budget:</span>{" "}
                                    {currentMatch.min_budget && currentMatch.max_budget
                                        ? `$${currentMatch.min_budget} - $${currentMatch.max_budget}`
                                        : "Not specified"}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-700">Shared Hobbies</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {currentMatch.UserHobby.filter(uh =>
                                    currentUser.UserHobby.some(
                                        currentUh => currentUh.hobbyId === uh.hobbyId
                                    )
                                ).map(({ hobby }) => (
                                    <span
                                        key={hobby.id}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {hobby.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href={`/profile/${currentMatch.clerkId}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            View Profile
                        </Link>
                        <div className="flex space-x-4">
                            <button
                                onClick={handlePrevious}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-600">
                    Showing {currentMatchIndex + 1} of {matches.length} matches
                </div>
            </div>
        </div>
    );
} 