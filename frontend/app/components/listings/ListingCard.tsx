"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteListing } from "@/app/actions/listings/listingActions";
import { useAuth } from '@clerk/nextjs';

interface ListingCardProps {
    listing: {
        id: number;
        title: string;
        description: string;
        price: number;
        image_url: string | null;
        location: string | null;
        category: string | null;
        is_active: boolean;
        is_featured: boolean;
        creator_clerkId: string;
        ListingHobby: {
            hobby: {
                id: number;
                name: string;
            };
        }[];
    };
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
    const router = useRouter();
    const { userId } = useAuth();
    const isOwner = userId === listing.creator_clerkId;
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this listing?")) return;

        setIsDeleting(true);
        try {
            await deleteListing(listing.id);
            router.refresh();
        } catch (error) {
            console.error("Error deleting listing:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Link href={`/listings/${listing.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full">
                    {listing.image_url ? (
                        <img
                            src={listing.image_url}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                    {listing.is_featured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                            Featured
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-semibold">{listing.title}</h2>
                        <span className="text-lg font-bold">${listing.price}/mo</span>
                    </div>

                    {listing.location && (
                        <p className="text-gray-600 mb-2">{listing.location}</p>
                    )}
                    <p className="text-gray-700 mb-4 line-clamp-2">{listing.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {listing.ListingHobby.map(({ hobby }) => (
                            <span
                                key={hobby.id}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                                {hobby.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-medium">View Details</span>
                        {isOwner && (
                            <div className="flex gap-2">
                                <Link
                                    href={`/listings/${listing.id}/edit`}
                                    className="text-gray-600 hover:text-gray-800"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard; 