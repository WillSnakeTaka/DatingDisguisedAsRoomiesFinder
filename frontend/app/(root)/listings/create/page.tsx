import React from 'react'
import CreateListingForm from '@/app/components/listings/CreateListingForm'

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
    clerkId: "clerk_1234567890",
};

//TODO: Post the listing to the server
const CreatePage = () => {
    return (
        <div>
            <div>Create Listing Page</div>
            <CreateListingForm />
        </div>
    )
}

export default CreatePage