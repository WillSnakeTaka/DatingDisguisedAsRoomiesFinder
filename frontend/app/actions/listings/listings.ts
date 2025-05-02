'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export type CreateListingFormData = {
    title: string
    description: string
    price: number
    location?: string
    category?: string
    image_url?: string
    creator_clerkId: string
    hobbies?: number[]
    cleanliness?: number
    smoking?: number
    pets?: number
    min_budget?: number
    max_budget?: number
}

export async function createListing(formData: FormData) {
    // Required fields
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseInt(formData.get('price') as string)
    const creator_clerkId = formData.get('creator_clerkId') as string

    // Optional fields
    const location = formData.get('location') as string
    const category = formData.get('category') as string
    const image_url = formData.get('image_url') as string
    const hobbyIds = formData.getAll('hobbies') as string[]

    // User preferences
    const cleanliness = formData.get('cleanliness') ? parseInt(formData.get('cleanliness') as string) : null
    const smoking = formData.get('smoking') ? parseInt(formData.get('smoking') as string) : null
    const pets = formData.get('pets') ? parseInt(formData.get('pets') as string) : null
    const min_budget = formData.get('min_budget') ? parseInt(formData.get('min_budget') as string) : null
    const max_budget = formData.get('max_budget') ? parseInt(formData.get('max_budget') as string) : null

    try {
        // Validate required fields
        if (!title || !description || !price || !creator_clerkId) {
            return { success: false, error: 'Missing required fields' }
        }

        // First, update the user preferences if they exist
        if (cleanliness || smoking || pets || min_budget || max_budget) {
            await prisma.user.update({
                where: { clerkId: creator_clerkId },
                data: {
                    cleanliness,
                    smoking,
                    pets,
                    min_budget,
                    max_budget
                }
            })
        }

        // Create the listing
        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                price,
                location: location || null,
                category: category || null,
                image_url: image_url || null,
                is_active: true,
                is_featured: false,
                creator_clerkId,
                ListingHobby: {
                    create: hobbyIds.map(hobbyId => ({
                        hobby: {
                            connect: { id: parseInt(hobbyId) }
                        }
                    }))
                }
            },
            include: {
                ListingHobby: {
                    include: {
                        hobby: true
                    }
                },
                user: true
            }
        })

        revalidatePath('/listings')
        return { success: true, listing }
    } catch (error) {
        console.error('Error creating listing:', error)
        return { success: false, error: 'Failed to create listing' }
    }
}

export async function getHobbies() {
    try {
        const hobbies = await prisma.hobby.findMany({
            orderBy: {
                name: 'asc'
            }
        })
        return { success: true, hobbies }
    } catch (error) {
        console.error('Error fetching hobbies:', error)
        return { success: false, error: 'Failed to fetch hobbies' }
    }
} 