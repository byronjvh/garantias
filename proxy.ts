import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Definimos públicas
const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/api/webhooks/clerk(.*)"
])


export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth()
    if (!isPublicRoute(req) && !userId) {
        return redirectToSignIn()
    }

})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        // Este es el matcher que da Clerk en su ejemplo oficial
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}