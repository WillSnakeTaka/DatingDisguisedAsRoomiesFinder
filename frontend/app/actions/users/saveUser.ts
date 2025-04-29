"use server"

import { supabaseClient } from '@/utils/supabase/client';

export interface User {

    clerkId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    hobbies: string[],

}

export default async function saveUser(user: User) {

    try {
        const { data, error } = await supabaseClient
            .from('users')
            .upsert({
                clerkId: user.clerkId,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                hobbies: user.hobbies,
            });


        if (error)
            throw new Error(error.message);

        return data;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
}
