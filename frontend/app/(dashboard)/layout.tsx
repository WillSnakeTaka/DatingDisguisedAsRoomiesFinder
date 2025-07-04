import { ClerkProvider } from '@clerk/nextjs'

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