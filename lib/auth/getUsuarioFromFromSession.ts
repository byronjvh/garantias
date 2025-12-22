// lib/auth/getUsuarioFromSession.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function getUsuarioFromSession(authUserId: string) {
    const usuario = await prisma.usuario.findUnique({
        where: { authId: authUserId },
    });

    if (!usuario) {
        throw new Error("USUARIO_NO_EXISTE");
    }

    return usuario; // 👈 usuario interno
}
