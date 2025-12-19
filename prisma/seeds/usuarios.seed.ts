import { prisma } from "@/lib/prisma";

export async function seedUsuarios() {
    const usuarios = Array.from({ length: 10 }).map((_, i) => ({
        authId: `auth_${i + 1}`,
        nombre: `Usuario ${i + 1}`,
        email: `usuario${i + 1}@example.com`,
    }));

    for (const u of usuarios) {
        await prisma.usuario.upsert({
            where: { email: u.email },
            update: {},
            create: u,
        });
    }

    console.log("Usuarios creados o ya existentes ✔️");
}
