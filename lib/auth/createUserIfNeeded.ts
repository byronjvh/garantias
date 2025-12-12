// /lib/auth/createUserIfNeeded.ts
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function createUserIfNeeded() {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.length) return null;

    const email = user.emailAddresses[0].emailAddress;
    const nombre = user.fullName || user.firstName || ""

    // Buscar usuario en la base
    let usuario = await prisma.usuario.findUnique({
        where: { email },
    });

    // Si no existe, lo creamos
    if (!usuario) {
        usuario = await prisma.usuario.create({
            data: {
                email,
                nombre: nombre || email.split("@")[0],
                clerkId: user.id
            },
        });
    }

    return usuario;
}
