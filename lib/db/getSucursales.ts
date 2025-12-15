// lib/getSucursales.ts
import { cache } from "react"
import { prisma } from "@/lib/prisma"

export const getSucursales = cache(async () => {
    return prisma.sucursal.findMany({
        orderBy: { nombre: "asc" },
    })
})
