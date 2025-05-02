import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <SignUp
                afterSignUpUrl="/onboard"
                redirectUrl="/onboard"
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-primary hover:bg-primary/90",
                        footerActionLink: "text-primary hover:text-primary/90",
                    },
                }}
            />
        </div>
    );
} 