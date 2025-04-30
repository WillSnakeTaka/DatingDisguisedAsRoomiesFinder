"use client"
import React, { useState, useEffect } from 'react'
import { getListings } from '@/app/actions/listings/getListings';
import { Listing } from '@/app/types/listing';

/**
 * @fileoverview This file contains the page component that serves as the main entry point for the listing page.
 * Fetches the listing data from the server and displays it to the user.
 */

/**
 * Fetch listing data from server and display it to the user.
 * the listing should be active and featured
 */

const page = () => {
    const [listingData, setListingData] = useState<Listing[] | null>(null);

    // TODO: Implement fetchListingData to retrieve listing from the server
    const fetchListingData = async () => {
        try {
            const data = await getListings();
            setListingData(data);
        } catch (error) {
            console.error('Error fetching listing data:', error);
        }
    }

    useEffect(() => {
        fetchListingData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className=''> We are at Listing Page</h1>

            <div className='flex flex-col items-center justify-center'>
                {listingData ? (
                    listingData.map((listing) => (
                        <div key={listing.id} className='border p-4 m-2'>
                            <h2>{listing.title}</h2>
                            <p>{listing.description}</p>
                            <p>Price: {listing.price}</p>
                            <p>Location: {listing.location}</p>
                            <p>Category: {listing.category}</p>
                        </div>
                    ))
                ) : (
                    <p>No listings available</p>
                )}
            </div>
        </div>
    )
}

export default page