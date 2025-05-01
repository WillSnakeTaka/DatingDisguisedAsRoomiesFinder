// /pages/api/listings/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma/client'; // Adjust this path if necessary

const createListing = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { title, description, price, image_url, location, category, is_active, is_featured, clerkId, hobbyIds } = req.body;

        // Validate required fields
        if (!title || !description || !price || !location || !category || !clerkId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new listing in the database
        const newListing = await prisma.listing.create({
            data: {
                title,
                description,
                price,
                image_url,
                location,
                category,
                is_active,
                is_featured,
                creator_clerkId: clerkId,
                ListingHobby: {
                    create: hobbyIds.map((hobbyId: number) => ({
                        hobbyId,
                    })),
                },
            },
        });

        return res.status(201).json(newListing); // Respond with the new listing data
    } catch (error) {
        console.error('Error creating listing:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default createListing;
