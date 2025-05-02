"use client";

import React, { useState, useEffect } from "react";
import ListingCard from "@/app/components/listings/ListingCard";

interface Listing {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string | null;
    image_url: string | null;
    location: string | null;
    is_active: boolean;
    is_featured: boolean;
    creator_clerkId: string;
    ListingHobby: {
        hobby: {
            id: number;
            name: string;
            category: string | null;
            description: string | null;
            iconUrl: string | null;
        };
    }[];
}

interface UserListingsClientProps {
    listings: Listing[];
    isOwnProfile: boolean;
}

export default function UserListingsClient({ listings, isOwnProfile }: UserListingsClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll effect
    useEffect(() => {
        if (listings.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % listings.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [listings.length, isPaused]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + listings.length) % listings.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % listings.length);
    };

    if (listings.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600">No listings found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    {isOwnProfile ? 'My Listings' : 'User Listings'}
                </h1>
            </div>

            <div
                className="relative overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {listings.map((listing) => (
                        <div key={listing.id} className="w-full flex-shrink-0 px-4">
                            <ListingCard
                                listing={listing}
                                isOwner={isOwnProfile}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {listings.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 