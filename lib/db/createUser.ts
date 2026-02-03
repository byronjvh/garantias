import { prisma } from "@/lib/prisma"
import { User } from "better-auth"
import { Prisma } from "../generated/prisma/client"

export async function createUser(user: User) {
    try {
        const email = user.email

        if (!email) {
            throw new Error("El usuario de Clerk no tiene email")
        }

        return await prisma.usuario.upsert({
            where: { authId: user.id },
            update: {},
            create: {
                authId: user.id,
                email,
                nombre: user.name
            },
        })

    } catch (error) {

        // 🔴 Errores conocidos de Prisma
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("[createUser] Prisma error:", error.code, error.meta)

            throw new Error("No se pudo crear el usuario en la base de datos")
        }

        // 🔴 Error genérico
        console.error("[createUser] Unexpected error:", error)

        throw new Error("Error inesperado al crear el usuario")
    }
}
