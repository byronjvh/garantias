import { NextResponse, NextRequest } from "next/server";
import { verificarSucursal } from "@/lib/actions/verificarSucursal";
import { auth } from "./lib/auth";

const ALLOWED_DOMAINS = [
    "corporacionacs.com",
    "tukomer.com",
    "crtechstore.com",
];

const ALLOWED_EMAILS = [
    "admin@gmail.com",
    "soporte.externo@outlook.com",
];


function isEmailAllowed(email?: string | null) {
    if (!email) return false;

    const domain = email.split("@")[1];

    if (ALLOWED_DOMAINS.includes(domain)) {
        return true;
    }

    if (ALLOWED_EMAILS.includes(email)) {
        return true;
    }

    return false;
}


export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const isAccessDeniedRoute = pathname === "/acceso-denegado";


    // 🔒 1️⃣ Auth callbacks NUNCA se tocan
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    if (isAccessDeniedRoute) {
        return NextResponse.next();
    }

    const isPublicRoute =
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/garantia/")
    const isSucursalSelectionRoute = pathname === "/dashboard";

    // 🔐 2️⃣ Ahora sí, sesión
    const { getSession } = auth.api;
    const session = await getSession({
        headers: {
            cookie: req.headers.get("cookie") ?? "",
        },
    });

    if (session) {
        const email = session.user.email;

        if (!isEmailAllowed(email)) {
            return NextResponse.redirect(
                new URL('/acceso-denegado', req.url)
            )
        }
    }

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
        "/((?!_next|api|acceso-denegado|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|svg|ico|webp)).*)",
    ],
};
