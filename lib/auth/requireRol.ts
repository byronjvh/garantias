"use server";

import { prisma } from "@/lib/prisma";
import { Rol } from "@/types/types";

export async function requireRol(
    usuarioId: number,
    rolesPermitidos: Rol[]
) {
    const roles = await prisma.usuarioSucursal.findMany({
        where: { usuarioId },
        select: { rol: true },
    });

    const tieneRol = roles.some(r => rolesPermitidos.includes(r.rol));

    if (!tieneRol) {
        throw new Error("FORBIDDEN");
    }

    return true;
}
