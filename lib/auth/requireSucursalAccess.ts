"use server";

import { prisma } from "@/lib/prisma";
import { Rol } from "@/types/types";

export async function requireSucursalAccess(
    usuarioId: number,
    sucursalId: number
) {
    const relacion = await prisma.usuarioSucursal.findUnique({
        where: {
            usuarioId_sucursalId: {
                usuarioId,
                sucursalId,
            },
        },
        select: { rol: true },
    });

    if (!relacion) {
        throw new Error("FORBIDDEN");
    }

    return relacion.rol;
}
