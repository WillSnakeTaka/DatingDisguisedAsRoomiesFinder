"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic';
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


                    {/* Conditionally render based on authentication state */}
                    <SignedIn>
                        <Link href="/listing/create" className="hover:text-blue-500">
                            Create Listing
                        </Link>

                        {user && (
                            <Link href={`/listing/${user.id}`} className="hover:text-blue-500">
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
                                <a className="  px-4 py-2 rounded-lg hover:text-blue-500 hover:cursor-pointer ">
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
