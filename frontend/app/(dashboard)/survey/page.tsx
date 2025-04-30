import React from 'react'
import OnboardForm from '@/app/components/onboard/OnboardForm'
import { getTodos } from '@/app/actions/getTodos';

/**
 * @fileoverview This file contains the OnboardPage component that serves as the main entry point for the onboarding page.
 * It fetches todos from the server using the getTodos function and passes them to the OnboardForm component.
 * It is a server component that uses server actions to fetch data from the server. 
*/

// TODO:: OnboardPage component should have a form containing questions that asks them to declare their preferences 

// Server Component
// We use the server component to fetch data from the server using serverActions and pass it to the client component

export default async function OnboardPage() {
    const todos = await getTodos();

    return (
        <>
            <OnboardForm todos={todos} />
        </>
    );
}