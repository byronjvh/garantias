"use server"

import { prisma } from "@/lib/prisma"
import { Rol } from "@prisma/client"


interface Params {
    clerkId: string
    sucursalId: number
    rol?: Rol
}

export async function setUsuarioSucursal({
    clerkId,
    sucursalId,
    rol = Rol.ASESOR,
}: Params) {
    return prisma.$transaction(async (tx) => {
        // 1️⃣ Buscar usuario por clerkId
        const usuario = await tx.usuario.findUnique({
            where: { clerkId },
            select: {
                id: true,
                sucursalId: true,
            },
        })

        if (!usuario) {
            throw new Error("Usuario no existe en la base de datos")
        }

        // 2️⃣ Si ya tiene sucursal, no hacemos nada
        if (usuario.sucursalId) {
            return {
                status: "already_assigned" as const,
            }
        }

        // 3️⃣ Setear sucursal principal en Usuario
        await tx.usuario.update({
            where: { id: usuario.id },
            data: { sucursalId },
        })

        // 4️⃣ Crear relación UsuarioSucursal
        await tx.usuarioSucursal.create({
            data: {
                usuarioId: usuario.id,
                sucursalId,
                rol,
            },
        })

        return {
            status: "assigned" as const,
        }
    })
}
