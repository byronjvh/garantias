"use server"

import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { headers } from "next/headers";



export async function getRol() {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })

    const authId = session?.user.id
    const usuario = await prisma.usuario.findUnique({
        where: { authId },
        select: { sucursalId: true, id: true },
    });

    const usuarioId = usuario?.id
    const sucursalId = usuario?.sucursalId

    if (!sucursalId || !usuarioId) return { success: false }

    const rol = await prisma.usuarioSucursal.findUnique({
        where: {
            usuarioId_sucursalId: {
                usuarioId,
                sucursalId,
            },
        },
        select: {
            rol: true,
        },
    });


    return {
        success: true,
        rol
    };
}