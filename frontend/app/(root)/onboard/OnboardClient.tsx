"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Hobby } from "@prisma/client";

interface OnboardClientProps {
    userId: string;
    hobbies: Hobby[];
}

interface OnboardingFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    bio: string;
    location: string;
    cleanliness: number;
    smoking: number;
    pets: number;
    minBudget: number;
    maxBudget: number;
    hobbies: number[];
}

export default function OnboardClient({ userId, hobbies }: OnboardClientProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<OnboardingFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        bio: "",
        location: "",
        cleanliness: 3,
        smoking: 1,
        pets: 1,
        minBudget: 0,
        maxBudget: 0,
        hobbies: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleHobbyToggle = (hobbyId: number) => {
        setFormData(prev => ({
            ...prev,
            hobbies: prev.hobbies.includes(hobbyId)
                ? prev.hobbies.filter(id => id !== hobbyId)
                : [...prev.hobbies, hobbyId],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
            return;
        }

        try {
            // Update user profile
            await fetch("/api/users/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    clerkId: userId,
                }),
            });

            // Update user hobbies
            await fetch("/api/users/update-hobbies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clerkId: userId,
                    hobbies: formData.hobbies,
                }),
            });

            router.push("/listings");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`h-1 w-16 ${step > s ? "bg-blue-600" : "bg-gray-200"}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Basic Info</span>
                        <span>Preferences</span>
                        <span>Hobbies</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mb-6">Living Preferences</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cleanliness (1-5)</label>
                                <input
                                    type="range"
                                    name="cleanliness"
                                    min="1"
                                    max="5"
                                    value={formData.cleanliness}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Messy</span>
                                    <span>Neutral</span>
                                    <span>Clean Freak</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Smoking (1-5)</label>
                                <input
                                    type="range"
                                    name="smoking"
                                    min="1"
                                    max="5"
                                    value={formData.smoking}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>No Smoking</span>
                                    <span>Neutral</span>
                                    <span>Smoker</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pets (1-5)</label>
                                <input
                                    type="range"
                                    name="pets"
                                    min="1"
                                    max="5"
                                    value={formData.pets}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>No Pets</span>
                                    <span>Neutral</span>
                                    <span>Pet Lover</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Min Budget</label>
                                    <input
                                        type="number"
                                        name="minBudget"
                                        value={formData.minBudget}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Max Budget</label>
                                    <input
                                        type="number"
                                        name="maxBudget"
                                        value={formData.maxBudget}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold mb-6">Hobbies & Interests</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {hobbies.map((hobby) => (
                                    <div key={hobby.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`hobby-${hobby.id}`}
                                            checked={formData.hobbies.includes(hobby.id)}
                                            onChange={() => handleHobbyToggle(hobby.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`hobby-${hobby.id}`} className="ml-2 block text-sm text-gray-900">
                                            {hobby.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            type="submit"
                            className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {step === 3 ? "Complete" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 