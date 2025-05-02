import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
    // Handle users who aren't authenticated
    if (!auth.sessionId && !isPublicRoute(req)) {
        return;
    }

    // Handle users who are authenticated
    if (auth.sessionId) {
        // If the user is signing up and going to the home page, redirect to onboarding
        if (req.nextUrl.pathname === "/" && req.nextUrl.searchParams.get("sign-up") === "true") {
            return NextResponse.redirect(new URL("/onboard", req.url));
        }
    }
});

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};