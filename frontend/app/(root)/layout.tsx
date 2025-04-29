import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

// Import components
import Navbar from '../components/Navbar'

/**
 * @fileoverview This file contains the RootLayout component that serves as the main entry point for the application.
 * It wraps the application with the ClerkProvider and includes the Navbar component.
 * It is a server component that uses the ClerkProvider to manage authentication and user sessions.
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </ClerkProvider>
  )
}
