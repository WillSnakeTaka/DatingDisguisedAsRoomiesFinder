// CreateListingForm.tsx

"use client"; // Indicating that this is a client component

import React, { useState } from "react";

// Import the server action
import { postListing } from "@/app/actions/listings/postListing";

// The form component to create a listing
const CreateListingForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: 0,
        image_url: "",
        location: "",
        category: "",
        is_active: true,
        is_featured: false,
        hobbyIds: [] as number[], // Example hobby IDs
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Call the postListing server action
            const newListing = await postListing(formData);

            if (newListing) {
                console.log("New listing created:", newListing);
                // Optionally, reset the form or show a success message
            } else {
                console.error("Error creating listing");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Create Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-medium">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image_url" className="font-medium">Image URL</label>
                    <input
                        type="url"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="location" className="font-medium">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="font-medium">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                    Create Listing
                </button>
            </form>
        </div>
    );
};

export default CreateListingForm;
