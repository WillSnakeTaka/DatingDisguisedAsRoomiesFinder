'use client';

import React from 'react';
import { Listing } from '@/app/types/listing';

interface Props {
    listings: Listing[];
}

const ListingList: React.FC<Props> = ({ listings }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listings.map((listing) => (
                <div key={listing.id} className="border p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">{listing.title}</h2>
                    <p className="text-gray-600">{listing.description}</p>
                    <p className="text-sm mt-2">${listing.price} / mo</p>
                </div>
            ))}
        </div>
    );
};

export default ListingList;
