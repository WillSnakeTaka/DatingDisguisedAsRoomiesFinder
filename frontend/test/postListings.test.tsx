import { prisma } from '@/utils/prisma/client';
import { postListing } from '@/app/actions/listings/postListing';

const listingData = [
    {
        title: 'Test Listing',
        description: 'This is a test listing',
        interestPool: [''],
        hobbyPool: ['music', 'cooking'],
        price: 100,
        image_url: null,
        location: null,
        category: null,
        is_active: true,
        is_featured: false,
        clerkId: 'clerk_123456',
    },



]

/**
 * @fileoverview This file contains the test cases for the postListing function.
 * It tests the function's ability to create a new listing in the database.
 */

async function postListingTest() {

    for (const listing of listingData) {
        try {
            const result = await postListing(listing);
            console.log('Test listing created:', result);
            // You can add assertions here to check if the listing was created successfully
            // For example, you can check if the listing exists in the database
            const createdListing = await prisma.listing.findUnique({
                where: { id: result?.id },
            });

            if (createdListing) {
                console.log('Listing created successfully:', createdListing);
            }
        } catch (error) {
            console.error('Error creating test listing:', error);
        }
    }

}

async function cleanUp() {
    try {
        await prisma.listing.deleteMany({
            where: {
                title: 'Test Listing',
            },
        });
        console.log('Test listings deleted successfully');
    } catch (error) {
        console.error('Error deleting test listings:', error);
    } finally {
        await prisma.$disconnect();
    }
}

postListingTest();
cleanUp();