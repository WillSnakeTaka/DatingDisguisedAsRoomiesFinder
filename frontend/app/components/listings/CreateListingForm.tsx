"use client"
import React from 'react'
import { postListing } from '@/app/actions/listings/postListing'


/**
 * @fileoverview This file contains the CreateListingForm component that serves as the main entry point for the listing creation form.
 * It is a client component that allows users to create a new listing by filling out a form with title, description, and price.
 * It uses React hooks to manage form state and handle form submission.
 */

const CreateListingForm = () => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        // A listing object to be sent to the server
        // should contain the following fields:
        // interestPool : [] // list of users
        // hobbyPool : [] // list of unique hobbies derived from the interestPool



    }

    return (
        <div>
            <h1>Create Listing Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" required />
                </div>

                <div>
                    <label htmlFor="url">URL:</label>
                    <input type="url" id="url" name="url" required />
                </div>

                <div>
                    <label htmlFor="location">Location:</label>
                    <input type="location" id="location" name="location" required />
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    <input type="category" id="category" name="category" required />
                </div>

                <button type="submit">Create Listing</button>
            </form>
        </div>
    )
}

export default CreateListingForm