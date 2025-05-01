'use client';

import { useState } from 'react';

export default function OnboardForm() {
    const [formData, setFormData] = useState({
        gender: '',
        dob: '',
        minBudget: '',
        maxBudget: '',
        roommateType: '',
        preferredRoommate: '',
        pets: 'no',
        smoke: 'no',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await fetch('/api/listings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // `formData` contains the necessary fields like title, description, hobbyIds, etc.
            });

            if (res.ok) {
                const newListing = await res.json();
                console.log('New listing created:', newListing);
                // Optionally, reset the form or show a success message
            } else {
                console.error('Error creating listing');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Onboarding Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="nonbinary">Non-binary</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Minimum Budget</label>
                        <input
                            type="number"
                            name="minBudget"
                            value={formData.minBudget}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Maximum Budget</label>
                        <input
                            type="number"
                            name="maxBudget"
                            value={formData.maxBudget}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">What type of roommate are you?</label>
                    <input
                        type="text"
                        name="roommateType"
                        value={formData.roommateType}
                        onChange={handleChange}
                        placeholder="e.g., Quiet, social, student..."
                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">What type of roommate are you looking for?</label>
                    <select
                        name="preferredRoommate"
                        value={formData.preferredRoommate}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        <option value="">Select</option>
                        <option value="quiet">Quiet</option>
                        <option value="social">Social</option>
                        <option value="student">Student</option>
                        <option value="working_professional">Working Professional</option>
                        <option value="open_to_all">Open to all</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Do you have pets?</label>
                        <select
                            name="pets"
                            value={formData.pets}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">Do you smoke?</label>
                        <select
                            name="smoke"
                            value={formData.smoke}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                            <option value="occasionally">Occasionally</option>
                        </select>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
