import React from 'react'
import OnboardForm from '@/app/components/onboard/OnboardForm'
import { getTodos } from '@/app/actions/getTodos';



// Server Component
// We use the server component to fetch data from the server using serverActions and pass it to the client component

export default async function OnboardPage() {
    const todos = await getTodos();

    return <OnboardForm todos={todos} />;
}