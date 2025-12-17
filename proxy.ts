import { NextResponse, NextRequest } from "next/server";
import { verificarSucursal } from "@/lib/actions/verificarSucursal";
import { auth } from "./lib/auth";

export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // 🔒 1️⃣ Auth callbacks NUNCA se tocan
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    const isPublicRoute = pathname.startsWith("/sign-in");
    const isSucursalSelectionRoute = pathname === "/dashboard";

    // 🔐 2️⃣ Ahora sí, sesión
    const { getSession } = auth.api;
    const session = await getSession({
        headers: {
            cookie: req.headers.get("cookie") ?? "",
        },
    });

    // 3️⃣ Usuario autenticado intentando entrar a /sign-in
    if (session && isPublicRoute) {
        const userId = session.user.id;
        const { tieneSucursal } = await verificarSucursal(userId);

        if (tieneSucursal) {
            return NextResponse.redirect(
                new URL("/dashboard/garantias", req.url)
            );
        }

        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        );
    }



    // 🚫 3️⃣ No autenticado
    if (!isPublicRoute && !session) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // ✅ 4️⃣ Autenticado
    if (session && !isPublicRoute) {
        const userId = session.user.id;
        const { tieneSucursal } = await verificarSucursal(userId);


        if (!tieneSucursal) {
            if (isSucursalSelectionRoute) {
                return NextResponse.next();
            }

            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (tieneSucursal && isSucursalSelectionRoute) {
            return NextResponse.redirect(
                new URL("/dashboard/garantias", req.url)
            );
        }
    }

    if (session && pathname === "/sig-in") {
        const userId = session.user.id;
        const { tieneSucursal } = await verificarSucursal(userId);

        if (tieneSucursal) {
            return NextResponse.redirect(
                new URL("/dashboard/garantias", req.url)
            );
        }

        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Matcher que cubre todas las rutas excepto internas de Next.js
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
}