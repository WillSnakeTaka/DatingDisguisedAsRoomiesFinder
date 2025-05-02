import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </div>
    )
} 