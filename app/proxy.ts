export const runtime = "edge";
import { clerkMiddleware, createRouteMatcher, } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});



//
// Config de matcher recomendada por Clerk
//
export const config = {
    matcher: [
        // Skip internals + static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // API siempre con middleware
        "/(api|trpc)(.*)",
    ],
};