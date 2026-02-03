import { prisma } from "../prisma";

/**
 * Busca un usuario por correo.
 * @param email El email del usuario
 * @returns El usuario si existe, null si no existe
 */

export async function findUserByEmail(email: string) {
    return await prisma.usuario.findUnique({
        where: { email },
    });
}
