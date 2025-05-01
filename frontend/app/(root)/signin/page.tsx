import React from 'react'
import { SignIn } from '@clerk/nextjs'


const SignInPage = () => {
    return (
        <div>
            <SignIn afterSignInUrl="/onboardform" />
        </div>
    )
}

export default SignInPage
