import { prisma } from "@/lib/prisma"

export async function seedUsuarios() {
    const usuarios = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        clerkId: `clerk_${i + 1}`,
        nombre: `Usuario ${i + 1}`,
        email: `usuario${i + 1}@example.com`,
    }))

    usuarios.map((u) =>
        prisma.usuario.upsert({
            where: { id: u.id },
            update: {},
            create: u,
        })
    )

    console.log("Usuarios creados o ya existentes ✔️")
}
