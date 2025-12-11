export const runtime = "edge";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
]);

export default clerkMiddleware(async (auth, req) => {

    // Redirect "/" → "/sign-in"
    if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Protect everything except /sign-in
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/dashboard/:path*",
        "/"
    ],
};
