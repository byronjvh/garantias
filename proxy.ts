import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from 'next/server'
import { verificarSucursal } from './lib/actions/verificarSucursal' // 👈 Importar la Server Action

// --- Rutas Públicas (No requieren Auth)
const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/api/webhooks/clerk(.*)"
])

// --- Rutas que no requieren sucursal, pero sí Auth (p. ej., la página de selección)
// Asumimos que la página de selección de sucursal es la raíz del dashboard: /dashboard
const isSucursalSelectionRoute = createRouteMatcher([
    "/dashboard" // La ruta de tu componente DashboardHome
])

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth()
    const url = req.nextUrl.pathname // Obtener la ruta actual

    // 1. Lógica de Autenticación (Clerk Standard)
    if (!isPublicRoute(req) && !userId) {
        return redirectToSignIn()
    }

    if (userId && !isPublicRoute(req)) {

        try {
            const result = await verificarSucursal(userId)

            const tieneSucursal = result.tieneSucursal

            if (!tieneSucursal) {
                if (isSucursalSelectionRoute(req)) {
                    return NextResponse.next()
                }


                const redirectUrl = new URL("/dashboard", req.url);
                return NextResponse.redirect(redirectUrl)
            }


            if (tieneSucursal) {
                if (isSucursalSelectionRoute(req)) {
                    const redirectUrl = new URL("/dashboard/garantias", req.url);
                    return NextResponse.redirect(redirectUrl)
                }
            }

            return NextResponse.next()

        } catch (error) {
            console.error("Error verificando sucursal en middleware:", error)
            // Opcional: Redirigir a una página de error o permitir el paso si la DB falla
            return NextResponse.next()
        }

    }

})

export const config = {
    matcher: [
        // Matcher que cubre todas las rutas excepto internas de Next.js
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
}