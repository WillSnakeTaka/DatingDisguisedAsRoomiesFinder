import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

// Import components
import Navbar from '@/app/components/Navbar'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <div>
                <main>{children}</main>
            </div>
        </ClerkProvider>
    )
}