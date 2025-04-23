// app/actions/getTodos.ts
/**
 * @fileoverview This file contains the getTodos function that fetches todos from Supabase.
 * It uses the Supabase client to make a request to the 'todos' table and returns the data.
 * It is used in the OnboardPage component to fetch todos and pass them to the OnboardForm component.
 */
'use server';

import { supabaseClient } from '@/utils/supabase/client';

export interface Todo {
    id: number;
    title: string;
}

export async function getTodos() {
    const { data, error } = await supabaseClient.from('todos').select();

    if (error) {
        console.error('Error fetching todos:', error);
        return [];
    }

    return data as Todo[];
}
