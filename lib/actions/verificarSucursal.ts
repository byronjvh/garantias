'use server'

import { prisma } from "@/lib/prisma";



export async function verificarSucursal(id: string) {

    const usuario = await prisma.usuario.findUnique({
        where: { clerkId: id },
        select: { sucursalId: true },
    });

    return {
        success: true,
        tieneSucursal: !!usuario?.sucursalId,
        sucursalId: usuario?.sucursalId,
    };
}