import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
export const auth = betterAuth({
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
});