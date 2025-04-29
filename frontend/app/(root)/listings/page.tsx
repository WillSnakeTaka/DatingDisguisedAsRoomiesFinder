"use client"
import React, { useState } from 'react'
import { postListing, Listing } from '@/app/actions/listings/postListing';

/**
 * @fileoverview This file contains the page component that serves as the main entry point for the listing page.
 * Fetches the listing data from the server and displays it to the user.
 */

/**
 * Fetch listing data from server and display it to the user.
 * the listing should be active and featured
 */

const testListing = {
    title: "Cozy Room in Downtown",
    description: "Looking for a clean and quiet roommate. All utilities included.",
    interestPool: ["music", "cooking", "hiking"],
    price: 850,
    image_url: "https://example.com/room.jpg",
    location: "Downtown, Cityville",
    category: "apartment",
    is_active: true,
    is_featured: false,
};

const page = () => {

    const [response, setResponse] = useState<Listing[] | null>(null);

    const handlePostListing = async () => {
        try {
            const result = await postListing(testListing);
            setResponse(result);
        } catch (err) {
            console.error("Failed to post listing:", err);
        }
    };
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className=''> We are at Listing Page</h1>
            <button className='bg-blue-500' onClick={handlePostListing}>Post Test Listing</button>

            {response && (
                <pre>{JSON.stringify(response, null, 2)}</pre>
            )}

        </div>
    )
}

export default page