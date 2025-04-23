'use client'

import React from 'react'
import Link from 'next/link'
import { SignedIn, UserButton, SignedOut, SignInButton, SignUpButton, useClerk, useUser } from '@clerk/nextjs'

const Navbar = () => {
    const { user } = useUser();

    return (
        <header className="bg-white shadow-md py-4">
            <nav className="mx-auto flex justify-between items-center px-5 text-gray-800">
                {/* Logo or Branding */}

                <div className="">
                    <Link href="/" className="text-xl font-bold">
                        RooMe
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex gap-6 items-center ">
                    <Link href="/listings/" className="hover:text-blue-500">
                        Checkout Listings
                    </Link>

                    {/* Conditionally render based on authentication state */}
                    <SignedIn>
                        <Link href="/listings/create" className="hover:text-blue-500">
                            Create Listings
                        </Link>

                        {user && (
                            <Link href={`/listings/${user.id}`} className="hover:text-blue-500">
                                My Listings
                            </Link>
                        )
                        }

                        <UserButton />
                    </SignedIn>

                    <SignedOut>
                        <div className="flex gap-3">
                            <SignInButton>
                                <a className=" px-4 py-2 rounded-lg hover:text-blue-500 hover:cursor-pointer">
                                    Sign In
                                </a>
                            </SignInButton>
                            <SignUpButton>
                                <a className=" px-4 py-2 rounded-lg hover:text-blue-500 hover:cursor-pointer ">
                                    Sign Up
                                </a>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
