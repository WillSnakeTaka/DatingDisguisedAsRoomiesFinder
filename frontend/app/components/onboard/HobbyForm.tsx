'use client';

import { useState } from 'react';

export default function HobbyForm() {
    const [formData, setFormData] = useState({
        name: '',
        hobbies: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Hobbies submitted:', formData);
        // TODO: Save formData to backend or Clerk metadata
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Hobby Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">Your Hobbies</label>
                    <textarea
                        name="hobbies"
                        value={formData.hobbies}
                        onChange={handleChange}
                        placeholder="Enter your hobbies, separated by commas"
                        className="w-full border-2 border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        rows={4}
                    />
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
