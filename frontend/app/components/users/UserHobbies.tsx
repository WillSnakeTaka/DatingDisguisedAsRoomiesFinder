'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { addHobbiesToUser, removeHobbyFromUser, getUserHobbies } from '@/app/actions/users/hobbies'
import { Hobby } from '@prisma/client'

export function UserHobbies() {
    const { user } = useUser()
    const [hobbies, setHobbies] = useState<Hobby[]>([])
    const [availableHobbies, setAvailableHobbies] = useState<Hobby[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        if (user) {
            loadHobbies()
        }
    }, [user])

    const loadHobbies = async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch user's current hobbies
            const userHobbiesResponse = await getUserHobbies(user!.id)
            if (userHobbiesResponse.success && userHobbiesResponse.hobbies) {
                setHobbies(userHobbiesResponse.hobbies)
            }

            // Fetch all available hobbies
            const response = await fetch('/api/hobbies')
            if (!response.ok) throw new Error('Failed to fetch hobbies')
            const data = await response.json()
            if (Array.isArray(data)) {
                setAvailableHobbies(data as Hobby[])
            } else {
                throw new Error('Invalid response format')
            }
        } catch (err) {
            setError('Failed to load hobbies')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleAddHobbies = async (hobbyIds: number[]) => {
        if (!user) return

        try {
            setError(null)
            setSuccess(null)

            const result = await addHobbiesToUser(user.id, hobbyIds)
            if (result.success) {
                setSuccess('Hobbies added successfully')
                loadHobbies() // Refresh the list
            } else {
                setError(result.error || 'Failed to add hobbies')
            }
        } catch (err) {
            setError('Failed to add hobbies')
            console.error(err)
        }
    }

    const handleRemoveHobby = async (hobbyId: number) => {
        if (!user) return

        try {
            setError(null)
            setSuccess(null)

            const result = await removeHobbyFromUser(user.id, hobbyId)
            if (result.success) {
                setSuccess('Hobby removed successfully')
                loadHobbies() // Refresh the list
            } else {
                setError(result.error || 'Failed to remove hobby')
            }
        } catch (err) {
            setError('Failed to remove hobby')
            console.error(err)
        }
    }

    if (loading) {
        return <div className="text-center">Loading hobbies...</div>
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Hobbies</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {success}
                </div>
            )}

            {/* Current Hobbies */}
            <div className="space-y-2">
                <h3 className="font-medium">Current Hobbies</h3>
                {hobbies.length === 0 ? (
                    <p className="text-gray-500">No hobbies added yet</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {hobbies.map(hobby => (
                            <div
                                key={hobby.id}
                                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                            >
                                <span>{hobby.name}</span>
                                <button
                                    onClick={() => handleRemoveHobby(hobby.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Hobbies */}
            <div className="space-y-2">
                <h3 className="font-medium">Add New Hobbies</h3>
                <div className="flex flex-wrap gap-2">
                    {availableHobbies
                        .filter(hobby => !hobbies.some(h => h.id === hobby.id))
                        .map(hobby => (
                            <button
                                key={hobby.id}
                                onClick={() => handleAddHobbies([hobby.id])}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                            >
                                {hobby.name}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    )
} 