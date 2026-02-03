import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
export const auth = betterAuth({
     // 1. AÑADE ESTA LÍNEA (OBLIGATORIO) - La misma que tienes en .env
  secret: process.env.BETTER_AUTH_SECRET!,
  
  // 2. AÑADE ESTA LÍNEA (RECOMENDADO para Codespaces)
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        microsoft: {
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            tenantId: 'common',
            authority: "https://login.microsoftonline.com",
            prompt: "select_account",

        },
        
    },

     // 🍪 CONFIGURACIÓN CLAVE para Cookies en Codespaces
    session: {
        // 1. Habilita la caché de cookies para Server Actions
        cookieCache: {
            enabled: true, // <-- Esto soluciona `auth.api.getSession()` en muchos casos[citation:6]
            maxAge: 60 * 5, // 5 minutos (ajustable)
        },
        // 2. Ajusta tiempos de expiración si es necesario
        expiresIn: 60 * 60 * 24 * 7, // 7 días
        updateAge: 60 * 60 * 24, // 1 día
    },
    cookies: {
        sessionToken: {
            options: {
                httpOnly: true,
                // "lax" permite que las cookies se envíen en peticiones seguras entre sitios (como tu proxy)
                sameSite: "lax",
                // 'secure' debe ser TRUE en Codespaces (HTTPS)
                secure: process.env.NODE_ENV !== "development",
                path: "/",
            },
        },
    },

    trustedOrigins: [
        process.env.BETTER_AUTH_URL!,
        "http://localhost:3000",
    ],
});